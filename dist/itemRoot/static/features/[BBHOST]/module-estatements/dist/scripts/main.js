!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("base"),require("core")):"function"==typeof define&&define.amd?define(["base","core"],e):"object"==typeof exports?exports["module-estatements"]=e(require("base"),require("core")):t["module-estatements"]=e(t.base,t.core)}(this,function(t,e){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var o;(function(t){o=function(require,t,e){"use strict";e.name="module-estatements";var o=n(2),r=n(3),i=[r.name];e.exports=o.createModule(e.name,i).provider(n(4))}.call(e,n,e,t),!(void 0!==o&&(t.exports=o))}).call(e,n(1)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){var o;o=function(require,t,e){"use strict";var n="estatementListEndpoint",o="estatementEnrollmentEndpoint";t.lpEstatements=function(){var t={estatementListEndpoint:"/mock/v1/documents",estatementEnrollmentEndpoint:"/mock/v1/enrollment"};this.$get=function(e,r,i,s){var u=function(t){i.isObject(t)&&this.setConfig(t)};return u.prototype.setConfig=function(e){return this.config=i(e).chain().mapValues(i.resolvePortalPlaceholders).defaults(t).value(),this},u.prototype.getConfig=function(t){return t&&i.isString(t)?this.config[t]:this.config},u.prototype.getAttribute=u.prototype.getConfig,u.prototype.getAll=function(){return e.get(this.getAttribute(n)).then(function(t){return i(t.data.documents).groupBy(function(t){return t.description}).map(function(t,e){return{name:e,documents:t}}).value()})},u.prototype.getEnrollmentStatus=function(){var t=this,n=r.defer();return e.get(t.getAttribute(o)).then(function(t){n.resolve(!!(t&&t.data&&+t.data.status))}),n.promise},u.prototype.setEnrollmentStatus=function(t){var n=this,i=r.defer(),s=t?1:0;return e({url:n.getAttribute(o),method:"PUT",data:JSON.stringify({status:s}),headers:{"Content-Type":"application/json"}}).then(function(t){i.resolve(!(!t||!t.data||"OK"!==t.data.status))}),i.promise},new u(t)},this.$get.$inject=["$http","$q","lpCoreUtils","lpCoreConfiguration"]}}.call(e,n,e,t),!(void 0!==o&&(t.exports=o))}])});