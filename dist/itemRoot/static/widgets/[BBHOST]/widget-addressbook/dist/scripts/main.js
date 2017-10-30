/* widget-addressbook@v3.1.5 build with ♥ by bb-lp-cli@v1.9.7 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-payments"),require("module-transactions"),require("module-accounts")):"function"==typeof define&&define.amd?define(["base","core","ui","module-contacts","module-payments","module-transactions","module-accounts"],e):"object"==typeof exports?exports["widget-addressbook"]=e(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-payments"),require("module-transactions"),require("module-accounts")):t["widget-addressbook"]=e(t.base,t.core,t.ui,t["module-contacts"],t["module-payments"],t["module-transactions"],t["module-accounts"])}(this,function(t,e,n,c,o,a,r){return function(t){function e(c){if(n[c])return n[c].exports;var o=n[c]={exports:{},id:c,loaded:!1};return t[c].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/_karma_webpack_//",e(0)}([function(t,exports,e){t.exports=e(1)},function(t,exports,e){var n;(function(t){"use strict";n=function(require,exports,t){function n(t,e,n,c,o,a){n.setConfig({paymentsEndpoint:t.getPreference("paymentOrdersDataSrc")}),c.setConfig({transactionsEndpoint:t.getPreference("transactionsEndpoint")||e.resolvePortalPlaceholders("$(contextPath)/services/rest/v1/current-accounts/$(accountId)/transactions"),pageSize:5}),t.model&&o.publish("cxp.item.loaded",{id:t.model.name}),a.setConfig({accountsEndpoint:t.getPreference("accountsDataSrc"),filter:"cards"})}n.$inject=["lpWidget","lpCoreUtils","lpPayments","lpTransactions","lpCoreBus","lpAccounts"],t.name="widget-addressbook";var c=e(3),o=e(4),a=e(5),r=e(6),s=e(7),l=e(8),i=e(9),d=[o.name,a.name,r.name,s.name,i.name,l.name];t.exports=c.createModule(t.name,d).controller(e(10)).run(n)}.call(exports,e,exports,t),!(void 0!==n&&(t.exports=n))}).call(exports,e(2)(t))},function(t,exports){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(e,exports){e.exports=t},function(t,exports){t.exports=e},function(t,exports){t.exports=n},function(t,exports){t.exports=c},function(t,exports){t.exports=o},function(t,exports){t.exports=a},function(t,exports){t.exports=r},function(t,exports,e){var n;n=function(require,exports,t){"use strict";exports.ContactsController=function(t,e,n,c,o,a,r,s,l,i,d,u){var f=3e3,m=i,p=n,C=function(){t.contactsModel.loadContacts().error(function(){t.addAlert("SERVICE_UNAVAILABLE","error",!1)})},y=function(){var n={contacts:d.resolvePortalPlaceholders(p.getPreference("contactListDataSrc")),contactData:d.resolvePortalPlaceholders(p.getPreference("contactDataSrc")),contactDetails:d.resolvePortalPlaceholders(p.getPreference("contactDetailsDataSrc")),locale:p.getPreference("locale"),lazyload:!0};t.contactsModel=new c(n),s.loadMessages(p,t.locale).success(function(e){t.messages=e.messages}),t.contactsModel.disableSelection=!1,t.title=p.getPreference("title"),C(),m.subscribe("launchpad.contacts.load",function(){e(function(){C()})})},M=function(){t.accountsModel||(t.accountsModel=u),t.lpTransactions||(t.lpTransactions=a.api())},h=function(){t.contactFields=[];var e=t.contactsModel.currentDetails;d.forEach(t.allContactFields,function(n){var c=n.key;e.hasOwnProperty(c)&&null!==e[c]||t.contactFields.push(n)})};t.contactChangeView=function(e){t.contactsModel.moduleState!==e&&(t.contactsModel.moduleState=e,"contactsEdit"!==e&&"contactsAdd"!==e||h()),t.contactsModel.disableSelection="contactsView"!==e},t.addContact=function(){if(!t.contactsModel.disableSelection){var e=d.generateUUID(),n=t.contactsModel;n.selected=null,t.copyCurrentContact(),M(),n.currentContact={photoUrl:null,partyId:l,id:e,name:"",account:"",isNew:!0},n.currentDetails={id:e},t.contactChangeView("contactsAdd")}};var g=function(e){var n=t.accountsModel,c=n.accounts,o=n.findByAccountNumber(p.getPreferenceFromParents("defaultAccount"));void 0===t.defaultAccount&&(t.defaultAccount=o?o:c[0],n.selected=o?o:c[0]),c&&c.length>0&&(t.lpTransactions.setFilters({contact:e.account}),t.lpTransactions.loadTransactions(t.defaultAccount)),t.$broadcast("contactSelected",e)},v=function(e){if(M(),t.accountsModel.accounts.length)g(e);else{var n=t.accountsModel.load();n.then(function(){g(e)})}};t.selectContact=function(e){t.contactsModel.selectContact(e),e.account||e.email?v(e):t.lpTransactions.clearTransactionsList(),t.$broadcast("contactSelected",e)},t.launchTransactionsForContact=function(t){m.publish("launchpad-retail.transactions.applyFilter",{contactName:t.name,filters:{contact:t.account}})};var w=function(e){var n=!0;return t.errors={},d.forEach(t.allContactFields,function(c){var o=c.key,a=e[o];if(c.validate&&a){var r=c.validate(a);r&&(t.errors[o]=r,n=!1)}}),n};t.alert={messages:{SAVED_SUCCESSFULLY:"Contact was saved successfully.",SAVED_ERROR:"There was an error while saving contact.",SERVICE_UNAVAILABLE:"Unfortunately, this service is unavailable."}},t.alerts=[],t.addAlert=function(n,c,o){var a={type:c||"error",msg:t.alert.messages[n]};t.alerts.push(a),o!==!1&&e(function(){t.closeAlert(t.alerts.indexOf(a))},f)},t.closeAlert=function(e){t.alerts.splice(e,1)},t.clearAlerts=function(){t.alerts=[]},t.submitContact=function(e){if(!w(t.contactsModel.currentDetails)||!e)return!1;var n;n=t.contactsModel.currentContact.isNew?t.contactsModel.createContact(e):t.contactsModel.updateContact(e),n.success(function(e){t.contactsModel.currentContact.isNew=!1,v(t.contactsModel.currentContact),t.addAlert("SAVED_SUCCESSFULLY","success")}).error(function(e){t.addAlert("SAVED_ERROR","error")})};var S=function(e){for(var n=-1,c=0,o=t.contactsModel.contactDetailsData.length;o>c;c++){var a=t.contactsModel.contactDetailsData[c];if(a.id===e.id){n=c;break}}n>-1&&(t.contactsModel.contactDetailsData[c]=d.clone(e))};t.cancelForm=function(){"contactsAdd"===t.contactsModel.moduleState?(t.contactsModel.originalContact?t.contactsModel.currentContact=t.contactsModel.originalContact:t.contactsModel.currentContact=null,t.contactChangeView("contactsView")):"contactsEdit"===t.contactsModel.moduleState?(t.contactsModel.currentContact=t.contactsModel.originalContact,S(t.contactsModel.originalDetails),t.contactsModel.contacts[t.contactsModel.idx]=t.contactsModel.originalContact,t.contactChangeView("contactsView")):t.contactChangeView("contactsNone"),t.contactsModel.refreshModel()},t.editContact=function(){t.copyCurrentContact(),t.contactChangeView("contactsEdit")},t.addFormField=function(e){t.contactsModel.currentDetails||(t.contactsModel.currentDetails={id:t.contactsModel.currentContact.id}),t.contactsModel.currentDetails[e]||(t.contactsModel.currentDetails[e]=""),h()},t.deleteFormField=function(e){delete t.contactsModel.currentDetails[e],h()},t.canAddFields=function(){return t.contactFields.length>0},t.copyCurrentContact=function(){t.contactsModel.originalContact=d.clone(t.contactsModel.currentContact),t.contactsModel.originalDetails=d.clone(t.contactsModel.currentDetails)},t.filterContactData=function(t){var e={},n=["address","city","state","dateOfBirth","email","phone"];return d.forEach(t,function(t,c){null!==t&&n.forEach(function(n){n===c&&(e[c]=t)})}),e},t.allContactFields=[{text:"Phone",key:"phone",validate:function(t){var e=/^\+?([0-9]{2})\)?[\-. ]?([0-9]{4})[\-. ]?([0-9]{4})$/;return t.match(e)?!1:"Phone number must have 10 digits."}},{text:"E-mail",key:"email"},{text:"Birthday",key:"dateOfBirth"},{text:"Address",key:"address"},{text:"City",key:"city"},{text:"State",key:"state"}],t.contactFields=[],t.$watch("contactsModel.moduleState",function(e){e&&(t.contactsModel.template="templates/"+e+".html")}),t.$watch("contactsModel.contacts",function(n){n.length>0?(t.contactsModel.moduleState="contactsView",t.waitToLoadContactPromise&&e.cancel(t.waitToLoadContactPromise),"large"===t.widgetSize&&(t.waitToLoadContactPromise=e(function(){t.contactsModel.currentContact?t.selectContact(t.contactsModel.currentContact):t.selectContact(t.contactsModel.contacts[0])},300))):t.contactsModel.moduleState="contactsNone"}),t.decodePhotoUrl=function(t){return t?decodeURIComponent(t):d.defaultProfileImage},t.$watch("search",function(n){if(t.filteredContacts=[],n){t.filter=!0;var c=n.toLowerCase();d.forEach(t.contactsModel.contacts,function(e){if(d.isString(e.name)){var n=e.name.toLowerCase(),o=d.isString(e.account)?e.account.toLowerCase():"";-1===n.indexOf(c)&&-1===o.indexOf(c)||t.filteredContacts.push(e)}}),"large"===t.widgetSize&&(t.waitToLoadContactPromise&&e.cancel(t.waitToLoadContactPromise),t.waitToLoadContactPromise=e(function(){t.filteredContacts.length&&t.selectContact(t.filteredContacts[0])},300))}else t.filter=!1,t.contactsModel.contacts.length&&"large"===t.widgetSize&&t.selectContact(t.contactsModel.contacts[0])},!0),t.responsiveRules=[{max:200,size:"tile"},{min:201,max:400,size:"small"},{min:401,size:"large"}],p.addEventListener("preferencesSaved",function(){p.refreshHTML(),y()}),t.widgetReset=function(e){t.search&&(t.search=""),"contactsEdit"!==t.contactsModel.moduleState&&"contactsAdd"!==t.contactsModel.moduleState||t.cancelForm()},t.disableEnterSubmit=function(t){return t&&13===t.which?void t.preventDefault():void 0},y()},exports.ContactsController.$inject=["$scope","$timeout","lpWidget","ContactsModel","AccountsModel","lpTransactions","$filter","i18nUtils","customerId","lpCoreBus","lpCoreUtils","lpAccounts"],exports.ContactsPaymentController=function(t,e,n,c){var o=n,a=e.api();t.paymentOrder=a.createModel(),t.resetPaymentOrder=function(e){var n,o;void 0!==e?(n=e.name,o=e.account):(n=t.paymentOrder.counterpartyName,o=t.paymentOrder.counterpartyIban),t.paymentOrderForm&&(t.paymentOrderForm.submitted=!1),t.paymentOrder.uuid=c.generateUUID(),t.paymentOrder.dateOptions="today",t.paymentOrder.paymentMode="NON_RECURRING",t.paymentOrder.onDate=+new Date,t.paymentOrder.counterpartyIban=o,t.paymentOrder.counterpartyAccount=n,t.paymentOrder.counterpartyName=n,t.paymentOrder.accountName=n,t.paymentOrder.type="INTERNAL"},t.$on("contactSelected",function(e,n){t.resetPaymentOrder(n)}),t.submitPayment=function(){var e,n,c;return t.paymentOrderForm.submitted=!0,t.paymentOrderForm.$invalid?!1:(n=t.paymentOrder,c=t.accountsModel.selected,t.resetPaymentOrder(),t.paymentOrder.accountId=c.id,t.paymentOrder.instructedCurrency=c.currency,e=n.createOrder(n),void e.then(function(t){o.publish("launchpad-retail.paymentOrderInitiated",{paymentId:n.id})},function(t){console.log("Server error: "+t.statusText)}))}},exports.ContactsPaymentController.$inject=["$scope","lpPayments","lpCoreBus","lpCoreUtils"]}.call(exports,e,exports,t),!(void 0!==n&&(t.exports=n))}])});
//# sourceMappingURL=main.js.map