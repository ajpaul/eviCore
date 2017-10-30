define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpUserSettings = function($http, $q, lpCoreUtils, lpCoreError) {
        var config = {};

        function API() {
            var UserSettings = function() {};

            lpCoreUtils.assign(UserSettings.prototype, {

                /**
                 * Sends a request to given endpoint within /users route.
                 * See endpoints list on https://stash.backbase.com/projects/LPM/repos/api/browse/raml/users.raml?at=1508de4
                 *
                 * This method is public for test needs.
                 * TODO: Consider to make it private.
                 *
                 * @param {string} endpoint - Endpoint name (should be presented in config)
                 * @param {string} username
                 * @param {object} [params] - Object with params for $http config
                 *
                 * @return {Promise}
                 */
                sendRequest: function(endpoint, username, params) {
                    var d = $q.defer(),
                        url = config[endpoint];

                    if (typeof url === 'undefined') {
                        lpCoreError.throwException(new Error('Endpoint "' + endpoint + '" not found. Make sure that lpUserSettings is configured properly.'));
                    }

                    $http(lpCoreUtils.assign({
                            method: 'POST',
                            url: config[endpoint].replace(/{username}/, username)
                        }, params))
                        .then(function(response) {
                            d.resolve(response.data);
                        }, function(error) {
                            d.reject(error);
                        });

                    return d.promise;
                },

                /**
                 * Calls an endpoint that verifies presence of user by username and phone.
                 * If verification is successful, returns user's email.
                 *
                 * @param {string} username
                 * @param {string} phone
                 *
                 * @return {Promise}
                 */
                getEmailByUsernameAndPhone: function(username, phone) {
                    return this.sendRequest(
                        'getEmailByUsernameAndPhone',
                        username,
                        {
                            method: 'GET',
                            params: { phone: phone }
                        }
                    );
                },

                /**
                 * Calls an endpoint that sends username to user's email.
                 *
                 * @param {string} email
                 *
                 * @return {Promise}
                 */
                sendUsernameByEmail: function(email) {
                    return this.sendRequest(
                        'sendUsernameByEmail',
                        '',
                        // TODO: email address should be sent in http request body, not in query parameters,
                        // however for now backend can receive it only as a query parameter
                        {
                            params: { email: email }
                        }
                    );
                },

                /**
                 * Calls an endpoint that sends authentication code by email or phone.
                 *
                 * @param {string} channel - "email|phone"
                 * @param {string} username
                 * @param {string} phone
                 *
                 * @return {Promise}
                 */
                requestAuthCode: function(channel, username, phone) {
                    var endpoint = {
                        email: 'requestAuthCodeByEmail',
                        phone: 'requestAuthCodeByPhone'
                    }[channel];
                    return this.sendRequest(
                        endpoint,
                        username,
                        { data: { phone: phone } }
                    );
                },

                /**
                 * Verifies given authentication code and token.
                 *
                 * @param {string} username
                 * @param {string} password
                 * @param {string} token
                 *
                 * @return {Promise}
                 */
                authenticateByTempPassword: function(username, password, token) {
                    return this.sendRequest(
                        'authenticateByTempPassword',
                        username,
                        {
                            data: { password: password },
                            headers: { token: token }
                        }
                    );
                },

                /**
                 * Calls an endpoint creating new password.
                 *
                 * @param {string} username
                 * @param {string} password
                 * @param {string} token
                 *
                 * @return {Promise}
                 */
                createNewPassword: function(username, password, token) {
                    return this.sendRequest(
                        'createNewPassword',
                        username,
                        {
                            data: { password: password },
                            headers: { token: token }
                        }
                    );
                }

            });

            return new UserSettings();
        }

        return {
            setConfig: function(options) {
                lpCoreUtils.assign(
                    config,
                    lpCoreUtils.mapValues(options, lpCoreUtils.resolvePortalPlaceholders)
                );
                return this;
            },
            api: API,

            changePassword: function(url, oldPassword, newPassword) {
                return $http.post(url, {
                        'oldPassword': oldPassword,
                        'password': newPassword
                });
            }
        };
    };
});
