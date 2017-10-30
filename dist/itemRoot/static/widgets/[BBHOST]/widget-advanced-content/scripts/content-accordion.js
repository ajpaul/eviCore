define(function (require, exports, module) {
    'use strict';

    var BaseICE = require('./base-ice');
    var superProto = BaseICE.prototype;
    var CONSTANTS = {
        upClass: 'lp-icon-caret-up',
        downClass: 'lp-icon-caret-down',
        faqContent: '.lp-faq-content',
        toggleClass: '.lp-accordion-toggle-class',
        faqTitle: '.lp-faq-title',
        collapsed: 'collapsed'
    };

    /**
     * ContentAccordion
     * @constructor
     */
    var ContentAccordion = function () {
        BaseICE.call(this);
    };

    ContentAccordion.isSameType = function (templateUrl) {
        return BaseICE.isSameType(templateUrl, 'accordion');
    };
    
    ContentAccordion.prototype = new BaseICE();

    ContentAccordion.prototype.init = function () {
        var self = this;
        superProto
            .init
            .call(this)
            .then(function () {
                var $widget = self.$widget;
                var upClass = CONSTANTS.upClass;
                var downClass = CONSTANTS.downClass;

                $(CONSTANTS.faqTitle, $widget)
                    .click(function (event) {
                        var $target = $(event.target);
                        var isCollapsed = $target.hasClass(CONSTANTS.collapsed);
                        var config = {};

                        if (isCollapsed) {
                            config = {
                                remove: downClass,
                                add: upClass,
                                action: 'slideDown'
                            };
                        } else {
                            config = {
                                remove: upClass,
                                add: downClass,
                                action: 'slideUp'
                            };
                        }
                        $(CONSTANTS.toggleClass).removeClass(config.remove).addClass(config.add);
                        $(CONSTANTS.faqContent, $widget)[config.action](300);
                        $target.toggleClass(CONSTANTS.collapsed, !isCollapsed);
                    });
            });
    };

    module.exports = ContentAccordion;
});