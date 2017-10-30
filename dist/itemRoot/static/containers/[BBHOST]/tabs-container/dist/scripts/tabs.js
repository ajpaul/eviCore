/* Build with bb-lp-cli @ v1.8.1 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["container-tabs"]=t():e["container-tabs"]=t()}(this,function(){return function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,exports){!function(e,t,a){"use strict";var n=e.bdom.getNamespace("launchpad"),i=n.classes.DeckContainer,o={TABS:"Tabs",PANEL:"PanelContainer"};i.extend(function(e,t){i.apply(this,arguments),this.isPossibleDragTarget=!1},{localName:"Tabs",namespaceURI:"launchpad",DOMReady:function(){i.prototype.DOMReady.call(this,arguments);var e=this;a(this.getDisplay("tab",!0)).on({click:function(t){var n=a(this).data("id");e.setTabSelected(n)},keydown:function(t){var n=13,i=32;if(t.which===i||t.which===n){var o=a(this).data("id");console.log(o),e.setTabSelected(o)}}})},setTabSelected:function(e){this.showPanel(e)},showPanel:function(e){for(var t,n=this.getDisplay("tab",!0),o=0;o<n.length;o++)a(n[o]).removeClass("active");"number"==typeof e||"string"==typeof e?t=this.getPanel(e):"object"==typeof e&&(t=e),t&&a(this.htmlNode).find('.--tab[data-id="'+t.model.name+'"]').addClass("active"),i.prototype.showPanel.apply(this,arguments)},_getNewPanelData:function(e){var t=this._getPanels().length;e=e||{},e.title=e.title||this.PANEL_NAME_PREFIX+(t+1);var a=[{type:"string",name:"title",label:"Title",value:e.title||"",viewHint:"text-input,designModeOnly,manager"},{type:"string",name:"icon",value:e.icon||"",label:"Icon (optional)",viewHint:"text-input,designModeOnly,manager"}];return{area:e.order||t,order:e.order||t,id:e.id||this._getNewPanelName(),properties:a}}},{template:function(e){var a={item:e.model.originalItem},n=t["templates_"+this.localName][this.localName](a);return n},handlers:{preferencesSaved:function(e){var t=e.target,a=t.nodeName;a===o.PANEL&&e.currentTarget.refreshHTML()}}})}(b$,window,$)}])});
//# sourceMappingURL=tabs.js.map