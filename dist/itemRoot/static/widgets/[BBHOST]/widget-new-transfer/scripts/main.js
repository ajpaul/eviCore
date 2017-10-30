define(function(require, exports, module) {
    'use strict';

    module.name = 'widgets-new-transfer';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var accounts = require('module-accounts');
    var contacts = require('module-contacts');
    var p2p = require('module-p2p');
    var payments = require('module-payments');
    var transactions = require('module-transactions');
    var users = require('module-users');

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        payments.name,
        p2p.name,
        transactions.name,
        contacts.name,
        users.name
    ];

    // @ngInject
    function run(lpWidget, lpPayments, lpCoreBus) {
        lpPayments.setConfig({
            'paymentsEndpoint': lpWidget.getPreference('paymentOrdersDataSrc')
        });
        if(lpWidget && lpWidget.model && lpWidget.model.name){
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .factory(require('./form-data-persistence'))
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(run);
});
