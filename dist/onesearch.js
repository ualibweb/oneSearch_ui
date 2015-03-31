/**
 * Central oneSearch module that defined all components and dependencies involved
 * for the oneSearch interface.
 *
 * All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are prepended with "oneSearch.*", and modules loaded in "oneSearch.common" are prepended with "common.*", and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts.
 */
angular.module('oneSearch', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'angular.filter',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the backend JSON resource handler
    .constant('JSON_URL', 'https://wwwdev2.lib.ua.edu/oneSearch/getJSON.php')

    // Default search parameters
    .value('SearchParams', {
        pp: 100
    })
angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        /**
         * Register Bento Box display route with ngRoute's $routeProvider
         */
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            })
    }])

/**
 * Bento Service Provider
 *
 * This service uses the mediaTypes service to organize the engine results by media type
 * and preloaded an engine's template and controller (if defined) if there are results for that engine.
 */
    .service('Bento', ['$routeParams', '$filter', 'oneSearch', 'mediaTypes', function($routeParams, $filter, oneSearch, mediaTypes){
        //variable representing 'this' for closure context
        //this ensures function closure reference variables in the right context
        var self = this;

        /**
         * Object to hold box data
         * @Object = {
         *      // Box names are generated by media types defined by registered engines
         *      NAME: {
         *          // An Array of engine names (String) used to get engine templates/controllers and track when the box is done loading.
         *          // Once an engine is finished loading, the engine's name is removed from this array. The removed value is used to reference the loaded engine's preloaded
         *          // template/controller. Once this Array is empty the "box" is considered loaded.
         *          engines: Array,
         *
         *          // The object's keys are the engine names and the values are the results returned using
         *          // the JSON path from an engine's resultsPath param
         *          results: {
         *              ENGINE_NAME1: {},
         *              ENGINE_NAME2: {},
         *              etc...
         *          }
         *      }
         *  }
         */
        this.boxes = {};

        /**
         * Object to hold pre-loaded engine templates and controllers.
         * Templates and controllers are only pre-loaded if the engine yields results.
         * @Object = {
         *      // Engine name, defined by engine's config registering with the oneSearchProvider
         *      NAME: {
         *          // the "tpl" key returns a Promise to retrieve the engine's template
         *          // The Promise is generated from Angular's $http Service (https://code.angularjs.org/1.3.0/docs/api/ng/service/$http),
         *          // which uses the promise methods from Angular's $q Service (https://code.angularjs.org/1.3.0/docs/api/ng/service/$q)
         *          tpl: Promise,
         *
         *          // The "controller" key will return an instance of the engine's controller or "null" if no controller was defined
         *          controller: Controller Instance|null
         *      }
         * }
         */
        this.engines = {};

        // Helper function that removes an engine's name from a box's "engines" Array
        // Once the "engines" Array is empty, the box is considered "loaded"
        function loadProgress(type, engine){
            var i = self.boxes[type].engines.indexOf(engine);
            if(i != -1) {
                self.boxes[type].engines.splice(i, 1);
            }
        }

        // Remove an engine from all boxes
        function removeFromBoxes(engine){
            angular.forEach(self.boxes, function(box, type){
                loadProgress(type, engine);
            })
        }

        // Gets all boxes
        this.getBoxes = function(){
            // Search all engines registered with the oneSearch Provider, giving the
            // $routeParams object as the parameter (https://code.angularjs.org/1.3.0/docs/api/ngRoute/service/$routeParams)
            var engines = oneSearch.searchAll($routeParams);

            // Deep copy media types defined by registered engines to the this.boxes object.
            angular.copy(mediaTypes.types, self.boxes);

            // Pre-define the "results" object for each media type
            // I only do this here so I don't have to check if it's defined later
            angular.forEach(self.boxes, function(box, type){
                self.boxes[type].results = {};
            });

            //  Iterate over the Promises for each engine returned by the oneSearch.searchAll() function
            angular.forEach(engines, function(engine, name){
                engine.response
                    .success(function(data){ // If $http call was a success

                        // User the engine's results getter to get the results object
                        // The results getter is defined by the JSON path defined by the
                        // "resultsPath" param in an engine's config
                        var res = engine.getResults(data);

                        // Double check that the data is defined, in case the search API returned a '200' status with empty results.
                        if (isEmpty(res)){
                            console.log(self.boxes);
                            removeFromBoxes(name);
                            console.log(self.boxes);
                        }
                        else {
                            // Group the results by defined media types
                            var grouped = mediaTypes.groupBy(res, engine.mediaTypes);

                            // Iterate over the boxes.
                            Object.keys(self.boxes).forEach(function(type){
                                // If a box type matches a group in the grouped results
                                if (grouped.hasOwnProperty(type)){
                                    // Put results in the boxes "results" object, referenced by the engine's name
                                    // Ex: self.boxes['books'].results['catalog'] = group_result;
                                    //
                                    // Also, limit the number of results per group by 3
                                    // TODO: Re-investigate dynamic limiting based on number of engines per box. Solution must not break async loading of engine results
                                    self.boxes[type].results[name] = $filter('limitTo')(grouped[type], 3);
                                }
                                // update loading progress, setting engine as loaded for current box
                                loadProgress(type, name);
                            });

                            //preload the engine's template for easy access for directives
                            self.engines[name] = {}
                            self.engines[name].tpl = oneSearch.getEngineTemplate(engine);
                            self.engines[name].controller = oneSearch.getEngineController(engine);
                        }
                    })
                    .error(function(msg){
                        // If error code return from $http, iterate through boxes object
                        // and remove any instance engine from a box's "engines" array
                        removeFromBoxes(name);
                    });
            });

        }

    }])

/**
 * BentoCtrl Controller - Bento Box route's Contorller
 *
 */
    .controller('BentoCtrl', ['$scope', 'Bento', function($scope, Bento){
        // When the route has changed/updated generate box results
        $scope.$on('$routeChangeSuccess', function(){
            Bento.getBoxes();
        })
    }])

/**
 * bentoBox Directive
 *
 * Each box is called using this directive, and is defined by a name. These names are first defined in an
 * engine's config while registering with the oneSearch Provider.
 *
 * Engine results, appropriate for each box, will be asynchronously appended to the HTML element with the following attribute:
 *      bento-box="BOX_NAME"
 *
 * HTML Example:
 *  <!-- Box names must match those defined by an engine's config -->
 *  <div bento-box="BOX_NAME">
 *      <h2>Box Title</h2>
 *  </div>
 */

    .directive('bentoBox', ['$rootScope', '$controller', '$compile', '$animate', 'Bento', function($rootScope, $controller, $compile, $animate, Bento){
        return {
            restrict: 'A', //The directive always requires and attribute, so disallow class use to avoid conflict
            link: function(scope, elm, attrs){
                //Get the box name from the elements bentoBox attribute
                var box = attrs.bentoBox;

                //Preload the spinner element
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

                //Preload the location of the boxe's title element (needs to be more dynamic in the future)
                var titleElm = elm.find('h2');

                //Enter the spinner animation, appending it to the title element
                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                //Watch the boxes "engines" Array
                var boxWatcher = scope.$watch(
                    function(){
                        return Bento.boxes[box]['engines'];
                    },
                    function(newVal, oldVal) {
                        // Has the "engines" Array changed?
                        if (newVal !== oldVal){
                            //variable for engine removed from array
                            var engine = '';

                            //intersect current and previous "engines" arrays to get the
                            //engine that is done loading (i.e., the engine name removed from the array)
                            //TODO: find more graceful way to know what engine is loaded?
                            for (var i = 0, len = oldVal.length; i < len; i++){
                                var eng = oldVal[i];
                                if (!(newVal.indexOf(eng) > -1)){
                                    engine = eng;
                                    break;
                                }
                            }

                            // Create a new isolated scope for the engine's results
                            // See $rootScope docs: https://code.angularjs.org/1.3.0/docs/api/ng/type/$rootScope.Scope#$new
                            // It's important to note this is an "isolated" scope (see: https://code.angularjs.org/1.3.0/docs/guide/directive#isolating-the-scope-of-a-directive)
                            var engineScope = $rootScope.$new(true);

                            // Place engine results for the current box under an "items" object in the new local scope
                            engineScope.items = Bento.boxes[box]['results'][engine];

                            if (engineScope.items && engineScope.items.length > 0){
                                // Set isCollapsed boolean to true
                                // For engines that have collapsible results (see /common/engines/ejournals/ejournals.tpl.html for example)
                                engineScope.isCollapsed = true;

                                // When the engine's promise is ready, then load the engine's contorller/template data applying
                                // the new isolated scope.
                                Bento.engines[engine].tpl.then(function(data){
                                    // manually inject controller if one is defined by the engine's config
                                    if (Bento.engines[engine].controller){
                                        var controller = $controller(Bento.engines[engine].controller, {$scope: engineScope});

                                        elm.data('$ngControllerController', controller);
                                        elm.children().data('$ngControllerController', controller);
                                    }
                                    // Wrap the template in an element that specifies ng-repeat over the "items" object (i.e., the results),
                                    // gives the generic classes for items in a bento box.
                                    var template = angular.element('<div class="animate-repeat bento-box-item" ng-repeat="item in items">'+data+'</div>');

                                    // Compile wrapped template with the isolated scope's context
                                    var html = $compile(template)(engineScope);

                                    // Append compiled HTML to box element
                                    elm.append(html);
                                });
                            }
                            //if (box == "recommend") console.log(newVal.length);
                            // If new array is empty, the box is considered "loaded"
                            if (newVal.length == 0){
                                done(box);
                            }
                        }
                    },
                    true
                );

                // Loaded and cleanup function
                function done(b){
                    console.log({b: b, box: box});
                    // If there are no results, print generated message
                    if (isEmpty(Bento.boxes[b]['results'])){

                        if (attrs.hideIfEmpty){
                            elm.addClass('hidden');
                        }
                        else{
                            elm.append("<strong>No Results</strong>");
                            elm.addClass('text-muted');
                        }
                    }

                    // Tell spinner to exit animation
                    $animate.leave(spinner);

                    // Destroy this box's watcher (no need to waste the cycles)
                    boxWatcher();
                }
            }
        }
    }])
/**
 * Central registration module for all common components.
 * "Common" components are modules that can be used by any view or front-end controller,
 * allowing them to be globally accessible to all aspects of the application.
 *
 */
angular.module('oneSearch.common', [
    'common.mediaTypes',
    'common.oneSearch',
    'common.engines'
])
    .factory('dataFactory', function($http) {
        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data; // success callback returns this
                });
            }
        };
    })
    .directive('suggestOneSearch', function($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                prompt: '@',
                model: '=',
                search: '='
            },
            controller: function($scope, $window, $timeout, dataFactory){
                $scope.items = {};
                $scope.filteredItems = [];
                $scope.model = "";
                $scope.current = -1;
                $scope.originalValue = $scope.model;
                $scope.dataRequested = false;
                $scope.numShow = 5;

                // hides the list initially
                $scope.selected = true;

                $scope.onChange = function(){
                    var lastSpace = $scope.model.lastIndexOf(" ");
                    $scope.selected = false;

                    if ($scope.model.length - lastSpace <= 3 || $scope.model.indexOf($scope.originalValue) < 0){
                        $scope.items = {};
                        $scope.setCurrent(-1, false);
                        $scope.dataRequested = false;
                    }
                    if ($scope.model.length - lastSpace > 3 && !$scope.dataRequested){
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + $scope.model)
                            .then(function(data) {
                                $scope.items.suggest = data;
                                $scope.setCurrent(-1, false);
                            });
                        $scope.dataRequested = true;
                    }
                    if ($scope.model.length > 2){
                        $timeout(function() {
                            dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/' + $scope.model)
                                .then(function(data) {
                                    $scope.items.recommend = data;
                                });
                            dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + $scope.model + '/match/startwith')
                                .then(function(data) {
                                    $scope.items.subjects = data;
                                });
                            dataFactory.get('//www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=003453353330912650815:lfyr_-azrxe&q=' +
                                $scope.model + '&siteSearch=ask.lib.ua.edu')
                                .then(function(data) {
                                    $scope.items.faq = data;
                                });
                        }, 200);
                    }
                    $scope.originalValue = $scope.model;
                };
                $scope.go = function ( path ) {
                    $scope.model = "";
                    $scope.originalValue = $scope.model;
                    $window.location.href = path;
                };
                $scope.setCurrent = function(index, forceModel) {
                    $scope.current = index;
                    if (typeof $scope.items.suggest != 'undefined')
                        for (var i = 0; i < $scope.items.suggest.length; i++)
                            $scope.items.suggest[i].class = '';
                    if (index >= 0)
                        if ($scope.filteredItems.length > 0){
                            if (index > $scope.filteredItems.length - 1)
                                index = $scope.filteredItems.length - 1;
                            if (forceModel)
                                $scope.model = $scope.filteredItems[index].search;
                            $scope.filteredItems[index].class = 'active';
                            $scope.current = index;
                        }
                };
                $scope.onFocus = function(){
                    if ($scope.model.length > 2){
                        $scope.selected = false;
                    }
                };
                $scope.onBlur = function($event){
                    $scope.selected = true;
                };
                $scope.compare = function(query){
                    return function(item){
                        if (item.search.indexOf(query) == 0 &&
                            !angular.equals(item.search.toLowerCase(), query.toLowerCase()))
                            return true;
                        return false;
                    };
                };
            },
            link: function(scope, elem, attrs) {
                elem.bind("keydown", function (event) {
                    switch(event.keyCode){
                        //ArrowUp
                        case 38:
                            if (scope.current > 0){
                                scope.setCurrent(scope.current - 1, true);
                                event.preventDefault();
                            } else {
                                scope.setCurrent(-1, false);
                                scope.model = scope.originalValue;
                                event.preventDefault();
                            }
                            break;

                        //ArrowDown
                        case 40:
                            if (scope.model.length > 2 && scope.current < scope.numShow - 1)
                                if (scope.current < scope.items.suggest.length - 1){
                                    scope.setCurrent(scope.current + 1, true);
                                    event.preventDefault();
                                }
                            break;

                        //Enter
                        case 13:
                            scope.selected = true;
                            break;

                        default:
                            break;
                    }
                    scope.$apply();
                });
                scope.handleSelection = function(selectedItem) {
                    $timeout(function() {
                        scope.model = selectedItem;
                        scope.selected = true;
                        scope.$apply();
                        scope.search();
                    }, 0);
                };
            },
            templateUrl: 'common/directives/suggest/suggest.tpl.html'
        };
    })

angular.module('engines.acumen', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('acumen', {
            id: 8,
            resultsPath: 'Acumen.data',
            totalsPath: 'Acumen.metadata.numFound',
            templateUrl: 'common/engines/acumen/acumen.tpl.html'
        })
    }])
angular.module('engines.catalog', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('catalog', {
            id: 64,
            resultsPath: 'Catalog.list',
            totalsPath: 'Catalog.total',
            mediaTypes: {
                path: 'bibFormat',
                types: {
                    books: 'am',
                    journals: 'as',
                    articles: 'tm',
                    media: ['jm', 'gm']
                }
            },
            templateUrl: 'common/engines/catalog/catalog.tpl.html'
        })
    }])
angular.module('engines.databases', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            resultsPath: 'Databases.results',
            totalsPath: 'Databases.total',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        })
    }])
angular.module('engines.ejournals', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('ejournals', {
            id: 4,
            resultsPath: 'eJournals.results',
            totalsPath: 'eJournals.total',
            mediaTypes: {
                path: 'type',
                types: {
                    books: 'book',
                    journals: 'periodical'
                }
            },
            templateUrl: 'common/engines/ejournals/ejournals.tpl.html',
            controller: ['$scope', function($scope){
                for (var i = 0, len = $scope.items.length; i < len; i++){
                    $scope.items[i]['ctrltest'] = 'wut';
                }
            }]

        })
    }])
/**
 * @module common.engines
 *
 * Acts as central dependency manager for search engines.
 * All engines must be included here to appear in the results.
 *
 */
angular.module('common.engines', [
    'engines.acumen',
    'engines.catalog',
    'engines.databases',
    'engines.ejournals',
    'engines.scout',
    'engines.googleCS',
    'engines.recommend'
])
/**
 * @Service enginesTemplateFactory
 *
 * Used to load an engine's template, defined through params in the engine's config with the oneSearch Provider
 * Currently, only loading templates through URL and $templateCache is available.
 * TODO: Allow String templates and TemplateProviders to load engine templates.
 *
 *
 */
    .service('enginesTemplateFactory', ['$http', '$templateCache', function($http, $templateCache){

        // Generic getter to load template based on engine config
        // @param config An Engine's config Object
        this.get = function(config){
            // return template is "templateUrl" is defined. otherwise, return null
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
angular.module('engines.googleCS', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('googleCS', {
            id: 16,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.recommend', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])
angular.module('engines.scout', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('scout', {
            id: 1,
            resultsPath: 'Scout.SearchResult.Data.Records',
            totalsPath: 'Scout.SearchResult.Statistics.TotalHits',
            mediaTypes: {
                path: 'Header.PubTypeId',
                types: {
                    books: ['book', 'ebook'],
//                    journals: 'serialPeriodical',
                    articles: 'academicJournal',
                    media: ['audio', 'videoRecording']
                }
            },
            templateUrl: 'common/engines/scout/scout.tpl.html'
        })
    }])
function inArray(val, arr){
    return arr.indexOf(val) > -1;
}
/*
    Given an object with an array as it's value,
    this function will create a new object having the array
    keys as separate object keys and the old object keys as their value

    {
        field: ['value1', 'value2']
    }

    will result in

    {
        value1: 'field',
        value2: 'field'
    }
 */

var invertArrayToObject = function(obj){
    var inverted = {};

    Object.keys(obj).map(function(value, index){
        for (var i = 0, len = obj[value].length; i < len; i++){
            inverted[obj[value][i]] = value;
        }
    });
    return inverted;
}
// Adopted from http://stackoverflow.com/questions/4994201/is-object-empty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// adopted from https://github.com/a8m/angular-filter/blob/master/src/_common.js
function toArray(object) {
    return Array.isArray(object) ? object :
        Object.keys(object).map(function(key) {
            return object[key];
        });
}
angular.module('common.mediaTypes', [])

    .provider('mediaTypes', [function mediaTypesProvider(){
        // Private Object for registered types
        var _types = {
            other: {
                engines: [],
                loaded: false
            }
        };

        // Register a media type and associate it with a given engine
        // These are only the anticipated media types - registered engines have no results
        // associated with a type, the type will be removed for that search.
        this.type = function(type, engine){
            if (!_types[type]){
                _types[type] = {
                    engines: [],
                    loaded: false
                };
            }
            if (!(_types['other'].engines.indexOf(engine) > -1)){
                //Automatically assume the registered engine will contain 'other' media types
                _types['other'].engines.push(engine);
            }
            _types[type].engines.push(engine);

        }

        // Helper function
        // will return a new object to map results from an engines results
        // This helps drive the 'mediaTypes' property for engine configuration
        function buildGroups(types){
            var groups = {};

            angular.forEach(types, function(value, type){
                var v = {};
                switch (typeof value){
                    case 'string':
                    case 'number':
                        value = [value];
                        break;
                    case 'object':
                        value = toArray(value);
                        break;
                }
                v[type] = value;

                //function at: /common/helpers/invert-array-to-object.js
                // This was the best name I could think of so far for this type of operation.
                // If you can think of a better name, let me know!
                // Honestly, I had almost no clue what to call it...
                v = invertArrayToObject(v);
                angular.extend(groups, v);
            })
            return groups;
        }

        this.$get = ['$parse', function($parse){
            return {
                types: _types,

                // Heavily influenced by angular-filter's group-by function:
                // https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/group-by.js
                groupBy: function(collection, media){
                    var result = {};

                    if (angular.isObject(media)) {
                        var groups = buildGroups(media.types);
                        var getter = $parse(media.path);
                        var prop;
                        var g;

                        angular.forEach(collection, function(item){
                            prop = getter(item);
                            g = groups[prop];

                            //If not a registered media type, put into 'other' catch-all type
                            if (angular.isUndefined(g)){
                                if(!result['other']) {
                                    result['other'] = [];
                                }
                                result['other'].push(item);
                            }
                            else{
                                if (!result[g]){
                                    result[g] = [];
                                }
                                result[g].push(item);
                            }
                        });
                    }
                    else{
                        result[media] = collection;
                    }
                    return result;
                }
            }
        }];
    }])
/**
 * oneSearch Provider:
 *  This is the core of the oneSearch application.
 *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
 *  This allows resources/engines to be easily plug-able and templated independent of each other.
 *
 *  The oneSearch Provider expects engines to register in the config phase.
 *  Engines are registered using the Provider's engine(engine_name, params) function:
 *      engine_name: String - defines the identifier for the engine
 *      params: Object - defines details for querying the engine (see example below)
 *
 *  Example:
 *
 *  // Define the engine as an Angular module
 *  angular.module('engines.MY_ENGINES_NAME')
 *
 *  //Register the engine's configuration with the oneSearch Provider
 *  .config(['oneSearchProvider', function(oneSearchProvider){
 *      oneSearchProvider.engine('MY_ENGINE_NAME', {
 *          id: String|Integer, //The id given to the backend JSON response handler that identifies the engine
 *          resultsPath: String, // A string representing the Object path to the search results (e.g., "engine.path.to.results")
            totalsPath: String, // Optional - A string representing the Object path to the total number of results found
            mediaTypes: { // Optional - Requires mediaTypesProvider module - An Object that specify media type qualifiers within the engines results
                path: String // The base path in the results object for the media type qualifier
                types: {    // Object that specifies what media types there are and how to identify them
                    TYPE_LABEL: String|Array // TYPE_LABEL will be the type id and the String or Array of Strings will represent the value given from the 'path' specified above.
                }
            },
            templateUrl: String //a string representing that url path to the engine's template
            controller: Function|String //an injectable controller for the engine - can be a Function or String referring to an existing Controller
        });
    });
 *
 */
angular.module('common.oneSearch', [])

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        //private object that holds registered engines
        var _engines = {};


        //function to allow engines to register as searchable
        this.engine = function(name, engine){
            if (angular.isString(name)){
                var defaults = {
                    id: null, resultsPath: null, totalsPath: null, mediaTypes: null, templateUrl: null, controller: null
                };

                var e = angular.extend(defaults, engine);
                if (e.id){
                    if (e.mediaTypes){
                        Object.keys(e.mediaTypes.types).map(function(type){
                            mediaTypesProvider.type(type, name);
                        })
                    }
                    else{ //if no mediaTypes are defined, the engine is considered it's own media type
                        mediaTypesProvider.type(name, name);
                        e.mediaTypes = name;
                    }
                    e.name = name;
                    _engines[name] = e;
                }
            }
            else{
                console.log({Error: "oneSearch engine must have STRING defined name", engineParams: engine});
            }
        };

        this.$get = ['$http', '$parse', 'enginesTemplateFactory', 'SearchParams', 'JSON_URL', function($http, $parse, enginesTemplateFactory, SearchParams, url){

            return {
                engines: _engines, // Expose engines at Service level
                searchAll: function(params){
                    //extend give params with default SearchParams
                    angular.extend(params, SearchParams);

                    // Cycle through each registered engine, send the GET request, then return $http's promise by default.
                    // Returning the promise, instead of the JSON data, allows for async loading of results.
                    angular.forEach(_engines, function(engine, name){
                        //Create a local parameters variable 'p' and specify the engine id.
                        var p = {engine: engine.id};

                        //Extend local parameters by global params.
                        angular.extend(p, params);

                        // Store the $http response promise in the engine's object with key 'response
                        engine.response = $http({method: 'GET', url: url, params: p});

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.resultsPath)){
                            engine.getResults = $parse(engine.resultsPath);
                        }

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.totalsPath)){
                            engine.getTotal = $parse(engine.totalsPath);
                        }

                        // Put engine's object in private _engines object
                        _engines[name] = engine;
                    });

                    // Return all engines with response promises, and getter functions
                    return _engines;
                },
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                },
                getEngineController: function(engine){
                    return angular.isDefined(engine.controller) ? engine.controller : null;
                }

            }
        }]
    }])

    .controller('OneSearchCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
        $scope.searchText;
        $scope.search = function(){
            if ($scope.searchText){
                $location.path('/bento/'+$scope.searchText);
            }
        }

        $rootScope.$on('$routeChangeSuccess', function(event,currentRoute){
            var s = currentRoute.params.s;
            if ($scope.searchText !== s){
                $scope.searchText = s;
            }
        });
    }])