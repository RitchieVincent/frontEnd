angular.module('rivv.controllers', [])

.controller('mainController', function ($scope) {
    $scope.css = window.localStorage['theme'] || 'blueRed';
})

.controller('favouritesController', function ($scope) {
    $scope.gameFavourites = (JSON.parse(localStorage.getItem('gameFavourites')));
})

.controller('settingsController', function ($scope) {
    $scope.css = window.localStorage['theme'] || 'blueRed';
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
            name: 'Purple/Grey',
            url: 'purpleGrey'
            },
        {
            name: 'PurplePink',
            url: 'purplePink'
            },
        {
            name: 'Red/Blue',
            url: 'redBlue'
            }
        ];

    $scope.changeTheme = function () {
        window.localStorage['theme'] = $scope.css;
        var theme = window.localStorage['theme'] || 'blueRed';
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

.controller('gameDetailsPage', function ($scope, $ionicLoading, $state, task) {
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
    }
})

.controller('movieDetailsPage', function ($scope, $ionicLoading, $state, task3) {
    $scope.movieDetails = task3.details;
    $scope.movieTotalRating = $scope.movieDetails.imdbRating / 10 + $scope.movieDetails.Metascore / 100 + $scope.movieDetails.tomatoMeter / 100;
    $scope.movieTotalRating = $scope.movieTotalRating / 3;
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

    var map;
    var infoWindow;
    var service;

    function initialize() {
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 14,
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b5cbe4"
                }]
            }, {
                "featureType": "landscape",
                "stylers": [{
                    "color": "#efefef"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#83a5b0"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#bdcdd3"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e3eed3"
                }]
            }, {
                "featureType": "administrative",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": 33
                }]
            }, {
                "featureType": "road"
            }, {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": 20
                }]
            }, {}, {
                "featureType": "road",
                "stylers": [{
                    "lightness": 20
                }]
            }]
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        infoWindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);



        google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
    }

    function performSearch() {
        var request = {
            bounds: map.getBounds(),
            keyword: 'video game'
        };
        service.radarSearch(request, callback);
    }

    function callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        for (var i = 0, result; result = results[i]; i++) {
            createMarker(result);
        }
    }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            service.getDetails(place, function (result, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }
                infoWindow.setContent(result.name);
                infoWindow.open(map, marker);
            });
        });
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