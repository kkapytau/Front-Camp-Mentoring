(function() {
    "use strict";
    angular.module("todoListApp").
    controller("editTodo", editTodo)
    ;

    function editTodo($scope, todoService, $state, $stateParams){

        if($stateParams.id) {
            $scope.editedTodo = todoService.getTodoById($stateParams.id);
        }

        $scope.saveTodo = function(todo) {
            todoService.saveTodo(todo);
            $state.go("todoList", {});
        };

    }

})();