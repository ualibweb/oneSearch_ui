/**
 * @ngdoc overview
 * @name mediaTypes
 */
angular.module('common.mediaTypes', [])

    /**
     * @ngdoc service
     * @name mediaTypes.mediaTypesProvider
     *
     * @description
     * Allows engines to organize their results into different `media types`. This is done via the engine's config object passed to the {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} method.
     */

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
        /**
         * @ngdoc method
         * @name mediaTypes.mediaTypesProvider#type
         * @methodOf mediaTypes.mediaTypesProvider
         *
         * @param {string} type The `type` of media to look in an engine's search results
         * @param {object} engine The engine object
         *
         * @description
         * This method allows the {@link oneSearch.oneSearchProvider oneSearchProvider} to register engines with the media types, if specified in the {@link oneSearch.oneSearchProvider#methods_engine engine object}
         */
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

        };

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
            });
            return groups;
        }

        /**
         * @ngdoc service
         * @name mediaTypes.mediaTypes
         *
         * @requires $parse
         */

        this.$get = ['$parse', function($parse){
            return {
                /**
                 * @ngdoc object
                 * @name mediaTypes.mediaTypes#types
                 * @propertyOf mediaTypes.mediaTypes
                 *
                 * @description
                 * The `types` object contains results from engines organized by media type.
                 */
                types: _types,

                // Heavily influenced by angular-filter's group-by function:
                // https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/group-by.js
                /**
                 * @ngdoc method
                 * @name mediaTypes.mediaTypes#groupBy
                 * @methodOf mediaTypes.mediaTypes
                 *
                 * @param {object} collection The `collection` object containing an engine's search results
                 * @param {string|object} media The`mediaTypes` object defined in and engine's config. If no `mediaTypes` were defined, then the name of the engine is used
                 * @returns {object} Returns an object organizing the results by `mediaType`
                 *
                 */
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
    }]);