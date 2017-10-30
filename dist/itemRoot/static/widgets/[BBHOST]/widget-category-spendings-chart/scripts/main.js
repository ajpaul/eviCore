define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-category-spendings-chart';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var deps = [
        core.name,
        ui.name
    ];

    // @ngInject
    function run(lpWidget, lpCoreBus) {
        if (lpWidget && lpWidget.model && lpWidget.model.name) {
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .factory(require('./factories'))
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(run);
});

