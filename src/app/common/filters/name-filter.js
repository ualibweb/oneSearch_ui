angular.module('filters.nameFilter', [])

    .filter('nameFilter', ['$filter', function($filter){
        return function(name){
            if (name.indexOf(',') > -1) {
                var nameParts = name.split(',');
                name = nameParts.map(function (obj) {
                    return obj.trim();
                }).reverse().join(' ');
            }
            return name;
        }
    }]);