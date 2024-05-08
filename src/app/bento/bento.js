/**
 * @ngdoc overview
 * @name bento
 *
 * @requires $routeProvider
 *
 * @description
 * # Default route pattern: <code>/#/bento/:search_term</code>
 * Bento box module provides BentoBox route and {@link bento.Bento Bento} service.
 *
 */
angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        /**
         * Register Bento Box display route with ngRoute's $routeProvider
         */
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            });
    }])

/**
 * @ngdoc service
 * @name bento.Bento
 *
 * @requires $q
 * @requires $rootScope
 * @requires $rootParams
 * @requires oneSearch.oneSearch
 * @requires mediaTypes.mediaTypes
 *
 * @description
 * This service uses the mediaTypes service to organize the engine results by media type
 * and preloaded an engine's template and controller (if defined) if there are results for that engine.
 */
    .service('Bento', ['$routeParams', '$rootScope','$q', 'oneSearch', 'mediaTypes', function($routeParams, $rootScope, $q, oneSearch, mediaTypes){
        //variable representing 'this' for closure context
        //this ensures function closure reference variables in the right context
        var self = this;

        /**
         * @ngdoc object
         * @name bento.Bento#boxes
         * @propertyOf bento.Bento
         *
         * @property {string} name Name of the Media Type
         * @property {string} name.engines[] Array of engine objects registered for this mediaType
         * @property {Object} name.results Object of where the properties are engine names and the values are the search results
         *
         * @description
         * the `boxes` object holds all box data
         *
         * Object Structure:
         *
         * - `TYPE_NAME` - `{string}` - Name of the Media Type
         *      - `engines` - `{Array.<string>}` - Array of engine objects registered for this mediaType
         *      - `results` - `{Object}` - Object of where the properties are engine names and the values are the search results
         *
         * @example
         *  <pre>
         *      {
         *          books: {
         *              engines: ['scout','catalog'],
         *              results: {
         *                  scout: {},
         *                  catalog: {}
         *              }
         *      }
         *  </pre>
         **/
        this.boxes = {};

        /**
         * @ngdoc object
         * @name bento.Bento#engines
         * @propertyOf bento.Bento
         *
         * @description
         * Object to hold pre-loaded engine templates and controllers.
         * Templates and controllers are only pre-loaded if the engine yields results.
         *
         * Object Structure:
         *
         * - `TYPE_NAME` - `{string}` - Engine name, defined by engine's config registered through {@link oneSearch.oneSearchProvider#engine}
         *      - `tpl` - `{Promise}` - Promise to retrieve the engine's template.
         *      - `contorller` - `{function()|null}` - An instance of the engine's controller or "null" if no controller was defined
         *
         * @example object structure
         * <pre>
         * {
         *  scout: {
         *      tpl: oneSearch.getEngineTemplate(engine),
         *      controller: oneSearch.getEngineController(engine)
         *  }
         * }
         * </pre>
         * For more details see {@link oneSearch.oneSearch#getEngineTemplate oneSearch.getEngineTemplate()} and {@link oneSearch.oneSearch#getEngineController oneSearch.getEngineController()}
         */
        this.engines = {};

        // Helper function that removes an engine's name from a box's "engines" Array
        // Once the "engines" Array is empty, the box is considered "loaded"
        function loadProgress(type, engine){
            var i = self.boxes[type].engines.indexOf(engine);
            if(i != -1) {
                setResultLimit(type);
                self.boxes[type].engines.splice(i, 1);
            }
        }

        // Remove an engine from all boxes
        function removeFromBoxes(engine){
            angular.forEach(self.boxes, function(box, type){

                loadProgress(type, engine);
            });
        }

        function initResultLimit(box){
            var numEngines = self.boxes[box].engines.length;
            var limit = numEngines > 1 ? 1 : (numEngines < 2 ? 3 : 2);
            self.boxes[box].resultLimit = limit;
        }

        function setResultLimit(box){

            $q.when(self.boxes[box].results)
                .then(function(results){

                    var numResults = Object.keys(results).length;
                    var numEngines = self.boxes[box].engines.length;
                    var expecting = numResults + numEngines;

                    //console.log('box ' + box + ' number of results ' + numResults + ' number of engines' + numEngines +  'expecting ' + expecting);
                    if ((box == 'articles') || (box == 'databases')){
                        self.boxes[box].resultLimit = 6;
                    }

                    else if (box == 'journals'){
                        if (expecting < 2 && self.boxes[box].resultLimit == 3){
                            self.boxes[box].resultLimit = 6;
                        }
                        else {
                            self.boxes[box].resultLimit = 3;
                        }
                    }
                    else if (box == 'books') {
                        if (expecting < 3 && self.boxes[box].resultLimit == 2){

                            self.boxes[box].resultLimit = 3;
                        }
                        else if (expecting < 2 && self.boxes[box].resultLimit == 3){
                            self.boxes[box].resultLimit = 6;
                        }
                        else {
                            self.boxes[box].resultLimit = 2;
                        }
                    }

                    if ((expecting < 2 && self.boxes[box].resultLimit < 3) || (expecting < 3 && self.boxes[box].resultLimit < 2)){
                        self.boxes[box].resultLimit++;
                    }
                });
        }

        var engines;

        /**
        * @ngdoc function
        * @name bento.Bento#getBoxes
        * @methodOf bento.Bento
        *
        * @description
        * Get all boxes, searching engine engine registered with each box.
        */
        this.getBoxes = function(){
            // Search all engines registered with the oneSearch Provider, giving the
            // $routeParams object as the parameter (https://code.angularjs.org/1.3.0/docs/api/ngRoute/service/$routeParams)
            engines = oneSearch.searchAll($routeParams);

            // Deep copy media types defined by registered engines to the this.boxes object.
            /**
             * @lends bento.Bento#boxes
             */
            angular.copy(mediaTypes.types, self.boxes);

            // Pre-define the "results" object for each media type - I only do this here so I don't have to check if it's defined later
            angular.forEach(self.boxes, function(box, type){
                initResultLimit(type);
                self.boxes[type].results = {};
                self.boxes[type].resourceLinks = {};
                self.boxes[type].resourceLinkParams = {};

            });

            //  Iterate over the Promises for each engine returned by the oneSearch.searchAll() function
            angular.forEach(engines, function(engine, name){

                engine.response
                    .then(function(data){ // If $http call was a success

                        // User the engine's results getter to get the results object
                        // The results getter is defined by the JSON path defined by the
                        // "resultsPath" param in an engine's config
                        var res = engine.getResults(data);
                        var link = engine.getResourceLink(data);

                        // Double check that the data is defined, in case the search API returned a '200' status with empty results.
                        if (isEmpty(res)){
                            //console.log(self.boxes);
                            removeFromBoxes(name);
                            //console.log(self.boxes);
                        }
                        else {
                            res = res.map(function(item, i){
                                var newItem = item;
                                newItem.position = i;
                                return newItem;
                            });
                            //console.log(res);
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
                                    // and sort by generation position in the original results list
                                    self.boxes[type].results[name] = grouped[type].sort(function(a, b){
                                        if (a.position > b.position){
                                            return 1;
                                        }
                                        if (a.position < b.position){
                                            return -1;
                                        }
                                        return 0;
                                    });

                                    // set resource "more" link
                                    self.boxes[type].resourceLinks[name] = decodeURIComponent(link[engine.id]);

                                    // set resource link parameters by media type specified by the engine config
                                    if (engine.resourceLink && engine.resourceLink.params){
                                        self.boxes[type].resourceLinkParams[name] = engine.resourceLink.params;
                                    }
                                    else if (angular.isObject(engine.mediaTypes)){
                                        self.boxes[type].resourceLinkParams[name] = engine.mediaTypes.types[type];
                                    }
                                }
                                // update loading progress, setting engine as loaded for current box
                                loadProgress(type, name);
                            });

                            //preload the engine's template for easy access for directives
                            self.engines[name] = {};
                            self.engines[name].tpl = oneSearch.getEngineTemplate(engine);
                            self.engines[name].controller = oneSearch.getEngineController(engine);
                        }
                    }, function(msg){
                        // If error code return from $http, iterate through boxes object
                        // and remove any instance engine from a box's "engines" array
                        removeFromBoxes(name);
                    });
            });

        };
    }])

/**
 * BentoCtrl Controller - Bento Box route's Contorller
 *
 */
    .controller('BentoCtrl', ['$scope', 'Bento', function($scope, Bento){
        // When the route has changed/updated generate box results
        $scope.$on('$routeChangeSuccess', function(){
            Bento.getBoxes();
        });
    }])

/**
     * bentoBox Directive
     *
     * Each bento box is called using this directive, and is defined by a name. These names are first defined in an
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

    /**
     * @ngdoc directive
     * @name bento.directive:bento-box
     *
     * @requires $rootScope
     * @requires $controller
     * @requires $compile
     * @requires $animate
     * @requires $timeout
     * @requires Bento
     * @requires oneSearch
     *
     * @scope
     * @restrict A
     *
     * @description
     * Define Bento Boxes to render specific media types
     *
     * @param {string} bento-box The name of the mediaType or engine the bento box represents. The mediaType name is defined
     */

    .directive('bentoBox', ['$rootScope', '$controller', '$compile', '$animate', '$timeout', 'Bento', 'oneSearch', function($rootScope, $controller, $compile, $animate, $timeout, Bento, oneSearch){
        return {
            restrict: 'A', //The directive always requires and attribute, so disallow class use to avoid conflict
            scope: {},
            link: function(scope, elm, attrs, Ctrl){
                //Get the box name from the elements bentoBox attribute
                var box = attrs.bentoBox;
                elm.addClass(box);
                elm.parent().attr('id', box + '-parent');

                scope.bento= Bento;

                //Preload the spinner element
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

                //Preload the location of the boxe's title element (needs to be more dynamic in the future)
                var titleElm = elm.find('h2');
                titleElm.attr('id', box);

                // Preserve boxTitle text before any loading/waiting messages are inserted.
                var boxTitle = titleElm.text();

                //Enter the spinner animation, appending it to the title element
                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                var engineTimeout;
                var waitingMessage = angular.element(' <span class="unresponsive-msg">Awaiting results from provider</span>');

                function checkEngineStatus(){
                    var engines = angular.copy(Bento.boxes[box].engines);
                    var en = [];
                    for (var e in oneSearch.engines){
                        if (engines.indexOf(e) > -1){
                            if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                                en.push(e);
                            }

                        }
                    }
                    if (engineTimeout && !spinner.hasClass('unresponsive')){
                        spinner.addClass('unresponsive');

                        $animate.enter(waitingMessage, spinner, angular.element(spinner[0].lastChild));
                    }

                    if (en.length){
                        engineTimeout = $timeout(checkEngineStatus, 500);
                    }

                }

                $timeout(checkEngineStatus, 2000);

                //Watch the boxes "engines" Array
                var boxWatcher = scope.$watchCollection(
                    function(){
                        return Bento.boxes[box].engines;
                    },
                    function(newVal, oldVal) {
                        // Has the "engines" Array changed?
                        if (newVal !== oldVal){
                            //console.log(box);
                            //console.log(newVal);
                            //console.log(oldVal);
                            //console.log('----------------------------');

                            //variable for engine removed from array
                            var engine = '';

                            //intersect current and previous "engines" arrays to get the
                            //engine that is done loading (i.e., the engine name removed from the array)
                            //TODO: find more graceful way to know what engine is loaded?
                            for (var i = 0, len = oldVal.length; i < len; i++){
                                var eng = oldVal[i];
                                if (newVal.indexOf(eng) < 0){
                                    engine = eng;
                                    break;
                                }
                            }

                            // Create a new scope for the engine's results
                            // See $rootScope docs: https://code.angularjs.org/1.3.0/docs/api/ng/type/$rootScope.Scope#$new
                            var engineScope = $rootScope.$new();

                            // Place engine results for the current box under an "items" object in the new local scope
                            engineScope.items = Bento.boxes[box].results[engine];


                            if (engineScope.items && engineScope.items.length > 0){
                                // Set isCollapsed boolean to true
                                // For engines that have collapsible results (see /common/engines/ejournals/ejournals.tpl.html for example)
                                engineScope.isCollapsed = true;

                                ///engineScope.limit = Bento.boxes[box].resultLimit;
                                engineScope.engine = engine;

                                // engineName used for "more" links. If 'title' property is not set in the engine's config, then use the string used when registering with the oneSearchProvider
                                engineScope.engineName = oneSearch.engines[engine].title ? oneSearch.engines[engine].title : engine.charAt(0).toUpperCase() + engine.slice(1);
                                engineScope.resourceLink = Bento.boxes[box].resourceLinks[engine] === "undefined" ? false : Bento.boxes[box].resourceLinks[engine];
                                engineScope.resourceLinkParams = Bento.boxes[box].resourceLinkParams[engine];

                                if (oneSearch.engines[engine].resourceLink && oneSearch.engines[engine].resourceLink.params){
                                    engineScope.resourceLinkParams = oneSearch.engines[engine].resourceLink.params;
                                }

                                engineScope.boxName = boxTitle;
                                engineScope.mediaType = box;
                                // When the engine's promise is ready, then load the engine's controller/template data applying
                                // the new isolated scope.
                                Bento.engines[engine].tpl.then(function(data){

                                    var EngCtrl = ['$scope', '$element', 'Bento', function($scope, $element, Bento){
                                        // Extend any controller defined by an engine's config
                                        if (Bento.engines[$scope.engine].controller){
                                            angular.extend(this, $controller(Bento.engines[$scope.engine].controller, {$scope: $scope}));
                                        }
                                        var gaBox = $scope.boxName.toLowerCase().trim().replace(/\s+/g, '_').replace(/[']+/g, '');
                                        $scope.box = Bento.boxes[box];

                                        $scope.gaPush = function(){
                                            ga('send', 'event', 'oneSearch', 'item_click', gaBox);
                                        };
                                        $scope.gaMore = function(){
                                            ga('send', 'event', 'oneSearch', 'more_click', 'more_' + gaBox);
                                        };
                                        $scope.gaResearchRequest = function(name){
                                            ga('send', 'event', 'oneSearch', 'research_request', name);
                                        }

                                    }];

                                    var controller = $controller(EngCtrl, {$scope: engineScope, $element: elm});
                                    elm.data('$ngControllerController', controller);
                                    elm.children().data('$ngControllerController', controller);

                                    // Wrap the template in an element that specifies ng-repeat over the "items" object (i.e., the results),
                                    // gives the generic classes for items in a bento box.
                                    var template = angular.element('<div class="animate-repeat bento-box-item" ng-repeat="item in items | limitTo: box.resultLimit">'+data+'</div>');

                                    // Compile wrapped template with the isolated scope's context
                                    var html = $compile(template)(engineScope);

                                    // Append compiled HTML to box element
                                    elm.append(html);
                                });
                            }
                            else {
                                $rootScope.$broadcast('NoResultsForEngine', {engine: engine, box: box});
                            }
                            //if (box == "recommend") console.log(newVal.length);
                            // If new array is empty, the box is considered "loaded"
                            if (newVal.length === 0){
                                done(box);
                            }
                        }
                    },
                    true
                );

                // Loaded and cleanup function
                function done(b){
                    //console.log({b: b, box: box});
                    // If there are no results, print generated message
                    if (isEmpty(Bento.boxes[b].results)){

                        if (attrs.hideIfEmpty){
                            elm.addClass('hidden');
                        }
                        else{
                            if (b == "articles"){
                                elm.append("<strong>Your search term may be too broad, please try a more specific term</strong>");
                            } else {
                                elm.append("<strong>No Results</strong>");
                            }
                            elm.addClass('text-muted');
                        }
                    }

                    // Tell spinner to exit animation
                    $animate.leave(spinner);

                    //$timeout.cancel(engineTimeout);

                    // Destroy this box's watcher (no need to waste the cycles)
                    boxWatcher();
                }
            }
        };
    }]);

