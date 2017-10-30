/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: Widget Transactions Search
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'transactions-search';

    var base = require('base');
    var core = require('core');
    var transactions = require('module-transactions');
    var accounts = require('module-accounts');
    var contacts = require('module-contacts');

    var deps = [
        core.name,
        transactions.name,
        accounts.name,
        contacts.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpTransactionsCategory, lpCoreBus, $timeout) {
        lpTransactionsCategory.setConfig({
            'endpoint': lpWidget.getPreference('categoryDataSrc')
        });

        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });

        if (lpWidget.model && lpWidget.model.name) {
            lpCoreBus.publish('cxp.item.loaded', {
                id: lpWidget.model.name
            });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
