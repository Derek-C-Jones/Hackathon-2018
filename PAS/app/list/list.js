'use strict';

angular.module('myApp.login', []).controller('LoginCtrl', function($scope, $localStorage, $sessionStorage, $location, growl) {


    $scope.description = "Login Screen"
    if (!$localStorage.users) {
        $localStorage.users = [];
        $localStorage.users.push({ "username": "karelv@xpedia.co.za", "password":"password", "role" : "vendor" });
        $localStorage.users.push({ "username": "derekj@xpedia.co.za", "password":"password", "role" : "buyer" });
    }
    $scope.userLogin = { "username": "karelv@xpedia.co.za", "password":"password" }

    $scope.signUp = function(){
        if ($scope.userLogin.username.trim() == "" || $scope.userLogin.username.length < 3) {
            //growl.error("Invalid username");
        }

        if ($scope.userLogin.username.trim() == "" || $scope.userLogin.username.length < 3) {
            ///growl.error("Invalid password");
        }
        var user = _.find($localStorage.users, function (toCheck) {
            return toCheck.username == $scope.userLogin.username;
        });
        if (!user) {
            $scope.toAdd.push({ "username": $scope.username, "password": $scope.password });
            ///growl.success("The user was registered");
        }
    }

    $scope.login = function(){
        growl.error("Hello growl");
        var user = _.find($localStorage.users, function (toCheck) {
            return toCheck.username == $scope.userLogin.username;
        });

        if (!user) {
            ///growl.error("Invalid username or password");
            return;
        }
        $sessionStorage.currentUser = user;
        if (user.role == "vendor")
            $location.path('/post');
        else
            $location.path('/list');
    }
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/list.html',
    controller: 'LoginCtrl'
  });
}]);