var CarsModule = require('../app');

CarsModule.controller('carListCtrl', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) {
    $scope.carList = [];

    $http.get('ajax/get_car_list')
        .success(function(data) {
            $scope.carList = data;
        })
        .error(function(data, status) {
            if (status === 404) {
                $log.error('Server error!');
            };
        });

    $scope.showCar = function() {
        var id = this.car.id;
        $location.path('car/' + id);
    };
}]);
