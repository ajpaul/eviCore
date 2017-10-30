/**
 * Transactions Chart Transactions controller
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function($scope, lpWidget, lpAccounts) {
        $scope.accounts = lpAccounts;

        // Standalone development
        lpAccounts.load()
        .then(function() {
            if(!lpAccounts.selected && lpAccounts.accounts && lpAccounts.accounts.length > 0) {
                var selectedAccount = lpAccounts.findByAccountNumber(lpWidget.getPreference('defaultAccount')) || lpAccounts.accounts[0];
                lpAccounts.selected = selectedAccount;
            }
        });
    };
});
