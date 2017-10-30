define(function(require, exports, module) {
    'use strict';

    // Helper function
    function applyScope($scope) {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    // @ngInject
    exports.MainCtrl = function($scope, $element, $timeout, lpWidget, lpP2P, lpP2PTransactions, lpCoreBus, lpCoreUtils) {
        var bus = lpCoreBus;
        var initializeP2PTransactions = function(accountId) {
            $scope.transactionsModel = lpP2PTransactions.api();
            // loadTransactions parameter is an array to later support aggregated view
            $scope.transactionsModel.loadTransactions([accountId]).then(function(response) {
                applyScope($scope);
            });
        };
        var p2pService = lpP2P.api('enroll-service')
            .setConfig({
                url: lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('p2pEnrollmentEndpoint'))
            });

        $scope.transferMoney = function() {
            bus.publish('launchpad-retail.requestMoneyTransfer');

            bus.publish('launchpad-retail.requestMoneyTransfer.setTab', {
                tab: 'P2P_EMAIL'
            });
        };

        $scope.loadMoreTransactions = function() {
            if ($scope.transactionsModel.allowMoreResults()) {
                $scope.transactionsModel.loadMoreTransactions();
            }
        };

        $scope.enroll = function() {
            bus.publish('launchpad-retail.openP2PEnrollment');
        };

        bus.subscribe('launchpad-retail.p2pTransactions.newTransferSubmitted', function() {
            // For demo purposes adding a 3 sec delay
            $timeout(function() {
                $scope.transactionsModel.clearTransactionsList();
                $scope.transactionsModel.loadMoreTransactions();
            }, 3000);
        });

        var initialize = function() {

            $scope.hideFooter = lpCoreUtils.parseBoolean(lpWidget.getPreference('hideFooter'));
            $scope.locale = lpWidget.getPreference('locale');
            $scope.title = lpWidget.getPreference('title');

            $scope.userEnrolledForP2P = false;

            p2pService.getAll().then(function(response) {
                $scope.userEnrolledForP2P = true;
                initializeP2PTransactions(response.accountId);
            }, function(response) {
                if (response.status === 404) {
                    //user not enrolled
                    $scope.userEnrolledForP2P = false;
                }
            });
            if($scope.hideFooter) {
                lpCoreBus.subscribe('p2p:transfer:money', $scope.transferMoney);
            }

        };

        initialize();
    };
});
