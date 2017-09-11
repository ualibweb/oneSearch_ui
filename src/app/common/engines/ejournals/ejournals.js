angular.module('engines.ejournals', [])
    /**
     * @ngdoc object
     * @name engines.type:ejournals
     *
     * @description
     * Engine config properties
     *
     * | property | value |
     * |----------|-------|
     * | id       | 4     |
     * | title | N/A *(defaults to `Ejournals`)* |
     * | priority | 6     |
     * | resultsPath | `eJournals.results`     |
     * | totalsPath | `eJournals.total`     |
     * | mediaTypes | <ul><li>**books**: `book` </li><li>**journals**:  `periodical`</li></ul>  |
     * | filterQuery | N/A |
     * | templateUrl | `common/engines/ejournals/ejournals.tpl.html` |
     * | controller | {@link engines.type:ejournals:EjouralsCtrl EjouralsCtrl} |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('ejournals', {
            id: 4,
            priority: 6,
            resultsPath: 'eJournals.SearchResult.Data.Records',
            totalsPath: 'Scout.SearchResult.Statistics.TotalHits',
            mediaTypes: {
                path: 'Header.ResourceType',
                types: {
                    books: 'Book',
                    journals: 'Journal'
                }
            },
            templateUrl: 'common/engines/ejournals/ejournals.tpl.html',
            controller: 'EjouralsCtrl'
        })
    }])

    /**
     * @ngdoc controller
     * @name engines.type:ejournals:EjouralsCtrl
     *
     * @description
     * <mark>TODO:</mark>   add proper description.
     */

    .controller('EjouralsCtrl', function($scope) {

        var title; // Title variable to bind to $scope. ".BibRelationships.IsPartOfRelationships" title is used if no item title is present.
        var ISSN;
        var items = $scope.items;
        var year;

        for (var i = 0; i < items.length; i++) {

            //Reset title, ISSN, year
            title = '';
            ISSN = '';
            year = '';

            //Check if item has a title
            if (items[i].RecordInfo.BibRecord.BibEntity.Titles) {
                title = items[i].RecordInfo.BibRecord.BibEntity.Titles[0].TitleFull;

                //Set item title
                if (title) {
                    items[i].title = title;
                }

            }

            //Check if item has an ISSN
            if (items[i].RecordInfo.BibRecord.BibEntity.Identifiers) {

                for (j = 0; j < items[i].RecordInfo.BibRecord.BibEntity.Identifiers.length; j++) {
                    var ISSNType = items[i].RecordInfo.BibRecord.BibEntity.Identifiers[j]['Type'];
                    if (ISSNType == 'issn-online') {
                        ISSN = items[i].RecordInfo.BibRecord.BibEntity.Identifiers[j]['Value'];
                        ISSN = ISSN.slice(0, 4) + '-' + ISSN.slice(4, 8);
                        break;
                    }
                    else if (ISSNType == 'issn-print') {
                        ISSN = items[i].RecordInfo.BibRecord.BibEntity.Identifiers[j]['Value'];
                        ISSN = ISSN.slice(0, 4) + '-' + ISSN.slice(4, 8);
                    }

                }

                //Set ISSN
                if (ISSN) {
                    items[i].ISSN = ISSN
                }

            }

            //Check if item has a year.  Display the earliest available year for full text holdings

            if (typeof(items[i].FullTextHoldings !== 'undefined')) {
                for (j = 0; j < items[i].FullTextHoldings.length; j++) {

                    //console.log(items[i].FullTextHoldings[j].CoverageDates);
                    //console.log("TYPE IS " + typeof(items[i].FullTextHoldings[j].CoverageDates) + " END");
                    //console.log("IS IT UNDEFINED");
                    //console.log(typeof(items[i].FullTextHoldings[j].CoverageDates) == "undefined");
                    if (typeof(items[i].FullTextHoldings[j].CoverageDates) !== "undefined") {

                        var currentYear = items[i].FullTextHoldings[j].CoverageDates[0].StartDate;

                        currentYear = parseInt(currentYear.slice(0, 4));
                        if (year !== '') {
                            if (currentYear < year) {
                                year = currentYear;
                            }
                        }
                        else {
                            year = parseInt(currentYear);
                        }
                    }
                }
            }

            //Set year
            if (year) {
                items[i].year = year;
            }


        }

        $scope.items = items;
    });