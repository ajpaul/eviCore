define( function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;
    var defaults = {
        url: '/v1/accounts/:accountId'
    };

    // @ngInject
    var AccountService = function($http, lpCoreError) {
        this.config = {};
        this.error = lpCoreError;
        this.http = $http;
    };

    var api = {
        create: function(model) {
            if (!utils.isObject(model)) {
                this.error.throwException('No account provided to create');
            } else {
                // TODO: when service has POST method add functionality
            }
        },

        read: function(accountId) {
            if (!accountId) {
                this.error.throwException('No account id provided');
            }

            return this.http({
                method: 'GET',
                url: this.config.url.replace(':accountId', accountId)
            }).then(function(response) {
                return response.data;
            });
        },

        update: function(model) {
            if (!utils.isObject(model)) {
                this.error.throwException('No account provided to update');
            }

            return this.http({
                method: 'PUT',
                url: this.config.url.replace(':accountId', model.id),
                data: model
            }).then(function(response) {
                return response.data;
            });
        },

        'delete': function(accountId) {
            if (!accountId) {
                this.error.throwException('No account id provided');
            } else {
                // TODO: when service has DELETE method add functionality
            }
        },

        setConfig: function(options) {
            this.config = utils.chain(options)
                .mapValues(utils.resolvePortalPlaceholders)
                .defaults(defaults)
                .value();
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

    utils.assign(AccountService.prototype, api);

    exports.lpAccountService = AccountService;
});
