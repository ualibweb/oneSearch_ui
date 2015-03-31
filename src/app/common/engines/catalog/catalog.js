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
            templateUrl: 'common/engines/catalog/catalog.tpl.html',
            controller: function($scope, $filter){
                var types = {
                    bc: "Archive/Manuscript",
                    cm: "Music Score",
                    em: "Map",
                    im: "Nonmusical Recording",
                    jm: "Musical Recording",
                    mm: "Computer File/Software",
                    om: "Kit",
                    pc: "Mixed Material/Collection",
                    pm: "Mixed Material",
                    rm: "Visual Material"
                };
                var items = $scope.items;

                for (var i = 0; i < items.length; i++){
                    var t = items[i]['bibFormat'];
                    items[i].mediaType = types[t];

                    //Check for authors field. If not there, check the title for author names.
                    if (!items[i].author){
                        var split = $filter('catalogSplitTitleAuthor')(items[i].title);
                        console.log(split);
                        if (angular.isArray(split)){
                            items[i].title = split[0];
                            items[i].author = split[2];
                        }
                    }
                }

                $scope.items = items;
            }
        })
    }])

    .filter('catalogSplitTitleAuthor', [function(){
        return function(title){
            if (title.indexOf('/') > -1){
                var titleParts = title.split(/\s\/\sedited\sby\s([^.+]+)\./);
                title = titleParts
            }
            return title;
        }
    }]);