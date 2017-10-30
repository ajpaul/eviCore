/* Build with bb-lp-cli @ v1.8.1 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("base"),require("core"),require("ui"),require("module-accounts")):"function"==typeof define&&define.amd?define(["base","core","ui","module-accounts"],t):"object"==typeof exports?exports["widget-p2p-preferences"]=t(require("base"),require("core"),require("ui"),require("module-accounts")):e["widget-p2p-preferences"]=t(e.base,e.core,e.ui,e["module-accounts"])}(this,function(e,t,i,n){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,exports,t){var i;(function(e){i=function(require,exports,e){"use strict";function i(e,t){e&&e.model&&e.model.name&&t.publish("cxp.item.loaded",{id:e.model.name})}i.$inject=["lpWidget","lpCoreBus"],e.name="widget-p2p-preferences";var n=t(2),r=t(3),o=t(4),c=t(5),l=t(6),u=[r.name,o.name,c.name,l.name];e.exports=n.createModule(e.name,u).controller(t(11)).run(i)}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))}).call(exports,t(1)(e))},function(e,exports){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(t,exports){t.exports=e},function(e,exports){e.exports=t},function(e,exports){e.exports=i},function(e,exports){e.exports=n},function(e,exports,t){e.exports=t(7)},function(e,exports,t){var i;(function(e){i=function(require,exports,e){"use strict";e.name="module-p2p";var i=t(2),n=t(3),r=[n.name];e.exports=i.createModule(e.name,r).provider(t(8)).service(t(9)).service(t(10))}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))}).call(exports,t(1)(e))},function(e,exports,t){var i;i=function(require,exports,e){"use strict";function t(e,t){var i={"email-service":e,"enroll-service":t};return{api:function(e){if("undefined"==typeof i[e])throw new Error("Unknown service "+e+" !!!");return i[e]}}}t.$inject=["EmailService","EnrollService"],exports.lpP2P=function(){this.$get=t}}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))},function(e,exports,t){var i;i=function(require,exports,e){"use strict";var i=t(2).utils,n={url:""},r={},o=function(e){this.fetch=e};o.$inject=["$http"],r.setConfig=function(e){return this.config=i.chain(e).mapValues(i.resolvePortalPlaceholders).defaults(n).value(),this},r.getConfig=function(e,t){return e&&i.isString(e)?this.config[e]||t:this.config},r.add=function(e){return this.fetch({method:"POST",url:this.config.url,data:{value:e}})},r.edit=function(e){return this.fetch({method:"PUT",url:this.config.url+e.id,data:{value:e.value,type:e.type}})},r.editType=function(e){return this.fetch({method:"PUT",url:this.config.url+e.id,data:{type:e.type}})},r["delete"]=function(e){return this.fetch({method:"DELETE",url:this.config.url+e.id,data:{type:e.type}})},i.assign(o.prototype,r),exports.EmailService=o}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))},function(e,exports,t){var i;i=function(require,exports,e){"use strict";function i(e){return e.data}function n(e){return e}var r=t(2).utils,o={url:""},c={},l=function(e){this.fetch=e};l.$inject=["$http"],c.setConfig=function(e){return this.config=r.chain(e).mapValues(r.resolvePortalPlaceholders).defaults(o).value(),this},c.getConfig=function(e,t){return e&&r.isString(e)?this.config[e]||t:this.config},c.getAll=function(){return this.fetch({url:this.config.url}).then(i).then(n)},c.enroll=function(e){return this.fetch({method:"POST",url:this.config.url,data:e})},c.edit=function(e){return this.fetch({method:"PUT",url:this.config.url,data:e})},c.editAccount=function(e){return this.fetch({method:"PUT",url:this.config.url,data:{accountNumber:e}})},c.verifyCode=function(e,t){return this.fetch({method:"PUT",url:this.config.url,data:{verification:{email:e,code:t}}})},r.assign(l.prototype,c),exports.EnrollService=l}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))},function(e,exports,t){var i;i=function(require,exports,e){"use strict";exports.P2PPreferencesController=function(e,t,i,n,r,o,c,l,u){var a=u,s=function(){e.locale=r.getPreference("locale"),e.p2pService=c.api("enroll-service").setConfig({url:i.resolvePortalPlaceholders(r.getPreference("p2pEnrollmentEndpoint"))}),e.p2pProvider={name:"Backbase P2P Service",icon:"lp-icon-bb-logo"},e.p2pUserDetails={depositAccount:{},emails:[]},e.emailErrors={messages:{invalid_email:"Invalid Email"},errors:[]},e.p2pService.getAll().then(function(t){e.userEnrolled=!0,e.p2pUserDetails.depositAccount={value:t.accountNumber,options:[]},e.p2pUserDetails.emails=[{value:t.email,primary:!0,verified:t.emailVerified}]},function(t){a.subscribe("launchpad-retail.userP2PEnrolled",function(t){e.$apply(function(){e.userEnrolled=t.enrolled,e.p2pUserDetails.depositAccount.value=t.enrollment.account.iban,e.p2pUserDetails.emails.push({value:t.enrollment.email.value,primary:!0,verified:!1})})}),e.userEnrolled=!1,404!==t.status&&(e.p2pService.error=!0)}),e.accountsModel=o,e.accountsModel.setConfig({accountsEndpoint:r.getPreference("accountsDataSrc")}),e.accountsModel.load().then(function(){e.p2pUserDetails.depositAccount.options=e.accountsModel.accounts}),e.currentEmail={},e.verify={validationError:!1,verificationCode:"",modalShown:!1},e.templates={verify:"templates/verify-email.html"}};e.validateEmail=function(e){var t=i.isValidEmail(e);return t?!0:"invalid_email"},e.saveEmail=function(t,i){i.value||(i.value=""),i.verified=!1,e.p2pService.edit({email:i.value}),a.publish("launchpad-retail.userP2PVerification.unverified")},e.beginVerification=function(t){e.currentEmail=t,e.verify.modalShown=!0},e.handleEmailVerification=function(){e.p2pService.verifyCode(e.currentEmail.value,e.verify.verificationCode).then(function(t){200===t.status&&(e.currentEmail.verified=!0,e.verify.modalShown=!1,e.verify.verificationCode="",e.verify.validationError=!1)},function(t){409===t.status&&(e.verify.validationError=!0)})},e.closeVerifyModal=function(){e.verify.modalShown=!1,e.verify.verificationCode="",e.verify.validationError=!1},e.saveAccount=function(t){e.p2pService.edit({accountNumber:t})},e.enroll=function(){a.publish("launchpad-retail.openP2PEnrollment")},s()},exports.P2PPreferencesController.$inject=["$scope","$templateCache","lpCoreUtils","$timeout","lpWidget","AccountsModel","lpP2P","i18nUtils","lpCoreBus"]}.call(exports,t,exports,e),!(void 0!==i&&(e.exports=i))}])});
//# sourceMappingURL=main.js.map