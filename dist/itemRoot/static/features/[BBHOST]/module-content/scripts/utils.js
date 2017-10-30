/* globals window */
define(function (require, exports, module) {

    'use strict';

    var utils = require('base').utils;
    var lpContentUtils = {
        isEditable: function (widget) {

            var bd = window.bd;

            // Extend widget in design mode
            if (bd && bd.designMode === 'true') {
                var isMasterpage = utils.property('top.bd.PageMgmtTree.selectedLink.isMasterPage');

                var isManageable = isMasterpage ||
                    widget.model.manageable === 'true' ||
                    widget.model.manageable === '' ||
                    widget.model.manageable === undefined;

                if (isManageable && bd && bd.bindDropEvents) {
                    bd.bindDropEvents(widget.htmlNode);
                    return true;
                }
            }
            return false;
        }
    };

   /**
    * Export
    */
    exports.lpContentUtils = lpContentUtils;
});
