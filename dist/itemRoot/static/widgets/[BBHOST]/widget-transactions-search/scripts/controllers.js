/**
 * Transactions Search controller
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function($scope, lpWidget, lpCoreBus, lpCoreUtils, $q, lpAccounts, ContactsModel, lpTransactionsCategory, lpTagsUtils, lpUsersPreference) {
        // Load configured preferences by the widget
        lpCoreUtils.assign($scope, {
            showCategories: false,
            showExportButton: lpCoreUtils.parseBoolean(lpWidget.getPreference('showExportButton')),
            accounts: lpAccounts,
            transactionsCategory: lpTransactionsCategory.api(),
            contacts: new ContactsModel({
                contacts: lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('contactsDataSrc')),
                lazyload: true
            })
        });

        lpUsersPreference.getCachedUserPrefs().then(function(prefs){
            // only show categories toggle if pfmEnabled
            $scope.showCategories = prefs.pfmEnabled;
        });

        $q.all([
            $scope.accounts.getAll(),
            $scope.transactionsCategory.getAll(),
            $scope.contacts.loadContacts()
        ]).then(function() {
            if(!lpAccounts.selected && lpAccounts.accounts.length) {
                lpAccounts.selected = lpAccounts.accounts[0];
            }
        });

        $scope.onPerformSearch = function(filters) {
            lpTagsUtils.setFilter(filters);
            lpCoreBus.publish('transactions-search:search:filter', filters);
        };

        $scope.onClearSearch = function() {
            lpTagsUtils.clearFilters();
            lpCoreBus.publish('transactions-search:search:clear');
        };

        $scope.onUpdateSearch = function() {
            lpCoreBus.publish('transactions-search:search:update');
        };

        $scope.onChangeSort = function(value) {
            lpCoreBus.publish('transactions-search:sort:change', value);
        };

        $scope.onExportTransactions = function(format) {
            lpCoreBus.publish('transactions-search:transactions:export', format);
        };

    };
});
