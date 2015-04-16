angular.module('rivvu.controllers', [])

.controller('mainController', function ($scope, $ionicPopup) {
    $scope.css = window.localStorage['theme'] || 'blueGreen'; //Sets the theme, retrieving it from local storage, with a default value if not found

    $scope.moreMenu = function () { //The button on the right side of the nav bar displays a pop-up
        var alertPopup = $ionicPopup.alert({
            cssClass: 'favouritePopup aboutPopup', //Assigns classes to the pop-up box for styling
            title: 'About', //The title displayed in the pop-up
            template: '<p>Ritchie Vincent</p><p>ritchie@ritchievincent.co.uk</p><p>Created using the Ionic framework.</p><p>Game ratings retrieved from IGN.</p><p>Movie ratings retrieved from IMDB, Metacritic & Rotten Tomatoes.</p><p>Rivvu &#169; 2015</p>', //The text displayed
            okType: 'waves-effect waves btn-flat' //Classes applied to the 'ok' button in the pop-up
        });
        alertPopup.then(function (res) { //A function that could be run when the pop-up is closed
            //When popup closed
        });
    }

    window.addEventListener('native.keyboardshow', keyboardShowHandler);//Adds event listeners for showing and hiding the keyboard
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e) {//When the keyboard is shown, add a class to hide part of the page for visibility
        $(".homeHeader").addClass("hide");
    }

    function keyboardHideHandler(e) {//When the keyboard is hidden, remove the class
        $(".homeHeader").removeClass("hide");
    }
})

.controller('favouritesController', function ($scope, $cordovaToast, $window, $ionicPopup) {
    $scope.gameFavourites = (JSON.parse(localStorage.getItem('gameFavourites')));//Stores the game and movie local storage items in the $scope
    $scope.movieFavourites = (JSON.parse(localStorage.getItem('movieFavourites')));

    $scope.moreGameDetails = function (gameFavourite) {//When you click a game, display the game's details in a pop-up
        var alertPopup = $ionicPopup.alert({
            cssClass: 'favouritePopup moreDetailsPopup',
            title: gameFavourite.gameTitle,
            template: '<p><span class="moreTitle">Score:</span> ' + gameFavourite.gameScore + '</p><p><span class="moreTitle">Publisher:</span> ' + gameFavourite.gamePublisher + '</p><p><span class="moreTitle">Description:</span> ' + gameFavourite.gameDescription + '</p>',
            okType: 'waves-effect waves btn-flat'
        });
        alertPopup.then(function (res) {
            //When popup closed
        });
    }

    $scope.moreMovieDetails = function (movieFavourite) {//When you click a movie, display the game's details in a pop-up
        var alertPopup = $ionicPopup.alert({
            cssClass: 'favouritePopup moreDetailsPopup',
            title: movieFavourite.movieTitle,
            template: '<p><span class="moreTitle">Plot:</span> ' + movieFavourite.moviePlot + '</p><p><span class="moreTitle">Rating:</span> ' + movieFavourite.movieRating + '</p><p><span class="moreTitle">Release date:</span> ' + movieFavourite.movieReleased + '</p><p><span class="moreTitle">Genre:</span> ' + movieFavourite.movieGenre + '</p><p><span class="moreTitle">Awards:</span> ' + movieFavourite.movieAwards + '</p><p><span class="moreTitle">Box Office:</span> ' + movieFavourite.movieProfit + '</p>',
            okType: 'waves-effect waves btn-flat'
        });
        alertPopup.then(function (res) {
            //When popup closed
        });
    }

    $scope.deleteGame = function (game) {//When you click to delete a game, show a confirmation pop-up
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
                //OK clicked
                var gameFavourites = (JSON.parse(localStorage.getItem('gameFavourites'))); //Stores the gameFavourites local storage item in a variable

                for (var i = 0; i < gameFavourites.length; i++) {
                    if (gameFavourites[i].gameImage === game) {//Loops through the games, finds a match for the game that's been clicked
                        gameFavourites.splice(i, 1);//Remove it from the local storage array
                    }
                }
                $scope.showToast('Game removed from favourites.', 'long', 'center');//Calls a toast message, informing the user the game has been deleted
                localStorage.gameFavourites = JSON.stringify(gameFavourites);//Store the new favourites list (Minus the deleted game) in the local storage
                $window.location.reload(true);//Refreshes the page to display the updated favourites list
            } else {
                //Cancel clicked
            }
        });
    };

    $scope.deleteMovie = function (movie) { //Same as the game function above
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
                //OK clicked
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
                //Cancel clicked
            }
        });
    };

    $scope.showToast = function (message, duration, location) { //The toast function that is called, taking the parameters supplied
        $cordovaToast.show(message, duration, location);
    };
})

.controller('settingsController', function ($scope, $window) {
    $scope.css = window.localStorage['theme'] || 'blueGreen';//Stores the theme from the local storage value, defaulting to blueGreen if none supplied
    $scope.themes = [//Defines the theme options
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
        window.localStorage['theme'] = $scope.css;//Stores the chosen theme in local storage
        var theme = window.localStorage['theme'] || 'blueGreen';//Stores the chosen theme in a variable
        $window.location.reload(true);//Reloads the page, to ensure the theme updates through the whole app
    };

})


.controller('homeController', function ($scope, $ionicLoading, $state, task, task2, $cordovaToast) {
    $scope.update = function (search) {
        $ionicLoading.show({//Displays the loading sign
            template: '<ion-spinner icon="android"></ion-spinner>',//Displays the loading spinner
            animation: 'fade-in'//Fades the loading sign in
        })
        $scope.goGetScore(search);//Runs the goGetScore function, with the search term supplied
    }

    $scope.update2 = function (search2) {//Same as above, for movies
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>',
            animation: 'fade-in'
        })
        $scope.goGetScore2(search2);
    }

    $scope.goGetScore = function (search) {
        task.getScore(search)//Runs the game search service (services.js)
            .then(function (res) {//Once the service returns true
                if (task.details.length > 1) { //If there is more than one game, go to the gameList page, allowing the user to choose which game they wanted
                    $state.go('app.gameList');
                } else if (task.details.length == 1) {//If there is one game returned, display the details to the user in the gameDetails page
                    $state.go('app.gameDetails');
                } else if (task.details.length == 0) {//If there are no games returned, display a toast informing them
                    $scope.showToast('No results found.', 'long', 'center');
                }
            }, function (err) {//If the service does not run successfully
                alert("Error.");
            })
    }

    $scope.goGetScore2 = function (search2) {
        task2.getScore2(search2)//Runs the movie service
            .then(function (res) {//Once the service returns true
                $state.go('app.movieList');//Display the movie details on the movieList page
            }, function (err) {//If the service does not run successfully
                alert("Error.");
            })
    }

    $scope.showToast = function (message, duration, location) {//Shows the toast message, with the given parameters
        $cordovaToast.show(message, duration, location);
    };
})

.controller('gameDetailsPage', function ($scope, $ionicLoading, $state, task, $cordovaToast, $window) {
    $scope.gameDetails = task.details[0];//Set the gameDetails to the task object returned by the service

    $scope.saveFavourite = function () {//If the user clicks the favourite button
        var addItem = function (img, title, score, pub, desc) {//Adds the game details to local storage
            var oldItems = JSON.parse(localStorage.getItem('gameFavourites')) || [];

            var newItem = {
                'gameImage': img,
                'gameTitle': title,
                'gameScore': score,
                'gamePublisher': pub,
                'gameDescription': desc
            };

            oldItems.push(newItem);//Push the new game instead of add, to ensure it does not overwrite the old games

            localStorage.setItem('gameFavourites', JSON.stringify(oldItems));//Stores the new game in local storage
        };

        addItem('' + $scope.gameDetails.thumb + '', '' + $scope.gameDetails.title + '', '' + $scope.gameDetails.score + '', '' + $scope.gameDetails.publisher + '', '' + $scope.gameDetails.short_description + '');//Defines what properties of the game to add to the favourites local storage, and run the above function

        $scope.showToast('Game added to favourites!', 'long', 'center');//Defines what to display in the toast message
        $state.go('app.favourites');//Sends the user to the favourites page to see their new favourite
        $window.location.reload(true);//Reloads the page to ensure the new favourite game displays
    }
    $scope.showToast = function (message, duration, location) {//Shows the toast message, with the supplied parameters
        $cordovaToast.show(message, duration, location);
    };
})

.controller('movieDetailsPage', function ($scope, $ionicLoading, $state, task3, $cordovaToast, $window) {//Same as the above games controller, but for movies
    $scope.movieDetails = task3.details;
    $scope.movieTotalRating = $scope.movieDetails.imdbRating / 10 + $scope.movieDetails.Metascore / 100 + $scope.movieDetails.tomatoMeter / 100;
    $scope.movieTotalRating = $scope.movieTotalRating / 3;//This and the line above calculates the overall rating for the movie

    $scope.saveFavourite = function () {
        var addItem = function (img, title, score, rated, released, genre, plot, awards, profit) {
            var oldItems = JSON.parse(localStorage.getItem('movieFavourites')) || [];

            var newItem = {
                'movieImage': img,
                'movieTitle': title,
                'movieScore': score,
                'movieRating': rated,
                'movieReleased': released,
                'movieGenre': genre,
                'moviePlot': plot,
                'movieAwards': awards,
                'movieProfit': profit
            };

            oldItems.push(newItem);

            localStorage.setItem('movieFavourites', JSON.stringify(oldItems));
        };

        addItem('' + $scope.movieDetails.Poster + '', '' + $scope.movieDetails.Title + '', '' + $scope.movieTotalRating * 10 + '', '' + $scope.movieDetails.Rated + '', '' + $scope.movieDetails.Released + '', '' + $scope.movieDetails.Genre + '', '' + $scope.movieDetails.Plot + '', '' + $scope.movieDetails.Awards + '', '' + $scope.movieDetails.BoxOffice + '');

        $scope.showToast('Movie added to favourites!', 'long', 'center');
        $state.go('app.favourites');
        $window.location.reload(true);
    }
    $scope.showToast = function (message, duration, location) {
        $cordovaToast.show(message, duration, location);
    };
})

.controller('gameListPage', function ($scope, $ionicLoading, $state, task) {
    $scope.details = task.details;//Stores the games returned by the service, in the $scope
    $scope.view = function ($index) {//When the user clicks the game from the returned list
        $ionicLoading.show({//Shows the loading symbol
            template: '<ion-spinner icon="android"></ion-spinner>'
        })
        task.getScore($scope.details[$index].title)//Run the game service again, with the chosen game, to retrieve only that game's details
            .then(function (res) {//When the service returns successful
                $state.go('app.gameDetails');//Go to the gameDetails page with the details of the selected game
                $ionicLoading.hide()//Hide the loading symbol
            }, function (err) {//If the service returns with an error
                alert("Error.");
            })
    }
})

.controller('movieListPage', function ($scope, $ionicLoading, $state, task2, task3, $cordovaToast) {
    $scope.details = task2.details;//Stores the movies returned by the service, in the $scope
    $scope.view = function (imdbID) {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        })
        task3.getScore3(imdbID)//Runs the other movie service, passing the movie's IMDB ID into it, to retrieve the specific movie
            .then(function (res) {//When the service returns successful
                if (!(task3.details.imdbRating > 0 && task3.details.Metascore > 0 && task3.details.tomatoMeter > 0)) {//If the movie does not have all the necessary ratings to calculate an accurate average score
                    $scope.showToast('Unfortunately not all data could be gathered for this movie.', 'long', 'center')//Display a toast message to the user informing them of the error
                } else {
                    $state.go('app.movieDetails');//Go to the movieDetails page
                }
                $ionicLoading.hide()//Hide the loading symbol
            }, function (err) {//If the service returns with an error
                alert("Error.");
            })
    }

    $scope.showToast = function (message, duration, location) {//Displays the toast with the supplied parameters
        $cordovaToast.show(message, duration, location).then(function (success) {
            //Toast shown
        }, function (error) {
            //Toast was not shown
        });
    }
})

.controller('MapController', function ($scope, $ionicLoading, $compile, $window) {
    var map;

    function initialize() {
        var dummy = new google.maps.LatLng(-33.8665433, 151.1956316); //Sets dummy data

        map = new google.maps.Map(document.getElementById('map-canvas'), { //Sets up a map variable - Needed to search for places
            center: dummy
        });

        if (typeof myLocation === 'undefined') { //If myLocation is undefined
            navigator.geolocation.getCurrentPosition(function (pos) { //Finds your current geolocation
                myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                run(myLocation);
            });
        }

        function run(myLocation) {
            var request = {
                location: myLocation, //Sets the location to your current geolocated location
                radius: 1000, //Sets the radius to 1000 metres
                keyword: 'game' //Searches Google Places API for nearby places with the keyword "game"
            };

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }
    }

    function callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        } else {
            for (var i = 0, place; place = results[i]; i++) { //Outputs all the local places
                $scope.$apply(function () { //Updates the scope so the new values are displayed
                    $scope.results = results;
                });
            }
        }
    }

    initialize(); // Runs the initialize function
})