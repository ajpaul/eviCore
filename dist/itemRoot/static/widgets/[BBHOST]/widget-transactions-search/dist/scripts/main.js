/* widget-transactions-search@v2.4.0 build with ♥ by bb-lp-cli@v1.9.12 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("base"),require("core"),require("module-transactions"),require("module-accounts"),require("module-contacts")):"function"==typeof define&&define.amd?define(["base","core","module-transactions","module-accounts","module-contacts"],t):"object"==typeof exports?exports["widget-transactions-search"]=t(require("base"),require("core"),require("module-transactions"),require("module-accounts"),require("module-contacts")):e["widget-transactions-search"]=t(e.base,e.core,e["module-transactions"],e["module-accounts"],e["module-contacts"])}(this,function(e,t,o,n,r){return function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="/_karma_webpack_//",t(0)}([function(e,exports,t){e.exports=t(1)},function(e,exports,t){var o;(function(e){"use strict";o=function(require,exports,e){function o(e,t,o,n,r){o.setConfig({endpoint:e.getPreference("categoryDataSrc")}),t.setConfig({accountsEndpoint:e.getPreference("accountsDataSrc")}),e.model&&e.model.name&&n.publish("cxp.item.loaded",{id:e.model.name})}o.$inject=["lpWidget","lpAccounts","lpTransactionsCategory","lpCoreBus","$timeout"],e.name="transactions-search";var n=t(3),r=t(4),c=t(5),a=t(6),s=t(7),i=[r.name,c.name,a.name,s.name];e.exports=n.createModule(e.name,i).controller(t(8)).run(o)}.call(exports,t,exports,e),!(void 0!==o&&(e.exports=o))}).call(exports,t(2)(e))},function(e,exports){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(t,exports){t.exports=e},function(e,exports){e.exports=t},function(e,exports){e.exports=o},function(e,exports){e.exports=n},function(e,exports){e.exports=r},function(e,exports,t){var o;o=function(require,exports){"use strict";exports.MainCtrl=function(e,t,o,n,r,c,a,s,i,u){n.assign(e,{showCategories:!1,showExportButton:n.parseBoolean(t.getPreference("showExportButton")),accounts:c,transactionsCategory:s.api(),contacts:new a({contacts:n.resolvePortalPlaceholders(t.getPreference("contactsDataSrc")),lazyload:!0})}),u.getCachedUserPrefs().then(function(t){e.showCategories=t.pfmEnabled}),r.all([e.accounts.getAll(),e.transactionsCategory.getAll(),e.contacts.loadContacts()]).then(function(){!c.selected&&c.accounts.length&&(c.selected=c.accounts[0])}),e.onPerformSearch=function(e){i.setFilter(e),o.publish("transactions-search:search:filter",e)},e.onClearSearch=function(){i.clearFilters(),o.publish("transactions-search:search:clear")},e.onUpdateSearch=function(){o.publish("transactions-search:search:update")},e.onChangeSort=function(e){o.publish("transactions-search:sort:change",e)},e.onExportTransactions=function(e){o.publish("transactions-search:transactions:export",e)}},exports.MainCtrl.$inject=["$scope","lpWidget","lpCoreBus","lpCoreUtils","$q","lpAccounts","ContactsModel","lpTransactionsCategory","lpTagsUtils","lpUsersPreference"]}.call(exports,t,exports,e),!(void 0!==o&&(e.exports=o))}])});
//# sourceMappingURL=main.js.map