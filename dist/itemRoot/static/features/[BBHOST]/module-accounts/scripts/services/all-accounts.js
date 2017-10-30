define(function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    var allAccountsId = '000-000-000';

    var allAccountsItem = {
        id: allAccountsId,
        ids: '',
        hideAmounts: true,
        currency: '',
        alias: 'All Finances',
        availableBalance: '',
        bookedBalance: '',
        accountIdentification: [],
        identifier: ''
    };

    // Get a list of accounts as a single string
    var getListAccountNames = function (list, separator, propName) {
        return utils.pluck(list, propName || 'alias').join((separator || ',') + ' ');
    };

    // check if we have the same currency in accounts list
    var isSameCurrencyAllAccounts = function (list) {
        var curr = utils.chain(list).pluck('currency').uniq().value();
        return curr.length === 1 ? curr[0] : false;
    };

    // get total amount for balances provided in accounts data
    var aggregateBalance = function (list, type) {
        var values = utils.pluck(list, type);
        var total = 0.0;

        if (utils.isArray(values)) {
            utils.forEach(values, function (val) {
                var balance = parseFloat(val) || 0.0;
                total += balance;
            });
        }

        return total;
    };

    // get an object with account ID as a key and its alias as a value
    var getNamesCollection = function (list) {
        var keys, values, res = {};

        if (!list || !utils.isArray(list)) {
            return res;
        }

        keys = utils.pluck(list, 'id');
        values = utils.pluck(list, 'alias');

        keys.forEach(function (key, index) {
            res[key] = values[index] || 'No Data';
        });

        return res;
    };

    // get list of all 'real' accounts we know about
    var getAccountsIds = function (list) {
        return utils.pluck(list, 'id').join(',');
    };


    exports.getItem = function (list){

        utils.assign(allAccountsItem, {
            ids: getAccountsIds(list),
            identifier: getListAccountNames(list),
            accountsNames: getNamesCollection(list)
        });

        // add aggregated balances
        if (isSameCurrencyAllAccounts(list)) {
            utils.assign(allAccountsItem, {
                availableBalance: aggregateBalance(list, 'availableBalance'),
                bookedBalance: aggregateBalance(list, 'bookedBalance'),
                currency: isSameCurrencyAllAccounts(list),
                hideAmounts: false
            });
        }

        return allAccountsItem;
    };

});
