define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpEnrollment = function() {
        var token;

        // will be populated in Widget
        var config = {};

        // @ngInject
        this.$get = function($http, $q, lpCoreUtils, lpCoreError, lpCoreBus, lpEnrollmentUtil, lpUsersAuthentication) {
            var registerDevice, deviceDnaData;

            // Do we want to register device?
            lpCoreBus.subscribe('lp-enrollment:device:register', function (flag) {
                registerDevice = flag;
            });

            // Prepare Device DNA data
            lpCoreBus.subscribe('widget-device-dna:data:ready', function (data) {
                if (lpCoreUtils.isPlainObject(data)) {
                    deviceDnaData = data;
                }

                // Remove empty deviceId from request
                if (deviceDnaData.hasOwnProperty('deviceId') && !deviceDnaData.deviceId) {
                    delete deviceDnaData.deviceId;
                }
            });

            // Prepare Device DNA deviceId
            lpCoreBus.subscribe('widget-device-dna:device:ready', function (deviceId) {
                if (lpCoreUtils.isPlainObject(deviceDnaData) && deviceId) {
                    deviceDnaData.deviceId = deviceId;
                }
            });

            // Data object decorator (for device registering purposes)
            var decorateDataWithDeviceDna = function (params) {
                if (registerDevice === true && lpCoreUtils.isPlainObject(deviceDnaData)) {
                    lpCoreUtils.assign(params, deviceDnaData);
                }
                return params;
            };

            var postData = function(endpoint, params) {
                var d = $q.defer();

                $http.post(endpoint, params)
                    .then(function(response) {
                        if (response.data && response.data.token) {
                            token = response.data.token;
                        }

                        if (response.data) {
                            d.resolve(response.data);
                        } else {
                            d.reject('Server response is invalid!');
                        }
                    }, function (error) {
                        if (error.data && error.data['valid']) {
                            d.resolve(error.data);
                        } else {
                            d.reject(error);
                        }
                    });

                return d.promise;
            };

            function API() {

                var EnrollmentModel = function() {};

                // verify client's input (preliminary account check)
                EnrollmentModel.prototype.verifyAccount = function(params) {
                    var d = $q.defer();

                    $http.post(config.enrollmentVerifyEndpoint, params)
                        .then(function(response) {
                            d.resolve(true); // Validation ok!
                        }, function (error) {
                            if (error.status === 400) {
                                d.resolve(false); // Validation fails...
                            } else {
                                d.reject(error); // Server error!
                            }
                        });

                    return d.promise;
                };

                // verify client's PASSWORD
                EnrollmentModel.prototype.verifyPassword = function(params) {
                    return postData(config.enrollmentVerifyPassword, params);
                };

                // verify client's USERNAME
                EnrollmentModel.prototype.verifyUsername = function(params) {
                    return postData(config.enrollmentVerifyUsername, params);
                };

                // verify client's EMAIL
                EnrollmentModel.prototype.verifyEmail = function(params) {
                    return postData(config.enrollmentVerifyEmail, params);
                };

                // send code to user's EMAIL
                EnrollmentModel.prototype.sendEmailCode = function(params) {
                    return postData(config.enrollmentSendEmailCode, params);
                };

                // send code to user's PHONE
                EnrollmentModel.prototype.sendPhoneCode = function(params) {
                    if (params.phone) {
                        params['telephoneNumber'] = lpEnrollmentUtil.makePhoneInternationalUSA(params.phone);
                        delete params.phone;
                    } else if (params['telephoneNumber']) {
                        params['telephoneNumber'] = lpEnrollmentUtil.makePhoneInternationalUSA(params['telephoneNumber']);
                    }

                    return postData(config.enrollmentSendPhoneCode, params);
                };

                // verify code, sent to user's EMAIL
                EnrollmentModel.prototype.verifyEmailCode = function(params) {
                    params.token = token || 'no_token_arrived';

                    if (params['eMailVerificationCode']) {
                        params['code'] = params['eMailVerificationCode'];
                        delete params['eMailVerificationCode'];
                    }
                    return postData(config.enrollmentVerifyEmailCode, params);
                };

                // verify code, sent to user's PHONE
                EnrollmentModel.prototype.verifyPhoneCode = function(params) {
                    params.token = token || 'no_token_arrived';

                    if (params['phoneVerificationCode']) {
                        params['code'] = params['phoneVerificationCode'];
                        delete params['phoneVerificationCode'];
                    }
                    return postData(config.enrollmentVerifyPhoneCode, params);
                };

                // Enroll user
                EnrollmentModel.prototype.enrollUser = function(params) {
                    var myParams = decorateDataWithDeviceDna(params);
                    myParams.token = token || 'no_token_arrived';
                    if (myParams.deviceSignature) {
                        // request from BE (@paulius) to add a new prop:
                        myParams.rememberDevice = true;
                    }

                    if (myParams.phone) {
                        myParams['telephoneNumber'] = lpEnrollmentUtil.makePhoneInternationalUSA(myParams.phone);
                        delete myParams.phone;
                    } else if (myParams['telephoneNumber']) {
                        myParams['telephoneNumber'] = lpEnrollmentUtil.makePhoneInternationalUSA(myParams['telephoneNumber']);
                    }

                    return postData(config.enrollmentUser, myParams);
                };

                // Authenticate user -- Initiate
                EnrollmentModel.prototype.authInitiate = function (params) {
                    return lpUsersAuthentication.initiate(decorateDataWithDeviceDna(params));
                };

                // Authenticate user -- Check if login is needed
                EnrollmentModel.prototype.isInitiated = lpUsersAuthentication.isInitiated;

                // Authenticate user -- Check if login is verified
                EnrollmentModel.prototype.isVerified = lpUsersAuthentication.isVerified;

                // Authenticate user -- Check if login is NOT needed
                EnrollmentModel.prototype.securityCheck = lpUsersAuthentication.securityCheck;

                // Authenticate user -- Handle security response
                EnrollmentModel.prototype.handleVerifiedResponse = lpUsersAuthentication.handleVerifiedResponse;

                return new EnrollmentModel();
            }

            return {
                setConfig: function(options) {
                    config = lpCoreUtils(options).chain()
                        .mapValues(lpCoreUtils.resolvePortalPlaceholders)
                        .defaults(config)
                        .value();
                    return this;
                },

                getConfig: function(prop) {
                    if (prop && lpCoreUtils.isString(prop)) {
                        return config[prop];
                    } else {
                        return config;
                    }
                },

                api: API
            };
        };
    };
});
