angular.module('rivv.controllers', [])


    .controller('headController', function ($scope) {


})


.controller('homeForm', function ($scope, $ionicLoading, $state, task, task2) {

    $scope.update = function (search) {
        //        alert(search);
        //        alert($scope.select.platform);
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>',
            animation: 'fade-in'
        })
        $scope.goGetScore(search);

    }

    $scope.update2 = function (search2) {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>',
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
                    $state.go('app.details');
                }
            }, function (err) {
                alert("Error.");
            })
    }

    $scope.goGetScore2 = function (search2) {
        task2.getScore2(search2)
            .then(function (res) {
                $state.go('app.movieDetails');
            }, function (err) {
                alert("Error.");
            })
    }
})

.controller('detailsPage', function ($scope, $ionicLoading, $state, task) {
    $scope.title = task.details[0].title;
    $scope.score = task.details[0].score;
    $scope.publisher = task.details[0].publisher;
    $scope.short_description = task.details[0].short_description;
    $scope.thumb = task.details[0].thumb;
    $scope.platforms = task.details[0].platforms[1];
})

.controller('movieDetailsPage', function ($scope, $ionicLoading, $state, task2) {
    $scope.movieDetails = task2.details;
    $scope.movieTotalRating = $scope.movieDetails.imdbRating / 10 + $scope.movieDetails.Metascore / 100;
    $scope.movieTotalRating = $scope.movieTotalRating / 2;
})

.controller('gameListPage', function ($scope, $ionicLoading, $state, task) {
    $scope.details = task.details;
    $scope.test = function ($index) {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        })
        task.getScore($scope.details[$index].title)
            .then(function (res) {
                $state.go('app.details');
                $ionicLoading.hide()
            }, function (err) {
                alert("Error.");
            })
    }
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

        $http.get('http://www.omdbapi.com/?t=' + search2 + '&y=&plot=short&r=json', {
            res: {}
        }).success(function (res) {
            $ionicLoading.hide()
            task2.details = res;
            defer.resolve(res);
        }).error(function (err, status) {
            defer.reject(err);
        })
        return defer.promise;

    }
})