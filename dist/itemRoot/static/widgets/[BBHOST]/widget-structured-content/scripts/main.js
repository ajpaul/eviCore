/*global define */

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {
    'use strict';

    module.name = 'widget-structured-content';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var content = require('module-content');

    var deps = [
        core.name,
        ui.name,
        content.name
    ];

    // @ngInject
    function run(lpCoreBus, lpWidget) {
        if (lpWidget && lpWidget.model) {
            lpCoreBus.publish('cxp.item.loaded', {
                id: lpWidget.model.name
            });
        }
    }

    return base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
