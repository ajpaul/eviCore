define( function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;
    var cache = {};
    var STRUCTURED_CONTENT_ENDPOINT = '$(contextRoot)/contenttemplates/rendered';

    /**
     * Services API
     * @param  {object} config and DI to the API
     */
    var API = function(options) {
        this.$http = options.$http;
        this.config = {
            uuid: options.uuid,
            contextItemName: options.contextItemName,
            structuredContentEndpoint: options.structuredContentEndpoint || STRUCTURED_CONTENT_ENDPOINT
        };
    };

    utils.assign(API.prototype, {

       /**
        * get rendered content
        * @param  {object} params get parameters
        * @return {Promise} cached http promise
        */
        get: function(params) {

            var endpoint = this.getConfig('structuredContentEndpoint');

            var url = utils.resolvePortalPlaceholders(endpoint);

            var urlParams = {
                uuid: this.getConfig('uuid', true),
                contextItemName: this.getConfig('contextItemName', true)
            };

            var key = [urlParams.uuid];

            if (params && params.templateUrl) {
                key.push(params.templateUrl[0]);
                key.push(params.templateUrl[1]);
                urlParams.templateUrl = params.templateUrl[1];
            }

            if (params && params.contentRef) {
                key.push(params.contentRef[0]);
                key.push(params.contentRef[1]);
                urlParams['contentRef.contentRef'] = params.contentRef[1];
            }


            // Cache key: uuid_templateUrl_contentRef
            key = key.join('_');


            // Cache http promise
            cache[key] = cache[key] || this.$http.get(url, {
                params: urlParams,
                headers: {
                   'Accept': 'text/html'
                }
            }).then(function(data) {
                return data;
            });

            return cache[key];
        },

        cleanCache: function() {
            cache = {};
        },

        setConfig: function(options) {
            this.config = utils(options).chain()
                .mapValues(utils.resolvePortalPlaceholders)
                .defaults(this.config)
                .value();
            return this;
        },

        getConfig: function(name, force) {
            // return whole config if preference name was not passed
            if (!name || !utils.isString(name)) {
                return this.config;
            }

            if (force && utils.isUndefined(this.config[name])) {
                throw new Error('lpContent is not configured with "' + name + '"');
            }

            return this.config[name];
        }

    });



    module.exports = API;
});
