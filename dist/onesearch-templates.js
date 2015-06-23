angular.module('oneSearch.templates', ['bento/bento.tpl.html', 'common/directives/suggest/suggest.tpl.html', 'common/engines/acumen/acumen.tpl.html', 'common/engines/catalog/catalog.tpl.html', 'common/engines/databases/databases.tpl.html', 'common/engines/ejournals/ejournals.tpl.html', 'common/engines/google-cs/google-cs.tpl.html', 'common/engines/recommend/recommend.tpl.html', 'common/engines/scout/scout.tpl.html']);

angular.module("bento/bento.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bento/bento.tpl.html",
    "<div class=\"bento-box-container\">\n" +
    "    <div class=\"bento-box-menu-container hidden-xs\">\n" +
    "        <nav class=\"bento-box-menu navbar navbar-default navbar-static-top\" ui-scrollfix=\"+0\">\n" +
    "            <ul class=\"nav nav-justified\">\n" +
    "                <li ng-repeat=\"item in boxMenu\">\n" +
    "                    <a href=\"\" du-smooth-scroll=\"{{item.box}}\" ng-click=\"selectBox(item.box)\">{{item.title}}</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </nav>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"articles\">\n" +
    "                <h2>Articles</h2>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"books\">\n" +
    "                <h2>Books</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-12 col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"journals\">\n" +
    "                <h2>Journals</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"media\">\n" +
    "                <h2>Multimedia</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"acumen\">\n" +
    "                <h2 id=\"acumen\">Acumen</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"databases\">\n" +
    "                <h2>Databases </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"other\">\n" +
    "                <h2>Other Media</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"libguides\">\n" +
    "                <h2>LibGuides</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"googleCS\">\n" +
    "                <h2 id=\"site-search\">Libraries' Website</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"faq\">\n" +
    "                <h2>FAQ</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"bento-box well\" bento-box=\"recommend\" hide-if-empty=\"true\" omit-from-menu=\"true\">\n" +
    "                <h2>Recommended Links</h2>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/directives/suggest/suggest.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/suggest/suggest.tpl.html",
    "<div class=\"input-group input-group-lg\">\n" +
    "    <input type=\"text\" name=\"search\" class=\"form-control onesearch-text\" placeholder=\"{{prompt}}\"\n" +
    "           ng-model=\"model\" ng-change=\"onChange()\" autocomplete=\"off\" ng-blur=\"onBlur()\" ng-focus=\"onFocus()\" />\n" +
    "    <div class=\"input-group-btn\">\n" +
    "        <button type=\"submit\" class=\"btn btn-onesearch btn-primary\"><span class=\"fa fa-search\"></span></button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"suggest\" ng-show=\"showSuggestions && selected\">\n" +
    "    <div class=\"row\" ng-hide=\"items.suggest.length == 0\">\n" +
    "        <ul class=\"nav nav-pills nav-stacked\">\n" +
    "            <li role=\"presentation\"\n" +
    "                ng-repeat=\"item in filteredItems = (items.suggest | filter:compare(originalValue)) | limitTo:numShow track by $index\"\n" +
    "                ng-mousedown=\"handleSelection(item.search)\" ng-class=\"item.class\"\n" +
    "                ng-mouseenter=\"setCurrent($index, false)\">\n" +
    "                <a href=\"#/bento/{{item.search}}\">{{item.search}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"suggest-row\" ng-show=\"items.recommend.length || items.subjects.length || items.faq.length > 0\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4\" ng-show=\"items.recommend.length\">\n" +
    "                <div class=\"suggest-col\">\n" +
    "                    <h4>Recommended</h4>\n" +
    "                    <div ng-repeat=\"recommendation in items.recommend | limitTo:10\">\n" +
    "                        <a href=\"{{recommendation.link}}\" ng-mousedown=\"go(recommendation.link)\">\n" +
    "                            {{recommendation.description}}\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\" ng-show=\"items.subjects.length\">\n" +
    "                <div class=\"suggest-col\">\n" +
    "                    <h4>LibGuides Subjects <a href=\"http://guides.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://guides.lib.ua.edu/')\">more</a></h4>\n" +
    "                    <div ng-repeat=\"person in items.subjects | limitTo:10\">\n" +
    "                        <div ng-repeat=\"subject in person.subjects | limitTo:2\">\n" +
    "                            <a ng-if=\"subject.link.length > 7\" href=\"{{subject.link}}\" ng-mousedown=\"go(subject.link)\">\n" +
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
    "            <div class=\"col-sm-4\" ng-show=\"items.faq.length\">\n" +
    "                <div class=\"suggest-col\">\n" +
    "                    <h4>FAQ <a href=\"http://ask.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://ask.lib.ua.edu/')\">more</a></h4>\n" +
    "                    <div ng-repeat=\"faq in items.faq | limitTo:5\">\n" +
    "                        <a href=\"{{faq.link}}\" ng-mousedown=\"go(faq.link)\">\n" +
    "                            {{faq.title}}\n" +
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
    "    <a class=\"pull-left\" ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" title=\"{{item.title}}\">\n" +
    "        <img ng-src=\"{{item.thumb_path}}\">\n" +
    "    </a>\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" title=\"item.title\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.date\" ng-bind-html=\"item.date\"></span>\n" +
    "            <span ng-if=\"item.type\" ng-bind-html=\"item.type | ucfirst\"></span>\n" +
    "        </div>\n" +
    "        <p>{{item.description | truncate: 125: '...': true}}</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/catalog/catalog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/catalog/catalog.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.href}}\"\n" +
    "               title=\"{{item.title}}\"\n" +
    "               ng-bind-html=\"item.title | truncate: 50: '...': true\"></a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.year && item.year | number\" ng-bind-html=\"item.year\"></span>\n" +
    "            <span ng-if=\"item.mediaType\" ng-bind-html=\"item.mediaType\"></span>\n" +
    "            <span ng-if=\"item.issn\">ISSN: {{item.issn}}</span>\n" +
    "        </div>\n" +
    "        <div class=\"details-container\" ng-if=\"item.author\">\n" +
    "            <span class=\"text-muted\">Author(s)</span>\n" +
    "            <span class=\"detail\">\n" +
    "                <span ng-bind-html=\"item.author | lowercase | ucfirst\"></span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/databases/databases.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/databases/databases.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.url}}\" title=\"{{item.title}}\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.coverage\" ng-bind-html=\"item.coverage\"></span>\n" +
    "        </div>\n" +
    "        <p>\n" +
    "            {{item.description | truncate: 125: '...'}}\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/ejournals/ejournals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/ejournals/ejournals.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.links[0].href}}\" title=\"{{item.title}}\">{{item.title | ltrim | truncate: 50: '...': true}}</a>\n" +
    "        </h4>\n" +
    "\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.date\" ng-bind-html=\"item.date\"></span>\n" +
    "            <span ng-if=\"item.links[0]\">\n" +
    "                <span title=\"{{item.links[0].name}}\">{{item.links[0].name | ltrim | truncate: 35: '...'}}</span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"details-container\" ng-if=\"item.authors\">\n" +
    "            <span class=\"text-muted\">Authors </span>\n" +
    "            <span class=\"details\" ng-bind-html=\"item.authors\"></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"details-container\" ng-if=\"item.links[1]\">\n" +
    "            <span class=\"text-muted\">Other Sources </span>\n" +
    "            <span class=\"details\" ng-repeat=\"link in item.links | after:1 | limitTo : (sourceLimit ? 10 : 2)\">\n" +
    "                <a ng-href=\"{{link.href}}\"\n" +
    "                   title=\"{{link.name}}\"\n" +
    "                   class=\"source-link\"\n" +
    "                   ng-bind-html=\"link.name | ltrim | truncate: 35: '...': true\"></a>\n" +
    "            </span>\n" +
    "            <div ng-show=\"item.links[3]\">\n" +
    "                <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"sourceLimit = !sourceLimit\">{{sourceLimit? 'less' : 'more'}} sources</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/google-cs/google-cs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/google-cs/google-cs.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.link}}\" title=\"{{item.title}}\">{{item.title | truncate: 40: '...': true}}</a></h4>\n" +
    "        <p ng-bind-html=\"item.htmlSnippet\"></p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<!--div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a href=\"http://guides.lib.ua.edu\">Library Guides</a></h4>\n" +
    "        <div class=\"media\" ng-repeat=\"guide in items | limitTo:2 | filter:{link:'guides.lib.ua.edu'}\">\n" +
    "            <a class=\"media-left\" ng-href=\"{{guide.link}}\" title=\"{{guide.title}}\">\n" +
    "                <img ng-src=\"guide.pagemap.cse_thumbnail[0].src\"\n" +
    "                     width=\"{{guide.pagemap.cse_thumbnail[0].width}}\"\n" +
    "                     height=\"{{guide.pagemap.cse_thumbnail[0].height}}\">\n" +
    "            </a>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">\n" +
    "                    <a ng-href=\"{{guide.link}}\">{{guide.title}}</a>\n" +
    "                </h4>\n" +
    "                <p>{{guide.snippet}}</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div-->");
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
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.PLink}}\"\n" +
    "               title=\"{{item.Items[0].Data}}\"\n" +
    "               ng-bind-html=\"item.RecordInfo.BibRecord.BibEntity.Titles[0].TitleFull | lowercase | ucfirst\"></a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0]\">{{item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0].Y}} </span>\n" +
    "            <span ng-if=\"item.mediaType\">{{item.mediaType}} </span>\n" +
    "            <span ng-if=\"item.FullText.Text.Availability\">Full Text Online</span>\n" +
    "        </div>\n" +
    "        <div collapse=\"isCollapsed\" ng-show=\"(item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects)\">\n" +
    "            <div class=\"details-container\" ng-if=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships\">\n" +
    "                <span class=\"text-muted\">Authors </span>\n" +
    "            <span class=\"details\"\n" +
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
    "                <span class=\"text-muted\">Subejcts </span>\n" +
    "            <span class=\"details\"\n" +
    "                  ng-repeat=\"subject in item.RecordInfo.BibRecord.BibEntity.Subjects\"\n" +
    "                  ng-bind-html=\"subject.SubjectFull\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"isCollapsed = !isCollapsed\">{{!isCollapsed ? 'less' : 'more'}} detail</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
