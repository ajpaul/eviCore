define(function(require, exports, module) {

    'use strict';

    var layoutDesktop = require('../templates/desktop/layout');
    var fieldsList = require('./config').fields;

    /**
     * otp-check custom element directive
     * @ngInject
     */
    exports.otpCheck = function($timeout, lpCoreBus, lpEnrollmentUtil, lpCoreUtils) {

        /**
         * Main directive link function
         * @param  {object} scope   Angular scope object
         * @param  {HTMLElement} elem    DOM element
         * @param  {object} attrs   Elem attributes
         * @param  {object} ngModel ngModelController
         * @return {undefined}
         */
        function linkFn(scope, elem, attrs, ngModel) {
            var namespace = scope.otpEventNamespace || '';


            scope.otp = {}; // main state object
            scope.otp.input = lpCoreUtils.clone(fieldsList.verifyOtp);

            scope.otp.input.name = scope.otpInputName || scope.otp.input.name;

            // Passing api function to verifier
            scope.otp.input.api = function () {
                return {
                    verifyOtp: function (params) {
                        return scope.otpApi(params);
                    }
                };
            };

            scope.mask = lpEnrollmentUtil.maskStringMaker;

            // Step 1
            scope.otp.showChannelSelector = true;
            scope.otp.showOtpVerification = false;

            // Select channel
            scope.selectChannel = function (channel) {
                scope.channelSelected = channel;
            };

            scope.cancel = function () {
                // go to 'select channel' step
                scope.back();

                // clear otp input field
                scope.otp.input.value = null;

                scope.channelSelected = false;
                scope.otpNext = false;

                // reset otp field
                lpCoreBus.publish('lp-labeled-input:reset:by:name', scope.otpInputName);
            };

            // Returning to step 1
            scope.back = function () {
                scope.otp.showChannelSelector = true;
                scope.otp.showOtpVerification = false;
            };

            scope.select = function () {
                scope.loading = true;
                lpCoreBus.publish(namespace + '.lp-otp-check-select-channel', scope.channelSelected);
            };

            lpCoreBus.subscribe(namespace + '.lp-otp-check-channel-response-success', function () {
                scope.loading = false;
                scope.otp.showChannelSelector = false;
                scope.otp.showOtpVerification = true;
                scope.codeSent = 'Sent';
                $timeout(function () {
                    scope.codeSent = false;
                }, 500);
            });

            lpCoreBus.subscribe(namespace + '.lp-otp-check-channel-response-error', function (err) {
                scope.loading = false;
                scope.serverError = err.statusText || 'Server error!';
                $timeout(function () {
                    scope.serverError = false;
                }, 5000);
            });

            // Step 2
            scope.serverResponseFails = false;
            scope.serverValidationFails = false;

            lpCoreBus.subscribe('lp-enrollment:validation:external', function(res) {
                //exit if validated input is not in current scope
                if (res.name !== scope.otpInputName) {
                    return;
                }

                // let know about server request error
                if (res.serverError) {
                    scope.verifyLoading = false; // enable submit button
                    scope.serverResponseFails = 'Server error for [' + res.name + ']';
                } else {
                    scope.serverResponseFails = false;
                }

                // let know about server validation error
                if (res.validationError) {
                    scope.verifyLoading = false; // enable submit button
                    scope.serverValidationFails = res.validationError;
                } else {
                    scope.serverValidationFails = false;
                }

                // All is OK!
                if (!scope.serverResponseFails && !scope.serverValidationFails) {
                    $timeout(function () {
                        // close view
                        scope.cancel();

                        // let know widget
                        lpCoreBus.publish(namespace + '.lp-otp-check-success');
                    }, 500);
                }
            });

            scope.verify = function () {
                scope.verifyLoading = true; // disable submit button
                lpCoreBus.publish('lp-enrollment:verify:by', scope.otpInputName);
            };
        }

        /**
         * Compile function manipulate the DOM before the linking
         * @param  {HTMLElement} elem  DOM element
         * @param  {object} attrs Element attributes
         * @return {function}       Linked function
         */
        function compileFn(elem, attrs) {
            return linkFn;
        }

        return {
            scope: {
                otpNext: '=',
                otpApi: '=',
                otpInputName: '@',
                otpEventNamespace: '@'
            },
            template: layoutDesktop,
            compile: compileFn,
            restrict: 'AE',
            link: linkFn
        };
    };
});
