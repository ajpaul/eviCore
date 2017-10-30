define(function(require, exports, module) {

    'use strict';

    // base utilities
    var utils = require('base').utils;
    // default configuration
    var defaults = {
        url: ''
    };
    // exposed api

    var api = {};
    /*----------------------------------------------------------------*/
    /* Private Functions
    /*----------------------------------------------------------------*/
    function parse(res) {
        return res.data;
    }

    function normalize(data) {
        return data;
    }

    /**
     * @ngInject
     * @constructor
     */
    var EnrollService = function EnrollService($http) {
        this.fetch = $http;
    };

    // Add to lpCoreApiService
    api.setConfig = function(options) {
        this.config = utils.chain(options)
            .mapValues(utils.resolvePortalPlaceholders)
            .defaults(defaults)
            .value();
        return this;
    };

    // Add to lpCoreApiService
    api.getConfig = function(prop, defVal) {
        if (prop && utils.isString(prop)) {
            return this.config[prop] || defVal;
        } else {
            return this.config;
        }
    };

    // fetch data
    api.getAll = function() {
        return this.fetch({
                url: this.config.url
            })
            .then(parse)
            .then(normalize);
    };

    // fetch data
    api.enroll = function(data) {
        return this.fetch({
            method: 'POST',
            url: this.config.url,
            data: data
        });
    };

    api.edit = function(data) {
        return this.fetch({
            method: 'PUT',
            url: this.config.url,
            data: data
        });
    };

    api.editAccount = function(accountNumber) {
        return this.fetch({
            method: 'PUT',
            url: this.config.url,
            data: {
                accountNumber: accountNumber
            }
        });
    };

    api.verifyCode = function(email, code) {
        return this.fetch({
            method: 'PUT',
            url: this.config.url,
            data: {
                verification: {
                    email: email,
                    code: code
                }
            }
        });
    };

    /**
     * mixing public api methods
     */
    utils.assign(EnrollService.prototype, api);

    // export service
    exports.EnrollService = EnrollService;

});
