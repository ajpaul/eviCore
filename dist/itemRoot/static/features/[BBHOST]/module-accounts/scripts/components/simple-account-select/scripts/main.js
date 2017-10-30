/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: ${widget.description}
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {
    'use strict';

    module.name = 'simple-account-select';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var list = require('./components/list/main');

    var deps = [
        core.name,
        list.name,
        ui.name
    ];

    // @ngInject
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .service(require('./mobile-component'))
        .directive(require('./lp-simple-account-select'))
        .run(run);
});
