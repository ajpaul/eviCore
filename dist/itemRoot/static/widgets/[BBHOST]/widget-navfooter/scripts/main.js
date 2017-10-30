/*global bd*/

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: Copy of out of the box navigation, with a few tweaks
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    /**
     * @const
     * @type {string}
     */
    var WARNING_HTML =
        '<div class="alert alert-block">' +
            '<h4>Warning!</h4>' +
            '<p>This navigation bar\'s root menu couldn\'t be found.</p>' +
        '</div>';

    /**
     * @param widget
     * @constructor
     */

    var NavFooter = function (widget) {
        this.widget = widget;
        this.$widget = $(widget.body);
    };

    NavFooter.prototype.init = function () {
        var self = this;
        var url = window.location.href;
        var lpWidget = this.widget;

        if (bd.designMode === 'true') {

            /*
             * If this is the first initialization we need to
             */

            var navRoot = lpWidget.getPreference('navRoot');

            if(!navRoot) {
                var links = top && top.bd && top.bd.pm && top.bd.pm.model && top.bd.pm.model.links;
                if(links) {
                    navRoot = Object.keys(links).filter(function(id){
                        return links[id].linkname === 'navroot_mainmenu';
                    });
                    if(navRoot && navRoot[0]){
                        lpWidget.setPreference('navRoot', navRoot[0]);
                        lpWidget.model.save(function(){
                            lpWidget.refreshHTML();
                        });
                    }
                }
            }
            /*
             * If in design mode and default root link is set will load a static html and replace the widget-body with the loaded html
             * -> it is only replaced if it is empty
             */
            else if (this.$widget.find('.bp-g-model').children().is(':empty')) {
                be.utils.ajax({
                    url: b$.portal.config.serverRoot + '/portals/' + b$.portal.portalName + '/widgets/' + lpWidget.model.name + '.html',
                    success: function (responseHTML) {
                        var html = $(responseHTML).find('.bp-g-model').children().is(':empty') ?
                            WARNING_HTML : $(responseHTML).find('.bp-widget-body').contents();
                        self.$widget.html(html);
                    }
                });
            }
        }

        /*
         * activate the current navigation item by comparing the URL with the anchors href and setting a bootstrap class
         */
        self.$widget
            .find('a')
            .off()
            .on('click', function (ev) {
                return be.Nav.URLHandler(this);//eslint-disable-line new-cap
            })
            .filter(function () {
                var href = $(this).attr('href');
                var lastUrlPart = url.substr(url.lastIndexOf('/'));
                var isActive = href.indexOf(lastUrlPart) > -1;
                return isActive;
            })
            .parent()
            .addClass('active');

        return this;
    };

    module.exports = function(widget) {
        var widgetWrapper = new NavFooter(widget);
        widgetWrapper.init();
        return widgetWrapper;
    };
});
