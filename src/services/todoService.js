(function() {
    "use strict";
    angular.module("todoListApp").
    service("todoService",todoService)
    ;

    /*let todoList = [
        {
            "name":"Floop",
            date: "2018-03-18"
        },
        {
            "name":"Flop",
            date: "2018-02-18"
        },
        {
            "name":"Beep",
            date: "2017-03-17"
        },
        {
            "name":"Boop",
            date: "2016-01-18"
        }
    ];*/
    let todoList = [];

    function todoService($http){

        this.getStaticTodos = function(){
            return todoList;
        };

        this.getLocalTodos = function(callback) {
            $http.get('todoList.json')
                .then(response => {
                    todoList = response.data;
                    callback(response);
                })
        };

        this.addDateForTodo = function(list){
            const today = new Date();
            let monthCounter = 1;
            return list.map(function(item){
                item.date = new Date(today.getFullYear(), today.getMonth()-(monthCounter++), 0);
                return item
            });

        };

        this.getTodoById = function(id) {
            return todoList[id];
        };

        this.getTodos = function(callback) {
            $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/221620/todos.json')
                .then(response => {
                    todoList = response.data;
                    callback(response);
                })
        };

        this.deleteTodo = function(todo) {
            console.log("The " + todo.name + " todo has been deleted!")
            // other logic
        };

        this.saveTodo = function(todo) {
            console.log("The " + todo.name + " todo has been saved!");
            // other logic
        };

        this.addTodo = function(todo) {
            todoList.push(todo);
        };

    }
})();