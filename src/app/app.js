angular.module('oneSearch', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'angular.filter',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])

    .constant('JSON_URL', 'https://wwwdev.lib.ua.edu/oneSearch/getJSON.php')

    .value('SearchParams', {
        pp: 100
    });