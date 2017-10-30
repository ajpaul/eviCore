define(function (require, exports, module) {
    var $ = require('jquery');
    var CONSTANTS = {
        notEditable: '[contenteditable=false]:not(img)',
        lpIce: '.lp-ice',
        focusLpIce: 'focus.lp-ice',
        brokenImages: 'img[src=""], img:not([src])',
        hideBrokenImages: 'be-ice-hide-image',
        gInclude: '.bp-g-include'
    };
    var restart = function () {
        var name;
        var instance;
        var cke = window.CKEDITOR;

        if (cke && cke.instances) {
            for (name in cke.instances) {
                instance = cke.instances[name];
                if (this === instance.element.$) {
                    instance.destroy();
                    $(this).attr('contenteditable', true);
                    cke.inline(this);
                    return;
                }
            }
        }
    };
    var fixEditing = function ($widget) {
        $widget
            .off(CONSTANTS.lpIce)
            .on(CONSTANTS.focusLpIce, CONSTANTS.notEditable, function () {
                $widget.find(CONSTANTS.notEditable).each(restart);
            })
    };
    
    var enableEditing = function (data) {
        var widget = data.widget;
        var $widget = data.$widget;
        var templateUrl = data.templateUrl;
        var fixEditing = data.fixEditing;
        
        return be.ice.controller.edit(widget, templateUrl)
            .then(function (dom) {
                $widget.find(CONSTANTS.gInclude).html(dom);
                fixEditing($widget);
                return dom;
            });
    };

    var BaseICE = function () {
        this.widget = null;
        this.$widget = null;
    };

    BaseICE.isSameType = function (templateUrl, test) {
        return templateUrl.indexOf(test) > -1;
    };
    
    BaseICE.prototype = {
        setup: function (widget) {
            this.widget = widget;
            this.$widget = $(widget.body);
            this.templateUrl = widget.getPreference('templateUrl');
            return this;
        },
        fixEditing: fixEditing,
        init: function () {
            var deferred = new $.Deferred();
            var widget = this.widget;
            var isMasterpage;
            var isManageable;

            // Extend widget in design mode
            if (be.ice && bd && bd.designMode === 'true') {

                // Clone and extend default ice config
                widget.iceConfig = $.extend(true, {}, be.ice.config);
                widget.iceConfig.events.push('lp-drag');
                
                isMasterpage = top && top.bd && top.bd.PageMgmtTree && top.bd.PageMgmtTree.selectedLink && top.bd.PageMgmtTree.selectedLink.isMasterPage;
                isManageable = isMasterpage || (
                        widget.model.manageable === 'true' ||
                        widget.model.manageable === '' ||
                        widget.model.manageable === undefined
                    );

                if (isManageable && be.ice.controller) {
                    deferred.resolve(enableEditing({
                        widget: widget,
                        $widget: this.$widget,
                        templateUrl: this.templateUrl,
                        fixEditing: fixEditing
                    }));
                } else {
                    deferred.resolve();
                }
            }
            else {
                // Hide broken images on live
                $(CONSTANTS.brokenImages, this.$widget).addClass(CONSTANTS.hideBrokenImages);
                deferred.resolve();
            }
            return deferred.promise();
        }
    };
    
    module.exports = BaseICE;
});