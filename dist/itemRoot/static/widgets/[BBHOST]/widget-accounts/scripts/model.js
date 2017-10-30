define(function(require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    /**
     * Check if the account is external
     * @param  {object}  account The object with the account information
     * @return {Boolean}         True if is external false if internal
     */
    var isExternalAccount = function(account) {
        return account.accountServicer && account.accountServicer.id;
    };

    /**
     * Check if external account should be displayed
     * @param  {object}  account The object with the account information
     * @return {Boolean}         True if visible false if should be hidden
     */
    var isNotHiddenExternalAccount = function(account) {
        return !isExternalAccount(account) || account.accountServicer.display;
    };

    /**
     * Update account balances to be float. The `account` object is not modified,
     * a new object with updated balances is returned.
     * @param  {object} account The object with the account information
     * @return {object}         A new updated account object
     */
    var parseAccountBalances = function(account) {
        var result = utils.clone(account);
        result.availableBalance = parseFloat(account.availableBalance);
        result.bookedBalance = parseFloat(account.bookedBalance);

        return result;
    };

    /**
     * Remove not displayable external accounts and update balances of a list of
     * accounts. Returns a new account collection.
     * @param  {collection} accounts List of accounts
     * @return {collection}          A newly created list of accounts
     */
    var getProcessedAccounts = function(accounts) {
        var resultAccounts = utils.cloneDeep(accounts);
        utils.forEach(resultAccounts, function(group, index) {
            group.accounts = utils(group.accounts)
                .chain()
                .filter(isNotHiddenExternalAccount)
                .map(parseAccountBalances)
                .value();
            // Open first group by default
            group.isOpen = !index;
        });

        return resultAccounts;
    };

    /**
     * Split a collection of accounts in two collections, internal and external.
     * @param  {object} accountsCollection An object with accounts sorted by group
     * @return {object}                    An object containing accounts splitted by internal
     * and external
     */
    var getAccountsSplittedByInternalExternal = function(accountsCollection) {
        var result = {
            internal: {},
            external: {}
        };

        utils.forOwn(accountsCollection, function(accounts, group) {
            result.internal[group] = [];
            result.external[group] = [];
            utils.forEach(accounts, function(account) {
                if (!isExternalAccount(account)) {
                    result.internal[group].push(account);
                } else {
                    result.external[group].push(account);
                }
            });
        });

        return result;
    };

    /**
     * Creates a collection of groups with the accounts related
     * @param  {array} groups            Collection of groups and its information
     * @param  {object} accountCollection Collection of grouped accounts
     * @return {array}                   List of groups filled with accounts
     */
    var groupAccounts = function(groups, accountCollection) {
        return utils.chain(groups)
        .map(function(group, index) {
            var foundAccounts = utils.find(accountCollection, function(accounts, key) {
                return group.code === key;
            });

            return {
                title: group.defaultTitle,
                code: group.code,
                accounts: foundAccounts || [],
                isCollapsed: false,
                // Open first group
                isOpen: false
            };
        })
        .remove(function(group) {
            return group.accounts.length;
        })
        .value();
    };

    var flattenAccounts = function(accounts) {
        return utils(accounts).reduce(function(prev, curr) {
            curr.accounts.forEach(function(account, i) {
                account.code = curr.code;
                if (i === 0) {
                    account.groupTitle = curr.title;
                    account.groupAccountsCount = curr.accounts.length;
                }
            });
            return prev.concat(curr.accounts);
        }, []);
    };

    /**
     * Assets service constructor
     * @constructor
     * @ngInject
     */
    var AssetsModel = function(lpCoreBus, $resource) {
        this.bus = lpCoreBus;
        this.resource = $resource;

        this.accounts = null;
        this.groups = null;
        this.assetCollection = [];
        this.error = false;

        this.bus.subscribe('launchpad-retail:ACCOUNT_BALANCE_CHANGED', function(response) {
            if(this.accounts !== null) {
                this.load();
            }
        }.bind(this));
    };

    /**
     * Configure model
     * @param {object} config Preferences from widget
     */
    AssetsModel.prototype.config = function(config) {
        config.assetsEndpoint = utils.resolvePortalPlaceholders(config.assetsEndpoint);

        this.assetsResource = this.resource(config.assetsEndpoint);

        this.groupsEnabled = !!config.groupsEndpoint;
        this.groupByInternalExternal = !!config.groupByInternalExternal;

        if (this.groupsEnabled) {
            config.groupsEndpoint = utils.resolvePortalPlaceholders(config.groupsEndpoint);
            this.groupsResource = this.resource(config.groupsEndpoint);
        }

        this.filterByGroupCode = config.groupCodeFilter;
    };

    AssetsModel.prototype.first = function() {
        var accounts = this.groupsEnabled ? this.assetCollectionFlat : this.assetCollection;

        return accounts.length > 0 && accounts[0];
    };

    /**
     * Load data from server
     */
    AssetsModel.prototype.load = function() {
        return this.assetsResource.get().$promise.then(function(accounts) {
            this.accounts = accounts;
            this.bus.publish('launchpad-retail.accountsLoaded', accounts['current-account']);

            if (this.groupsEnabled) {
                return this.groupsResource.query().$promise.then(function(groups) {
                    this.groups = groups;
                    if (!this.groupByInternalExternal){
                        this.assetCollection = getProcessedAccounts(groupAccounts(this.groups, this.accounts));
                        this.assetCollectionFlat = flattenAccounts(this.assetCollection);
                    } else {
                        var splittedAccounts = getAccountsSplittedByInternalExternal(this.accounts);
                        this.internalCollection = getProcessedAccounts(groupAccounts(this.groups, splittedAccounts.internal));
                        this.externalCollection = getProcessedAccounts(groupAccounts(this.groups, splittedAccounts.external));
                        this.assetCollection = this.internalCollection.concat(this.externalCollection);
                        this.assetCollectionFlat = flattenAccounts(this.assetCollection);
                    }

                    return this.accounts;
                }.bind(this));
            } else {
                if (!this.groupByInternalExternal) {
                    this.assetCollection = getProcessedAccounts(this.accounts);
                } else {
                    var splittedAccounts = getAccountsSplittedByInternalExternal(this.accounts);
                    this.internalCollection = getProcessedAccounts(splittedAccounts.internal);
                    this.externalCollection = getProcessedAccounts(splittedAccounts.external);
                    this.assetCollection = this.internalCollection.concat(this.externalCollection);
                }

            }

            utils.forEach(this.accounts, this.configurePreviousBalanceDelta);

            return this.accounts;
        }.bind(this));
    };

    AssetsModel.prototype.findAccountById = function(id) {
        return utils(this.assetCollectionFlat).findWhere({ id: id });
    };

    /**
     * Calculate pending
     * @param account
     * @returns {number}
     */
    AssetsModel.prototype.getPending = function(account) {
        return account.bookedBalance - account.availableBalance;
    };

    /**
     * Sets up a delta on individual account
     * @param listOfAccounts a list of the new accounts to load
     */
    AssetsModel.prototype.configurePreviousBalanceDelta = function(account) {
        if (!this.previousBalances) {
            //initial load - initialize array
            this.previousBalances = [];

            account.delta = 0;
            this.previousBalances[account.id] = account.availableBalance;
        } else {

            if (this.previousBalances[account.id] > account.availableBalance) {
                //new balance has decreased
                account.delta = -1;
            } else if (this.previousBalances[account.id] < account.availableBalance) {
                //new balance has increased
                account.delta = 1;
            } else {
                account.delta = 0;
            }

            this.previousBalances[account.id] = account.availableBalance;
        }
    };

    AssetsModel.prototype.hasExternalAccounts = function() {
        return !!(this.externalCollection && utils(this.externalCollection)
            .chain()
            .values()
            .pluck('accounts')
            .flatten()
            .value()
            .length);
    };

    exports.AssetsModel = AssetsModel;
});
