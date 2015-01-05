angular.module('common.engines', [
    'engines.acumen',
    'engines.catalog',
    'engines.databases',
    'engines.ejournals',
    'engines.scout',
    'engines.googleCS',
    'engines.recommend'
])

    .service('enginesTemplateFactory', ['$http', '$templateCache', function($http, $templateCache){

        this.get = function(config){
            return angular.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl) : null;
        };

        // So far only templateUrl is supported - worked with both file and cached templates.
        // adopted from https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js
        this.fromUrl = function(url){
            if (url == null) return null;
            else return $http
                .get(url, {cache: $templateCache, headers: { Accept: 'text/html' }})
                .then(function(response){ return response.data});
        };

    }])