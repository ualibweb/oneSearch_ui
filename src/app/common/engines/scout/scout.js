angular.module('engines.scout', [])
    /**
     * @ngdoc object
     * @name engines.type:scout
     *
     * @description
     * scout engine config
     *
     * @requires oneSearchProvider
     */
    
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
            //TODO: Add this functionality to the oneSearchProvider. Currently, resourceLink params are assigned per each engine's custom Controller (see below)
            //TODO: Merge properly with the 'resourceLink' and 'resourceLinkParams' generated from mediaTypes in Bento Service
            // Param keys should match mediaTypes assigned about (keep in mind "other" is a default/catchall handled by mediaTypeProvider
            // This will page params to match 'Source Types' from the Scout interface.
            resourceLink: {
                params: {
                    books: ['Books', 'eBooks'],
                    articles: ['AcademicJournals'],
                    other: [
                        'News',
                        'Magazines',
                        'Reviews',
                        'Biographies',
                        'ConferenceMaterials',
                        'ElectronicResources',
                        'TradePublications',
                        'NonPrintResources',
                        'MusicScores',
                        'DissertationsTheses',
                        'PrimarySourceDocuments',
                        'Reports',
                        'Maps',
                        'Audio',
                        'Videos'
                    ]
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
        var mediaType = angular.copy($scope.mediaType);
        var link = angular.copy($scope.resourceLink);
        var params;

        if ($scope.resourceLinkParams[mediaType]){
            params = $scope.resourceLinkParams[mediaType].join(',');
            if (link.indexOf('facet=') > 0){
                link = link.replace(/&facet=(.+)&?/, params);
            }
            else {
                link += '&facet=' + params;
            }
        }

        $scope.resourceLink = angular.copy(link);
    });