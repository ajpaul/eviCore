/**
 * Transactions controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function($scope, $element, $timeout, lpWidget, lpCoreBus, i18nUtils, lpCoreUtils, lpTransactionsCategory, lpTransactions, lpAccounts, ContactsModel, lpUsersPreference, lpDownloadTransactionsFile) {
        var ctrl = this;

        var transactionsListElement = '.lp-transactions-list-directive';
        var transactionsListContainers = {
            LIST: '.lp-transactions-list-container-list',
            COMBINED: '.lp-transactions-list-container-combined',
            DONUT: '.lp-transactions-list-container-donut'
        };
        var stickyHeaderClass = 'lp-transactions-sticky-header';

        var reattachTransactionsList = function(parentId) {
            var el = $element.find(transactionsListElement).detach();
            $element.find(parentId).append(el);
        };

        var scopeApply = function() {
            $timeout(function() {
                $scope.$apply();
            });
        };

        var accountType = {
            'ACCOUNT': 'account',
            'CARD': 'card'
        };

        var checkSelectedAccount = function(type, account) {
            lpCoreUtils.forEach(lpAccounts.accounts, function(currentAccount){
                if(account[accountType[type.toUpperCase()] + 'Id'] === currentAccount.id){
                    lpAccounts.selected = currentAccount;
                }
            });

            scopeApply();
        };

        var saveCardAccount = function(accounts, cardAccount) {
            /*eslint-disable */
            if (!lpCoreUtils.find(accounts, function(account) { return account.id == cardAccount.id; })) {
                accounts.push(cardAccount);
            }
            /*eslint-enable */
        };

        var load = function() {
            $scope.lpTransactionsCategory.getAll();
            $scope.lpContacts.loadContacts();
        };

        var initialize = function() {
            // Expose providers in the scope
            $scope.dropdown = { customFields: lpWidget.getPreference('accountSelectCustomFields') };
            $scope.lpAccounts = lpAccounts;
            $scope.lpTransactionsCategory = lpTransactionsCategory.api();
            $scope.lpTransactions = lpTransactions.api();
            $scope.lpContacts = new ContactsModel({
                contacts: lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('contactsDataSrc')),
                lazyload: true
            });

            $scope.hideFooter = lpCoreUtils.parseBoolean(lpWidget.getPreference('hideFooter'));
            $scope.showCharts = lpCoreUtils.parseBoolean(lpWidget.getPreference('showCharts'));
            $scope.showAccountSelect = lpCoreUtils.parseBoolean(lpWidget.getPreference('showAccountSelect'));
            $scope.accountsTopBalance = lpWidget.getPreference('preferredBalanceView') || 'current';
            $scope.showDatesAllTransactions = lpCoreUtils.parseBoolean(lpWidget.getPreference('showDatesAllTransactions')) || false;
            $scope.showCategories = false;
            $scope.showTransactionIcons = lpCoreUtils.parseBoolean(lpWidget.getPreference('showTransactionIcons'));
            $scope.showExportButton = lpCoreUtils.parseBoolean(lpWidget.getPreference('showExportButton'));
            $scope.hideDetailsPreference = lpCoreUtils.parseBoolean(lpWidget.getPreference('hideTransactionDetails')) || false;
            $scope.offsetTopCorrection = 0;
            $scope.showScrollbar = lpCoreUtils.parseBoolean(lpWidget.getPreference('showScrollbar'));
            //Switch to show large account select or small
            $scope.accountSelectSize = 'large';
            $scope.tabs = {
                'list': true,
                'chart': false,
                'combined': false,
                'donut': false
            };

            $scope.$watch('tabs.list', function(newTabValue, oldTabValue) {
                if (newTabValue && !oldTabValue) {
                    reattachTransactionsList(transactionsListContainers.LIST);
                }
            });

            $scope.$watch('tabs.combined', function(newTabValue, oldTabValue) {
                if (newTabValue && !oldTabValue) {
                    reattachTransactionsList(transactionsListContainers.COMBINED);
                }
            });
            $scope.$watch('tabs.donut', function(newTabValue, oldTabValue) {
                if (newTabValue && !oldTabValue) {
                    reattachTransactionsList(transactionsListContainers.DONUT);
                }
            });

            $scope.stickyHeader = lpCoreUtils.parseBoolean(lpWidget.getPreference('stickyHeader')) ?
                stickyHeaderClass : '';

            /**
             * Accounts
             */
            lpAccounts.load()
            .then(function() {
                if(!lpAccounts.selected && lpAccounts.accounts && lpAccounts.accounts.length > 0) {
                    var selectedAccount = lpAccounts.findByAccountNumber(lpWidget.getPreference('defaultAccount')) || lpAccounts.accounts[0];
                    lpAccounts.selected = selectedAccount;

                    // now safe to listen for select account messages
                    lpCoreBus.subscribe('launchpad-retail.accountSelected', function(account) {
                        if (!account.originType || account.originType !== 'transactions') {
                            checkSelectedAccount(accountType.ACCOUNT, account);
                        }

                        // subscribe to changes in the account details widget
                        lpCoreBus.subscribe('account-details:account:update', function(updatedAccount) {
                            var acc = lpAccounts.findById(updatedAccount.id);
                            if (acc) {
                                lpCoreUtils.safeApply($scope, function() {
                                    lpCoreUtils.assign(acc, updatedAccount);
                                });
                            }
                        });
                    });

                    lpCoreBus.subscribe('launchpad-retail.cardSelected', function(params) {
                        var account = params.account;

                        if (!account.cardId) {
                            account.cardId = account.id;
                        }

                        if (account.cardId) {
                            saveCardAccount(lpAccounts.accounts, account);
                            checkSelectedAccount(accountType.CARD, account);
                        }
                    });

                    /*----------------------------------------------------------------*/
                    /* Events
                    /*----------------------------------------------------------------*/
                    lpCoreBus.subscribe('launchpad-retail.transactions.applyFilter', function(data) {
                        // scope.tabs.list = true;
                        $scope.searchTerm = data.contactName;
                        $scope.lpTransactions.setFilters(data.filters);
                        $scope.lpTransactions.loadTransactions(lpAccounts.selected);
                    });

                    lpCoreBus.subscribe('launchpad-retail.transactions.newTransferSubmitted', function() {
                        // For demo purposes adding a 3 sec delay
                        $timeout(function() {
                            $scope.lpTransactions.clearTransactionsList();
                            $scope.lpTransactions.loadMoreTransactions();
                        }, 3000);
                    });

                    lpCoreBus.subscribe('launchpad-retail.donutCategoryChartSelection', function(data) {
                        $scope.lpTransactions.setFilters({category: data.categoryId});
                        $scope.lpTransactions.loadTransactions(lpAccounts.selected);
                    });
                } else {
                    $scope.classOnAccounts = 'hidden';
                }
            });

            load();

            lpCoreBus.subscribe('launchpad-retail.offsetTopCorrection', function(data) {
                $scope.offsetTopCorrection = data.offsetTopCorrection;
            });

            lpUsersPreference.read().success(function(response) {
                $scope.showCategories = lpCoreUtils.parseBoolean(response.pfm);
            });
        };

        $scope.hasAccounts = function() {
            return lpAccounts.accounts.length > 0;
        };

        // Handlers
        $scope.accountChanged = function() {
            lpCoreBus.publish('launchpad-retail.accountSelected', {
                accountId: lpAccounts.selected.id,
                originType: 'transactions',
                _noBehavior: true // Do not allow behavior to re-open the widget
            }, true);
        };

        $scope.selectTab = function(tab) {
            $scope.$broadcast('tabSelected', tab);
        };

        $scope.transferMoney = function() {
            lpCoreBus.publish('launchpad-retail.requestMoneyTransfer');
        };

        $scope.onPerformSearch = function(filters) {
            $scope.lpTransactions.setFilters(filters);
            $scope.lpTransactions.loadTransactions(lpAccounts.selected);
        };

        $scope.onClearSearch = function() {
            $scope.lpTransactions.clearFilters();
            $scope.lpTransactions.loadTransactions(lpAccounts.selected);
        };

        $scope.onUpdateSearch = function() {
            $scope.lpTransactions.updateFilters();
            $scope.lpTransactions.loadTransactions(lpAccounts.selected);
        };

        $scope.onChangeSort = function(value) {
            $scope.lpTransactions.sort = value.sort;

            if ($scope.lpTransactions.transactions && $scope.lpTransactions.transactions.length) {
                $scope.lpTransactions.loadTransactions(lpAccounts.selected);
            }
        };

        $scope.onExportTransactions = function(format) {
            lpDownloadTransactionsFile($scope.lpTransactions.getExportTransactionsLink(format));
        };

        ctrl.responsiveCallback = function(size){
            var isSmall = lpCoreUtils(['tile', 'small']).indexOf(size) > -1;
            $scope.categoryLayout = isSmall ? 'small' : size;
            $scope.categorySmallLayout = isSmall;
        };


        initialize();

        // data freshness initiate refresh data from server
        lpCoreBus.subscribe('lpDataFreshnessRefresh', function(status) {

            // updating accounts dropdown view
            lpAccounts.load(true)
            .then(function(){
                // show 'refresh' message
                lpCoreBus.publish('lpDataFreshnessChanged', status);
            });

            // NOTE: accounts on left navbar is being updated in 'accounts' widget

            // re-init the transactions
            load();
        });
    };
});
