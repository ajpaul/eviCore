define(function(require, exports, module) {
    'use strict';

    module.name = 'widgets-transactions-chart-donut';

    var base = require('base');
    var ui = require('ui');
    var core = require('core');

    var accounts = require('module-accounts');
    var transactions = require('module-transactions');

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        transactions.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpTransactions) {
        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });

        lpTransactions.setConfig({
            // used by lpCategoriesSpendings directive
            'categoriesEndpoint': lpWidget.getPreference('categoriesDataSrc'),
            'categorySpendingEndpoint': lpWidget.getPreference('categorySpendingDataSrc')
        });
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
