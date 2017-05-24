angular.module("userAPIService",[])
    .factory("userAPIService",function($http){
        userAPIService = {
            callAPI: function(url,data){
                return $http.post(url,data);
            }
        };
        return userAPIService;
    });

angular.module("todoAPIService",[])
.factory("todoAPIService",function($http){
        todoAPIService = {
            getTodos: function(url, data, token) {
                header = "Authorization:JWT " + token;
                return $http.get(url, {params:{"username": data}}, header);
            },
            createTodo: function(url, data, token) {
                header = "Authorization:JWT " + token;
                return $http.post(url, data, header);
            },
            editTodo: function(url, data, token) {
                header = "Authorization:JWT " + token;
                return $http.put(url, data, header);
            },
            deleteTodo: function(url, token) {
                header = "Authorization:JWT " + token;
                return $http.delete(url, token);
            }
        };
        return todoAPIService;
    });