(function() {
    "use strict";
    angular.module("todoListApp").
    controller("addTodo", addTodo)
    ;

    function addTodo($scope, todoService, $state){

        $scope.isNewTodoTitleValid = true;

        $scope.addTodo = function (todoTitle) {
            if(todoTitle === undefined || todoTitle.length < 4){
                $scope.isNewTodoTitleValid = false;
                return false;
            }
            var todo = {
                name: todoTitle,
                date: new Date()
            };
            todoService.addTodo(todo);
            $scope.newTodoTitle = "";
            $scope.isNewTodoTitleValid = true;
            $state.go("todoList", {});
        };

    }

})();