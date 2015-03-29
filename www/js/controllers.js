angular.module('rivv.controllers', [])


.controller('homeForm', function ($scope, $ionicLoading, $state, $http) {

    $scope.update = function (search) {
        //        alert(search);
        //        alert($scope.select.platform);
        $ionicLoading.show({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'
            })

        var req = {
            method: 'GET',
            url: 'https://videogamesrating.p.mashape.com/get.php?count=1&game=god+of+war',
            headers: {
                'X-Mashape-Authorization': 'H4ldhpG7ZgmshKoX1vWY188hF2fnp1yCl3yjsngteXB6yw6uOH'
            },
            data: {},
            datatype: 'json'
        }

        $http(req).success(function (data) {
            $ionicLoading.hide()
            $state.go('app.details');
            $scope.score = data[0].score;
        }).error(function (err) {
            alert(err);
        });
    };
});