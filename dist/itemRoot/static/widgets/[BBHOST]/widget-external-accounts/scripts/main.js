define(function (require, exports, module) {
    'use strict';

    module.name = 'widgets-external-accounts';

    var base = require('base');
    var ui = require('ui');
    var core = require('core');
    var accounts = require('module-accounts');

    var deps = [
        core.name,
        ui.name,
        accounts.name
    ];

    // @ngInject
    function run(lpWidget, lpCoreBus) {
        if (lpWidget && lpWidget.model && lpWidget.model.name) {
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .factory(require('./financial-institute-model'))
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(run)
});
