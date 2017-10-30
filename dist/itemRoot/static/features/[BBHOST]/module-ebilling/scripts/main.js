define(function(require, exports, module) {

    'use strict';

    module.name = 'module-ebilling';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var accounts = require('module-accounts');
    var payments = require('module-payments');
    var moduleEnrollment = require('module-enrollment');
    var newPaymentBox = require('./components/new-payment-box/scripts/main');
    var eBillSetup = require('./components/ebill-setup/scripts/main');


    // Module name
    var deps = [
        ui.name,
        core.name,
        accounts.name,
        payments.name,
        moduleEnrollment.name,
        newPaymentBox.name,
        eBillSetup.name
    ];

    module.exports = base.createModule(module.name, deps)
        .provider( require('./provider') )
        .service( require('./models').services )
        .factory( require('./models').factories )
        .filter( require('./filters') )
        .directive( require('./views').directives )
        .service( require('./utils') )
        .service( require('./services/ebill-service'))
        .service( require('./services/ebill-pay-service'));
});
