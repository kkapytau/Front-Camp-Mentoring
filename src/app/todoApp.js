(function() {
    "use strict";
    angular.module("todoListApp", ["ui.router"])
        .config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("todoList", {
                url: "/",
                templateUrl: "./templates/main-view.html",
                controller: "mainController",
                controllerAs: "vm"

            })
            .state("addTodo", {
                url: "/add",
                templateUrl: "./templates/addTodo.html",
                controller: "addTodo",
                controllerAs: "vm"

            })
            .state("editTodo", {
                url: "/edit/:id",
                templateUrl: "./templates/editTodo.html",
                controller: "editTodo",
                controllerAs: "vm"

            })
        ;
        $urlRouterProvider.otherwise("/");
    }
})();
