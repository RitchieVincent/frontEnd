angular.module('rivv.controllers', [])


.controller('homeForm', function ($scope, $ionicLoading, $state, task) {

    $scope.update = function (search) {
        //        alert(search);
        //        alert($scope.select.platform);
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-energized"></ion-spinner>'
        })
        $scope.goGetScore(search);

    };

    $scope.goGetScore = function (search) {
        task.getScore(search)
            .then(function (res) {
                $scope.score = task.details[0].score
                $state.go('app.details');
            }, function (err) {
                alert("Error.");
            })
    }
})

.controller('detailsPage', function ($scope, $ionicLoading, $state, task) {
    console.log(task.details[0]);
    $scope.title = task.details[0].title;
    $scope.score = task.details[0].score;
    $scope.publisher = task.details[0].publisher;
    $scope.short_description = task.details[0].short_description;
    $scope.thumb = task.details[0].thumb;
    $scope.platforms = task.details[0].platforms[1];
})

.service('task', function task($http, $q, $ionicLoading) {
    var task = this;
    task.details = {};

    task.getScore = function (search) {
        var defer = $q.defer();

        $http.get('https://videogamesrating.p.mashape.com/get.php?count=1&game=drive', {
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