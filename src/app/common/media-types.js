/*angular.module('common.mediaTypes', [])



    .factory('MediaTypes', ['$parse', function($parse){
        var types = {
            other: {
                engines: [],
                loaded: false
            }
        };

        // Register a media type and associate it with a given engine
        // These are only the anticipated media types - registered engines have no results
        // associated with a type, the type will be removed for that search.
        this.type = function(type, engine){
            if (!types[type]){
                types[type] = {
                    engines: [],
                    loaded: false
                };
            }
            types[type].engines.push(engine);
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
                v = invertArrayToObject(v);
                angular.extend(groups, v);
            })
            return groups;
        }

        return {
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

        *function groupMediaTypes(results, engine){
            var grouped = {};
            var prop;
            if (angular.isObject(engine)){
                var getter = $parse(engine.mediaTypesPath);
                var groups = {};

                angular.forEach(engine.mediaTypes, function(val, type){
                    if (angular.isArray(val)){
                        for (var i= 0, len = val.length; i < len; i++){
                            groups[val[i]] = type;
                        }
                    }
                    else{
                        groups[val] = type;
                    }
                })

                angular.forEach(results, function(item){
                    prop = getter(item);
                    var g = groups[prop];
                    if (!grouped[g]){
                        grouped[g] = [];
                    }
                    grouped[g].push(item);
                })
            }
            else{
                grouped[engine] = results;
            }
            return grouped;
        }*
    }])*/