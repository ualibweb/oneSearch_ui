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
                    //journals: 'serialPeriodical',
                    articles: 'academicJournal',
                    media: ['audio', 'videoRecording']
                }
            },
            templateUrl: 'common/engines/scout/scout.tpl.html',
            controller: function($scope){
                var items = $scope.items;
                for (var i = 0; i < items.length; i++){
                    if (items[i].Header.PubTypeId == 'audio'){
                        items[i].mediaType = 'Audio';
                    }
                    if (items[i].Header.PubTypeId == 'videoRecording'){
                        items[i].mediaType = 'Video Recording';
                    }

                    //Search for "source"

                    for (var x = 0; x < items[i].Items.length; x++){
                        if (items[i].Items[x].Group == 'Src'){
                            //console.log(items[i].Items[x].Group);
                            items[i].source = items[i].Items[x].Data;
                        }
                    }
                }
                $scope.items = items;
            }
        })
    }])