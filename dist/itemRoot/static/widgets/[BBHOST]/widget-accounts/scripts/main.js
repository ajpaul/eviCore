/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: ${widget.description}
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {

    'use strict';

    module.name = 'widget-accounts';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var deps = [
        core.name,
        ui.name
    ];

    // @ngInject
    function run(lpCoreBus, lpWidget) {
        if (lpWidget && lpWidget.model) {
            lpCoreBus.publish('cxp.item.loaded', {
                id: lpWidget.model.name
            });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .directive( require('./directives/assets-group') )
        .directive( require('./directives/assets-list') )
        .directive( require('./directives/assets-account') )
        .directive( require('./directives/on-select') )
        .service( require('./model') )
        .factory( require('./utils') )
        .controller( require('./controllers') )
        .run( run );
});
