define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-card-overview';

    var base = require('base');
    var ui = require('ui');
    var core = require('core');
    var cards = require('module-cards');

    var deps = [
        core.name,
        ui.name,
        cards.name
    ];

    // @ngInject
    function run(lpWidget, lpCoreBus) {
        if(lpWidget && lpWidget.model && lpWidget.model.name){
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .directive( require('./directives') )
        .run( run );

});
