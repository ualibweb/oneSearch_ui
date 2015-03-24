angular.module('oneSearch.templates', ['bento/bento.tpl.html', 'common/directives/suggest/suggest.tpl.html', 'common/engines/acumen/acumen.tpl.html', 'common/engines/catalog/catalog.tpl.html', 'common/engines/databases/databases.tpl.html', 'common/engines/ejournals/ejournals.tpl.html', 'common/engines/google-cs/google-cs.tpl.html', 'common/engines/recommend/recommend.tpl.html', 'common/engines/scout/scout.tpl.html']);

angular.module("bento/bento.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bento/bento.tpl.html",
    "<div class=\"bento-box-container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"bento-box well\" bento-box=\"recommend\" hide-if-empty=\"true\">\n" +
    "            <h2>Recommended</h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"books\">\n" +
    "                <h2>Books</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"journals\">\n" +
    "                <h2>Journals</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"articles\">\n" +
    "                <h2>Articles</h2>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"bento-box\" bento-box=\"databases\">\n" +
    "                <h2>Databases</h2>\n" +
    "            </div>\n" +
    "            <div class=\"bento-box\" bento-box=\"media\">\n" +
    "                <h2>Multimedia</h2>\n" +
    "\n" +
    "                <div ng-show=\"box.noResults\">\n" +
    "                    No results\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"acumen\">\n" +
    "                <h2>Acumen</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <div class=\"bento-box\" bento-box=\"googleCS\">\n" +
    "                <h2>Libraries' Website</h2>\n" +
    "            </div>\n" +
    "            <div class=\"bento-box\" bento-box=\"other\">\n" +
    "                <h2>Other Media</h2>\n" +
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
    "<div class=\"suggest\" ng-hide=\"model.length < 3 || selected\">\n" +
    "    <ul class=\"nav nav-pills nav-stacked\" ng-hide=\"items.suggest.length == 0\">\n" +
    "        <li role=\"presentation\"\n" +
    "            ng-repeat=\"item in filteredItems = (items.suggest | filter:compare(originalValue)) | limitTo:numShow track by $index\"\n" +
    "             ng-mousedown=\"handleSelection(item.search)\" ng-class=\"item.class\"\n" +
    "             ng-mouseenter=\"setCurrent($index, false)\">\n" +
    "            <a href=\"#\">{{item.search}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div ng-hide=\"items.recommend.length == 0\">\n" +
    "        <h4>Web site pages</h4>\n" +
    "        <div ng-repeat=\"recommendation in items.recommend | limitTo:10\">\n" +
    "            <a href=\"{{recommendation.link}}\" ng-mousedown=\"go(recommendation.link)\">\n" +
    "                {{recommendation.description}}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"items.subjects.length == 0\">\n" +
    "        <h4><a href=\"http://guides.lib.ua.edu/\">LibGuides Subjects</a></h4>\n" +
    "        <div ng-repeat=\"person in items.subjects | limitTo:10\">\n" +
    "            <div ng-repeat=\"subject in person.subjects | limitTo:10\">\n" +
    "                <a ng-if=\"subject.link.length > 7\" href=\"{{subject.link}}\" ng-mousedown=\"go(subject.link)\">\n" +
    "                    {{subject.subject}}\n" +
    "                </a>\n" +
    "                <a ng-if=\"subject.link.length <= 7\" href=\"#\"\n" +
    "                   ng-mousedown=\"go('mailto:' + person.email + '?subject=Question')\">\n" +
    "                    Ask {{person.name}}, {{person.title}} at {{person.department}}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("common/engines/acumen/acumen.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/acumen/acumen.tpl.html",
    "<div class=\"media\">\n" +
    "    <a class=\"pull-left\" ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" title=\"{{item.title}}\">\n" +
    "        <img ng-src=\"{{item.thumb_path}}\" style=\"max-height: 64px; max-width: 64px;\">\n" +
    "    </a>\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" title=\"item.title\">{{item.title | truncate: 40: '...': true}}</a></h4>\n" +
    "        <p>{{item.description}}</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/catalog/catalog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/catalog/catalog.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.href}}\" title=\"{{item.title}}\">{{item.title | truncate: 40: '...': true}}</a></h4>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/databases/databases.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/databases/databases.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item[5]}}\" title=\"{{item[0]}}\">{{item[0] | truncate: 40: '...': true}}</a></h4>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/ejournals/ejournals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/ejournals/ejournals.tpl.html",
    "<ul class=\"source-list\">\n" +
    "    <li class=\"source-link\">\n" +
    "        <h4>\n" +
    "            <a ng-href=\"{{item.links[0].href}}\" title=\"{{item.title}}\">{{item.title | ltrim | truncate: 40: '...': true}}</a>\n" +
    "            <div class=\"small source-info\"><span class=\"fa fa-level-up fa-rotate-90\"></span> Available through {{item.links[0].name}}</div>\n" +
    "\n" +
    "        </h4>\n" +
    "    </li>\n" +
    "    <li ng-if=\"item.links[1]\">\n" +
    "        <ul class=\"source-link-more\" collapse=\"isCollapsed\">\n" +
    "            <li class=\"source-links\" ng-repeat=\"link in item.links | after:1\">\n" +
    "                <span class=\"fa fa-level-up fa-rotate-90 text-muted\"></span>  <a ng-href=\"{{link.href}}\" title=\"{{link.name}}\" class=\"source-link\">{{link.name | ltrim | truncate: 25: '...': true}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <button ng-show=\"item.links[1]\" type=\"button\" class=\"btn btn-collapser btn-link btn-sm btn-block\" ng-click=\"isCollapsed = !isCollapsed\">{{isCollapsed ? 'more' : 'less'}} sources</button>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("common/engines/google-cs/google-cs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/google-cs/google-cs.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.link}}\" title=\"{{item.title}}\">{{item.title | truncate: 40: '...': true}}</a></h4>\n" +
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
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.link}}\" title=\"{{item.descr}}\">{{item.descr}}</a></h4>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/scout/scout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/scout/scout.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.PLink}}\" title=\"{{item.Items[0].Data}}\">{{item.Items[0].Data | truncate: 40: '...': true}}</a></h4>\n" +
    "    </div>\n" +
    "</div>");
}]);
