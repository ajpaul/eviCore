define(function(require, exports, module) {

    'use strict';

    // base utilities
    var utils = require('base').utils;
    // default configuration
    var defaults = {
        url: '/v1/bill-payments'
    };
    var normalize = require('./ebill-normalizer');

    /*----------------------------------------------------------------*/
    /* Private Functions
    /*----------------------------------------------------------------*/
    function parse(res) {
        return res.data;
    }

    /**
     * @ngInject
     * @constructor
     */
    var EBillService = function EBillService($http, lpCoreError) {
        this.http = $http;
    };

    var api = {

        /**
         * Setup new E-Bills
         */
        setup: function(payee) {
            return this.http.post(this.config.url + '/e-bills', payee)
                .then(parse)
                .then(normalize);
        },

        /**
         * Stop E-Bills
         */
        stop: function(payeeId) {
            return this.http.delete(this.config.url + '/e-bills' + '/' + payeeId)
                .then(parse)
                .then(normalize);
        },

        /**
         * Check status of E-Bill setup
         */
        checkStatus: function(eBillInfo) {
            return this.http.get(this.config.url + '/e-bills/status', { params: { sessionId: eBillInfo.sessionId }})
                .then(parse)
                .then(normalize);
        },

        /**
         * Sent information requested for E-Bill setup
         */
        performAction: function(eBillInfo) {
            return this.http.post(this.config.url + eBillInfo.nextAction.url, eBillInfo)
                .then(parse)
                .then(normalize);
        },

        /**
         * Check what information is necessary to resolve E-Bill errors
         */
        checkErrors: function(payeeId) {
            return this.http.get(this.config.url + '/e-bills/errors', { params: { payeeId: payeeId }})
                .then(parse)
                .then(normalize);
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

    /**
     * mixing public api methods
     */
    utils.assign(EBillService.prototype, api);

    // export service
    exports.lpEBillService = EBillService;

});
