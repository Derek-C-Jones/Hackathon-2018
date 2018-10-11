'use strict';

angular.module('myApp.list', []).controller('ListCtrl', function($scope, $localStorage, $sessionStorage, $location, growl) {



})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}]);