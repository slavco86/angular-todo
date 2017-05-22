angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, userAPIService) {
 
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                userAPIService.registerUser(url + "accounts/register/", $scope.registrationUser).then(function(results){
                    $scope.data = results.data;
                    console.log($scope.data);
                    alert("Registration has been completed");
                }).catch(function(err){
                    alert("There has been an error");
                    console.log(err);
                });
            }
 
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
        };
    });