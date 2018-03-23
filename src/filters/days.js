(function() {
    "use strict";
    angular.module("todoListApp").
    filter('days', days);

    function days() {
        return function (items, day) {
            //console.log("day")
            if(!day){
                return items;
            }
            return items.filter(function (item) {

                return item.date.startsWith(day);
            });
        };
    }
})();
