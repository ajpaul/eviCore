/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: Main entry point
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'module-content';

    var base = require('base');
    var core = require('core');

    var deps = [
        core.name
    ];

    module.exports = base.createModule(module.name, deps)
        // Utilities
        .constant( require('./utils') )
        // Provide with services collection
        .provider( require('./providers') )
        // Directives
        .directive( require('./directives') );
});
