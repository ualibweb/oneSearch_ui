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
                    articles: 'academicJournal'
                }
            },
            templateUrl: 'common/engines/scout/scout.tpl.html',
            controller: 'ScoutCtrl'
        })
    }])

    .controller('ScoutCtrl', function($scope){
        var title; // Title variable to bind to $scope. ".BibRelationships.IsPartOfRelationships" title is used if no item title is present.
        var items = $scope.items;
        for (var i = 0; i < items.length; i++){
            if (items[i].Header.PubTypeId == 'audio'){
                items[i].mediaType = 'Audio';
            }
            if (items[i].Header.PubTypeId == 'videoRecording'){
                items[i].mediaType = 'Video Recording';
            }

            //Check if item has a title
            if (items[i].RecordInfo.BibRecord.BibEntity.Titles){
                title = items[i].RecordInfo.BibRecord.BibEntity.Titles[0].TitleFull;
            }

            //Search for "source"
            var bibRelationships = [];
            if (angular.isDefined(items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships)){

                bibRelationships = items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships;

                for (var x = 0, len = bibRelationships.length; x < len; x++){
                    if (angular.isUndefined(title)){
                        if (bibRelationships[x].BibEntity && bibRelationships[x].BibEntity.Titles){
                            title = bibRelationships[x].BibEntity.Titles[0].TitleFull;
                        }
                    }
                    if (angular.isDefined(bibRelationships[x].BibEntity.Identifiers) && bibRelationships[x].BibEntity.Identifiers[0].Type === 'issn-print'){
                        // define source title
                        if (bibRelationships[x].BibEntity.Titles){
                            items[i].source = bibRelationships[x].BibEntity.Titles[0].TitleFull;
                        }

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

            //Set item title
            items[i].title = title;
        }
        $scope.items = items;

        //Preprocess resource link to include facet. This is injected in the EDS header to limit results to media type (this is not native to EDS API)
        var box = angular.copy($scope.boxName);
        var link = angular.copy($scope.resourceLink);

        // Tokenize box name to camelCase for EDS inject script
        /*box = box.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });*/
        if (box === 'Articles'){
            box = 'AcademicJournals';
        }

        if (link.indexOf('facet=') > 0){

            link = link.replace(/&facet=(.+)&?/, box);
        }
        else {
            link += '&facet=' + box;
        }
        //link = link.replace(/(&bquery=)([^&]+)/, '$1$2 OR (_ualib_facet:'+box+')');

        $scope.resourceLink = angular.copy(link);
    });