/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: ${widget.description}
 *  ----------------------------------------------------------------
 */
define(function(require, exports, module){

    'use strict';

    module.name = 'widget-video';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var deps = [
        core.name,
        ui.name
    ];

    module.exports = base.createModule(module.name, deps)
        .constant(require('./constants'))
        .controller(require('./controllers'))
        .config(require('./config'));
});
