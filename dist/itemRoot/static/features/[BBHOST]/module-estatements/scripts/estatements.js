define(function(require, exports, module) {
    'use strict';

    var CFG_LIST_ENDPOINT = 'estatementListEndpoint';
    var CFG_ENROLLMENT_ENDPOINT = 'estatementEnrollmentEndpoint';

    // @ngInject
    exports.lpEstatements = function() {
        var defaults = {
            'estatementListEndpoint': '/mock/v1/documents',
            'estatementEnrollmentEndpoint': '/mock/v1/enrollment'
        };

        /*
         * Provides an instance of the estatement module.
         */
        // @ngInject
        this.$get = function($http, $q, lpCoreUtils, lpCoreConfiguration) {

            var API = function(config) {
                if (lpCoreUtils.isObject(config)) {
                    this.setConfig(config);
                }
            };

            /*
             * Set the configuration object for the estatement provider.
             *
             * @param core.configuration config
             *
             * @return void
             */
            API.prototype.setConfig = function(options) {
                this.config = lpCoreUtils(options).chain()
                    .mapValues(lpCoreUtils.resolvePortalPlaceholders)
                    .defaults(defaults)
                    .value();
                return this;
            };

            API.prototype.getConfig = function(prop) {
                if (prop && lpCoreUtils.isString(prop)) {
                    return this.config[prop];
                } else {
                    return this.config;
                }
            };
            /**
             * Get model config.
             */
            // deprecate
            API.prototype.getAttribute = API.prototype.getConfig;

            API.prototype.getAll = function() {
                return $http.get(this.getAttribute(CFG_LIST_ENDPOINT)).then(function(response) {
                    return lpCoreUtils(response.data.documents).groupBy(function(doc) {
                        return doc.description;
                    }).map(function(values, key) {
                        return {
                            name: key,
                            documents: values
                        };
                    }).value();
                });
            };

            API.prototype.getEnrollmentStatus = function() {
                var self = this;
                var d = $q.defer();

                $http.get(self.getAttribute(CFG_ENROLLMENT_ENDPOINT)).then(
                    function(response) {
                        // TODO: Validate response, handle errors.
                        d.resolve(!!(response && response.data && +response.data.status));
                    }
                );

                return d.promise;
            };

            API.prototype.setEnrollmentStatus = function(status) {
                var self = this;
                var d = $q.defer();
                var statusValue = (status) ? 1 : 0;

                $http({
                    url: self.getAttribute(CFG_ENROLLMENT_ENDPOINT),
                    method: 'PUT',
                    data: JSON.stringify({
                        status: statusValue
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    function(response) {
                        d.resolve(!!(response && response.data && response.data.status === 'OK'));
                    }
                );

                return d.promise;
            };

            return new API(defaults);
        };
    };
});
