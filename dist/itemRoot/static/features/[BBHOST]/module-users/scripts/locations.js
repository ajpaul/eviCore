define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpUserLocations = function($http, lpCoreHttpInterceptor) {
        var partyLocations = 'services/rest/v1/party-locations';
        var contactsUrl = partyLocations + '/contacts';
        var addressesUrl = partyLocations + '/addresses';

        var processResponse = function(response) {
            return response.data;
        };

        return {
            getContacts: function(url) {
                return $http.get(url || contactsUrl).then(processResponse);
            },

            saveContacts: function(url, locations) {
                return $http.put(url || contactsUrl, locations).then(processResponse);
            },

            getAddresses: function(url) {
                return $http.get(url || addressesUrl).then(processResponse);
            },

            saveAddresses: function(url, addresses) {
                return $http.put(url || addressesUrl, addresses).then(processResponse);
            }
        };
    };
});
