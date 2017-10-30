define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-transactions';

    var base = require('base');
    var ui = require('ui');
    var core = require('core');

    var accounts = require('module-accounts');
    var transactions = require('module-transactions');
    var contacts = require('module-contacts');
    var freshness = require('module-freshness');
    var users = require('module-users');

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        transactions.name,
        contacts.name,
        freshness.name,
        users.name
    ];

    // @ngInject
    function run(lpWidget, lpTransactionsCategory, lpAccounts, lpTransactions, lpCoreBus, lpCoreUtils) {
        lpTransactionsCategory.setConfig({
            'endpoint': lpWidget.getPreference('categoryDataSrc')
        });

        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });

        lpTransactions.setConfig({
            'transactionsEndpoint': lpWidget.getPreference('transactionsDataSrc'),
            'transactionDetailsEndpoint': lpWidget.getPreference('transactionDetailsDataSrc'),

            // used by lpCategoriesSpendings directive
            'categoriesEndpoint': lpWidget.getPreference('categoriesDataSrc'),
            'categorySpendingEndpoint': lpWidget.getPreference('categorySpendingDataSrc'),

            // used by lpTransactionsCharts directives
            'accountsChartEndpoint': lpWidget.getPreference('accountBalanceChartDataSrc'),
            'transactionsChartEndpoint': lpWidget.getPreference('transactionsChartDataSrc'),

            // optional endpoints for displaying lpTransactionsCharts[Horizontal] directives for all accounts
            'allAccountsChartEndpoint': lpWidget.getPreference('allAccountsBalanceChartDataSrc'),
            'allTransactionsChartEndpoint': lpWidget.getPreference('allTransactionsChartDataSrc'),

            // used by lpTransactionsAuthorizationsList directive
            'accountHoldsEndpoint': lpWidget.getPreference('accountHolds'),

            // used by lpTransactionsList directive
            'customTemplateSrc': lpWidget.getPreference('customTemplateSrc'),
            'groupTransactionsByDate': lpCoreUtils.parseBoolean(lpWidget.getPreference('groupTransactionsByDate')),

            'pageSize': parseInt(lpWidget.getPreference('transactionsPageSize'), 10) || undefined
        });

        if(lpWidget && lpWidget.model && lpWidget.model.name){
            lpCoreBus.publish('cxp.item.loaded', { 'id': lpWidget.model.name});
        }
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
