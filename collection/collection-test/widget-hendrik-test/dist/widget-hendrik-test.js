/* widget-hendrik-test@v0.1.0-alpha.0 build with ♥ by bb-lp-cli@v1.9.17 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("base"),require("core"),require("ui")):"function"==typeof define&&define.amd?define(["base","core","ui"],t):"object"==typeof exports?exports["widget-hendrik-test"]=t(require("base"),require("core"),require("ui")):e["widget-hendrik-test"]=t(e.base,e.core,e.ui)}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/",t(0)}([function(e,exports,t){e.exports=t(1)},function(e,exports,t){var n;(function(e){"use strict";n=function(require,exports,e){function n(){}e.name="widget-hendrik-test";var o=t(3),r=t(4),i=t(5),c=t(6),u=t(7),s=[r.name,i.name];e.exports=o.createModule(e.name,s).constant("WIDGET_NAME",e.name).controller("MainCtrl",u).factory("model",c).run(n)}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))}).call(exports,t(2)(e))},function(e,exports){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(t,exports){t.exports=e},function(e,exports){e.exports=t},function(e,exports){e.exports=n},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function t(e,t){var n=t,o={title:e.getPreference("title"),icon:n.resolvePortalPlaceholders(e.getPreference("thumbnailUrl"))},r={};return r.getState=function(){return o},r}t.$inject=["lpWidget","lpCoreUtils"],e.exports=t}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function t(e,t,n){this.state=e.getState(),this.utils=n,this.widget=t}t.$inject=["model","lpWidget","lpCoreUtils"],t.prototype.btnClick=function(){window.gadgets.pubsub.publish("hendrik.events.loadContainer")},t.prototype.$onInit=function(){},e.exports=t}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))}])});
//# sourceMappingURL=widget-hendrik-test.js.map