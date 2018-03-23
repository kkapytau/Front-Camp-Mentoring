(function() {
    "use strict";
    angular.module("todoListApp").
    filter('firstLetter', firstLetter);

    function firstLetter() {
        return function (items, letter) {
            //console.log("letter")
            if(!letter){
                return items;
            }
            return items.filter(function (item) {
                return item.name.charAt(0) == letter;
            });
        };
    }
})();
