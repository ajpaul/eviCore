define(function(require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    exports.lpAccountsUtils = function() {
        return {
            /**
             * Calculate group total balance
             * @param group
             * @returns {{totalBalance: number, currency: *}}
             * @param balanceType {String} available, booked.
             */
            getGroupTotal: function(group, balanceType) {

                var totalBalance = 0,
                    currency;

                utils.forEach(group.accounts, function(account) {
                    totalBalance += account[balanceType + 'Balance'];
                    currency = account.currency;
                });

                return {
                    totalBalance: totalBalance,
                    currency: currency
                };
            }
        };
    };
});
