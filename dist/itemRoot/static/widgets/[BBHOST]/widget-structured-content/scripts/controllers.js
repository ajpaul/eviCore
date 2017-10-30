/*global define */

define(function (require, exports, module) {
    'use strict';

    var CONTENT_REF_PREF = 'contentRef';
    var LINK_BASE_PREF = 'linkBase';

    var initDesignMode = function (ctrl, lpWidget) {
        ctrl.saveContentRef = function (contentRef) {
            lpWidget.setPreference(CONTENT_REF_PREF, contentRef);
            lpWidget.model.save(function(){
                lpWidget.refreshHTML();
            });
        };
    };

    /**
     * Structured Content Controller
     * @ngInject
     */
    exports.MainCtrl = function ($location, lpContentUtils, lpWidget, lpPortal) {
        var ctrl = this;
        var contentRef = lpWidget.getPreference(CONTENT_REF_PREF);
        var asyncContentRef = $location.url().replace(/^\//, '');
        var linkBase = lpWidget.getPreference(LINK_BASE_PREF);

        ctrl.initContentRef = contentRef;
        if (asyncContentRef !== contentRef) {
            ctrl.asyncContentRef = asyncContentRef;
        }

        if (linkBase) {
            ctrl.link = lpPortal.root + '/' + linkBase + '#/' + contentRef;
            $(lpWidget.htmlNode).find('.media a.media-link').attr('href', ctrl.link);
            $(lpWidget.htmlNode).find('.media a.media-link-small').attr('href', ctrl.link);
        }

        if (lpContentUtils.isEditable(lpWidget)) {
            initDesignMode(ctrl, lpWidget);
        }
    };
});
