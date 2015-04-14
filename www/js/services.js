angular.module('rivvu.services', [])

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