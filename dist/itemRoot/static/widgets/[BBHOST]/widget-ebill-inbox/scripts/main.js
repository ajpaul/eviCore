
define(function(require, exports, module) {

    'use strict';

    module.name = 'widget-ebill-inbox';

    // main
    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var ebilling = require('module-ebilling');

    var deps = [
        core.name,
        ui.name,
        ebilling.name
    ];

    // @ngInject
    var run = function( lpWidget, lpEbilling, lpCoreUtils, lpCoreBus ) {

        var params = {
            // Overwrite Provider Options
            debitOrdersSrc: lpWidget.getPreference('debitOrdersSrc'),
            mandatesSrc: lpWidget.getPreference('mandatesSrc'),
            accountsEndPoint: lpWidget.getPreference('accountsDataSrc'),
            baseUrl: lpCoreUtils.getWidgetBaseUrl( lpWidget )
        };
        lpEbilling.setConfig(params);

        if (lpWidget && lpWidget.model && lpWidget.model.name) {
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    };

    module.exports = base.createModule(module.name, deps )
        .controller(require('./controllers'))
        .run(run);

});
