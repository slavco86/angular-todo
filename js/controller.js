angular.module('RouteControllers', [])
    .controller('HomeController', function($scope, store) {
        $scope.title = "Welcome To Angular Todo, " + store.get("username") + " !";
        $scope.logout = "Not " + store.get("username") + " ? Please proceed to Login page or click the button below.";
        console.log(store.get("authToken"));
        
    })
    .controller('RegisterController', function($scope, $location, userAPIService, store) {
 
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function(){
            userAPIService.callAPI(url + "accounts/api-token-auth/", $scope.data).then(function(results){
                $scope.token = results.data.token;
                console.log(results.data);
                store.set("username",$scope.registrationUser.username);
                store.set("authToken",$scope.token)
            }).catch(function(err){
                alert("Error when logging in");
            });
        }
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                userAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results){
                    $scope.data = results.data;
                    console.log($scope.data);
                    alert("Registration has been completed");
                    $scope.login();
                }).catch(function(err){
                    alert("There has been an error");
                    console.log(err);
                });
                
            }
 
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
            
        };
    })
    .controller("TodoController", function($scope,$location,todoAPIService,store){
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.authToken = store.get("authToken");
        $scope.username = store.get("username");

        $scope.todos = [];

       $scope.login = function(){
        todoAPIService.getTodos(url + "todo/", $scope.username, $scope.authToken).then(function(results){
            $scope.todos = results.data;
            console.log(results.data);
            console.log($scope.authToken);
            console.log($scope.username);
        }).catch(function(err){
            console.log(err);
        });

       }
        $scope.login();
        $scope.submitForm = function(){
            if($scope.todoForm.$valid){
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);
    

                todoAPIService.createTodo(url + "todo/", $scope.todo, $scope.authToken).then(function(results){
                    console.log(results);
                    $scope.login();
                }).catch(function(err){
                    console.log(err)
                });
            }
        }

        $scope.editTodo = function(id){
            $location.path('/todo/edit/' + id);
        };

        $scope.deleteTodo = function(id) {
            todoAPIService.deleteTodo(url + "todo/" + id, $scope.username, $scope.authToken).then(function(results){
                console.log(results);
                $scope.login();

            }).catch(function(err){
                console.log(err);
            });
        };
    })
    .controller("EditTodoController", function($scope,$location,$routeParams,todoAPIService,store){
        var id = $routeParams.id;
        var url = "https://morning-castle-91468.herokuapp.com/";
   


        todoAPIService.getTodos(url + "todo/" + id, $scope.username, store.get("authToken")).then(function(results){
            $scope.todo = results.data;
        }).catch(function(err){
            console.log(err);
        });

        $scope.submitForm = function(){
            if($scope.todoForm.$valid){
                $scope.todo.username = $scope.username;

                todoAPIService.editTodo(url + "todo/" + id, $scope.todo, store.get("authToken")).then(function(results){
                    $location.path("/todo");
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
    })
    .controller("LoginController", function($scope,$location,$routeParams,LoginService,store){
        var url = "https://morning-castle-91468.herokuapp.com/";
        $scope.loginUser = {};
        store.remove("username");
        store.remove("authToken");
        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.loginUser.username = $scope.user.username;
                $scope.loginUser.password = $scope.user.password;

                LoginService.login(url + "accounts/api-token-auth/", $scope.loginUser).then(function(results){
                    store.set("username",$scope.loginUser.username);
                    store.set("authToken",results.data.token);
                    alert("You have successfully logged in as "+ store.get("username"));
                    $location.path('/');
                }).catch(function(err){
                    alert("There has been an error");
                    console.log(err);
                });   
            }
        };
    });