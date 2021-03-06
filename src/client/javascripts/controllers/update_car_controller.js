var CarsModule = require('../app');

CarsModule.controller('updateCarCtrl', ['$scope', '$http', '$log', '$location',
function($scope, $http, $log, $location) {
    $scope.car = {};

    $scope.carSelect = {
        selectedCar: null,
        options: []
    };

    $scope.validYears = [
        2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
        2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1889,
        1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980
    ];

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
            })
            .error(function(data, status) {
                if (status === 404) {
                    $log.error('File not found! ' + url)
                };
            });
    };

    $scope.removeImage = function() {
        $scope.car.images.splice(this.$index, 1);
        $http.post(
            'ajax/post_remove_img',
            {
                file: this.image,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        )
        .success(function(data) {
            $log.info(data);
            $log.info('Successfully!');
        })
        .error(function() {
            $log.error('Error!');
        });
    };

    $scope.imageUpload = function(event) {
        var files, reader, i;

        for (i = 0, files = event.target.files; i < files.length; i++) {
            reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $http.post(
                        'ajax/post_img',
                        {
                            file: Date.now() + '.jpg',
                            data: e.target.result
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        }
                    )
                    .success(function(data) {
                        $scope.car.images.push(data);
                        $log.info(data);
                    })
                    .error(function() {
                        $log.error('Error!');
                    });
                });
            };
            reader.readAsDataURL(files[i]);
        };
    };

    $scope.updateCar = function() {
        $http.post(
            'ajax/post_new_car',
            $scope.car,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        )
        .success(function(data, status, headers, config) {
            $log.info('Successfully!');
            $location.path('/list');
        })
        .error(function(data, status, headers, config) {
            $log.error('Error!');
        });
    };
}]);
