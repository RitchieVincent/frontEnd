angular.module('rivv.controllers', [])

.controller('mainController', function ($scope, $ionicPopup) {
    $scope.css = window.localStorage['theme'] || 'blueGreen';

    $scope.moreMenu = function () {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'favouritePopup aboutPopup',
            title: 'About',
            template: '<p>Ritchie Vincent</p><p>ritchie@ritchievincent.co.uk</p><p>Created using the Ionic framework.</p><p>&#169; 2015</p>',
            okType: 'waves-effect waves btn-flat'
        });
        alertPopup.then(function (res) {
            //When popup closed
        });
    }

    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e) {
        $(".homeHeader").addClass("hide");
    }

    function keyboardHideHandler(e) {
        $(".homeHeader").removeClass("hide");
    }
})

.controller('favouritesController', function ($scope, $cordovaToast, $window, $ionicPopup) {
    $scope.gameFavourites = (JSON.parse(localStorage.getItem('gameFavourites')));
    $scope.movieFavourites = (JSON.parse(localStorage.getItem('movieFavourites')));

    $scope.deleteGame = function (game) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'favouritePopup',
            template: 'Delete game from favourites?',
            cancelText: 'Cancel',
            cancelType: 'waves-effect waves btn-flat',
            okText: 'Delete',
            okType: 'waves-effect waves btn-flat'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                var gameFavourites = (JSON.parse(localStorage.getItem('gameFavourites')));

                for (var i = 0; i < gameFavourites.length; i++) {
                    if (gameFavourites[i].gameImage === game) {
                        gameFavourites.splice(i, 1);
                    }
                }
                $scope.showToast('Game removed from favourites.', 'long', 'center');
                localStorage.gameFavourites = JSON.stringify(gameFavourites);
                $window.location.reload(true);
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.deleteMovie = function (movie) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'favouritePopup',
            template: 'Delete movie from favourites?',
            cancelText: 'Cancel',
            cancelType: 'waves-effect waves btn-flat',
            okText: 'Delete',
            okType: 'waves-effect waves btn-flat'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                var movieFavourites = (JSON.parse(localStorage.getItem('movieFavourites')));

                for (var i = 0; i < movieFavourites.length; i++) {
                    if (movieFavourites[i].movieImage === movie) {
                        movieFavourites.splice(i, 1);
                    }
                }
                $scope.showToast('Movie removed from favourites.', 'long', 'center');
                localStorage.movieFavourites = JSON.stringify(movieFavourites);
                $window.location.reload(true);
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.pop = function () {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'favouritePopup',
            template: 'Delete favourite?',
            cancelText: 'Cancel',
            cancelType: 'waves-effect waves btn-flat',
            okText: 'Delete',
            okType: 'waves-effect waves btn-flat'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.showToast = function (message, duration, location) {
        $cordovaToast.show(message, duration, location);
    };
})

.controller('settingsController', function ($scope, $window) {
    $scope.css = window.localStorage['theme'] || 'blueGreen';
    $scope.themes = [
        {
            name: 'Blue/Green',
            url: 'blueGreen'
            },
        {
            name: 'Blue/Red',
            url: 'blueRed'
            },
        {
            name: 'Dark Purple/Pink',
            url: 'dpurplePink'
            },
        {
            name: 'Grey/Blue',
            url: 'greyBlue'
            },
        {
            name: 'Orange/Green',
            url: 'orangeGreen'
            },
        {
            name: 'Dark Purple/Grey',
            url: 'purpleGrey'
            },
        {
            name: 'Purple/Pink',
            url: 'purplePink'
            },
        {
            name: 'Red/Blue',
            url: 'redBlue'
            }
        ];

    $scope.changeTheme = function () {
        window.localStorage['theme'] = $scope.css;
        var theme = window.localStorage['theme'] || 'blueGreen';
        $window.location.reload(true);
    };

})


.controller('homeForm', function ($scope, $ionicLoading, $state, task, task2) {
    $scope.update = function (search) {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>',
            animation: 'fade-in'
        })
        $scope.goGetScore(search);
    }

    $scope.update2 = function (search2) {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>',
            animation: 'fade-in'
        })
        $scope.goGetScore2(search2);
    }

    $scope.goGetScore = function (search) {
        task.getScore(search)
            .then(function (res) {
                if (task.details.length > 1) {
                    $state.go('app.gameList');
                } else {
                    $state.go('app.gameDetails');
                }
            }, function (err) {
                alert("Error.");
            })
    }

    $scope.goGetScore2 = function (search2) {
        task2.getScore2(search2)
            .then(function (res) {
                $state.go('app.movieList');
            }, function (err) {
                alert("Error.");
            })
    }
})

.controller('gameDetailsPage', function ($scope, $ionicLoading, $state, task, $cordovaToast, $window) {
    $scope.gameDetails = task.details[0];

    $scope.saveFavourite = function () {
        var addItem = function (img, title, score) {
            var oldItems = JSON.parse(localStorage.getItem('gameFavourites')) || [];

            var newItem = {
                'gameImage': img,
                'gameTitle': title,
                'gameScore': score
            };

            oldItems.push(newItem);

            localStorage.setItem('gameFavourites', JSON.stringify(oldItems));
        };

        addItem('' + $scope.gameDetails.thumb + '', '' + $scope.gameDetails.title + '', '' + $scope.gameDetails.score + '');

        $scope.showToast('Game added to favourites!', 'long', 'center');
        $state.go('app.favourites');
        $window.location.reload(true);
    }
    $scope.showToast = function (message, duration, location) {
        $cordovaToast.show(message, duration, location);
    };
})

.controller('movieDetailsPage', function ($scope, $ionicLoading, $state, task3, $cordovaToast, $window) {
    $scope.movieDetails = task3.details;
    $scope.movieTotalRating = $scope.movieDetails.imdbRating / 10 + $scope.movieDetails.Metascore / 100 + $scope.movieDetails.tomatoMeter / 100;
    $scope.movieTotalRating = $scope.movieTotalRating / 3;

    $scope.saveFavourite = function () {
        var addItem = function (img, title, score) {
            var oldItems = JSON.parse(localStorage.getItem('movieFavourites')) || [];

            var newItem = {
                'movieImage': img,
                'movieTitle': title,
                'movieScore': score
            };

            oldItems.push(newItem);

            localStorage.setItem('movieFavourites', JSON.stringify(oldItems));
        };

        addItem('' + $scope.movieDetails.Poster + '', '' + $scope.movieDetails.Title + '', '' + $scope.movieTotalRating * 10 + '');

        $scope.showToast('Movie added to favourites!', 'long', 'center');
        $state.go('app.favourites');
        $window.location.reload(true);
    }
    $scope.showToast = function (message, duration, location) {
        $cordovaToast.show(message, duration, location);
    };
})

.controller('gameListPage', function ($scope, $ionicLoading, $state, task) {
    $scope.details = task.details;
    $scope.test = function ($index) {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        })
        task.getScore($scope.details[$index].title)
            .then(function (res) {
                $state.go('app.gameDetails');
                $ionicLoading.hide()
            }, function (err) {
                alert("Error.");
            })
    }
})

.controller('movieListPage', function ($scope, $ionicLoading, $state, task2, task3, $cordovaToast) {
    $scope.details = task2.details;
    $scope.test = function (imdbID) {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        })
        task3.getScore3(imdbID)
            .then(function (res) {
                if (!(task3.details.imdbRating > 0 && task3.details.Metascore > 0 && task3.details.tomatoMeter > 0)) {
                    $scope.showToast('Unfortunately not all data could be gathered for this movie.', 'long', 'center')
                } else {
                    $state.go('app.movieDetails');
                }

                $ionicLoading.hide()
            }, function (err) {
                alert("Error.");
            })
    }

    $scope.showToast = function (message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function (success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }
})

.controller('MapController', function ($scope, $ionicLoading, $compile) {

    //    var map;
    //    var infoWindow;
    //    var service;
    //
    //    function initialize() {
    //        map = new google.maps.Map(document.getElementById('map-canvas'), {
    //            zoom: 14,
    //            styles: [{
    //                "featureType": "water",
    //                "stylers": [{
    //                    "visibility": "on"
    //                }, {
    //                    "color": "#b5cbe4"
    //                }]
    //            }, {
    //                "featureType": "landscape",
    //                "stylers": [{
    //                    "color": "#efefef"
    //                }]
    //            }, {
    //                "featureType": "road.highway",
    //                "elementType": "geometry",
    //                "stylers": [{
    //                    "color": "#83a5b0"
    //                }]
    //            }, {
    //                "featureType": "road.arterial",
    //                "elementType": "geometry",
    //                "stylers": [{
    //                    "color": "#bdcdd3"
    //                }]
    //            }, {
    //                "featureType": "road.local",
    //                "elementType": "geometry",
    //                "stylers": [{
    //                    "color": "#ffffff"
    //                }]
    //            }, {
    //                "featureType": "poi.park",
    //                "elementType": "geometry",
    //                "stylers": [{
    //                    "color": "#e3eed3"
    //                }]
    //            }, {
    //                "featureType": "administrative",
    //                "stylers": [{
    //                    "visibility": "on"
    //                }, {
    //                    "lightness": 33
    //                }]
    //            }, {
    //                "featureType": "road"
    //            }, {
    //                "featureType": "poi.park",
    //                "elementType": "labels",
    //                "stylers": [{
    //                    "visibility": "on"
    //                }, {
    //                    "lightness": 20
    //                }]
    //            }, {}, {
    //                "featureType": "road",
    //                "stylers": [{
    //                    "lightness": 20
    //                }]
    //            }]
    //        });
    //    }
    //
    //        navigator.geolocation.getCurrentPosition(function (pos) {
    //            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //            var myLocation = new google.maps.Marker({
    //                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
    //                map: map,
    //                title: "My Location"
    //            });
    //        });









    var map;

    function initialize() {
        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: pyrmont,
            zoom: 17
        });

        
var myLocation;

        navigator.geolocation.getCurrentPosition(function (pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            console.log(myLocation);
        });
        console.log(myLocation);
        
        var request = {
            location: pyrmont,
            radius: 500,
            keyword: 'video game'
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function callback(results, status, pagination) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        } else {
            for (var i = 0, place; place = results[i]; i++){
                console.log(place.name);
            }
        }
    }










    setTimeout(function () {
        initialize();
    }, 1000);


})

.service('task', function task($http, $q, $ionicLoading) {
    var task = this;
    task.details = {};

    task.getScore = function (search) {
        var defer = $q.defer();

        $http.get('https://videogamesrating.p.mashape.com/get.php?count=10&game=' + search + '', {
            headers: {
                'X-Mashape-Authorization': 'H4ldhpG7ZgmshKoX1vWY188hF2fnp1yCl3yjsngteXB6yw6uOH'
            },
            res: {}
        }).success(function (res) {
            $ionicLoading.hide()
            task.details = res;
            defer.resolve(res);
        }).error(function (err, status) {
            defer.reject(err);
        })
        return defer.promise;

    }
})

.service('task2', function task2($http, $q, $ionicLoading) {
    var task2 = this;
    task2.details = {};

    task2.getScore2 = function (search2) {
        var defer = $q.defer();

        $http.get('http://www.omdbapi.com/?y=&r=json&type=movie&s=' + search2 + '', {
            res: {}
        }).success(function (res) {
            $ionicLoading.hide()
            resSearch = res;
            task2.details = resSearch.Search;
            defer.resolve(res);
        }).error(function (err, status) {
            defer.reject(err);
        })
        return defer.promise;

    }
})

.service('task3', function task3($http, $q, $ionicLoading) {
    var task3 = this;
    task3.details = {};

    task3.getScore3 = function (imdbID) {
        var defer = $q.defer();

        $http.get('http://www.omdbapi.com/?plot=short&r=json&tomatoes=true&i=' + imdbID + '', {
            res: {}
        }).success(function (res) {
            $ionicLoading.hide()
            task3.details = res;
            defer.resolve(res);
        }).error(function (err, status) {
            defer.reject(err);
        })
        return defer.promise;

    }
})

//.service('favouriteGame', function task($http, $q, $ionicLoading) {
//    var task = this;
//    task.details = {};
//
//    task.getScore = function (search) {
//        var defer = $q.defer();
//
//        $http.get('https://videogamesrating.p.mashape.com/get.php?count=10&game=' + search + '', {
//            headers: {
//                'X-Mashape-Authorization': 'H4ldhpG7ZgmshKoX1vWY188hF2fnp1yCl3yjsngteXB6yw6uOH'
//            },
//            res: {}
//        }).success(function (res) {
//            $ionicLoading.hide()
//            task.details = res;
//            defer.resolve(res);
//        }).error(function (err, status) {
//            defer.reject(err);
//        })
//        return defer.promise;
//
//    }
//})