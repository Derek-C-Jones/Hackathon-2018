'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function() {
    $scope.description = "Login Screen"
    $scope.toAdd = [];
    $scope.userLogin = "username": "karelv@xpedia.co.za", "password":"password"

    &scope.signUp = function(){
        var addUser = {"username":$scope.userLogin.username, "password":$scope.userLogin.password}
        $scope.toAdd.push(addUser);
    }
}]);