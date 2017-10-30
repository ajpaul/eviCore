/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function($timeout, lpWidget, lpCoreUtils, lpCoreBus, lpTransactionsCategory, lpTransactions, lpUsersPreference, lpDownloadTransactionsFile, lpAccountsModel) {
        var ctrl = this;


        var bindBusListeners = function() {
            var api = ctrl.transactions;
            var loadTransactions = function(){
                api.loadTransactions(ctrl.accountsModel.selected);
            };

            lpCoreBus.subscribe('transactions-search:search:filter', function(filters) {
                api.setFilters(filters);
                loadTransactions();
            });

            lpCoreBus.subscribe('transactions-search:search:clear', function() {
                api.clearFilters();
                loadTransactions();
            });

            lpCoreBus.subscribe('transactions-search:search:update', function() {
                api.updateFilters();
                loadTransactions();
            });

            lpCoreBus.subscribe('transactions-search:sort:change', function(value) {
                api.sort = value.sort;

                if (api.transactions && api.transactions.length) {
                    loadTransactions();
                }
            });

            lpCoreBus.subscribe('transactions-search:transactions:export', function(format) {
                lpDownloadTransactionsFile(api.getExportTransactionsLink(format));
            });

        };

        // Load configured preferences by the widget
        lpCoreUtils.assign(ctrl, {
            transactions: lpTransactions.api(),
            transactionsCategory: lpTransactionsCategory.api(),
            showCategories: true,
            previewAll: false,
            showDatesAllTransactions: lpCoreUtils.parseBoolean(lpWidget.getPreference('showDatesAllTransactions')),
            hideDetailsPreference: lpCoreUtils.parseBoolean(lpWidget.getPreference('hideTransactionDetails')),
            offsetTopCorrection: lpCoreUtils.parseInt(lpWidget.getPreference('scrollOffset')),
            showTransactionIcons: lpCoreUtils.parseBoolean(lpWidget.getPreference('showTransactionIcons')),
            showScrollbar: lpCoreUtils.parseBoolean(lpWidget.getPreference('showScrollbar'))
        });

        ctrl.transactionsCategory.getAll();

        var applyModel = function(model) {
            if (model && model.selected && model.selected.id) {
                // trigger angular to refresh
                $timeout(function() {
                    ctrl.accountsModel = model;
                });
            }
        };

        var selectAccount = function(data){
            var model = lpAccountsModel.onAccountSelected(data);
            applyModel(model);
        };

        lpCoreBus.subscribe('launchpad-retail.accountSelected', selectAccount);
        lpCoreBus.subscribe('launchpad-retail.cardSelected', selectAccount);

        lpAccountsModel.load().then(function(model){
            applyModel(model);
            bindBusListeners();
        });


        lpUsersPreference.getCachedUserPrefs().then(function(prefs){
            ctrl.showCategories = prefs.pfmEnabled;
        });

        ctrl.responsiveCallback = function(size){
            var isSmall = lpCoreUtils(['tile', 'small']).indexOf(size) > -1;
            ctrl.categoryLayout = isSmall ? 'small' : size;
            ctrl.categorySmallLayout = isSmall;
        };

    };
});
