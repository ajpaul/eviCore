/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: Provides the ability to login using simple authentication
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'widget-login';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var deps = [
        core.name,
        ui.name
    ];

    // @ngInject
    function run(lpWidget, LoginService) {
        // Module is Bootstrapped
        LoginService.configure({
            redirect: lpWidget.getPreference('redirect')
        });
    }

    module.exports = base.createModule(module.name, deps)
        .service(require('./login-service'))
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(run);
});
