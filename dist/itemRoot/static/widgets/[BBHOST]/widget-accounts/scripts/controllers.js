define(function (require, exports, module) {

    'use strict';

    var utils = require('base').utils;

    var responsiveCallback = function(scope, className) {
        return function() {
            utils.safeApply(scope, function() {
                scope.responsiveClass = className;
            });
        };
    };

    var balanceMap = {current: 'booked', available: 'available'};

    /**
     * Main Controller
     * @ngInject
     */
    function MainCtrl($scope, $rootElement, lpWidget, AssetsModel, lpUIResponsive, lpCoreBus, lpAccountsUtils) {

        this.layout = lpWidget.getPreference('widgetLayout');

        this.getGroupTotal = function(group) {
            return lpAccountsUtils.getGroupTotal(group, this.preferences.defaultBalanceMapped);
        };

        this.scope = $scope;
        this.bus = lpCoreBus;
        this.widget = lpWidget;
        this.model = AssetsModel;

        // Events
        this.widget.addEventListener('preferencesSaved', this.refreshWidget.bind(this));

        // Refresh accounts if 'data freshness' flag changes from 'updating' to 'actual'
        this.bus.subscribe('lpDataFreshnessRefresh', function () {
            utils.safeApply(this.scope, this.load.bind(this));
        }.bind(this));

        this.bus.subscribe('launchpad-retail.accountSelected', function(params) {
            utils.safeApply($scope, function() {
                this.model.selected = params.accountId;
            }.bind(this));
        }.bind(this));

        // Check default account
        this.bus.subscribe('widget-account-details:default-account:set', this.setDefaultAccountId.bind(this));

        // Responsive
        lpUIResponsive.enable($rootElement)
            .rule({
                'max-width': 200,
                then: responsiveCallback($scope, 'lp-tile-size')
            })
            .rule({
                'min-width': 201,
                'max-width': 350,
                then: responsiveCallback($scope, 'lp-small-size')
            }).rule({
                'min-width': 351,
                'max-width': 600,
                then: responsiveCallback($scope, 'lp-normal-size')
            }).rule({
                'min-width': 601,
                then: responsiveCallback($scope, 'lp-large-size')
            });

            this.config();
            this.load();
    }

    /**
     * Save default account id widget preference
     * @param {object} defaultAccount An account object
     */
    MainCtrl.prototype.setDefaultAccountId = function(defaultAccount) {
        var id = (defaultAccount && defaultAccount.id) || '';
        this.widget.setPreference('defaultAccountId', id);
        this.widget.model.save();
        if (this.preferences) {
            this.preferences.defaultAccountId = id;
        }
        this.bus.publish('widget-accounts:default-account:select', defaultAccount);
    };

    /**
     * Make default account be selected in the accounts list
     */
    MainCtrl.prototype.selectDefaultAccount = function() {
        if (!this.preferences.selectDefaultAccount) {
            return true;
        }

        if (this.preferences.defaultAccountId) {
            var defaultAccount = this.model.findAccountById(this.preferences.defaultAccountId);
            this.selectAccount(defaultAccount, defaultAccount.code);
            this.openDefaultAccountGroup(defaultAccount);
            this.bus.publish('widget-accounts:default-account:select', defaultAccount);
        }

        // Return if default account was set
        return !!this.preferences.defaultAccountId;
    };

    /**
     * Check which is the group that contains default account and opens it closing others.
     * @param  {object} defaultAccount Current default account
     */
    MainCtrl.prototype.openDefaultAccountGroup = function(defaultAccount) {
        var groups = this.model.groupByInternalExternal ? this.model.internalCollection : this.assetCollection;
        utils.forEach(groups, function(group) {
            group.isOpen = defaultAccount.code === group.code;
        });
    };

    MainCtrl.prototype.config = function() {
        this.title = this.widget.getPreference('title');
        this.preferences = {
            showGroups: utils.parseBoolean(this.widget.getPreference('showGroups')),
            showTotals: utils.parseBoolean(this.widget.getPreference('showGroupTotals')),
            showAccountHolderName: utils.parseBoolean(this.widget.getPreference('showAccountHolderName')),
            showAccountType: utils.parseBoolean(this.widget.getPreference('showAccountType')),
            showAccountHolderCategory: utils.parseBoolean(this.widget.getPreference('showAccountHolderCategory')),
            selectDefaultAccount: utils.parseBoolean(this.widget.getPreference('selectDefaultAccount')),
            groupByInternalExternal: utils.parseBoolean(this.widget.getPreference('groupByInternalExternal')),
            showAllFinances: utils.parseBoolean(this.widget.getPreference('showAllFinances')),
            defaultBalance: this.widget.getPreference('preferredBalanceView') ||
                this.widget.getPreferenceFromParents('preferredBalanceView') ||
                'current',
            defaultAccountId: this.widget.getPreference('defaultAccountId'),
            internalIsOpen: true,
            externalIsOpen: false
        };

        this.preferences.defaultBalanceMapped = balanceMap[this.preferences.defaultBalance] || this.preferences.defaultBalance;

        this.model.config({
            assetsEndpoint: this.widget.getResolvedPreference('accountsDataSrc'),
            groupsEndpoint: this.widget.getResolvedPreference('groupsDataSrc'),
            groupByInternalExternal: this.preferences.groupByInternalExternal
        });
    };

    MainCtrl.prototype.load = function () {
        var firstAccount;

        this.model.loadingNow = true;
        this.model.noAccountsAvailable = false;
        this.model.load().then(function() {
            this.model.loadingNow = false;
            if (!this.model.accounts || (
                !(this.model.accounts['current-account'] && this.model.accounts['current-account'].length) &&
                !(this.model.accounts.card && this.model.accounts.card.length) &&
                !(this.model.accounts['current-portfolio'] && this.model.accounts['current-portfolio'].length)
                )
            ) {
                this.model.noAccountsAvailable = true;
            }

            if(!this.selectDefaultAccount()) {
                firstAccount = this.model.first();
                if (utils.isPlainObject(firstAccount)) {
                    this.selectAccount(firstAccount, firstAccount.code);
                }
            }

            // Subscribe to update account details
            this.bus.subscribe('account-details:account:update', function(account) {
                utils.safeApply(this.scope, this.updateAccountDetails.bind(this, account));
            }.bind(this));
        }.bind(this))
        ['finally'](function() {
            this.model.loadingNow = false;
        }.bind(this))
        ['catch'](function(error) {
            throw this.model.error = 'Failed to load accounts.';
        }.bind(this));
    };

    MainCtrl.prototype.refreshWidget = function() {
        this.widget.refreshHTML();
        this.load();
    };

    MainCtrl.prototype.updateAccountDetails = function(updatedAccount) {
        var account = this.model.findAccountById(updatedAccount.id);
        if (account) {
            utils.assign(account, updatedAccount);
        }
    };

     MainCtrl.prototype.selectAccount = function(account, groupCode) {
         this.model.selected = account.id;

         if (account.type === 'portfolio') {
             this.bus.publish('launchpad-retail.portfolioSelected', account);
         }
         else if (groupCode && groupCode === 'card') {
             this.bus.publish('launchpad-retail.openCardManagement');
             this.bus.publish('launchpad-retail.cardSelected', {account: account});
         }
         else {
             this.bus.publish('launchpad-retail.accountSelected', {
                 accountId: account.id,
                 originType: 'accounts'
             }, true);
         }
     };

    MainCtrl.prototype.payForAccount = function ($event, id) {
        $event.stopPropagation();
        this.bus.publish('launchpad-retail.requestMoneyTransfer', {
            accountId: id
        });
    };

    MainCtrl.prototype.openAllFinances = function() {
        this.bus.publish('launchpad-retail.accountSelected', {
            // Id for all accounts
            accountId: '000-000-000',
            originType: 'accounts'
        });
    };

    exports.MainCtrl = MainCtrl;
});
