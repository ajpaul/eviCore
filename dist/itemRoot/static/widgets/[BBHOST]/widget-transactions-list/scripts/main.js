/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.js
 *  Description: Widget Transactions List
 *  ----------------------------------------------------------------
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'transactions-list';

    var base = require('base');
    var core = require('core');
    var transactions = require('module-transactions');
    var accounts = require('module-accounts');
    var users = require('module-users');

    var deps = [
        core.name,
        transactions.name,
        accounts.name,
        users.name
    ];

    // @ngInject
    function run(lpWidget, lpCoreBus, lpTransactionsCategory, lpAccounts, lpTransactions, lpCoreUtils, lpAccountsModel) {
        lpTransactionsCategory.setConfig({
            'endpoint': lpWidget.getPreference('categoriesDataSrc')
        });

        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });

        lpAccountsModel.setConfig({
            // populate accounts model with All Accounts Item by default
            'showAllAccountsItem': true
        });

        lpTransactions.setConfig({
            'transactionsEndpoint': lpWidget.getPreference('transactionsDataSrc'),
            'transactionDetailsEndpoint': lpWidget.getPreference('transactionDetailsDataSrc'),

            // used by lpTransactionsList directive
            'customTemplateSrc': lpWidget.getPreference('customTemplateSrc'),
            'groupTransactionsByDate': lpCoreUtils.parseBoolean(lpWidget.getPreference('groupTransactionsByDate')),

            'pageSize': parseInt(lpWidget.getPreference('transactionsPageSize'), 10) || undefined
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
