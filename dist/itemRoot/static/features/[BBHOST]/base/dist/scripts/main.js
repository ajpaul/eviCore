/* base@v3.0.4 build with ♥ by bb-lp-cli@v1.9.11 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery"),require("angular"),require("lodash")):"function"==typeof define&&define.amd?define(["jquery","angular","lodash"],t):"object"==typeof exports?exports.base=t(require("jquery"),require("angular"),require("lodash")):e.base=t(e.jquery,e.angular,e.lodash)}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,exports,t){e.exports=t(1)},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(2),o=window,i=n.NS;o[i]=o[i]||{},exports.NS=i,exports.$=t(3),t(4),exports.ng=window.angular,exports.utils=t(5),exports.bus=t(10),exports.Promise=t(11),exports.fetch=t(12),exports.log=t(13),exports.error=t(14),exports.queue=t(15),exports.notification=t(16),exports.Widget=t(19),exports.portal=t(20),exports.startPortal=t(21),exports.getWidgetsInfo=t(25),exports.createModule=t(26),exports.performance=t(27),exports.requireWidget=o.requireWidget||t(28),exports.bootstrap=function(e,t){return exports.ng.bootstrap(e,t)},exports.inject=function(e,t){var n=["ng"];return exports.utils.isEmpty(t)||n.push(t),exports.ng.injector(n).get(e)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";exports.NS="launchpad"}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(t,exports){t.exports=e},function(e,exports){e.exports=t},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(6).noConflict();n.mixin(t(7)),n.mixin(t(8)),n.mixin(t(9)),e.exports=n}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports){e.exports=n},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(6),o=t(2).NS,i=window;exports.isMobileDevice=function(){if(i[o].mobileSDK)return!0;for(var e=[/iPhone|iPad|iPod/i,/Android/i,/BlackBerry/i,/Opera Mini/i,/IEMobile/i,/MeeGo/i],t=0,n=e.length;n>t;t++)if(navigator.userAgent.match(e[t]))return!0;return!1},exports.isb$Mocked=function(){var e=i.b$;return n.isUndefined(e)||Boolean(e.isMocked)===!0||n.isUndefined(e.bdom)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(6);exports.resolvePortalPlaceholders=function(e){var t=n.get(window,"b$.portal.config.serverRoot","");if(n.isString(e)){var o=["$(contextRoot)","$(contextPath)","$(servicesPath)"];e=n.reduce(o,function(e,n){return e.replace(n,t)},e)}return e}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(6);exports.deprecate=function(e,t,o){function i(e){var t=n.template(e),i=window.console,r=t(o);!a&&n.isObject(i)&&(i.warn(r),a=!0)}function r(){return i(t),e.apply(this,arguments)}var s=window.launchpad&&window.launchpad.config&&window.launchpad.config.usemin;if(s)return e;var a=!1;return n.isString(e)||!s?i(e):r}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";e.exports=window.gadgets&&window.gadgets.pubsub||{publish:function(){},subscribe:function(){}}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";t(4);var n=window.angular;e.exports=window.Promise||function(e){var t=n.extend(function(t){var n=e.defer();return t(n.resolve,n.reject),n.promise},e);return t.resolve=function(t){return e.when(t)},t}(n.injector(["ng"]).get("$q"))}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};n=function(require,exports,e){"use strict";t(4);var n=window.angular,i=function(){function e(){var e="; "+document.cookie,n="",o=t();if(n=e.split("; "+o+"="),2==n.length){var i=n.pop().split(";").shift();return i}}function t(){return i}function n(){return o}var o="X-BBXSRF",i="BBXSRF";return{getToken:e,getRequestHeaderName:n}}();e.exports=function(e){return function(t,r){return r=("object"===("undefined"==typeof t?"undefined":o(t))?t:r)||{},r.xsrf!==!1&&r.method&&"GET"!==r.method.toUpperCase()&&(r.headers=r.headers||{},r.headers[i.getRequestHeaderName()]=i.getToken()),e(n.extend({url:t,method:"get",responseHeaders:{"cache-control":"no-cache"}},r))}}(n.injector(["ng"]).get("$http"))}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";t(4);var n=window.angular;e.exports=n.injector(["ng"]).get("$log")}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";exports.captureException=function(e,t){},exports.createException=function(e){function t(t){this.name=e||"Error",this.message=t||"Unknown Message"}return t.prototype=new Error,t.prototype.constructor=t,t}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function n(e){for(var t=0,n=[];t<s.length;)s[t].contextId===e?n.push(s.splice(t,1)[0]):t++;return n}function o(e,t){var o=[],r=t?n(t):s;if("clear"===e)r.length=0;else for(;r.length;)o.push(r.shift()[e]());return i.all(o)}var i=t(11),r={__onPushCallbacks:[]},s=[];r.queue=s,r.__runPushCallbacks=function(e,t){r.__onPushCallbacks.forEach(function(n){n(e,t)})},r.push=function(e,t){return new i(function(n,o){var a={contextId:e.contextId,retry:function(){return i.resolve(t()).then(n,o)},cancel:o};s.push(a),r.__runPushCallbacks(e,a)})},r.hasMore=function(){return s.length>0},r.onPush=function(e){r.__onPushCallbacks.push(e)},r.retry=function(e){return e.retry().then(function(){return o("clear",e.contextId)})},r.cancel=function(e){return o("cancel",e.contextId)},e.exports=r}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";exports.network=t(17),exports.userActivity=t(18)}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function n(e){s.publish("launchpad.add-notification",a.merge({notification:{container:{template:"templates/offline.html"},id:"offline-notification",level:"info",message:"Network connection has been lost.",closable:!0}},e))}function o(){s.publish("launchpad.remove-notification",{notification:{id:"offline-notification"}})}var i=t(3),r=t(2).NS,s=t(10),a=t(5),c={offline:r+".network.offline",online:r+".network.online"};e.exports=function(){i(window).on("offline",n).on("online",o),s.subscribe(c.offline,n),s.subscribe(c.online,o)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function n(){r.publish(s.userActivity)}var o=t(3),i=t(2).NS,r=t(10),s={userActivity:i+".user.activity"};e.exports=function(){o(document).on("click keypress",n)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(5),o=window;o.b$;if(n.isb$Mocked())return!1;var i=o.b$.bdom.getNamespace("http://backbase.com/2013/portalView"),r=e.exports=i.getClass("backbaseWidget");r.prototype.createDisplay=function(e){this._displayed=this._displayed||e;var t=!bd.designMode&&!this._displayed&&"LauncherContainer"===this.parentNode.tagName&&("2"===this.getPreference("area")||"3"===this.getPreference("area"))&&this.getPreference("widgetChrome").indexOf("chrome-tab")>-1;t||(this._displayed=!0,this.constructor.superClass.prototype.createDisplay.call(this))},r.prototype.getPreferenceFromParents=function(e){var t=function n(e,t){var o;return t.getPreference&&"application"!==t.tagName&&(o=t.getPreference(e),!o&&t.parentNode&&(o=n(e,t.parentNode))),o};return t(e,this)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";e.exports=function(){}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(5),o=t(12),i=t(22),r=t(19),s=t(24),a=t(16),c=t(3),u=function(e){var t=window.be&&window.be.xmlToJson;return t({xml:e})};e.exports=function(e,t){var l=t.portalView.getElementsByTagName("page")[0],f=function(e){var n={logoutUrl:e.serverRoot+"/j_spring_security_logout?portalName="+t.portalName,redirectUrl:e.serverRoot+e.defaultLandingPage,sessionUrl:e.sessionEndpoint,pingUrl:e.sessionValidateEndpoint,startCountdown:e.startCountdownAt,pingInterval:e.sessionCheckInterval,notifyAfterTimeoutDuration:e.notifyAfterTimeoutDuration,userLoggedIn:!!t.loggedInUserId};JSON.parse(l.getPreference("enableTimeout")||!1)&&(a.userActivity(),i.getInstance(n).init())},d=function(){var e=[t.config.serverRoot,"portals",t.portalName+".xml?pc=false"].join("/"),i=function(e){"string"==typeof e&&(e=c.parseXML(e));var o=u(e);return t.config=n.chain(o.portal.properties).mapValues("value").mapKeys(function(e,t){return n.camelCase(t)}).assign(t.config).value(),t.config};return o({url:e,responseType:"document",transformResponse:i}).then(function(e){return e.data})},p=function(e){var o=window.bd&&window.bd.uiEditingOptions;return e.chromes=o&&o.widgetPreferenceSelections?o.widgetPreferenceSelections.widgetChrome:[],n.assign(r,s(e.chromes,t)),e};return d(t).then(p).then(f)}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(5),o=t(13),i=t(12),r=t(23),s=t(2).NS,a=t(10),c={userActivity:s+".user.activity"},u={Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"};e.exports=function(){function e(e){e=e||{},l=n.chain(e).defaults(d).mapValues(n.resolvePortalPlaceholders).value(),this.sessionStorage=e.store||window.sessionStorage,this.isPollingStarted=!1,this.hasSession=!1}function t(e,t){return e=e>=1?e-1:0,1>=e&&t(),e}var s,l,f,d={pingUrl:"$(servicesPath)/services/rest/v1/authentication/session",logoutUrl:"$(contextRoot)/j_spring_security_logout",keepAlive:!0,startCountdown:6e4,notifyAfterInterval:5e3,pingInterval:3e4,sessionExpiredKey:"launchpad.sessionExpired",maxConsecutiveFailCount:3,userLoggedIn:!1};return e.prototype.init=function(){this.validSessionExisted=!1,this.userEventsOccurred=!1,this.consecutiveFailCount=0,r.afterTimeout(l),l.userLoggedIn&&this.startPolling();var e=this;a.subscribe(c.userActivity,function(){e.userEventsOccurred=!0,f&&e.clearSessionWarning(!0)})},e.prototype.startPolling=function(e){window.setTimeout(this.ping.bind(this),e||l.pingInterval)},e.prototype.ping=function(e){this.isPollingStarted||(this.isPollingStarted=!0,this.makeSessionRequest.apply(this,e||this.userEventsOccurred?[l.pingUrl,{method:"PUT"}]:[l.pingUrl+"/validate",{}]))},e.prototype.makeSessionRequest=function(e,t){i(e,t).then(this.handleStateResponse.bind(this),this.handleNetworkError.bind(this))},e.prototype.handleStateResponse=function(e){this.isPollingStarted=!1,this.userEventsOccurred=!1,r.dataFreshness(e.data),r.checkBages(),this.validSessionExisted=!0,this.consecutiveFailCount>=l.maxConsecutiveFailCount&&r.clearOfflineWarning(),this.consecutiveFailCount=0;var t=1e3*e.data.remainingTime;t>l.startCountdown?this.clearSessionWarning():this.startSessionWarning(e.data.remainingTime)},e.prototype.logError=function(e){o.error("SessionHandler: ",e)},e.prototype.handleNetworkError=function(e){e=e||{},this.isPollingStarted=!1,this.validSessionExisted&&401===e.status?(this.sessionStorage.clear(),this.sessionStorage.setItem("launchpad.sessionExpired","true"),this.clearSessionWarning(!1,!0),this.logout()):0===e.status&&"timeout"===e.statusText?(this.consecutiveFailCount++,this.consecutiveFailCount<l.maxConsecutiveFailCount?(this.clearSessionWarning(!1,!0),this.startPolling(1e3)):(r.offlineWarning(),this.startPolling())):401!==e.status&&(this.logError("Unknown error Problem validating session: "+e.statusText),this.startPolling())},e.prototype.logout=function(){var e=this;return i(l.logoutUrl,{method:"POST",headers:u}).then(function(t){var n=parseInt(t.status,10);n>=200&&300>n||304===n?window.location.href=l.redirectUrl:e.logError(t.message)})},e.prototype.startSessionWarning=function(e){var n=this;f||(r.sessionWarning(e),e=t(e,n.ping.bind(n)),f=window.setInterval(function(){r.sessionWarning(e),e=t(e,n.ping.bind(n))},1e3),n.startPolling())},e.prototype.clearSessionWarning=function(e,t){e?this.ping(!0):(f&&(window.clearInterval(f),r.removeNotification(),f=null),t||this.startPolling())},{getInstance:function(t){return n.isUndefined(s)&&(s=new e(t)),s}}}()}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(10);exports.checkBages=function(){n.publish("lpBadgesGetItems")},exports.dataFreshness=function(e){var t="TheDataIsMostRecent",o=-1;e&&e.hasOwnProperty(t)&&(o="false"===e[t]||e[t]===!1?1:0),n.publish("lpDataFreshnessValidate",o)},exports.offlineWarning=function(){n.publish("launchpad.add-notification",{notification:{id:"offline-warning",level:"WARNING",message:"Experiencing connectivity problems. Please check your internet connection",closable:!1}})},exports.clearOfflineWarning=function(){n.publish("launchpad.remove-notification",{notification:{id:"offline-warning"}})},exports.sessionWarning=function(e){n.publish("launchpad.add-notification",{notification:{id:"session-timeout",level:"WARNING",timeLeft:e,message:"Session is about to expire",values:{secondsLeft:e},closable:!1,links:[{rel:"/timeout/continue",uri:window.location.hash||"#"}]}})},exports.removeNotification=function(){n.publish("launchpad.remove-notification",{notification:{id:"session-timeout"}})},exports.afterTimeout=function(e){window.sessionStorage.getItem(e.sessionExpiredKey)&&(window.setTimeout(function(){n.publish("launchpad.add-notification",{notification:{id:"session-expired",level:"INFO",message:"Your session has expired. Please login again.",closable:!0}})},e.notifyAfterTimeoutDuration||5e3),window.sessionStorage.removeItem(e.sessionExpiredKey))}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(5);e.exports=function(e,t){e=e||[];var o=function(e){return"widgetChrome"===e.name&&(!e.inputType.options||0===e.inputType.options.length)};return{handlers:{"preferences-form":function(i){var r=i.detail.context,s=t.portalModel.filterPreferences(r.model.preferences.array);i.detail.customPrefsModel=n.each(s,function(t){o(t)&&(t.inputType.name="select-one",t.inputType.options=e)})}}}}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function n(e,t){var o,r=[];if(t)for(var s in e)o=n(e[s]),r=r.concat(o);else if(e.childNodes&&e.childNodes.length||e._children&&e._children.length){var a=(e.childNodes||[]).concat(e._children||[]);a.forEach(function(e){o=n(e),r=r.concat(o)})}else"widget"===e.tag&&r.push({name:e.extendedItemName,version:"x.x.x",src:e.originalItem.preferences.src.value.replace("$(contextRoot)",c.config.serverRoot).replace("index.html","")});return i.chain(r).uniq("name").sortBy("name").value()}var o=t(2).NS,i=t(5),r=t(11),s=t(12),a=window,c=a.b$&&a.b$.portal;a[o].getWidgetsInfo=e.exports=function(){var e=a.b$.portal.portalModel.all,t=n(e,!0),o=t.map(function(e){return s(e.src+"bower.json").then(function(t){e.version=t.data.version},function(){e.version="Can't fetch bower.json"})});r.all(o).then(function(){console.table(t)})}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";var n=t(2).NS;t(4);var o=window.angular,i=function(e){try{o.module(e)}catch(t){return!1}return!0};e.exports=function(e,t){e=[n,e].join(".");var r;if(e.indexOf("widget-")>-1){var s=e+".templates";i(s)?(t.push(s),r=o.module(e,t),r.factory("templateCacheInjector",["$templateCache","lpCoreTemplate",function(e,t){return{put:function(n,o){return n=t.resolvePath(n),e.put(n,o)}}}])):r=o.module(e,t)}else r=o.module(e,t);return r}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){var n;n=function(require,exports,e){"use strict";function n(e){var t={operation:e.operation};return e.id&&(t.id=e.id),e.sender&&(t.operation="["+e.sender+"] "+t.operation),e.tags&&e.tags.length&&(t.operation=t.operation+" | "+JSON.stringify(e.tags)),t}var o=t(2).NS,i=t(10),r=t(5),s={start:o+".performance.start",end:o+".performance.end"};e.exports=function(e){return e=r.defaults(e||{},{bus:i,events:s}),{start:function(t,o){o=o||{},o.operation=t,e.bus.publish(e.events.start,n(o))},end:function(t,o){o=o||{},o.operation=t,e.bus.publish(e.events.end,n(o))}}}}.call(exports,t,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(t,o){"object"===n(exports)?e.exports=o():t.requireWidget=o()}(void 0,function(){function e(e){if(String.prototype.trim)return e.trim();var t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;return e.replace(t,"")}function t(e){return"function"==typeof e}function o(e){return"object"===("undefined"==typeof e?"undefined":n(e))&&!(e instanceof Array)}function i(e){return o(e)&&"undefined"!=typeof e._invokeQueue}function r(t,n,o){try{o=e(o);var i=new RegExp("^((https?|file)://|/)","i");i.test(o)||(o=o.replace(/.js$/,"")),o=t.replace(/[^\/]*$/,"").replace(new RegExp("^"+n),"")+o}catch(r){throw console.log("Error while normalizing module path."),r}return o}function s(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function a(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}function c(e){var t="lp-widget-loading",n=e.body;e.loading=function(e){t=e||t,s(n,t)},e.loaded=function(e){a(n,t),"string"==typeof e&&s(n,e)}}function u(e){function t(e){return e.xsrf!==!1&&"GET"!==e.method&&(e.headers[f.getRequestHeaderName()]=f.getToken()),e}e.config(["$httpProvider",function(e){e.interceptors.push(function(){return{request:t}})}])}function l(){window.jQuery&&window.jQuery.ajaxPrefilter(function(e,t,n){e.xsrf!==!1&&"GET"!==e.type.toUpperCase()&&n.setRequestHeader(f.getRequestHeaderName(),e.xsrf||f.getToken())})}var f=function(){function e(){var e="; "+document.cookie,n="",o=t();if(n=e.split("; "+o+"="),2==n.length){var i=n.pop().split(";").shift();return i}}function t(){return i}function n(){return o}var o="X-BBXSRF",i="BBXSRF";return{getToken:e,getRequestHeaderName:n,getCookieName:t,getFieldName:t}}();return window.launchpad=window.launchpad||{},window.launchpad.xsrf=f,l(),function(e,n){var s=window.requirejs;if(t(s)){var a=e.myDefinition;n=r(a?a.sUrl:"",s.s.contexts._.config.baseUrl,n),c(e),s([n],function(n){t(n)?n.call(null,e):i(n)?s(["angular","core"],function(t){n.config(["lpCoreWidgetProvider","lpCoreI18nProvider","lpCoreTemplateProvider",function(t,n,o){t.useWidgetInstance(e),n.useWidgetInstance(e),o.useWidgetInstance(e)}]),u(n),t.bootstrap(e.body||e,[n.name])}):o(n)&&t(n.run)&&("string"==typeof e&&(e="undefined"!=typeof window.jQuery?window.jQuery(e):window.document.querySelectorAll(e)),n.run.call(null,e))})}}})}])});
//# sourceMappingURL=main.js.map