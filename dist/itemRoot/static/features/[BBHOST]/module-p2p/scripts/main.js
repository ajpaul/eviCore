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

    module.name = 'module-p2p';

    var base = require('base');
    var core = require('core');

    var deps = [
        core.name
    ];

   module.exports = base.createModule(module.name, deps)
        // Provide with services collection
        .provider( require('./providers') )
        // used Services
        .service( require('./services/email-service') )
        .service( require('./services/enroll-service') );
});
