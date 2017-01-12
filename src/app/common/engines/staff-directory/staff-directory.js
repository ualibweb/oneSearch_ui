/**
 * @ngdoc object
 * @name engines.type:ENGIEN_NAME
 *
 * @description
 * Engine config properties
 *
 * | property | value |
 * |----------|-------|
 * | id       | 128      |
 * | priority | 5      |
 * | resultsPath | StaffDirectory     |
 * | templateUrl | common/engines/recommend/staff-directory.tpl.html|
 * | controller |  N/A  |
 *
 * @requires oneSearchProvider
 */

angular.module('engines.staffdirectory', [])
    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('staffdirectory', {
            id: 128,
            priority: 5,
            resultsPath: 'staffDir',
            templateUrl: 'common/engines/staff-directory/staff-directory.tpl.html',
            controller: 'StaffDirectoryCtrl'
        })
    }])
    .controller('StaffDirectoryCtrl', function($scope){

        var items = $scope.items;

        for (var i = 0, len = items.length; i < len; i++) {

            if (items[i].email) {
                //console.log(items[i].type);
                var rx = /^([\w-]+(?:\.[\w-]+)*)/;
                var prefix = items[i].email.match(rx);
                if (prefix !== null) {
                    items[i].emailPrefix = prefix[0];
                }
            }
        }
    });