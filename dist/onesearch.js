angular.module('oneSearch.templates', ['bento/bento.tpl.html', 'common/directives/suggest/suggest.tpl.html', 'common/engines/acumen/acumen.tpl.html', 'common/engines/catalog/catalog.tpl.html', 'common/engines/databases/databases.tpl.html', 'common/engines/ejournals/ejournals.tpl.html', 'common/engines/google-cs/google-cs.tpl.html', 'common/engines/recommend/recommend.tpl.html', 'common/engines/scout/scout.tpl.html', 'common/engines/staff-directory/staff-directory.tpl.html']);

angular.module("bento/bento.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bento/bento.tpl.html",
    "<div class=\"container bento-box-container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h1 class=\"h2\">OneSearch Results</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"articles\">\n" +
    "                <h2>\n" +
    "                    Articles\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Keyword search in journal titles and full text article content in Scout.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"books\">\n" +
    "                <h2>\n" +
    "                    Books\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Keyword search in book titles using both the Libraries' Catalog and Scout.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"journals\">\n" +
    "                <h2>\n" +
    "                    Journals\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Keyword search in journal titles and journal collections, in both Scout and our E-Resources.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"bento-box\" hide-if-empty=\"true\" bento-box=\"staffdirectory\" style=\"min-height:0px; margin-bottom: 15px;\">\n" +
    "                <h2>\n" +
    "                    Research Help\n" +
    "                    <small>\n" +
    "                            <span class=\"fa fa-info-circle\"\n" +
    "                                  tooltip-placement=\"right\"\n" +
    "                                  tooltip=\"Contact a librarian directly for help with your research.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"databases\">\n" +
    "                <h2>\n" +
    "                    Databases\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Keyword search in titles and databases descriptions from our own Databases page.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"googleCS\">\n" +
    "                <h2 id=\"site-search\">\n" +
    "                    Libraries' Website\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Targeted, full-text search of library website pages and sections.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"acumen\">\n" +
    "                <h2 id=\"acumen\">\n" +
    "                    Acumen <small>Digital Archives</small>\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Returns a keyword search in titles and full text of our Special Collections Digital Archive.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"other\">\n" +
    "                <h2>\n" +
    "                    Other Items & Media\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Keyword and item type search in the Libraries' catalog and Scout, retrieving media items - videos, DVDs, CDs, etc.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"faq\">\n" +
    "                <h2>\n" +
    "                    FAQ\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip='Full text keyword search via our Google search engine interface, through our FAQ repository, also known as \"Ask a Librarian.\"'></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"libguides\">\n" +
    "                <h2>\n" +
    "                    Research Guides\n" +
    "                    <small>\n" +
    "                        <span class=\"fa fa-info-circle\"\n" +
    "                              tooltip-placement=\"right\"\n" +
    "                              tooltip=\"Uses Google API to run a keyword search in titles and full text for our research guides.\"></span>\n" +
    "                    </small>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"bento-box well\" bento-box=\"recommend\" hide-if-empty=\"true\" omit-from-menu=\"true\">\n" +
    "                <h2>\n" +
    "                    Recommended Links\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/directives/suggest/suggest.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/suggest/suggest.tpl.html",
    "<div class=\"input-group input-group-lg\">\n" +
    "    <label class=\"sr-only\" for=\"osTextField\">Search terms</label>\n" +
    "    <input type=\"text\" name=\"search\" class=\"form-control onesearch-text\" placeholder=\"{{prompt}}\" id=\"osTextField\"\n" +
    "           ng-model=\"model\" ng-change=\"onChange()\" ng-trim=\"false\" autocomplete=\"off\" />\n" +
    "    <div class=\"input-group-btn\">\n" +
    "        <button type=\"submit\" class=\"btn btn-onesearch btn-primary\"><span class=\"fa fa-search\" aria-hidden=\"true\"></span><span class=\"sr-only\">Search OneSearch</span></button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"suggest\" ng-show=\"showSuggestions && selected && (items.suggest.length > 0 || items.recommend.length > 0 || items.subjects[0].subjects.length > 0 || items.faq.length > 0)\">\n" +
    "    <div ng-if=\"items.suggest.length > 0\">\n" +
    "        <ul class=\"nav nav-pills nav-stacked\">\n" +
    "            <li role=\"presentation\"\n" +
    "                ng-repeat=\"item in filteredItems = (items.suggest | filter:compare(originalValue)) | limitTo:numShow track by $index\"\n" +
    "                ng-mousedown=\"handleSelection(item.search)\" ng-class=\"item.class\"\n" +
    "                ng-mouseenter=\"setCurrent($index, false)\">\n" +
    "                <a href=\"#/bento/{{item.search}}\" ng-click=\"gaTypeAhead(item.search)\">{{item.search}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"suggest-row\" ng-show=\"items.recommend.length > 0 || items.subjects[0].subjects.length > 0 || items.faq.length > 0\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.recommend.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>Recommended Links</h4>\n" +
    "                    <div ng-repeat=\"recommendation in items.recommend | limitTo:10\">\n" +
    "                        <a ng-href=\"{{recommendation.link}}\" ng-click=\"gaSuggestion(recommendation.description)\">\n" +
    "                            {{recommendation.description}}\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.subjects[0].subjects.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>Research Guides&#39; Subjects <a href=\"http://guides.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://guides.lib.ua.edu/')\">more guides</a></h4>\n" +
    "                    <div ng-repeat=\"person in items.subjects | limitTo:10\">\n" +
    "                        <div ng-repeat=\"subject in person.subjects | limitTo:2\">\n" +
    "                            <a ng-if=\"subject.link.length > 7\" ng-href=\"{{subject.link}}\" ng-mousedown=\"go(subject.link)\" ng-click=\"gaSuggestion(subject.subject)\">\n" +
    "                                {{subject.subject}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"subject.link.length <= 7\" href=\"#\"\n" +
    "                               ng-mousedown=\"go('mailto:' + person.email + '?subject=Question')\">\n" +
    "                                Ask {{person.name}}, {{person.title}} at {{person.department}}\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.faq.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>FAQ <a href=\"http://ask.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://ask.lib.ua.edu/')\">more FAQs</a></h4>\n" +
    "                    <div ng-repeat=\"faq in items.faq | limitTo:5\">\n" +
    "                        <a ng-href=\"{{faq.link}}\" ng-mousedown=\"go(faq.link)\"  ng-click=\"gaSuggestion(faq.title)\" ng-bind-html=\"faq.title\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/acumen/acumen.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/acumen/acumen.tpl.html",
    "<div class=\"media\">\n" +
    "    <a class=\"pull-left\" ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\"  target=\"_acumen\">\n" +
    "        <img ng-src=\"{{item.thumb_path}}\" alt=\"{{item.title}}\">\n" +
    "    </a>\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <a ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" target=\"_acumen\"  ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h3>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.date\" ng-bind-html=\"item.date\"></span>\n" +
    "            <span ng-if=\"item.type\" ng-bind-html=\"item.type | ucfirst\"></span>\n" +
    "        </div>\n" +
    "        <p>{{item.description | truncate: 100: '...': true}}</p>\n" +
    "        <ul class=\"list-inline\">\n" +
    "            <li>\n" +
    "                <a ng-href=\"{{resourceLink}}\" class=\"external-link\" ng-if=\"resourceLink\" target=\"_{{engine}}\" ng-click=\"gaMore()\">Results in {{engineName}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/catalog/catalog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/catalog/catalog.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <a ng-href=\"{{item.href}}\"\n" +
    "               ng-bind-html=\"item.title | truncate: 50: '...': true\" target=\"_catalog\" ng-click=\"gaPush()\"></a>\n" +
    "        </h3>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.year && item.year | number\" ng-bind-html=\"item.year\"></span>\n" +
    "            <span ng-if=\"item.mediaType\" ng-bind-html=\"item.mediaType\"></span>\n" +
    "            <span ng-if=\"item.issn\">ISSN: {{item.issn}}</span>\n" +
    "        </div>\n" +
    "        <div collapse=\"isCollapsed\" class=\"details-container\" ng-if=\"item.author\">\n" +
    "            <span class=\"text-muted\">Author(s)</span>\n" +
    "            <span class=\"detail\">\n" +
    "                <span ng-bind-html=\"item.author | lowercase | ucfirst\"></span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <ul class=\"list-inline\">\n" +
    "            <li ng-show=\"item.author\">\n" +
    "                <a href=\"\" ng-click=\"isCollapsed = !isCollapsed\">Item details <span class=\"fa\" ng-class=\"{'fa-caret-down': isCollapsed, 'fa-caret-up': !isCollapsed}\"></span></a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a ng-href=\"{{resourceLink}}\" class=\"external-link\" ng-if=\"resourceLink\" target=\"_{{engine}}\" ng-click=\"gaMore()\">Results in {{engineName}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/databases/databases.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/databases/databases.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <a ng-href=\"{{item.url}}\" title=\"{{item.title}}\" target=\"_databases\" ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h3>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.coverage\" ng-bind-html=\"item.coverage\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"details-container\" ng-if=\"item.subjects\">\n" +
    "            <span class=\"text-muted\">Subjects: </span>\n" +
    "            <span class=\"detail\" ng-repeat=\"subj in item.subjects\">{{subj.subject}}{{$last ? '' : ', '}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/ejournals/ejournals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/ejournals/ejournals.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <a ng-href=\"{{item.PLink}}\"\n" +
    "               target=\"_scout\"\n" +
    "               ng-bind-html=\"item.title | lowercase | ucfirst | truncate: 80: '...': true\" ng-click=\"gaPush()\"></a>\n" +
    "\n" +
    "        </h3>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.year\">{{item.year}}</span>\n" +
    "            <span ng-if=\"item.ISSN\">ISSN: {{item.ISSN}}</span>\n" +
    "            <span ng-if=\"item.mediaType\">{{item.mediaType}} </span>\n" +
    "            <span ng-if=\"item.FullText.Text.Availability\">Full Text Online</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"list-inline\">\n" +
    "            <li>\n" +
    "                <a ng-href=\"{{resourceLink}}\" class=\"external-link\" ng-if=\"resourceLink\" target=\"_{{engine}}\" ng-click=\"gaMore()\">Results in {{engineName}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/google-cs/google-cs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/google-cs/google-cs.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\"><a ng-href=\"{{item.link}}\" title=\"{{item.title}}\" target=\"_googlecs\" ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a></h3>\n" +
    "        <p ng-bind-html=\"item.snippet | truncate: 100: '...': true\"></p>\n" +
    "        <ul class=\"list-inline\">\n" +
    "            <li>\n" +
    "                <a ng-href=\"{{resourceLink}}\" class=\"external-link\" ng-if=\"resourceLink\" target=\"_{{engine}}\" ng-click=\"gaMore()\">Results in {{engineName}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/recommend/recommend.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/recommend/recommend.tpl.html",
    "<a ng-href=\"{{item.link}}\" title=\"{{item.descr}}\">{{item.descr}}</a>\n" +
    "");
}]);

angular.module("common/engines/scout/scout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/scout/scout.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <a ng-href=\"{{item.PLink}}\"\n" +
    "               title=\"{{item.Items[0].Data}}\"\n" +
    "               target=\"_scout\"\n" +
    "               ng-bind-html=\"item.title | lowercase | ucfirst | truncate: 80: '...': true\" ng-click=\"gaPush()\"></a>\n" +
    "        </h3>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0]\">{{item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0].Y}} </span>\n" +
    "            <span ng-if=\"item.mediaType\">{{item.mediaType}} </span>\n" +
    "            <span ng-if=\"item.FullText.Text.Availability\">Full Text Online</span>\n" +
    "        </div>\n" +
    "        <div collapse=\"isCollapsed\" ng-show=\"(item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects)\">\n" +
    "            <div class=\"details-container\" ng-if=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships\">\n" +
    "                <span class=\"text-muted\">Authors </span>\n" +
    "            <span class=\"details\"...\n" +
    "                  ..\n" +
    "\n" +
    "                  ng-repeat=\"author in item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships | unique: 'PersonEntity.Name.NameFull'\"\n" +
    "                  ng-bind-html=\"author.PersonEntity.Name.NameFull | lowercase | ucfirst\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"details-container\" ng-if=\"item.source\">\n" +
    "                <span class=\"text-muted\">Sources </span>\n" +
    "                <span class=\"details\" ng-bind-html=\"item.source\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"details-container\" ng-if=\"item.RecordInfo.BibRecord.BibEntity.Subjects\">\n" +
    "                <span class=\"text-muted\">Subjects </span>\n" +
    "            <span class=\"details\"\n" +
    "                  ng-repeat=\"subject in item.RecordInfo.BibRecord.BibEntity.Subjects\"\n" +
    "                  ng-bind-html=\"subject.SubjectFull\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <ul class=\"list-inline\">\n" +
    "            <li ng-show=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects\">\n" +
    "                <a href=\"\" ng-click=\"isCollapsed = !isCollapsed\">Item details <span class=\"fa\" ng-class=\"{'fa-caret-down': isCollapsed, 'fa-caret-up': !isCollapsed}\"></span></a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a ng-href=\"{{resourceLink}}\" class=\"external-link\" ng-if=\"resourceLink\" target=\"_{{engine}}\" ng-click=\"gaMore()\">Results in {{engineName}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/staff-directory/staff-directory.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/staff-directory/staff-directory.tpl.html",
    "<div class=\"col-md-4\">\n" +
    "    <div class=\"media\">\n" +
    "        <div class=\"media-left\">\n" +
    "                <img ng-if=\"item.photo\" class=\"media-object\" style=\"width: 128px;\" src='https://wwwdev2.lib.ua.edu/staffDir/staffImages/{{item.photo}}' alt=\"Staff Directory Image of {{item.firstName}} {{item.lastName}}\" />\n" +
    "                <img ng-if=\"!item.photo\" class=\"media-object\" style=\"width: 128px;\" src=\"https://www.lib.ua.edu/wp-content/themes/roots-ualib/assets/img/user-profile.png\" alt=\"Staff Directory Image of {{item.firstName}} {{item.lastName}}\" />\n" +
    "        </div>\n" +
    "        <div class=\"media-body\">\n" +
    "            <div class=\"media-heading\">\n" +
    "                <dl class=\"list-unstyled\">\n" +
    "                    <dt>Name</dt>\n" +
    "                    <dd><a ng-href=\"#/staffdir/{{item.emailPrefix}}\" ng-if=\"item.profile\">\n" +
    "                        {{item.firstName}} {{item.lastName}}\n" +
    "                    </a></dd>\n" +
    "                    <dd ng-if=\"!item.profile\">{{item.firstName}} {{item.lastName}} </dd>\n" +
    "                    <dt>Subject</dt>\n" +
    "                    <dd>{{item.subject}}</dd>\n" +
    "                    <dt>Phone</dt>\n" +
    "                    <dd>{{item.title}}</dd>\n" +
    "                    <!--<div class=\"media-heading\">{{item.department}}</div>-->\n" +
    "                    <dt>Email</dt>\n" +
    "                    <dd><a href=\"mailto:{{item.email}}?subject=Research Help Request\" ng-click=\"gaResearchRequest(item.firstName + ' ' + item.lastName)\">{{item.email}}</a></dd>\n" +
    "                </dl>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

/**
 * @ngdoc overview
 * @name index
 * @description
 * # Quick Start
 *
 * Run the following commands to install:
 *
 * ```shell
 * npm install
 * bower install
 * ```
 *
 * <div class="alert alert-warning">
 *     If you are unfamiliar with **Node.js**, **Grunt**, or **Bower** tools *or* have not installed them on your computer,
 *     read through the instructions in the [Getting Started](#getting-started) section.
 * </div>
 *
 * # Getting Started
 *
 * This package requires[Node.js](http://nodejs.org/) - an application platform which many development and automation tools may be run.
 * Download [Node.js](http://nodejs.org/download/) and install it on your computer.
 *
 * > The **Node.js** platform is used to run development tools such as [Grunt](#getting-started_install-grunt) and [Bower](#getting-started_install-bower)
 *
 * Once `Node.js` is installed, use the `npm` (node package manager) command to install this project's node dependencies:
 *
 * ```shell
 * npm install
 * ```
 *
 * <div class="alert alert-info">
 *     When the [npm install](https://docs.npmjs.com/cli/install) command is run without a package (e.g., `npm install <package_name>`),
 *     it installs dependencies listed in the `package.json` file (located in the root directory of this project).
 * </div>
 *
 *
 * ## Install Grunt
 * *This package requires Grunt `~0.4.5`*
 *
 * If you have not already installed `Grunt` on your computer, use the following command to install the `Grunt Command Line Interface (grunt-cli)`:
 *
 * ```shell
 * npm install -g grunt-cli
 * ```
 * <div class="alert alert-info">
 *     The **-g** option installs `grunt-cli` globally on you computer. You only need to run this command once.
 * </div>
 *
 * > If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
 * > as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
 *
 *
 * ## Install Bower
 *
 * If `Bower` is not globally installed on your computer, run the following command:
 *
 * ```shell
 * npm install -g bower
 * ```
 *
 * [Bower](http://bower.io/) is also a package manager for front-end web frameworks such as jQuery, Angular, and Bootstrap.
 * This project uses Bower to manage front-end third-party and peer dependencies.
 *
 * Once installed, you can download this project's `Bower` dependencies with the following command:
 *
 * ```shell
 * bower install
 * ```
 *
 * <div class="alert alert-info">
 *     Similar to `npm install` if `Bower's install` command is not given a package name (e.g., `bower install <package_name>`), it will install
 *     dependencies listed in the `bower.json` config file.
 * </div>
 */
/**
 * @ngdoc overview
 * @name oneSearch
 *
 * @requires ngRoute
 * @requires ngResource
 * @requires ngAnimate
 * @requires ngSanitize
 * @requires ui-bootstrap
 * @requires angular-filter
 * @requires ualib-ui
 * 
 * @description
 * <p class="lead">
 *     The `oneSearch` module allows multiple search engines to be searched easily through one interface. For information on how to add new or edit existing
 * engines, see docs for the {@link oneSearch.oneSearchProvider oneSearchProvider}.
 * </p>
 *
 * _All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are prepended with `oneSearch.*`, and modules loaded in `oneSearch.common` are prepended with `common.*`, and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts._
 */

angular.module('oneSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular.filter',
    'ualib.ui',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the main website
    .constant('UALIB_DOMAIN', '//wwwdev2.lib.ua.edu/')

    // Default search parameters
    /**
     * @ngdoc service
     * @name oneSearch.SearchParams
     *
     * @description
     * `Value` service for default search params.
     * These defaults can be overwritten when using the {@link oneSearch.oneSearch#methods_searchAll oneSearch.searchAll()} method.
     * For more deatils on Angular `Value` services, see their {@link https://code.angularjs.org/1.2.29/docs/guide/providers#value-recipe Value Recipe} documentation.
     */
    .value('SearchParams', {
        limit: 100
    });

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
                            elm.append("<strong>No Results</strong>");
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


/**
 * Central registration module for all common components.
 * "Common" components are modules that can be used by any view or front-end controller,
 * allowing them to be globally accessible to all aspects of the application.
 *
 */
angular.module('oneSearch.common', [
    'common.mediaTypes',
    'common.oneSearch',
    'common.engines',
    'filters.nameFilter'
]);
angular.module('oneSearch.common')
    /**
     * @ngdoc service
     * @name oneSearch.dataFactory
     *
     * @requires $http
     *
     * @description
     * Factory service to retrieve results for the search box suggestion dropdown generated by {@link oneSearch.directive:suggest-one-search suggest-one-search directive}.
     *
     * @returns {HttpPromise} Returns a promise object with standard $http `then` method.
     */
    .factory('dataFactory', ['$http', function($http) {
        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data; // success callback returns this
                });
            }
        };
    }])

    /**
     * @ngdoc directive
     * @name oneSearch.directive:suggest-one-search
     *
     * @requires $timeout
     * @requires $document
     *
     * @scope
     * @restrict AEC
     *
     * @param {string} prompt The `placeholder` text to display in the search text box
     * @param {string} model Name of the `$scope` variable to store the search string
     * @param {string} search Name of the `$scope` reference to the `search()` function defined in the {@link oneSearch.oneSearch:OneSearchCtrl OneSearchCtrl}
     *
     * @description
     * Directive for the search box with suggestion dropdown
     */
    .directive('suggestOneSearch', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'AEC',
            scope: {
                prompt: '@',
                model: '=',
                search: '='
            },
            controller: ['$scope', '$window', '$timeout', '$document', 'dataFactory', 'Bento', function($scope, $window, $timeout, $document,  dataFactory, Bento){
                $scope.items = {};
                $scope.filteredItems = [];
                $scope.model = "";
                $scope.current = -1;
                $scope.originalValue = $scope.model;
                $scope.dataRequested = false;
                $scope.numShow = 5;
                $scope.faqSearched = false;

                // hides the list initially
                $scope.selected = false;



                $scope.onChange = function(){




                    $scope.selected = true;
                    var fixedString = $scope.model.replace(/[&\/\\#+()$~%':*?<>{}]/g, ' ').trim();
                    fixedString = fixedString.substring(0, 150);

                    if ($scope.model.length < 3 ||
                        ($scope.model.indexOf($scope.originalValue) < 0 && $scope.model.length >= $scope.originalValue.length) ||
                        ($scope.originalValue.indexOf($scope.model) < 0 && $scope.model.length <= $scope.originalValue.length)){
                        $scope.items = {};
                        $scope.setCurrent(-1, false);
                        $scope.dataRequested = false;
                        $scope.selected = false;
                        $scope.faqSearched = false;
                    }
                    if ($scope.model.length > 2 && !$scope.dataRequested){
/*
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + encodeURI(fixedString))
                            .then(function(data) {
                                $scope.items.suggest = data;
                                $scope.setCurrent(-1, false);
                            });
*/
                        $scope.dataRequested = true;
                    }
                    if ($scope.model.length > 2){
                        $timeout(function() {
                            dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/' + encodeURI(fixedString))
                                .then(function(data) {
                                    $scope.items.recommend = data;
                                });
                            dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + encodeURI(fixedString) + '/match/startwith')
                                .then(function(data) {
                                    $scope.items.subjects = data;
                                });
                        }, 0);
                    }
                    if ($scope.model.length > 4 && !$scope.faqSearched){
                        //run GCS only if the last character is a space and prev one is not
                        var lastTwo = fixedString.slice(-2);
                        //console.log("Checking conditions for GCS search..." + lastTwo);
                        if (lastTwo.indexOf(" ") > 0) {
                            //console.log("Running GCS search.");
                            $timeout(function() {
                                $scope.faqSearched = true;
                                dataFactory.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=003453353330912650815:lfyr_-azrxe&q=' +
                                    encodeURI(fixedString) + '&siteSearch=ask.lib.ua.edu')
                                    .then(function (data) {
                                        // pluck out the items array for easier 'suggestWatcher' processing
                                        $scope.items.faq = data.items;
                                    });
                            }, 0);
                        }
                    }
                    $scope.originalValue = $scope.model;
                };
                $scope.go = function ( path ) {
                    $scope.model = "";
                    $scope.originalValue = $scope.model;
                    $window.location.href = path;
                };
                $scope.setCurrent = function(index, forceModel) {
                    $scope.current = index;
                    if (typeof $scope.items.suggest != 'undefined')
                        for (var i = 0; i < $scope.items.suggest.length; i++)
                            $scope.items.suggest[i].class = '';
                    if (index >= 0)
                        if ($scope.filteredItems.length > 0){
                            if (index > $scope.filteredItems.length - 1)
                                index = $scope.filteredItems.length - 1;
                            if (forceModel)
                                $scope.model = $scope.filteredItems[index].search;
                            $scope.filteredItems[index].class = 'active';
                            $scope.current = index;
                        }
                };
                $scope.onFocus = function(){
                    if (angular.isDefined($scope.model) && $scope.model.length > 2){
                        $scope.selected = true;
                    }
                    //console.log("onFocus()");
                };
                $scope.onBlur = function(event){
                    //console.log("onBlur()");
                    $scope.selected = false;
                    $document.unbind("click");
                };
                $scope.compare = function(query){
                    return function(item){
                        if (item.search.indexOf(query) == 0 &&
                            !angular.equals(item.search.toLowerCase(), query.toLowerCase()))
                            return true;
                        return false;
                    };
                };

                // This is dumb, but quick fix to get GA events on suggestion box.
                // TODO: Remove this and add in global GA directives
                $scope.gaSuggestion = function(linkTitle){
                    ga('send', 'event', 'oneSearch', 'suggestion_click', linkTitle);
                };
                $scope.gaTypeAhead = function(linkTitle){
                    ga('send', 'event', 'oneSearch', 'type_ahead_click', linkTitle);
                };



            }],
            link: function(scope, elem, attrs) {
                scope.showSuggestions = false;
                var suggestWatcher = scope.$watch('items', function(newVal, oldVal){
                    var show = false;

                    for (var item in newVal){
                        if (item.length > 0){
                            show = true;
                            break;
                        }
                    }

                    scope.showSuggestions = (scope.model.length > 2 && show);
                }, true);

                elem.bind("keydown", function (event) {
                    switch(event.keyCode){
                        //ArrowUp
                        case 38:
                            if (scope.current > 0){
                                scope.setCurrent(scope.current - 1, true);
                                event.preventDefault();
                            } else {
                                scope.setCurrent(-1, false);
                                scope.model = scope.originalValue;
                                event.preventDefault();
                            }
                            break;

                        //ArrowDown
                        case 40:
                            if (scope.model.length > 2 && scope.current < scope.numShow - 1)
                                if (scope.current < scope.items.suggest.length - 1){
                                    scope.setCurrent(scope.current + 1, true);
                                    event.preventDefault();
                                }
                            break;

                        //Enter
                        case 13:
                            scope.selected = false;

                            // Check if type-ahead selected. If so, trigger GA event
                            // gaTypeAhead() is also bound to ng-click for each type-ahead link
                            if (scope.current > -1 && scope.filteredItems[scope.current] && scope.model === scope.filteredItems[scope.current].search){
                                scope.gaTypeAhead(scope.model);
                            }
                            break;

                        //Backspace
                        case 8:
                        //Delete
                        case 46:
                            scope.selected = true;
                            break;

                        default:
                            //console.log("KeyCode " + event.keyCode);
                            break;
                    }
                    scope.$apply();
                });

                // Unbind key event when scope is destroyed
                scope.$on('$destroy', function(){
                    elem.unbind("keydown");
                    suggestWatcher();
                    //console.log("$destroy");
                });

                elem.bind("click", function (event) {
                    if (event.target.id === "osTextField") {
                        scope.onFocus();
                        $document.bind("click", function(event) {
                            if (event.target.id === "osTextField") {
                                scope.onFocus();
                            } else
                            if (event.button < 1) {
                                scope.onBlur(event);
                            }
                            scope.$apply();
                        });
                    } else
                    if (event.button < 1) {
                        scope.onBlur(event);
                    }
                    scope.$apply();
                });

                scope.handleSelection = function(selectedItem) {
                    $timeout(function() {
                        scope.model = selectedItem;
                        scope.originalValue = "";
                        scope.items = {};
                        scope.setCurrent(-1, false);
                        scope.dataRequested = false;
                        scope.selected = false;
                        scope.faqSearched = false;
                        scope.$apply();
                        scope.search();
                    }, 0);
                };

            },
            templateUrl: 'common/directives/suggest/suggest.tpl.html'
        };
    }]);

angular.module('engines.acumen', [])

    /**
     * @ngdoc object
     * @name engines.type:acumen
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 8     |
     * | title      | N/A *(defaults to `Acumen`)*    |
     * | priority | 3     |
     * | resultsPath | `Acumen.data`     |
     * | totalsPath | `Acumen.metadata.numFound`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | N/A  |
     * | templateUrl | `common/engines/acumen/acumen.tpl.html` |
     * | controller | {@link engines.type:acumen:AcumenCtrl AcumenCtrl} |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('acumen', {
            id: 8,
            priority: 3,
            resultsPath: 'Acumen.data',
            totalsPath: 'Acumen.metadata.numFound',
            templateUrl: 'common/engines/acumen/acumen.tpl.html',
            controller: 'AcumenCtrl'
        })
    }])

    /**
     * @ngdoc controller
     * @name engines.type:acumen:AcumenCtrl
     *
     * @description
     * Adds a `type` property to each item to display, from genres that may return with the API results.
     * <mark>TODO:</mark>   add proper description.
     */

    .controller('AcumenCtrl', ['$scope', '$filter', function($scope, $filter){
        var items = $scope.items;

        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].type) {
                //console.log(items[i].type);
                if (items[i].type[0] == 'text' && items[i].details && items[i].details.genre) items[i].type = items[i].details.genre.sort().shift();
                else items[i].type = items[i].type.sort().shift();
            }
        }
    }]);
angular.module('engines.catalog', [])

    /**
     * @ngdoc object
     * @name engines.type:catalog
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 64     |
     * | title    | N/A *(defaults to Catalog)*     |
     * | priority | 5     |
     * | resultsPath | `Catalog.list`     |
     * | totalsPath | `Catalog.total`     |
     * | mediaTypes | <ul><li>**path:** `bibFormat`</li><li>**types**: <ul><li>**books**: ['aa','ac', 'ad', 'am']</li><li>**journals**:  ['ab','as','bb','bs','cb','cs','db','ds','eb','es','fb','fs','gb','gs','ib','is','jb','js','kb','ks','mb','ms','ob','os','pb','ps','rb','rs','tb','ts']</li></ul></li></ul>  |
     * | filterQuery | N/A |
     * | templateUrl | `common/engines/catalog/catalog.tpl.html` |
     * | controller | {@link engines.type:catalog:CatalogCtrl CatalogCtrl} |
     *
     * @requires oneSearch.oneSearchProvider
     */

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
                    journals: ['ab','as','bb','bs','cb','cs','db','ds','eb','es','fb','fs','gb','gs','ib','is','jb','js','kb','ks','mb','ms','ob','os','pb','ps','rb','rs','tb','ts']
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

    /**
     * @ngdoc controller
     * @name engines.type:catalog:CatalogCtrl
     *
     * @description
     * <mark>TODO:</mark>   add proper description.
     */

    .controller('CatalogCtrl', ['$scope', '$filter', function($scope, $filter){
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
            var typeParam = '&limitTo=TYPE%3D';
            var params = typeParam + $scope.resourceLinkParams.join(typeParam);
            if ($scope.resourceLink.indexOf('limitTo=') > 0){
                $scope.resourceLink = $scope.resourceLink.replace(/(&limitTo=[^&]+)/, params);
            }
            else {
                $scope.resourceLink += params;
            }
            //$scope.resourceLink += params;
        }

        $scope.items = items;
    }]);

angular.module('engines.databases', [])

    /**
     * @ngdoc object
     * @name engines.type:databases
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 2     |
     * | title   | N/A *(defaults to `Databases`)*     |
     * | priority | 1     |
     * | resultsPath | `Databases.databases`     |
     * | totalsPath | `Databases.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | N/A    |
     * | templateUrl | `common/engines/databases/databases.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            priority: 1,
            resultsPath: 'Databases.databases',
            totalsPath: 'Databases.totalResults',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        })
    }])
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

    .controller('EjouralsCtrl', ['$scope', function($scope) {

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
    }]);
/**
 * @ngdoc overview
 * @name engines
 *
 * @description
 * # Adding Engines to oneSearch
 * <div class="alert alert-primary">Engines are configured and registered via the `oneSearchProvider`, {@link oneSearch.oneSearchProvider#methods_engine see here for details}</div>
 *
 *
 * ## The `engines module` acts as the entry point to load engine configs.
 *
 * ## Adding engines to oneSearch
 *
 * 1. Create a directory with the engines name under ``src/app/common/engines/ENGINE_NAME``
 *      - This will contain the engine's config module, template, and LESS/CSS files
 *
 * 2. In the engines folder create the `engine config` module file: `ENGINE_NAME.js`:
 *      - **Note:** be sure to add the `@ngdoc` comments, filling in the `properties` table, so the engine info will appear in these docs! You can use the example below as a template.
 * <pre>
 *     &#47;**
 *       * @ngdoc object
 *       * @name engines.type:ENGIEN_NAME
 *       *
 *       * @description
 *       * Engine config properties
 *       *
 *       * | property | value |
 *       * |----------|-------|
 *       * | id       | ID_VAL      |
 *       * | priority | WEIGHT      |
 *       * | resultsPath | JSON_RESULTS_PATH     |
 *       * | totalsPath | TOTALS_RESULTS_PATH     |
 *       * | templateUrl | TEMPLATE_URL |
 *       * | controller |  CONTROLLER  |
 *       *
 *       * @requires oneSearchProvider
 *       *&#47;
 *
 *     angular.module('engines.ENGINE_NAME', [])
 *          .config (...)
 *          .controller(...);
 * </pre>
 *
 * 3. Create a template for engine items - this template is applied to each item in the search results individually
 *      - **Note:** template files should *always* end in `.tpl.html` (i.e., ENGINE_NAME.tpl.html)
 *
 * 4. *(optional)* Create LESS file to create custom styles for the engine's template
 *
 * 5. Add the `ENGINE_NAME` config module to the `common.engines` module's dependencies
 * <pre>
 *     angular.module('common.engines', [
 *          'engines.scout',
 *          'engines.catalog',
 *          ...
 *          'engines.ENGINE_NAME`
 *     ])
 * </pre>
 *
 */
angular.module('common.engines', [
    'engines.acumen',
    'engines.catalog',
    'engines.databases',
    'engines.scout',
    'engines.googleCS',
    'engines.faq',
    'engines.libguides',
    'engines.ejournals',
    'engines.recommend',
    'engines.staffdirectory'
])
/**
 * @Service enginesTemplateFactory
 *
 * Used to load an engine's template, defined through params in the engine's config with the oneSearch Provider
 * Currently, only loading templates through URL and $templateCache is available.
 * TODO: Allow String templates and TemplateProviders to load engine templates.
 *
 *
 */
    /**
     * @ngdoc service
     * @name engines.enginesTemplateFactory
     *
     * @requires $http
     * @requires $templateCache
     *
     * @description
     * This service retrieves the templates registered with each engine's config.
     *
     * **Note:** Although templates can only be retrieved via URL or $templateCache at the moment, it is recommended with use the {@link engines.enginesTemplateFactory#methods_get enginesTemplateFactory.get()} method,
     * as other template config methods may be supported in the future.
     */
    .service('enginesTemplateFactory', ['$http', '$templateCache', function($http, $templateCache){

        // Generic getter to load template based on engine config
        // @param config An Engine's config Object
        /**
         * @ngdoc function
         * @name engines.enginesTemplateFactory#get
         * @methodOf engines.enginesTemplateFactory
         *
         * @param {object} config An engine's config object
         *
         * @description
         * Takes an engine's `config` object and returns a template or a promise to the template, depending on how the template is defined in the engine's config.
         **/
        this.get = function(config){
            // return template is "templateUrl" is defined. otherwise, return null
            return angular.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl) : null;
        };

        // So far only templateUrl is supported - worked with both file and cached templates.
        // adopted from https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js
        /**
         * @ngdoc method
         * @name engines.enginesTemplateFactory#fromUrl
         * @methodOf engines.enginesTemplateFactory
         *
         * @param {string} url The URL or `$templateCache` path to the template.
         *
         * @description
         * Takes a `URL` string and returns a promise to the template. `$templateCache` will be checked first. If no cached template is found, then
         * it loads via `$http`.
         *
         * Adopted from {@link https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js}
         *
         * @returns {string|Promise.<string>} The template html as a string, or a promise
         * for that string.
         */
        this.fromUrl = function(url){
            if (url == null) return null;
            else return $http
                .get(url, {cache: $templateCache, headers: { Accept: 'text/html' }})
                .then(function(response){ return response.data});
        };

    }])
angular.module('engines.faq', [])

    /**
     * @ngdoc object
     * @name engines.type:faq
     *
     * @description
     * Engine config properties
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title | N/A *(defaults to `FAQ`)* |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(Appears as it's own box)*     |
     * | filterQuery | `site:ask.lib.ua.edu`  |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */
    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('faq', {
            id: 16,
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.googleCS', [])
    /**
     * @ngdoc object
     * @name engines.type:googleCS
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | `Libraries' Website`    |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `-site:guides.lib.ua.edu -site:ask.lib.ua.edu`    |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('googleCS', {
            id: 16,
            title: 'Libraries\' Website',
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: '-site:guides.lib.ua.edu -site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.libguides', [])

    /**
     * @ngdoc object
     * @name engines.type:libguides
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | `Research Guides`    |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `site:guides.lib.ua.edu`    |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('libguides', {
            id: 16,
            title: 'Research Guides',
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:guides.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.recommend', [])

    /**
     * @ngdoc object
     * @name engines.type:recommend
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | N/A *(defaults to `Recommend`)*    |
     * | priority | 0     |
     * | resultsPath | `Recommendations`     |
     * | totalsPath | N/A     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `N/A   |
     * | templateUrl | `common/engines/recommend/recommend.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            priority: 0,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])
angular.module('engines.scout', [])
    /**
     * @ngdoc object
     * @name engines.type:scout
     *
     * @description
     * Engine config properties
     *
     * | property | value |
     * |----------|-------|
     * | id       | 1     |
     * | title | N/A *(defaults to `Scout`)* |
     * | priority | 4     |
     * | resultsPath | `Scout.SearchResult.Data.Records`     |
     * | totalsPath | `Scout.SearchResult.Statistics.TotalHits`     |
     * | mediaTypes | <ul><li>**path:** `Header.PubTypeId`</li><li>**types:** <ul><li>**books**: `['book', 'ebook']`</li><li>**articles**: `academicJournal`</li></ul></li></ul>    |
     * | filterQuery | N/A  |
     * | templateUrl | `common/engines/scout/scout.tpl.html` |
     * | controller | {@link engines.type:scout:ScoutCtrl ScoutCtrl} |
     *
     * @requires oneSearch.oneSearchProvider
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

    /**
     * @ngdoc controller
     * @name engines.type:scout:ScoutCtrl
     *
     * @description
     * <mark>TODO:</mark>   add proper description.
     */

    .controller('ScoutCtrl', ['$scope', function($scope){
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
            if (items[i].RecordInfo.BibRecord.hasOwnProperty('BibRelationships') && angular.isDefined(items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships)){

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
    }]);
/**
 * @ngdoc object
 * @name engines.type:ENGIEN_NAME
 *
 * @description
 * Engine config properties
 *
 * | property | value |
 * |----------|-------|
 * | id       | 128      |
 * | priority | 5      |
 * | resultsPath | StaffDirectory     |
 * | templateUrl | common/engines/recommend/staff-directory.tpl.html|
 * | controller |  N/A  |
 *
 * @requires oneSearchProvider
 */

angular.module('engines.staffdirectory', [])
    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('staffdirectory', {
            id: 128,
            priority: 5,
            resultsPath: 'staffDir',
            templateUrl: 'common/engines/staff-directory/staff-directory.tpl.html',
            controller: 'StaffDirectoryCtrl'
        })
    }])
    .controller('StaffDirectoryCtrl', ['$scope', function($scope){

        var items = $scope.items;

        for (var i = 0, len = items.length; i < len; i++) {

            if (items[i].email) {
                //console.log(items[i].type);
                var rx = /^([\w-]+(?:\.[\w-]+)*)/;
                var prefix = items[i].email.match(rx);
                if (prefix !== null) {
                    items[i].emailPrefix = prefix[0];
                }
            }
        }
    }]);
angular.module('filters.nameFilter', [])

    .filter('nameFilter', ['$filter', function($filter){
        return function(name){
            if (name.indexOf(',') > -1) {
                var nameParts = name.split(',');
                name = nameParts.map(function (obj) {
                    return obj.trim();
                }).reverse().join(' ');
            }
            return name;
        }
    }]);
/**
 * @ngdoc function
 * @name oneSearch.type:inArray
 *
 * @param {*} val Value to test for
 * @param {Array} arr Array to search
 *
 * @description
 * Checks to see if a value is in an Array
 *
 * @example
 * <pre>
 * var myArray = [0, 9, 2];
 * var value = 01189998819991197253;
 * var isInArray = inArray(value, myArray); // returns false;
 * </pre>
 *
 * @returns {boolean} Returns `true` or `false`
 */

function inArray(val, arr){
    return arr.indexOf(val) > -1;
}
/*
    Given an object with an array as it's value,
    this function will create a new object having the array
    keys as separate object keys and the old object keys as their value

    {
        field: ['value1', 'value2']
    }

    will result in

    {
        value1: 'field',
        value2: 'field'
    }
 */
/**
 * @ngdoc function
 * @name oneSearch.type:invertArrayToObject
 *
 * @param {object} obj An `Object` with an `Array` as the property values
 *
 * @description
 * Given an object with an array as it's value,
 * this function will create a new object having the array
 * keys as separate object keys and the old object keys as their value
 *
 * @example
 * <pre>
 * var myObj = {
 *      field: ['value1', 'value2']
 * };
 * var invertedObj = invertArrayToObject(myObj);
 * // The resulting invertedObj will look like:
 * // {
 * //   value1: 'field',
 * //   value2: 'field',
 * // }
 * </pre>
 *
 * @returns {object} An new, inverted object, where the values of the `Array` are now the properties assigned a value of the old `property`
 */

var invertArrayToObject = function(obj){
    var inverted = {};

    Object.keys(obj).map(function(value, index){
        for (var i = 0, len = obj[value].length; i < len; i++){
            inverted[obj[value][i]] = value;
        }
    });
    return inverted;
}
/**
 * @ngdoc function
 * @name oneSearch.type:isEmpty
 *
 * @param {object|Array} obj An `Object` or `Array` to check.
 *
 * @description
 * Checks to see if an `Object` or `Array` is empty
 *
 * Adopted from {@link http://stackoverflow.com/questions/4994201/is-object-empty}
 *
 * @example
 * <pre>
 * var myObj = {};
 *
 * var isObjEmpty = isEmpty(myObj); // true
 * </pre>
 *
 * @returns {boolean} `true` or `false`
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
/**
 * @ngdoc function
 * @name oneSearch.global:toArray
 *
 * @param {object} object `Object` to convert into an `Array`.
 *
 * @description
 * Converts the given object into an `Array` of it's values
 *
 * Adopted from {@link https://github.com/a8m/angular-filter/blob/master/src/_common.js}
 *
 * @example
 * <pre>
 * var myObj = {
 *  prop1: "Don't",
 *  prop2: "cross the",
 *  prop3: "streams!"
 * };
 *
 * var arrayNowPlease = toArray(myObj); // returns ["Don't", "cross the", "streams"]
 * </pre>
 *
 * @returns {Array} Array of the object's property's values
 */
function toArray(object) {
    return Array.isArray(object) ? object :
        Object.keys(object).map(function(key) {
            return object[key];
        });
}
/**
 * @ngdoc overview
 * @name mediaTypes
 *
 * @description
 * The `mediaTypes` module allows engines to easily split their results, grouped into different media types. See {@link mediaTypes.mediaTypesProvider mediaTypesProvider} for more details.
 */
angular.module('common.mediaTypes', [])

    /**
     * @ngdoc service
     * @name mediaTypes.mediaTypesProvider
     *
     * @description
     * This module extends the `engine object` with a `mediaTypes` property,
     * allowing multiple engines pool their results into similar `media types`.
     *
     * The `mediaTypes` config object is defined as part of the engine's config object passed to the {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} method.
     *
     *
     * The `mediaTypes` config object has the following properties:
     * - path *(optional)* - `{string=}` - The JSON path to the `value` that determines a media type in a results object. This path extends the `resultsPath` from the `engine object`
     * - types - `{object}` - Object where the properties are the name of the media type, and the values are the value which defines that type in the results object.
     *      - TYPE_NAME - `{string|Array.<string>}` - String or Array of strings for values that define the media type.
     *
     * # Example
     *
     * Here we have a search engine called `myEngine`. When creating the engine's config module, we specify what `mediaTypes` we want the engine's
     * results to be split into.
     *
     * Each item in the `myEngine.results` Array from the JSON response has a `metadata` object with a `type` property,
     * which defines the item's media type. Specifying the `mediaTypes.path` property as `metadata.type` will tell `oneSearch` to look for the media type
     * values under `myEngine.results[index].metadata.type`.
     *
     * Search result items that do not match `mediaTypes` defined in an engine's config will be place into the `other` media type.
     *
     * <div class="tabbable">
     *  <div class="tab-pane" title="myEngine Results">
     *      With the given `myEngine Config` and `JSON Response`, the search results would be organized by `mediaTypes`.
     *
     *      **Note:** all types not defined in `mediaTypes.types` of the `myEngine's` config are put into an `other` type
     *
     *      <div class="well">
     *      <ul>
     *          <li>
     *              `books`
     *              <ul>
     *                  <li>`Title of Book`</li>
     *                  <li>`Title of E-Book`</li>
     *              </ul>
     *          </li>
     *          <li>
     *              `articles`
     *              <ul>
     *                  <li>`Title of Journal Article`</li>
     *              </ul>
     *          </li>
     *          <li>
     *              `other`
     *              <ul>
     *                  <li>`Title of Audio Recording`</li>
     *              </ul>
     *          </li>
     *      </ul>
     *      </div>
     *  </div>
     *  <div class="tab-pane" title="myEngine Config">
     *      <pre>
              angular.module('engines.myEngine', [])

               .config(['oneSearchProvider', function(oneSearchProvider){
                    oneSearchProvider.engine('myEngine', {
                        id: 90,
                        priority: 15,
                        resultsPath: 'myEngine.results',
                        mediaTypes: {
                            path: 'metadata.type',
                            types: {
                                books: ['book', 'ebook'],
                                articles: 'academicJournal'
                            }
                        }
                    });
                });
        </pre>
     *  </div>
     *  <div class="tab-pane" title="JSON Response">
     *      <pre>
     *          {
     *          "myEngine": {
     *              "results": [
     *                  {
     *                      "title": "Title of Book",
     *                      "metadata": {
     *                          "type": "book"
     *                      }
     *                  },
     *                  {
     *                      "title": "Title of E-Book",
     *                      "metadata": {
     *                          "type": "ebook"
     *                      }
     *                  },
     *                  {
     *                     "title": "Title of Journal Article",
     *                      "metadata": {
     *                          "type": "academicJournal"
     *                      }
     *                  },
     *                  {
     *                      "title": "Title of Audio Recording",
     *                      "metadata": {
     *                          "type": "audio"
     *                      }
     *                  }
     *              ]
     *          }
     *      }
     *      </pre>
     *  </div>
     * </div>
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
         * @param {string} engine The name of the engine, defined when registering an engine with the {@link oneSearch.oneSearchProvider oneSearchProvider}.
         *
         * @description
         * This method is used by the {@link oneSearch.oneSearchProvider oneSearchProvider} to organize engines by their media types,
         * if specified in the {@link oneSearch.oneSearchProvider#methods_engine engine object}.
         *
         * A `mediaTypes` property is looked for in the `engine` object. If no `mediaTypes` property is found, the engine is considered as its own media type.
         *
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
/**
 * oneSearch Provider:
 *  This is the core of the oneSearch application.
 *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
 *  This allows resources/engines to be easily plug-able and templated independent of each other.
 *
 *  The oneSearch Provider expects engines to register in the config phase.
 *  Engines are registered using the Provider's engine(engine_name, params) function:
 *      engine_name: String - defines the identifier for the engine
 *      params: Object - defines details for querying the engine (see example below)
 *
 *  Example:
 *
 *  // Define the engine as an Angular module
 *  angular.module('engines.MY_ENGINES_NAME')
 *
 *  //Register the engine's configuration with the oneSearch Provider
 *  .config(['oneSearchProvider', function(oneSearchProvider){
 *      oneSearchProvider.engine('MY_ENGINE_NAME', {
 *          id: String|Integer, //The id given to the backend JSON response handler that identifies the engine
 *          resultsPath: String, // A string representing the Object path to the search results (e.g., "engine.path.to.results")
            totalsPath: String, // Optional - A string representing the Object path to the total number of results found
            mediaTypes: { // Optional - Requires mediaTypesProvider module - An Object that specify media type qualifiers within the engines results
                path: String // The base path in the results object for the media type qualifier
                types: {    // Object that specifies what media types there are and how to identify them
                    TYPE_LABEL: String|Array // TYPE_LABEL will be the type id and the String or Array of Strings will represent the value given from the 'path' specified above.
                }
            },
            templateUrl: String //a string representing that url path to the engine's template
            controller: Function|String //an injectable controller for the engine - can be a Function or String referring to an existing Controller
        });
    });
 *
 */

angular.module('common.oneSearch', [])

    /**
     * @ngdoc service
     * @name oneSearch.Search
     *
     * @requires $http
     * @requires $q
     *
     * @description
     * Factory service use to make requests to the oneSearch API which will query and return an engine's results
     */

    .factory('Search', ['$http', '$q', function($http, $q){

        function search(params){


            var canceller = $q.defer();
            var url = '//wwwdev2.lib.ua.edu/oneSearch/api/search/' + params['s'] + '/engine/' + params['engine'] + '/limit/' + params['limit'];

            var request = $http({
                method: 'GET',
                url: url,
                timeout: canceller.promise
            });

            var promise = request.then(function(data){
                this.done = true;
                return data.data;
            }, function(data){
                return $q.reject('Error');
            });

            promise.done = false;

            promise.abort = function(){
                this.done = true;
                canceller.resolve();
            };

            promise.finally(
                function(){
                    promise.abort = angular.noop;
                    canceller = request = promise = null;
                    this.done = false;
                }
            );

            return promise;
        }

        /**
         * @ngdoc method
         * @name oneSearch.Search#request
         * @methodOf oneSearch.Search
         *
         * @param {Object} params Object of search parameters (defaults can be set via the {@link oneSearch.SearchParams SearchParams service}).
         * @param {string} params.s Search string
         * @param {integer|string} params.engine The `id` of the engine to search
         * @param {integer=} [params.limit=100] - Maximum number of results to return
         *
         * @description
         *
         * @returns {Promise} Returns a custom `Promise` which allows the `$http` request to be aborted. Check the status of or abort a request using the `response` property.
         *
         * This custom promise contains all the standard {@link https://code.angularjs.org/1.2.29/docs/api/ng/service/$http#usage $http} return properties, but adds the `response` property:
         * - **response.done** - `{boolean}` - `true` when the $http request is finished
         * - **response.abort** - `{function}` - A function to abort a pending `$http` request
         *
         *
         * <pre>
         *     // Abort the request if it takes longer than 400ms
         *     var search = Search.request(params);
         *
         *     $timeout(function(){
         *          if (!search.request.done){
         *              search.request.abort();
         *          }
         *     }, 400);
         *
         * </pre>
         *
         */

        return {
            request: search
        };
    }])

    /**
     * @ngdoc service
     * @name oneSearch.oneSearchProvider
     *
     * @requires mediaTypes.mediaTypesProvider
     *
     * @description
     * This is the core of the oneSearch application.
     *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
     *  This allows resources/engines to be easily plug-able and templated independent of each other.
     *
     *  The oneSearch Provider expects engines to register in the config phase.
     *  Engines are registered using the Provider's engine(engine_name, params) function:
     *      engine_name: String - defines the identifier for the engine
     *      params: Object - defines details for querying the engine (see example below)
     *
     * @example
     * <pre>
     * angular.module('engines.googleCS', [])
     *
     *    .config(['oneSearchProvider', function(oneSearchProvider){
     *       oneSearchProvider.engine('googleCS', {
     *           id: 16,
     *           title: 'Libraries\' Website',
     *           priority: 2,
     *           resultsPath: 'GoogleCS.items',
     *           totalsPath: 'GoogleCS.searchInformation.totalResults',
     *           filterQuery: '-site:guides.lib.ua.edu -site:ask.lib.ua.edu',
     *           templateUrl: 'common/engines/google-cs/google-cs.tpl.html',
     *           controller: 'GoogleCsCtrl'
     *       })
     *     }])
     *
     *     .controller(['$scope', function($scope){
     *       var items = $scope.items; // Grab the result items from controller $scope to manipulate
     *     })
     * </pre>
     * *__Note:__ For details on how new engines should be configured, see the {@link engines engines module} docs*
     */

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        //private object that holds registered engines
        var _engines = {};

        /**
         * @ngdoc function
         * @name oneSearch.oneSearchProvider#engine
         * @methodOf oneSearch.oneSearchProvider
         *
         * @param {string} name Machine readable name of the engine being registered (e.g., no space or special characters)
         * @param {Object} engine Then `engine` object. This tells oneSearch how to search and process results from each engine
         *
         * @param {number|string} engine.id The id given to the backend JSON response handler that identifies the engine
         * @param {string=} engine.title Title to be displayed in the template
         * *(defaults to `string` value give by {@link oneSearch.oneSearchProvider#engine.name name parameter})*
         * @param {number} [engine.priority=10] Weight determining request order of engines. Smaller (lighter) number float to the top and are loaded first.
         * @param {string} engine.resultsPath String representing the JSON path to the search results from the API response (e.g., "engine.path.to.results")
         * @param {string=} engine.totalsPath String representing the JSON path to the `total results` object from API response
         * @param {Object=} engine.mediaTypes Configuration object to assign certain results to different `mediaTypes` (see @link oneSearch.mediaTypesProvider for details)
         * @param {string} engine.templateUrl File path to the engine's template. The template can either be a physical file or loaded into $templateCache *(template functions not yet supported)*
         * @param {string=} engine.filterQuery Filter query string that will be appended to search string.
         * @param {(string|function())=} engine.controller Custom controller to control $scope of each engine. Will accept a function or the name of a defined controller.
         *
         */

        //function to allow engines to register as searchable
        this.engine = function(name, engine){
            if (angular.isString(name)){
                var defaults = {
                    id: null, title: null, priority: 10, resultsPath: null, totalsPath: null, mediaTypes: null, templateUrl: null, filterQuery: null, controller: null
                };

                var e = angular.extend(defaults, engine);
                if (e.id){
                    if (e.mediaTypes){
                        Object.keys(e.mediaTypes.types).map(function(type){
                            mediaTypesProvider.type(type, name);
                        })
                    }
                    else{ //if no mediaTypes are defined, the engine is considered it's own media type
                        mediaTypesProvider.type(name, name);
                        e.mediaTypes = name;
                    }

                    e.name = name;
                    _engines[name] = e;
                }
            }
            else{
                console.log({Error: "oneSearch engine must have STRING defined name", engineParams: engine});
            }
        };

        /**
         * @ngdoc object
         * @name oneSearch.oneSearch
         *
         * @requires $q
         * @requires $parse
         * @requires $filter
         * @requires $rootScope
         * @requires $enginesTemplateFactory
         * @requires oneSearch.SearchParams
         * @requires oneSearch.Search
         *
         * @description
         * The `oneSearch` service acts as the access point to search engines during Angular's `run` phase (see Angular's {@link https://code.angularjs.org/1.2.29/docs/guide/module#module-loading-dependencies Module Loading & dependencies} documentation}.
         * Engines are configured and registered with `oneSearch` during the `configuration` phase. See {@link oneSearch.oneSearchProvider oneSearchProvider} docs for more details.
         *
         */

        this.$get = ['$q', '$parse', '$filter', '$rootScope', 'enginesTemplateFactory', 'SearchParams', 'Search', function($q, $parse, $filter, $rootScope, enginesTemplateFactory, SearchParams, Search){

            return {
                /**
                 * @ngdoc object
                 * @name oneSearch.oneSearch#engines
                 * @propertyOf oneSearch.oneSearch
                 *
                 * @description
                 * Object containing information about all engines registered through the {@link oneSearch.oneSearchProvider}. This `object` is extended upon
                 * search, adding the engine's results and status.
                 *
                 */
                engines: _engines, // Expose engines at Service level
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#searchAll
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} params Params to send with REST API request
                 *
                 * @description
                 * Function to search all engines. The order requests are made is determined by the {@link oneSearch.oneSearchProvider#methods_engine priority} weight of each engine's configuration object
                 */
                searchAll: function(params){

                    //extend give params with default SearchParams
                    angular.extend(params, SearchParams);

                    // Sort engines by 'priority'
                    var prioritized = $filter('orderObjectBy')( _engines, 'priority');

                    // Cycle through each registered engine, send the GET request, then return $http's promise by default.
                    // Returning the promise, instead of the JSON data, allows for async loading of results.
                    angular.forEach(prioritized, function(engine, name){
                        //Create a local parameters variable 'p' and specify the engine id.
                        var p = {engine: engine.id};

                        //Extend local parameters by global params.
                        angular.extend(p, params);

                        //if filterQuery present, add it to query
                        // TODO: add proper REST support by accepting filter queries as objects and not just strings
                        if (engine.filterQuery !== null){
                            p.s += ' ' + engine.filterQuery;
                        }

                        /*console.log({
                         engine: engine,
                         params: p
                         });*/

                        // Store the $http response promise in the engine's object with key 'response'
                        engine.response = Search.request(p);

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.resultsPath)){
                            engine.getResults = $parse(engine.resultsPath);
                        }

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.totalsPath)){
                            engine.getTotal = $parse(engine.totalsPath);
                        }

                        // Create resource link getter for "more" results link
                        engine.getResourceLink = $parse("resourceLinks");

                        // Put engine's object in private _engines object
                        _engines[name] = engine;
                    });

                    // Return all engines with response promises, and getter functions
                    return _engines;
                },
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#getEngineTemplate
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} engine Config object for an engine
                 *
                 * @description
                 * Gets the template defined in an engine's config object
                 *
                 * @returns {string|Promise.<string>} The template html as a string, or a promise
                 * for that string.
                 */
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                },
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#getEngineController
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} engine Config object for an engine
                 *
                 * @description
                 * Gets the controller defined in an engine's config object
                 *
                 * @returns {string|function|null} Returns the name of a defined controller or the controller function defined with the given engine. If no
                 * controller was defined for the engine, then `null` is returned.
                 */
                getEngineController: function(engine){
                    return angular.isDefined(engine.controller) ? engine.controller : null;
                }

            }
        }]
    }])

    /**
     * @ngdoc controller
     * @name oneSearch.oneSearch:OneSearchCtrl
     *
     * @requires $scope
     * @requires $rootScope
     * @requires $location
     * @requires $window
     * @requires oneSearch.oneSearch
     *
     * @description
     * This controller should warp the search box form. It will provide search variables/methods relative to it's `$scope`. Be sure to compensate if any
     * directives under this controller define an isolated $scope.
     */

    .controller('OneSearchCtrl', ['$scope', '$location', '$rootScope', '$window', 'oneSearch', function($scope, $location, $rootScope, $window, oneSearch){
        $scope.searchText;

        function abortPendingSearches(){
            for (var e in oneSearch.engines){
                if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                    oneSearch.engines[e].response.abort();
                }
            }
        }

        /**
         * @ngdoc method
         * @name oneSearch.oneSearch:OneSearchCtrl#$scope.search
         * @methodOf oneSearch.oneSearch:OneSearchCtrl
         *
         * @description
         * This function will first check if the `$scope.searchText` model has value. If so, it will
         * 1. Trim any `/` characters from `$scope.searchText`
         * 2. Cancel any pending searches
         * 3. Route the browser to `#/bento/{$scope.searchText}`.
         *
         * Currently only the {@link bento} route is supported. Other views/routes may be supported in the future.
         *
         * **Note:** This function will route relative to UA Libraries' `live` and `dev` URLs. If this function is executed outside a UALib domain, `www.lib.ua.edu` will be used by default.
         */


        $scope.search = function(){
            /**
             * @ngdoc property
             * @name oneSearch.oneSearch:OneSearchCtrl:$scope.searchText
             * @propertyOf oneSearch.oneSearch:OneSearchCtrl
             *
             *  @description
             * The $scope model for the search string, bound to the input text box.
             */

            //Redirect to Scout if "Only search Scout" is checked
            var checkbox = $scope.scoutCheckbox;
            var searchtext = $scope.searchText;


            if ((checkbox == true) && (searchtext !== '')) {
                ga('send', 'event', 'oneSearch', 'scout_checkbox_click');
                window.location = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&;scope=site&type=0&custid=s4594951&groupid=main&profid=eds&mode=and&authtype=ip,guest&bquery=' + searchtext;
            }
            else {
                if ($scope.searchText) {
                    $scope.searchText = $scope.searchText.replace(/[&\/\\#+()$~%':*?<>{}]/g, ' ').trim();
                    $scope.searchText = $scope.searchText.substring(0, 150);
                    var searchText = encodeURIComponent($scope.searchText);

                    //Cancel any pending searches - prevents mixed results by canceling the ajax requests
                    abortPendingSearches();

                    // Compensate for when not on home page
                    // Since WP pages aren't loaded as angular routes, we must detect if there is no '#/PATH' present
                    // after the URI (or that it's not a 'bento' route), then send the browser to a pre-build URL.
                    if (!$location.path() || $location.path().indexOf('/bento') < 0) {
                        var url = '#/bento/' + searchText;
                        switch ($location.host()) {
                            case 'wwwdev2.lib.ua.edu':
                            case 'www.lib.ua.edu':
                                url = '//' + $location.host() + url;
                                break;
                            case 'localhost':
                                url = $location.absUrl().replace(/(#.*)/, '') + url;
                                break;
                            default:
                                url = '//www.lib.ua.edu' + url;
                        }
                        $window.location = url; //Angular 1.2.8 $location is too limited...
                    }
                    else {
                        $location.path('/bento/' + $scope.searchText);
                    }
                }
            }
        };

        $scope.getRecommend = function(val){
            return $resource('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/:search')
                .query({search: val})
                .$promise.then(function(rec) {
                    //console.log(rec);

                    return rec;
                });
        };


        $rootScope.$on('$routeChangeSuccess', function(event,currentRoute){
            if (currentRoute && $scope.searchText !== currentRoute.params.s){
                $scope.searchText = currentRoute.params.s;
            }
        });


    }])

    // Borrowed from https://github.com/fmquaglia/ngOrderObjectBy
    /**
     * @ngdoc filter
     * @name oneSearch.filter:orderObjectBy
     *
     * @param {Array.<Object>} items An `Array` or `Objects` to order
     * @param {string} field The field/property of the objects to order by
     * @param {boolean} [reverse=false] Order objects in reverse
     *
     * @description
     * Order's an array of objects by the value of a property in those objects.
     *
     * @example
     * <pre>
     *     var arrObj = [
     *          {n: 10},
     *          {n: 1},
     *          {n: -5}
     *      ];
     *
     *      var ordered = $filter('orderObjectBy')( _engines, 'n');
     *      &#47;*
     *        ordered is given an array of objects, ordered by `n`:
     *        [
     *          {n: -5},
     *          {n: 1},
     *          {n: 10}
     *        ];
     *      *&#47;
     * </pre>
     */
    .filter('orderObjectBy', function() {
        return function (items, field, reverse) {
            var filtered = [];
            var newObj = {};
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            function index(obj, i) {
                return obj[i];
            }
            filtered.sort(function (a, b) {
                var comparator;
                var reducedA = field.split('.').reduce(index, a);
                var reducedB = field.split('.').reduce(index, b);
                if (reducedA === reducedB) {
                    comparator = 0;
                } else {
                    comparator = (reducedA > reducedB ? 1 : -1);
                }
                return comparator;
            });
            if (reverse) {
                filtered.reverse();
            }
            for (var i= 0, len = filtered.length; i < len; i++){
                var eng = filtered[i].name;
                newObj[eng] = filtered[i]
            }

            return newObj;
        };
    });