define(function (require, exports, module) {
    'use strict';

    var global = window;

    var ERRORS = {
        MISSING_USERNAME: 'Please fill in your username',
        MISSING_PASSWORD: 'Please fill in your password',
        MISSING_OTP: 'You must provide otp code',
        CANNOT_AUTHENTICATE: 'Sorry, we could not authenticate you with these credentials',
        MAX_ATTEMPTS_EXCEEDED: 'Number of login attempts exceeded',
        ACCOUNT_BLOCKED: 'Your account has been blocked',
        NOT_FOUND: 'Resource not found',
        UNKNOWN_ERROR: 'There was an error processing your request. Contact your administrator',
        DISCONNECTED: 'Unable to connect. Please check your connection',
        FORBIDDEN: 'Access has been denied due to security reasons',
        BAD_GATEWAY: 'Bad gateway. Contact your administrator',
        SESSIONS_LIMIT_REACHED: 'You already have an active session. Please close it before starting a new session'
    };

    var ERROR_CODE = {
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        NOT_FOUND: 'NOT_FOUND',
        BAD_REQUEST: 'BAD_REQUEST',
        CANNOT_AUTHENTICATE: 'CANNOT_AUTHENTICATE',
        MAX_ATTEMPTS_EXCEEDED: 'MAX_ATTEMPTS_EXCEEDED',
        DISCONNECTED: 'DISCONNECTED',
        FORBIDDEN: 'FORBIDDEN',
        BAD_GATEWAY: 'BAD_GATEWAY',
        SESSIONS_LIMIT_REACHED: 'SESSIONS_LIMIT_REACHED'
    };

    var STATUS = {
        INITIATED: 'Initiated',
        PASSWORD_CHANGE_REQUIRED: 'PasswordChangeRequired',
        VERIFIED: 'Verified'
    };

    // Delivery method to send OTP code
    var DELIVERY_METHOD = {
        PHONE: 'phone',
        EMAIL: 'email'
    };

    // Stores the delivery method state, by default is phone
    var deliveryMethod = DELIVERY_METHOD.PHONE;

    // @ngInject
    exports.lpUsersAuthentication = function(lpCoreUtils) {
        var session = {};

        var isEmptyString = function(string) {
            return !(lpCoreUtils.isString(string) && lpCoreUtils.trim(string).length);
        };

        var isEmptyNumber = function(number) {
            return !(lpCoreUtils.isNumber(number) && number);
        };

        var verifyOptions = function(options) {
            if (!lpCoreUtils.isObject(options)){
                throw new Error('Argument `options` should be an object instead ' + typeof options);
            }
        };

        var handleSuccess = function(deferred) {
            return function(response) {
                lpCoreUtils.extend(session, response.session);
                deferred.resolve(response);
            };
        };

        var unknownError = {
            code: ERROR_CODE.UNKNOWN_ERROR,
            message: ERRORS[ERROR_CODE.UNKNOWN_ERROR]
        };

        var parseError = function(response) {
            var code, message;
            var errors = response.errors;

            if (errors && errors.length) {
                code = errors[0].code;
                if (code !== ERROR_CODE.UNKNOWN_ERROR){
                    message = errors[0].message;
                }
            }

            return {
                code: code || unknownError.code,
                message: message || unknownError.message
            };
        };

        var handleError = function(deferred) {
            return function(response, code) {
                var error;

                switch(code) {
                    case 0:
                        error = {
                            code: ERROR_CODE.DISCONNECTED,
                            message: ERRORS[ERROR_CODE.DISCONNECTED]
                        };
                    break;
                    case 400:
                        error = {
                            code: ERROR_CODE.BAD_REQUEST,
                            message: response.message
                        };
                    break;
                    case 401:
                        error = {
                            code: ERROR_CODE.CANNOT_AUTHENTICATE,
                            message: ERRORS[ERROR_CODE.CANNOT_AUTHENTICATE]
                        };
                    break;
                    case 403:
                        if (response && response[0] && response[0].code === 'OLB-403001') {
                          error = {
                            code: ERROR_CODE.SESSIONS_LIMIT_REACHED,
                            message: ERRORS[ERROR_CODE.SESSIONS_LIMIT_REACHED]
                          };
                        } else {
                          error = {
                              code: ERROR_CODE.FORBIDDEN,
                              message: ERRORS[ERROR_CODE.FORBIDDEN]
                          };
                        }
                    break;
                    case 404:
                        error = {
                            code: ERROR_CODE.NOT_FOUND,
                            message: ERRORS[ERROR_CODE.NOT_FOUND]
                        };
                    break;
                    case 502:
                        error = {
                            code: ERROR_CODE.BAD_GATEWAY,
                            message: ERRORS[ERROR_CODE.BAD_GATEWAY]
                        };
                    break;
                    default:
                        error = parseError(response);
                }
                deferred.reject(error);
            };
        };

        var formHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        // @ngInject
        this.$get = function($http, $q, $window, lpPortal, lpCoreError) {
            var UsersAuthenticationException = lpCoreError.createException('lpUsersAuthenticationError');

            var API = {
                ERROR_CODE: ERROR_CODE
            };

            var config = {
                initiateEndPoint: '',
                sendOtpEndPoint: '',
                otpEndPoint: '',
                serverRootPath: '',
                portalName: '',
                pageName: '',
                reloadOnSuccess: true
            };

            API.getConfig = function() {
                return config;
            };

            API.setConfig = function(options) {
                config = lpCoreUtils(options).chain()
                    .mapValues(lpCoreUtils.resolvePortalPlaceholders)
                    .defaults(config)
                    .value();
                return this;
            };

            API.isInitiated = function() {
                return session.status && session.status.toLowerCase() === STATUS.INITIATED.toLowerCase();
            };

            API.isPasswordChangeRequired = function() {
                return session.status && session.status.toLowerCase() === STATUS.PASSWORD_CHANGE_REQUIRED.toLowerCase();
            };

            API.isVerified = function() {
                return session.status && session.status.toLowerCase() === STATUS.VERIFIED.toLowerCase();
            };

            /**
             * @param {object} params
             * @param {string} params.username
             * @param {string} params.password
             * @param {object} [options]
             */
            API.initiate = function(params, options) {
                var deferred = $q.defer();
                var error;

                verifyOptions(params);

                if (isEmptyString(params.username)) {
                    error = ERRORS.MISSING_USERNAME;
                } else if (isEmptyString(params.password)) {
                    error = ERRORS.MISSING_PASSWORD;
                }

                if (error) {
                    deferred.reject(new Error(error));
                } else {
                    $http({
                        method: 'POST',
                        url: config.initiateEndPoint,
                        params: options,
                        data: lpCoreUtils.buildQueryString(params),
                        headers: formHeaders
                    })
                    .success(handleSuccess(deferred))
                    .error(handleError(deferred));
                }

                return deferred.promise;
            };

            API.securityCheck = function() {
                var deferred = $q.defer();
                var options = {
                    'j_username': session.username,
                    'j_password': session.id,
                    'portal_name': config.portalName,
                    'page_name': config.pageName
                };

                $http({
                    method: 'POST',
                    url: config.serverRootPath + '/j_spring_security_check' + '?rd=' + new Date().getTime(),
                    data: lpCoreUtils.buildQueryString(options),
                    headers: formHeaders
                })
                .success(handleSuccess(deferred))
                .error(handleError(deferred));

                return deferred.promise;
            };

            /**
             * Sets the preferred delivery method. It can be `email|phone`
             * @param {String} method The delivery method
             */
            API.setDeliveryMethod = function (method) {
                if (!lpCoreUtils.includes(DELIVERY_METHOD, method)) {
                    var error = new UsersAuthenticationException('Bad argument: `' + method + '`. It only accepts `email` or `phone`.');
                    lpCoreError.throwException(error);
                }

                deliveryMethod = method;
            };

            /**
             * Requests an OTP code to be sent.
             * @return {Object} Promise fulfilled when request is resolved
             */
            API.sendOTP = function() {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: config.sendOtpEndPoint.replace(':id', session.id),
                    data: lpCoreUtils.buildQueryString({
                        deliveryMethod: deliveryMethod
                    }),
                    headers: formHeaders
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(response) {
                    if (response.status === 401) {
                        deferred.reject({
                            status: response.status,
                            code: response.data.errors[0].code,
                            message: response.data.errors[0].message
                        });
                    } else {
                        handleError(deferred)(response, response.status);
                    }
                });

                return deferred.promise;
            };

            API.verifyOTP = function(options) {
                var deferred = $q.defer();

                verifyOptions(options);

                if (isEmptyNumber(options.otpCode)) {
                    deferred.reject(new Error(ERRORS.MISSING_OTP));
                } else {
                    $http({
                        method: 'POST',
                        url: config.otpEndPoint.replace('{id}', session.id),
                        data: lpCoreUtils.buildQueryString({
                            'otp_code': options.otpCode
                        }),
                        headers: formHeaders
                    })
                    .success(handleSuccess(deferred))
                    .error(handleError(deferred));
                }

                return deferred.promise;
            };

            API.handleVerifiedResponse = function(response) {
                var defaultLandingPage = lpCoreUtils.getPortalProperty('defaultLandingPage');

                if($window.location.protocol.indexOf('file:') === 0) {
                    response.successView = null;
                    defaultLandingPage = null;
                }

                // If a successview is provided, give that priority over defaultLandingPage
                if (lpCoreUtils.isString(response.successView)) {
                    $window.location.replace(config.serverRootPath + response.successView);
                }
                else if (lpCoreUtils.isString(defaultLandingPage)) {
                    if (defaultLandingPage.charAt(0) !== '/') {
                        defaultLandingPage = '/' + defaultLandingPage;
                    }
                    //redirect to defaultLandingPage defined in Portal Manager/Special Pages
                    $window.location.replace(config.serverRootPath + defaultLandingPage);
                    return;
                }
                else {
                    var currentLocation;
                    // Refresh
                    if($window.location.protocol.indexOf('file:') === 0) {
                        //need to strip out url to state when running on the files system
                        currentLocation = $window.location.pathname.split('//')[0] + $window.location.search + $window.location.hash;
                    } else {
                        currentLocation = $window.location.href;
                    }
                    if (config.reloadOnSuccess) {
                        $window.location.replace(currentLocation);
                    }
                }
            };

            API.logOut = function() {
                var LOGOUT_URL = lpPortal.root + '/j_spring_security_logout?portalName=' + lpPortal.name;
                var LOGOUT_SUCCES_URL = lpPortal.root + global.b$.portal.config.defaultLandingPage;

                $window.sessionStorage.clear();

                return $http({
                    method: 'POST',
                    url: LOGOUT_URL,
                    headers: formHeaders
                })
                .then(function(response) {
                    var status = parseInt(response.status, 10);
                    if (status >= 200 && status < 300 || status === 304) {
                        // The response returns a document and could be displayed
                        // e.g. document.documentElement.innerHTML = response.data;
                        // but there is an issue with a link so a redirect is used
                        // instead.
                        $window.location.replace(LOGOUT_SUCCES_URL);
                    } else {
                        var error = new UsersAuthenticationException(parseError(response).message);
                        lpCoreError.throwException(error);
                    }
                });
            };

            // Expose private vars for mocking.
            API.MOCKABLE = {
                session: session
            };

            return API;
        };
    };

    // Deprecated
    // exports.authentication = exports.lpUsersAuthentication;

});
