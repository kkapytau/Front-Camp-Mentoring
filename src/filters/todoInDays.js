(function() {
    "use strict";
    angular.module("todoListApp").
    filter('todoInDays', todoInDays);

    function todoInDays() {
        return function (items, number) {
            //console.log("number")
            if(!/^[0-9]+$/.test(number)){
                return items
            }
            let now = new Date();

            return items.filter(function (item) {
               const days = Math.round((now - new Date(item.date)) / 86400000);
               return days >= number;
            });
        };
    }
})();