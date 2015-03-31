angular.module('rivv', ['ionic', 'rivv.controllers', 'ui.router', 'angular-progress-arc'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
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

    .state('app.details', {
        url: "/details",
        views: {
            'menuContent': {
                templateUrl: "templates/details.html",
                controller: 'detailsPage'
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

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});