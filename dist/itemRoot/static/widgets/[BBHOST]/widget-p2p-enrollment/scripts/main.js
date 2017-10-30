define(function (require, exports, module) {
    'use strict';

    module.name = 'widget-p2p-enrollment';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var accounts = require('module-accounts');
    var users = require('module-users');
    var p2p = require('module-p2p');

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        users.name,
        p2p.name
    ];

    // @ngInject
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(run);
});
