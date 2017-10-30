define(function(require, exports, module) {

    'use strict';

    var subscribers = [];

    /**
     * @param $http
     * @param $filter
     * @param lpCoreUtils
     * @param lpWidget
     * @ngInject
     */
    exports.lpUsersPreference = function($http, $filter, lpCoreUtils, lpWidget, $q) {

        var preferenceEndpoint = lpWidget.getPreference('preferenceService');
        var url = lpCoreUtils.resolvePortalPlaceholders(preferenceEndpoint);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        };


        this.read = this.get = function() {
            return $http.get(url, {
                headers: headers
            });
        };

        this.save = function(field, value) {

            var data = {};
            data[field] = value;

            return $http.put(url, lpCoreUtils.buildQueryString(data), {
                headers: headers
            });
        };

        this.put = function(field, value) {

            var data = {};
            data[field] = value;

            return $http.put(url + '/' + field, $filter('json')(data), {
                headers: headers
            });
        };


        /**
         * Consistent way to get preferences
         * and memoize response
         *
         * @return {Promise}
         */
        this.getCachedUserPrefs = function() {
            var self = this;

            // return cached value if available
            if(this.prefs){
                return $q.when(this.prefs);
            }

            // if endpoint is not defined, subscribe for future request
            // used in case one widget depends to another widget
            // and has no own endpoint
            if(!preferenceEndpoint){
                var dfd = $q.defer();

                subscribers.push(function(prefs){
                    dfd.resolve(prefs);
                });

                return dfd.promise;
            }

            // if endpoint is defined make request,
            // parse, normalise and resolve all subscribers
            return this.get().then(function(response){
                self.prefs = response.data || {};
                self.prefs.pfmEnabled = lpCoreUtils.parseBoolean(self.prefs.pfmEnabled);
                lpCoreUtils.forEach(subscribers, function(resolve){
                    resolve(self.prefs);
                });
                subscribers = [];

                return self.prefs;
            });
        };
    };
});
