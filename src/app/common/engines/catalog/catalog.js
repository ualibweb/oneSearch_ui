angular.module('engines.catalog', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('catalog', {
            id: 64,
            priority: 5,
            resultsPath: 'Catalog.list',
            totalsPath: 'Catalog.total',
            mediaTypes: {
                path: 'bibFormat',
                types: {
                    books: ['aa','ac', 'ad', 'am'],
                    journals: ['ab','as','bb','bs','cb','cs','db','ds','eb','es','fb','fs','gb','gs','ib','is','jb','js','kb','ks','mb','ms','ob','os','pb','ps','rb','rs','tb','ts'],
                    media: ['ga','gc','gd','gm','ia','ic','id','im','ja','jc','jd','jm']
                }
            },
            templateUrl: 'common/engines/catalog/catalog.tpl.html',
            controller: 'CatalogCtrl'
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
    }])

    .controller('CatalogCtrl', function($scope, $filter){
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
                if (angular.isArray(split)){
                    items[i].title = split[0];
                    items[i].author = split[2];
                }
            }
        }

        if (angular.isArray($scope.resourceLinkParams)){
            var typeParam = '&type=';
            var params = typeParam + $scope.resourceLinkParams.join(typeParam);
            $scope.resourceLink += params;
        }

        $scope.items = items;
    });
