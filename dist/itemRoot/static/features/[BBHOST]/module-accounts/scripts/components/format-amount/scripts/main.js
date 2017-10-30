/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase Launchpad B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: Main entry point format-amount component
 *  ----------------------------------------------------------------
 */
define( function (require, exports, module) {
    'use strict';

    module.name = 'format-amount';
    var base = require('base');
    var deps = [

    ];


    module.exports = base.createModule(module.name, deps)
        .directive(require('./lp-format-amount'));
});
