angular.module('rivvu', ['ionic', 'rivvu.controllers', 'rivvu.services', 'ui.router', 'angular-progress-arc', 'ngCordova'])
    .run(function ($ionicPlatform, $cordovaStatusbar) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            
            if (StatusBar && statusbarTransparent) {
                // Enable translucent statusbar
                statusbarTransparent.enable();

                // Get the bar back
                StatusBar.show();
            }
        });
    })

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
        })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'homeForm'
            }
        }
    })

    .state('app.favourites', {
        url: "/favourites",
        views: {
            'menuContent': {
                templateUrl: "templates/favourites.html",
                controller: "favouritesController"
            }
        }
    })

    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "templates/settings.html"
            }
        }
    })

    .state('app.help', {
        url: "/help",
        views: {
            'menuContent': {
                templateUrl: "templates/help.html"
            }
        }
    })

    .state('app.gameDetails', {
        url: "/gameDetails",
        views: {
            'menuContent': {
                templateUrl: "templates/gameDetails.html",
                controller: 'gameDetailsPage'
            }
        }
    })

    .state('app.gameList', {
        url: "/gameList",
        views: {
            'menuContent': {
                templateUrl: "templates/gameList.html",
                controller: 'gameListPage'
            }
        }
    })

    .state('app.movieDetails', {
        url: "/movieDetails",
        views: {
            'menuContent': {
                templateUrl: "templates/movieDetails.html",
                controller: 'movieDetailsPage'
            }
        }
    })

    .state('app.movieList', {
        url: "/movieList",
        views: {
            'menuContent': {
                templateUrl: "templates/movieList.html",
                controller: 'movieListPage'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});