define(function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;
    var allAccounts = require('./all-accounts');

    // @ngInject
    var lpAccountsModel = function (lpAccounts) {
        this.config = {};
        this.lpAccounts = lpAccounts;
        this.model = {
            accounts: [],
            selected: {},
            selectedId: undefined
        };
    };


    var api = {

        _findAccountById: function (id) {
            return utils.find(this.model.accounts, {id: id});
        },


        /**
         * Sets the selected account if available
         * @param  {Object} defaultAccount
         * @return {Object} model
         */
        _selectAccount: function (defaultAccount) {

            this.model.selected =
                this._findAccountById(this.model.selectedId) ||
                defaultAccount || {};

            return this.model;
        },

        /**
         * Add accounts to the model and isolate them from sharing
         * @param {Array} accounts list
         */
        _addAccounts: function (accounts) {
            this.model.accounts = utils.union(this.model.accounts, utils.clone(accounts));
            return this.model.accounts;
        },

        /**
         * Populate model with accounts list
         * @param  {Array} accounts list
         * @return {Object} model
         */
        _loadCallback: function (accounts) {
            var defaultAccountId = this.getConfig('defaultAccountId');
            var showAllAccountsItem = utils.parseBoolean(this.getConfig('showAllAccountsItem')) || false;

            var all;

            this._addAccounts(accounts);

            if(showAllAccountsItem) {
                all = allAccounts.getItem(this.model.accounts);

                // Extend accounts model with "All Accounts" item
                this.model.accounts.unshift(all);
            }

            this.model.selectedId = this.model.selectedId || all && all.id || defaultAccountId;

            this._selectAccount(this.model.accounts[0]);

            return this.model;
        },

        _errorCallback: function (err) {
            return err;
        },


        /*
            PUBLIC API
         */


        /**
         * handles accounts list loading and model population
         * @param  {Function} callback being executed
         * @return {Promise}
         */
        load: function () {
            return this.lpAccounts.load().then(
                this._loadCallback.bind(this),
                this._errorCallback.bind(this)
            );
        },

        updateAccount: function(account) {
            var acc = this._findAccountById(account.id);
            utils.assign(acc, account);
            return acc;
        },

        /**
         * callback being executed on 'launchpad-retail.accountSelected'
         * or 'launchpad-retail.cardSelected' event
         * @param  {Object} data passed together with event
         * @return {Object} model
         */
        onAccountSelected: function (data) {
            var selectedId = data.accountId;

            if(data.account && data.account.id) {
                this._addAccounts([data.account]);
                selectedId = data.account.id;
            }
            this.model.selectedId = selectedId;

            return this._selectAccount();
        },

        setConfig: function(options) {
            this.config = utils.mapValues(options, utils.resolvePortalPlaceholders);
            return this;
        },

        getConfig: function(prop, defVal) {
            if (prop && utils.isString(prop)) {
                return this.config[prop] || defVal;
            } else {
                return this.config;
            }
        }

    };

    utils.assign(lpAccountsModel.prototype, api);
    exports.lpAccountsModel = lpAccountsModel;

});

