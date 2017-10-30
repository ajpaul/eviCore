define(function(require, exports, module) {
    'use strict';

    module.name = 'widgets-budgets';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var gridly = require('./components/gridly/scripts/main');

    var deps = [
        core.name,
        ui.name,
        gridly.name
    ];

    // @ngInject
    function run(lpCoreBus, lpWidget) {
        lpCoreBus.publish('cxp.item.loaded', {id: lpWidget.model.name});
    }

    module.exports = base.createModule(module.name, deps)
        .factory( require('./factories') )
        .service( require('./services') )
        .controller( require('./controllers') )
        .directive( require('./directives') )
      .run(run);
});
