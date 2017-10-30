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

    /**
     * @ngInject
     * @constructor
     */
    var EmailService = function EmailService($http) {
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
    api.add = function(emailAddress) {
        return this.fetch({
            method: 'POST',
            url: this.config.url,
            data: {
                value: emailAddress
            }
        });
    };

    api.edit = function(email) {
        return this.fetch({
            method: 'PUT',
            url: this.config.url + email.id,
            data: {
                value: email.value,
                type: email.type
            }
        });
    };

    api.editType = function(email) {
        return this.fetch({
            method: 'PUT',
            url: this.config.url + email.id,
            data: {
                type: email.type
            }
        });
    };

    api['delete'] = function(email) {
        return this.fetch({
            method: 'DELETE',
            url: this.config.url + email.id,
            data: {
                type: email.type
            }
        });
    };

    /**
     * mixing public api methods
     */
    utils.assign(EmailService.prototype, api);

    // export service
    exports.EmailService = EmailService;

});
