/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase Launchpad B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: Main entry point credential-input component
 *  ----------------------------------------------------------------
 */
define( function (require, exports, module) {
    'use strict';

    module.name = 'credential-input';
    var base = require('base');
    var ui = require('ui');
    var deps = [
        ui.name
    ];


    module.exports = base.createModule(module.name, deps)
        .directive(require('./lp-credential-input'));
});
