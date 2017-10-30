define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.MainCtrl = function ($scope, lpCoreUtils, lpCoreError, lpCoreBus, lpAccountsModel) {
        var ctrl = this;

        ctrl.accounts = [];
        ctrl.selectedAccount = {};

        var applyModel = function(model) {
            if (model && model.selected && model.selected.id) {
                ctrl.selectedAccount = lpCoreUtils.assign({}, model.selected, {external: true});
                lpCoreBus.publish('accounts-dropdown.select-account', ctrl.selectedAccount);
            }
        };

        var selectAccount = function(data){
            // do not react to internally passed event
            if (data.accountsDropdown) return;

            var model = lpAccountsModel.onAccountSelected(data);
            applyModel(model);
        };

        lpCoreBus.subscribe('launchpad-retail.accountSelected', selectAccount);
        lpCoreBus.subscribe('launchpad-retail.cardSelected', selectAccount);


        // Load accounts and let know it is happened (or failed)
        lpAccountsModel.load().then(function (model) {

            ctrl.accounts = lpCoreUtils.clone(model.accounts);
            ctrl.selectedAccount = lpCoreUtils.clone(model.selected);


            // subscribe to changes in the account details widget
            lpCoreBus.subscribe('account-details:account:update', function(updatedAccount) {
                var acc = lpAccountsModel._findAccountById(updatedAccount.id);
                if (acc) {
                    lpCoreUtils.safeApply($scope, function() {
                        lpCoreUtils.assign(acc, updatedAccount);
                    });
                }
            });


            lpCoreBus.publish('lpAccounts.loaded', ctrl.accounts);


            // let know outer space about selected account
            $scope.$watch('mainCtrl.selectedAccount', function(selectedAccount) {

                // to avoud event duplication do not republish external event
                if (selectedAccount && !selectedAccount.external) {

                    lpCoreBus.publish('launchpad-retail.accountSelected', {
                        accountsDropdown: true,
                        accountId: ctrl.selectedAccount.id,
                        allAccounts: ctrl.selectedAccount.hasOwnProperty('ids') && !!ctrl.selectedAccount.ids,
                        _noBehavior: true // Do not allow behavior to re-open the widget
                    }, true);
                }
            });
        }, function (err) {
            lpCoreError.captureException(err);
        });

    };
});
