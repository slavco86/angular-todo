angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, $location, userAPIService, store) {
 
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function(){
            userAPIService.callAPI(url + "accounts/api-auth-token/", $.scope.data).then(function(results){
                $scope.token = results.data.token;
                store.set("username",$scope.registrationUser.username);
                store.set("authToken",$scope.token)
            }).catch(function(err){
                alert("There has been an error");
            });
        }
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                userAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results){
                    $scope.data = results.data;
                    console.log($scope.data);
                    $scope.user.username = "";
                    $scope.user.password = "";
                    $scope.registrationForm.$setPristine();
                    alert("Registration has been completed");
                }).catch(function(err){
                    alert("There has been an error");
                    console.log(err);
                });
            }
 
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
            
        };
    });