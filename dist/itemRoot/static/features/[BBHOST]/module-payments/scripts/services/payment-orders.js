define(function(require, exports, module) {
    'use strict';

    var utils = require('base').utils;
    var api = {};
    // default configuration
    var defaults = {
        url: '/mock/v2/payment-orders'
    };

    /*----------------------------------------------------------------*/
    /* Public API
    /*----------------------------------------------------------------*/
    /**
     * @ngInject
     * @constructor
     */
    function PaymentOrders($http, lpCoreError) {
        this.xhr = $http;
        this.config = {};
    }

    api.createModel = function() {
        return {};
    };
    /**
     * Creates or updates payment order
     *
     * @param order
     * @returns {promise}
     */
    api.createOrder = function(order) {
        return this.xhr({
            method: 'POST',
            url: this.config.url,
            data: order
        });
    };

    /**
     * Send payment orders to execution
     *
     * @param param
     * @param authorization
     * @returns {promise}
     */
    api.send = function(param, authorization) {
        var url = this.config.url + '/' + param + '/submit';

        return this.xhr({
            method: 'POST',
            url: url,
            data: authorization || {}
        });
    };

    /**
     * Remove pending order.
     *
     * @param uuid
     * @returns {promise}
     */
    api.remove = function(orderId) {
        var url = this.config.url + '/' + orderId;

        return this.xhr({
            method: 'DELETE',
            url: url
        });
    };

    /**
     * Notify server about selected OTP channel
     *
     * @param {String} url
     * @returns {promise}
     */
    api.selectOtpChannel = function (url) {
        if (!url) {
            throw Error('No URL for channel selectOtpChannel specified!');
        }

        return this.xhr({
            method: 'POST',
            url: url
        });
    };

    /**
     * Do OTP verification
     *
     * @param {String} url
     * @param {Object} params
     * @returns {Promise}
     */
    api.verifyOtp = function (url, params) {
        if (!url) {
            throw Error('No URL for verifyOtp specified!');
        }

        if (!params || !params.otpCode) {
            throw Error('No OTP code for verifyOtp specified!');
        }

        return this.xhr({
            method: 'POST',
            url: url,
            data: params
        }).then(function (response) {
            response.valid = true;
            return response;
        }, function (err) {
            return err;
        });
    };

    // -----------------------
    // Add to lpCoreApiService
    api.setConfig = function(options) {
        this.config = utils.chain(options)
            .mapValues(utils.resolvePortalPlaceholders)
            .defaults(defaults)
            .value();
        return this;
    };
    api.getConfig = function(prop, defVal) {
        if (prop && utils.isString(prop)) {
            return this.config[prop] || defVal;
        } else {
            return this.config;
        }
    };
    // ----------------------

    /**
     * mixin public api methods
     */
    utils.assign(PaymentOrders.prototype, api);

    /**
     * Exports
     */
    exports.PaymentOrders = PaymentOrders;
});
