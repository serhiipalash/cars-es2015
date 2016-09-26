var CarsModule = require('../app');

CarsModule.config( ['$routeProvider', '$locationProvider', '$httpProvider',

    function($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $routeProvider
            .when('/', {
                templateUrl: 'ajax/home/'
            })
            .when('/list', {
                templateUrl: 'ajax/list/',
                controller: 'carListCtrl'
            })
            .when('/car', {
                templateUrl: 'ajax/car/',
                controller: 'readCarCtrl'
            })
            .when('/car/create', {
                templateUrl: 'ajax/create/',
                controller: 'createCarCtrl'
            })
            .when('/car/update', {
                templateUrl: 'ajax/update/',
                controller: 'updateCarCtrl'
            })
            .when('/car/:id', {
                templateUrl: function(params) { return 'ajax/car/' + params.id + '/'; }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
}]);
