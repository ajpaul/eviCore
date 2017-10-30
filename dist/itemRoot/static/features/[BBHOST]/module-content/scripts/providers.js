define(function(require, exports, module) {
    'use strict';

    var API = require('./api');

    /**
     * lpContent provider
     * @return {object} angular provider
     * @ngInject
     */
    exports.lpContent = function() {
        var structuredContentEndpoint;

        /**
         * Set the endpoint to use for fetching server-side rendered structured content
         */
        this.setStructuredContentEndpoint = function (endpoint) {
            structuredContentEndpoint = endpoint;
        };

        /**
         * Configure the provider before initialisation.
         * @ngInject
         */
        this.$get = function($http, lpWidget) {
            return new API({
                $http: $http,
                uuid: lpWidget.model.uuid,
                contextItemName: lpWidget.model.contextItemName,
                structuredContentEndpoint: structuredContentEndpoint
            });
        };

    };

});
