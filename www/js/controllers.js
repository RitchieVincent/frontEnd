angular.module('rivv.controllers', [])


.controller('homeForm', function ($scope, $ionicLoading, $state) {

    $scope.update = function (search) {
        //        alert(search);
        //        alert($scope.select.platform);
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-energized"></ion-spinner>'
        })
        var output = $.ajax({
            url: 'https://videogamesrating.p.mashape.com/get.php?count=1&game=' + search + '',
            type: 'GET',
            data: {},
            datatype: 'json',
            success: function (data) {
                $ionicLoading.hide()
                $state.go('app.details');
                $scope.score = data[0].score;
            },
            error: function (err) {
                alert(err);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "H4ldhpG7ZgmshKoX1vWY188hF2fnp1yCl3yjsngteXB6yw6uOH");
            }
        });
    };
});