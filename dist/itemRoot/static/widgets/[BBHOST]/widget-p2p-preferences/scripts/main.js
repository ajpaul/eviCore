define(function(require, exports, module) {

    'use strict';

    module.name = 'widget-p2p-preferences';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var accounts = require('module-accounts');
    var p2p = require('module-p2p');


    var deps = [
        core.name,
        ui.name,
        accounts.name,
        p2p.name
    ];

    // @ngInject
    function run(lpWidget, lpCoreBus) {
        if (lpWidget && lpWidget.model && lpWidget.model.name) {
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
     }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );

});
