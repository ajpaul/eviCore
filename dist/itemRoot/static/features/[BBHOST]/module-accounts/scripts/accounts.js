define( function (require, exports, module) {
    'use strict';

    /**
     * Note. AccountsModel is provided for backwards compatability with
     * old widgets.
     */
    var API = require('./api');

    // @ngInject
    exports.lpAccounts = function(lpCoreUtils) {
        /**
         * To configure the provider before initialisation.
         */
        var config = {};

        /*
         * Set the configuration object for the accounts provider.
         *
         * @param core.configuration config
         * @return void
        */
        this.setConfig = function(options) {
            config = options || {};
        };


        // @ngInject
        this.$get = function($http, lpCoreError) {

            config.$http = $http;
            config.lpCoreError = lpCoreError;

            return new API(config);
        };
    };

    // Preserve old Model legacy
    // #TODO DEPRECATE
    exports.AccountsModel = exports.lpAccounts;
});
