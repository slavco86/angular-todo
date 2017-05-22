angular.module("userAPIService",[])
    .factory("userAPIService",function($http){
        userAPIService = {
            registerUser: function(url,data){
                return $http.post(url,data);
            }
        };
        return userAPIService;
    });