/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase Launchpad B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: Main entry point otp-check component
 *  ----------------------------------------------------------------
 */
define( function (require, exports, module) {
    'use strict';

    module.name = 'otp-check';
    var base = require('base');
    var deps = [
        require('module-enrollment').name
    ];


    module.exports = base.createModule(module.name, deps)
        .directive(require('./directives'));
});
