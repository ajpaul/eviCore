define(function (require, exports, module) {
    'use strict';

    module.name = 'portfolio-aggregated-view';

    var base = require('base');
    var core = require('core');
    var charts = require('module-charts');
    var wealth = require('module-wealth');

    var deps = [
        core.name,
        charts.name,
        wealth.name
    ];

    // @ngInject
    function run(lpWidget, lpWealth) {
        lpWealth.setConfig({
            portfolioEndPoint: lpWidget.getPreference('dataSrc')
        });
    }

    module.exports = base.createModule(module.name, deps)
        .controller(require('./controllers'))
        .directive(require('./bar-chart'))
        .directive(require('./treemap-chart'))
        .run(run);
});
