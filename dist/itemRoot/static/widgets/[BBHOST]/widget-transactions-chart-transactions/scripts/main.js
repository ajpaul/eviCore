/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: Widget Transactions Chart Transactions
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'transactions-chart-transactions';

    var base = require('base');
    var core = require('core');
    var transactions = require('module-transactions');
    var accounts = require('module-accounts');

    var deps = [
        core.name,
        transactions.name,
        accounts.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpTransactions) {
        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });

        lpTransactions.setConfig({
            // used by lpTransactionsCharts directives
            'accountsChartEndpoint': lpWidget.getPreference('accountBalanceChartDataSrc'),
            'transactionsChartEndpoint': lpWidget.getPreference('transactionsChartDataSrc')
        });
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
