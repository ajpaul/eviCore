!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("base"),require("core")):"function"==typeof define&&define.amd?define(["base","core"],e):"object"==typeof exports?exports["module-p2p"]=e(require("base"),require("core")):t["module-p2p"]=e(t.base,t.core)}(this,function(t,e){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var i;(function(t){i=function(require,t,e){"use strict";e.name="module-p2p";var i=n(2),r=n(3),o=[r.name];e.exports=i.createModule(e.name,o).provider(n(4)).service(n(5)).service(n(6))}.call(e,n,e,t),!(void 0!==i&&(t.exports=i))}).call(e,n(1)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){var i;i=function(require,t,e){"use strict";function n(t,e){var n={"email-service":t,"enroll-service":e};return{api:function(t){if("undefined"==typeof n[t])throw new Error("Unknown service "+t+" !!!");return n[t]}}}n.$inject=["EmailService","EnrollService"],t.lpP2P=function(){this.$get=n}}.call(e,n,e,t),!(void 0!==i&&(t.exports=i))},function(t,e,n){var i;i=function(require,t,e){"use strict";var i=n(2).utils,r={url:""},o={},c=function(t){this.fetch=t};c.$inject=["$http"],o.setConfig=function(t){return this.config=i.chain(t).mapValues(i.resolvePortalPlaceholders).defaults(r).value(),this},o.getConfig=function(t,e){return t&&i.isString(t)?this.config[t]||e:this.config},o.add=function(t){return this.fetch({method:"POST",url:this.config.url,data:{value:t}})},o.edit=function(t){return this.fetch({method:"PUT",url:this.config.url+t.id,data:{value:t.value,type:t.type}})},o.editType=function(t){return this.fetch({method:"PUT",url:this.config.url+t.id,data:{type:t.type}})},o["delete"]=function(t){return this.fetch({method:"DELETE",url:this.config.url+t.id,data:{type:t.type}})},i.assign(c.prototype,o),t.EmailService=c}.call(e,n,e,t),!(void 0!==i&&(t.exports=i))},function(t,e,n){var i;i=function(require,t,e){"use strict";function i(t){return t.data}function r(t){return t}var o=n(2).utils,c={url:""},u={},f=function(t){this.fetch=t};f.$inject=["$http"],u.setConfig=function(t){return this.config=o.chain(t).mapValues(o.resolvePortalPlaceholders).defaults(c).value(),this},u.getConfig=function(t,e){return t&&o.isString(t)?this.config[t]||e:this.config},u.getAll=function(){return this.fetch({url:this.config.url}).then(i).then(r)},u.enroll=function(t){return this.fetch({method:"POST",url:this.config.url,data:t})},u.edit=function(t){return this.fetch({method:"PUT",url:this.config.url,data:t})},u.editAccount=function(t){return this.fetch({method:"PUT",url:this.config.url,data:{accountNumber:t}})},u.verifyCode=function(t,e){return this.fetch({method:"PUT",url:this.config.url,data:{verification:{email:t,code:e}}})},o.assign(f.prototype,u),t.EnrollService=f}.call(e,n,e,t),!(void 0!==i&&(t.exports=i))}])});