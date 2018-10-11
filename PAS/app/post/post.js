'use strict';

angular.module('myApp.post', []).controller('PostCtrl', function($scope, $localStorage, $sessionStorage, $location, growl) {

    $scope.new  = function() {
        $location.path('/new');
    }

    $scope.addPost = function(title, description, imgLocation, address, price, vendor){
        var post = {};
        post.vendor = vendor;
        post.title = title;
        post.description = description;
        post.imgLocation = imgLocation;
        post.address = address;
        post.price = price;
        post.createDate = new Date();
        post.imgLocation = imgLocation;
        $localStorage.posts.push(post);
    }

    if (!$localStorage.posts || $localStorage.posts.length < 1) {
        $localStorage.posts = [];
        $scope.addPost("5kg Peach Boxes", "Freshly picked peaches", "pics\\peaches.jpg", "Mt Pleasant, Harare, Zimbabwe", "9.00", "Pleasant Farms");
        $scope.addPost("20kg Golden Delicious Apples", "New harvest, available now", "pics\\apples.jpg", "G74G+V9 Maclear, Zimbabwe", "9.00", "DuToit Apples");
        $scope.addPost("Large Bunch of Carrots", "Big and straight", "pics\\carrots.jpg", "Golari (Chikwava) Farm, ", "9.00", "Zim Small Farmers Asc.");
        $scope.addPost("Radishes", "Huge", "pics\\radishes.jpg", "G74G+V9 Maclear, Zimbabwe", "2.00", "Zim Small Farmers Asc.");
        $scope.addPost("Compost", "Buy one get one free", "pics\\compost.jpg", "G74G+V9 Maclear, Zimbabwe", "5.00", "Zim Small Farmers Asc.");
        $scope.addPost("Bags of Avos", "Like mamma used to grow them", "pics\\avos.jpg", "G74G+V9 Maclear, Zimbabwe", "12.00", "Zim Small Farmers Asc.");
    }
    $scope.lastfile = "/images/placeholder.jpg";
    $scope.posts = $localStorage.posts;
    $scope.newPost = {};

    function setPosition(position) {
        $scope.newPost.lat = position.coords.latitude;
        $scope.newPost.long = position.coords.longitude;
    }

    function displayError(error) {
        var errors = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Request timeout'
        };
        alert("Error: " + errors[error.code]);
    }

    $scope.save = function() {
        if (navigator.geolocation) {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
                setPosition,
                displayError,
                { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
        }
        if ($scope.newPost.title) {
            $scope.newPost.vendor = "United Farming Zim";
            $scope.newPost.createDate = new Date();
            $scope.newPost.imgLocation = $scope.lastfile;
            $localStorage.posts.push($scope.newPost);
            $location.path('/post');
        }
    }

})

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/post', {
        templateUrl: 'post/post.html',
        controller: 'PostCtrl'
    });
}])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/new', {
        templateUrl: 'post/new.html',
        controller: 'PostCtrl'
    });
}])
.directive('fdInput', [function () {
    return {
        scope: false,
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                scope.lastfile = "/pics/" + files[0].name;
            });
        }
    }
}]);


