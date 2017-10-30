define( function (require, exports, module) {
    'use strict';

    var CFG_ACCOUNTS_ENDPOINT = 'accountsEndpoint';
    var CFG_DEFAULT_ACCOUNT = 'defaultAccount';

    var normaliser = require('./accounts-normaliser');
    var cache = {};

    var utils = require('base').utils;


    /**
     * HELPERS
     * -------
     */

    // masking account (or any other string) with symbols
    var maskAccount = function(acc, num, symbol) {
        var rx, replacer;
        symbol = symbol || '*';
        num = parseInt(num, 10) || 0;
        if (!acc) { return ''; }
        if (!num) { return acc; }
        replacer = utils.range(num).map(function () { return symbol; }).join('');
        rx = new RegExp('^.{0,' + num + '}', 'i');

        return acc.replace(rx, replacer);
    };



    var API = function(options) {
        this.accounts = [];
        this.error = false;
        this.setConfig(options);
        this.$http = options.$http;
        this.lpCoreError = options.lpCoreError;
    };


    utils.assign(API.prototype, {

        /*
         * Set the configuration object for the accounts provider.
         *
         * @param core.configuration config
         * @return void
        */
        setConfig: function(options) {
            if (options && options[CFG_ACCOUNTS_ENDPOINT]) {
                options[CFG_ACCOUNTS_ENDPOINT] = utils.resolvePortalPlaceholders(options[CFG_ACCOUNTS_ENDPOINT]);
            }
            this.config = options;
        },

        /**
         * Get value from config key/value hash.
         */
        getAttribute: function(attr) {
            return this.config && this.config[attr];
        },

        load: function(justRefresh) {
            var url = this.getAttribute(CFG_ACCOUNTS_ENDPOINT);
            if (!url) {
                this.lpCoreError.throwException(new Error([
                    'lpAccounts module:',
                    CFG_ACCOUNTS_ENDPOINT,
                    'is not configured.'
                ].join(' ')));
            }

            // TODO: cache http response

            cache[url] = this.$http.get(url)
                .then(normaliser)
                .then(function(accounts) {
                    return this.refreshAccounts(accounts, justRefresh);
                }.bind(this));

            return cache[url];
        },

        getAll: function(force) {
            return this.load(force);
        },

        pluckDefaultAccount: function(accounts) {
            var accountsWrapper = utils(accounts); // create lodash wrapper.

            return accountsWrapper.first();
        },

        getDefaultAccountBban: function() {
            return this.getAttribute(CFG_DEFAULT_ACCOUNT);
        },

        configureAccountIdentifiers: function(account) {
            var self = this;
            var localeMap = {
                'EU': 'IBAN',
                'US': 'BBAN',
                'en-US': 'BBAN'
            };
            var getProp = function(prop) {
                return self.config[prop] || utils.getPagePreference(prop) || utils.getPortalProperty(prop);
            };

            var locale = getProp('locale');
            if(!locale || !localeMap[locale]) {
                locale = 'EU';
            }

            // Comment:
            //     - if there is a config prop 'hideAccount' is true, then account number will not show up
            //     - if there is a config prop 'maskAccount' is positive number, then account will appear masked
            //       with * the first account characters
            if(account.accountIdentification) {
                utils.forEach(account.accountIdentification, function(identifier) {
                    if(identifier.scheme === localeMap[locale]) {
                        if (!getProp('hideAccount') && getProp('maskAccount')) {
                            account.identifier = maskAccount(identifier.id, getProp('maskAccount'));
                        } else if (!getProp('hideAccount') && !getProp('maskAccount')) {
                            account.identifier = identifier.id;
                        }
                    }
                });
            }
        },

        /**
        * Find account by Id
        * @param id
        * @returns {Array}
        */
        findById: function(id) {
            return this.accounts.filter(function(account){ return account.id === id; })[0];
        },

        /**
        * Find account by Account Number
        * @param id
        * @returns {Array}
        */
        findByAccountNumber: function(bban) {
            return this.accounts.filter(function(account){ return account.bban === bban; })[0];
        },

        /**
        * Calculate pending
        * @param account
        * @returns {number}
        */
        getPending: function(account) {
            return account.bookedBalance - account.availableBalance;
        },

        /**
        * Calculate size of the group
        * @param group
        * @returns {number}
        */
        getGroupSize: function(group) {
            var size = 0;
            for (var i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].groupCode === group.code) {
                    size++;
                }
            }
            return size;
        },

        /**
        * Sets up a delta on individual account
        * @param account account to configure
        **/
        configurePreviousBalanceDeltas: function(account) {

            var self = this;

            if (!self.previousBalances) {
                //initial load - initialize array
                self.previousBalances = [];
                account.delta = 0;
                self.previousBalances[account.id] = account.availableBalance;
            } else {
                if (self.previousBalances[account.id] > account.availableBalance) {
                    //new balance has decreased
                    account.delta = -1;
                } else if (self.previousBalances[account.id] < account.availableBalance) {
                    //new balance has increased
                    account.delta = 1;
                } else {
                    account.delta = 0;
                }
                self.previousBalances[account.id] = account.availableBalance;
            }
        },

        /**
        * Refresh accountsModel with new accounts
        * @param newAccounts the new accounts to set to the accountsModel
        */
        refreshAccounts: function(newAccounts, justRefresh) {
            // we're not expecting new accounts just handle
            // existing ones
            if (justRefresh === true) {
                this.accounts = [];
            }

            for (var i = 0; i < newAccounts.length; i++) {
                this.configureAccountIdentifiers(newAccounts[i]);
                this.configurePreviousBalanceDeltas(newAccounts[i]);
                this.formatAccountBalance(newAccounts[i]);
                this.accounts.push(newAccounts[i]);
            }

            return this.accounts;
        },

        /**
        * Calculate group total balance
        * @param group
        * @returns {{totalBalance: number, currency: *}}
        */
        getGroupTotal: function(group) {
            var account,
            totalBalance = 0,
            currency;

            for (var j = 0; j < this.accounts.length; j++) {
                account = this.accounts[j];
                if (account.groupCode === group.code) {
                    totalBalance += account.balance;
                    currency = account.currency;
                }
            }

            return { totalBalance: totalBalance, currency: currency};
        },

        /**
        * TODO: remove after formatting is in place
        */
        formatAccountBalance: function(account) {
            account.availableBalance = parseFloat(account.availableBalance);
            account.bookedBalance = parseFloat(account.bookedBalance);
        },

        /**
         * Check if the account is external
         * @param  {object}  account The object with the account information
         * @return {Boolean}         True if is external false if internal
         */
        isExternalAccount: function(account) {
            return account.accountServicer && account.accountServicer.id;
        }
    });

    module.exports = API;
});
