angular.module('engines.scout', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('scout', {
            id: 1,
            priority: 4,
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
                    var bibRelationships = [];
                    if (bibRelationships = items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships){
                        for (var x = 0, len = bibRelationships.length; x < len; x++){
                            if (angular.isDefined(bibRelationships[x].BibEntity.Identifiers) && bibRelationships[x].BibEntity.Identifiers[0].Type === 'issn-print'){
                                // define source title
                                items[i].source = bibRelationships[x].BibEntity.Titles[0].TitleFull;

                                // Append source volume, issue, etc.
                                if (angular.isDefined(bibRelationships[x].BibEntity.Numbering)){
                                    for (var y = 0, l = bibRelationships[x].BibEntity.Numbering.length; y < l; y++){
                                        items[i].source += ' ' + bibRelationships[x].BibEntity.Numbering[y].Type.substring(0,3) + '.' + bibRelationships[x].BibEntity.Numbering[y].Value;
                                    }
                                }
                            }
                        }
                    }


                    if (angular.isDefined(items[i].Items)){
                        for (var x = 0; x < items[i].Items.length; x++){
                            if (items[i].Items[x].Group == 'Src'){
                                //console.log(items[i].Items[x].Group);
                                items[i].source = items[i].Items[x].Data;
                            }
                        }
                    }
                }
                $scope.items = items;

            }
        })
    }])