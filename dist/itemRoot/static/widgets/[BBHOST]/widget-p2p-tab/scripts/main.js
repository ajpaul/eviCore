define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-p2p-tab';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var p2p = require('module-p2p');

    var deps = [
        core.name,
        ui.name,
        p2p.name
    ];

    // @njInject
    function run() {

    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );

});
