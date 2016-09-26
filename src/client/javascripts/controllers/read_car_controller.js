var CarsModule = require('../app');

CarsModule.controller('readCarCtrl', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) {
    $scope.car = {};

    $scope.carSelect = {
        selectedCar: null,
        options: []
    };

    $scope.carPanelIsVisible = false;

    $http.get('ajax/get_car')
        .success(function(data) {
            $scope.carSelect.options = data;
        })
        .error(function(data, status) {
            if (status === 404) {
                $log.error('File not found!')
            };
        });

    $scope.showCar = function() {
        var url = $scope.carSelect.selectedCar;

        $http.get(url)
            .success(function(data) {
                $scope.car = data;
                $scope.carPanelIsVisible = true;
            })
            .error(function(data, status) {
                if (status === 404) {
                    $log.error('File not found! ' + url)
                };
            });
    };

    $scope.deleteCar = function() {
        $http.post(
            'ajax/post_delete_car',
            {
                id: $scope.car.id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        )
        .success(function(data) {
            $log.info('Successfully!');
            $location.path('/list');
        })
        .error(function() {
            $log.error('Error!');
        });
    };
}]);
