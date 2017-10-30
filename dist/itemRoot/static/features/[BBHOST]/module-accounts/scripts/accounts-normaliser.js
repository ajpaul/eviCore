define( function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    module.exports = function(response) {
        var accounts = response.data;

        if (utils.isPlainObject(accounts)) {
            return utils(accounts)
                .chain()
                .values()
                .flatten()
                .value();
        } else {
            return accounts;
        }

    };
});
