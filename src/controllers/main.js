(function() {
    "use strict";
    angular.module("todoListApp").
    controller("mainController", mainController)
    ;

    function mainController($scope, todoService){

        if(!$scope.todos){
            $scope.todos = todoService.getStaticTodos();
        }

        if(!$scope.todos.length) {

            /*todoService.getTodos(function(response){
                $scope.todos = todoService.addDateForTodo(response.data);
            });*/

            todoService.getLocalTodos(function(response){
                $scope.todos = response.data;
            });


        }

        $scope.deleteTodo = function(todo, $index) {
            todoService.deleteTodo(todo);
            $scope.todos.splice($index, 1);
        };

    }

})();