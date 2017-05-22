angular.module("userAPIService",[])
    .factory("userAPIService",function($http){
        userAPIService = {
            callAPI: function(url,data){
                return $http.post(url,data);
            }
        };
        return userAPIService;
    });