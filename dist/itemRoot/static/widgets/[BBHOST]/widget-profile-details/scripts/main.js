define(function(require, exports, module) {
    'use strict';

    module.name = 'widgets.profile-details';

    var base = require('base');
    var ui = require('ui');
    var core = require('core');
    var users = require('module-users');


    var deps = [
        core.name,
        users.name,
        ui.name
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
