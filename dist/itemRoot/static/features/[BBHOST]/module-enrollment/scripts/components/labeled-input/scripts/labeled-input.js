/*global $ jQuery bd console*/
define(function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    // @ngInject
    exports.lpLabeledInputField = function($timeout, $compile, $templateCache, lpCoreBus, lpLabeledInputUtil) {

        $templateCache.put('$labeledInputTemplate.html',
            '<div class="lp-labeled-input" ' +
            '     ng-class="{ \'button-validation-ok\': buttonValidationOk === true, \'button-validation-failed\': buttonValidationOk === false, \'show-error-below\': !showErrorInside, \'input-invalid-wrapper\': externalInvalid || invalid, focus: hasFocus }">' +

            // Header messages
            '   <div class="upper-label placeholder-animate" ng-show="showFloatingPlaceholder">' +
            '       <div lp-i18n="{{ placeholder }}"></div>' +
            '   </div>' +

            // INPUT FIELD
            '   <input class="main-input text-black" ' +
            '          ng-class="{\'short\': buttonInside, \'input-invalid\': externalInvalid || invalid, \'labeled-input-state\': showFloatingPlaceholder}" ' +
            '          ng-keyup="floatingPlaceholder()" ' +
            '          ng-focus="hasFocus = true" ' +
            '          ng-blur="hasFocus = false;checkValidityBlur()" ' +
            '          ng-pattern="{{ pattern }}" ' +
            '          ng-required="{{ isRequired || false }}" ' +
            '          ng-disabled="isDisabled" ' +
            '          ng-minlength="{{ inputMinLength || 0 }}" ' +
            '          ng-maxlength="{{ inputMaxLength || 10000 }}" ' +
            '          minlength="{{ minlength || 0 }}" ' +
            '          maxlength="{{ maxlength || 10000 }}" ' +
            '          ng-model="value" ' +
            '          type="__type__" ' +
            '          name="{{ name }}" ' +
            '          placeholder="{{ placeholder }}" />' +

            // Lower messages
            '   <div class="lower-label" ng-show="showLabel">' +
            '       <div ng-show="messages.invalid" lp-i18n="{{ patternErrorMsg || \'Invalid input! Check length, etc.\' }}"></div>' +
            '       <div ng-show="messages.required" lp-i18n="{{ requiredErrorMsg || \'Field is required\' }}"></div>' +
            '       <div ng-show="messages.externalInvalid" class="text-red" lp-i18n="{{ externalInvalid }}" title="{{ externalInvalid }}"></div>' +
            '       <div ng-show="messages.noValidator" lp-i18n="No external validator!"></div>' +
            '   </div>' +

            // Show button inside
            '   <span ng-if="buttonInside" class="button-inside-wrapper">' +
            '       <button ng-if="isMobileDevice" ' +
            '               ng-hide="externalVerificationOk || externalVerificationOk === false" ' +
            '               ng-click="checkValidityButton()" ' +
            '               ng-class="{\'disabled\': !value}" ' +
            '               ng-click="sendRequest()" ' +
            '               class="btn btn-success" ' +
            '               lp-i18n="Verify">' +
            '       </button>' +
            '       <div ng-show="externalVerificationOk" class="verification-result">' +
            '           <span class="text-green" lp-i18n="VERIFIED!"></span>' +
            '       </div>' +
            '       <div ng-show="buttonValidationOk === false" class="verification-result">' +
            '           <span class="text-red" lp-i18n="INCORRECT"></span>' +
            '       </div>' +
            '   </span>' +

            // Ordinary field validation
            '   <span ng-if="!isDisabled && !buttonInside && !externalVerification">' +
            '       <i ng-show="value && !externalInvalid" class="field-verified-sign glyphicon glyphicon-ok text-green"></i>' +
            '       <i ng-show="externalInvalid || invalid" class="field-verified-sign glyphicon glyphicon-exclamation text-red"></i>' +
            '   </span>' +

            // External field validation
            '   <span ng-if="externalVerification">' +
            '       <i ng-show="loading" class="field-verified-sign">' +
            '           <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>' +
            '       </i>' +
            '       <i ng-show="externalVerificationOk" class="field-verified-sign glyphicon glyphicon-ok text-green"></i>' +
            '       <i ng-show="externalVerificationOk === false" class="field-verified-sign glyphicon glyphicon-exclamation text-red"></i>' +
            '   </span>' +

            '   <i ng-show="infoDescription" ' +
            '      ng-click="(showDescription = !showDescription)" ' +
            '      ng-class="{\'red-info-sign\': externalInvalid || invalid, \'enrollment-info-sign\': isMobileDevice, \'glyphicon glyphicon-info-sign desktop-info-sign\': !isMobileDevice}" ' +
            '      class="field-verified-sign">' +
            '   </i>' +

            // Show description ( MOBILE )
            '   <div ng-show="showDescription && isMobileDevice" class="field-description">' +
            '       <div class="description-content" lp-template="" src="{{ description }}"></div>' +
            '       <div ng-click="(showDescription = false)" class="description-close">Close</div>' +
            '   </div>' +

            // Show description ( DESKTOP )
            '   <div ng-show="showDescription && !isMobileDevice" class="field-description-desktop">' +
            '       <div class="description-content" lp-template="" src="{{ description }}"></div>' +
            '       <div ng-click="(showDescription = false)" class="description-close">Close</div>' +
            '   </div>' +
            '</div>'
        );

        return {
            restrict: 'AE',
            scope: {
                placeholder: '@placeholderText',
                name: '@fieldName',
                pattern: '@inputPattern',
                isRequired: '@',
                isDisabled: '@',
                inputType: '@',
                description: '@',
                inputMaxLength: '@',
                inputMinLength: '@',
                maxlength: '@',
                minlength: '@',

                patternErrorMsg: '@',
                requiredErrorMsg: '@',
                showErrorInside: '@',
                mirror: '=',
                allFields: '=',
                value: '=inputValue',
                extraData: '&',

                // check if we validate the field externally
                externalVerification: '@',
                disableExternalVerification: '=',

                // inside button params
                buttonInside: '=',
                valueIsVerified: '=',
                valueNotVerified: '=',
                api: '&'
            },
            link: function (scope, element, attrs) {
                scope.isMobileDevice = utils.isMobileDevice();

                var template = $templateCache.get('$labeledInputTemplate.html');

                // notify outer system about local validation fail
                scope.$watch('invalid', function (invalid) {
                    lpCoreBus.publish('lp-enrollment:validation:local', {name: scope.name, invalid: invalid});
                });

                var customTemplateCompile = function () {
                    element.html(template.replace(/__type__/g, scope.inputType || 'text'));
                    $compile(element.contents())(scope);
                    $timeout(function() {
                        scope.$input = element.find('input');
                    });
                };

                /**
                 * Clear all previous activity
                 */
                var reset = function() {
                    scope.value = null;
                    scope.invalid = false;
                    scope.externalInvalid = false;
                    scope.externalVerificationOk = undefined;
                    scope.buttonValidationOk = undefined;
                    scope.showLabelText();
                    scope.floatingPlaceholder();
                };

                /**
                 * Reset field with timeout
                 */
                var timeoutReset = function () {
                    $timeout(reset);
                };

                /**
                 * Reset field if it is in the list of names
                 *
                 * @param {String} names
                 */
                var timeoutResetName = function (names) {
                    var namesArr;

                    if (!names || typeof names !== 'string') {
                        timeoutReset(); // default reset (all fields)
                    }
                    
                    namesArr = names.split(',');

                    if (namesArr.length) {
                        namesArr.forEach(function (item) {
                            if (scope.name === utils.trim(item)) {
                                timeoutReset(); // reset if the field is in the list
                            }
                        });
                    }
                };

                // show the label if the model stores any value
                scope.$watch('value', function(newValue, oldValue) {
                    if (newValue) {
                        scope.showLabel = true;
                    }
                });

                scope.$watch('isDisabled', function(newValue) {
                    scope.isDisabled = utils.parseBoolean(newValue);
                });

                scope.showLabel = false;
                scope.messages = {main: false, invalid: false, required: false, externalInvalid: false, noValidator: false};
                scope.infoDescription = !!scope.description;

                // Handle 'mirror' field (field value should be the same as provided in 'mirror' field)
                if (scope.mirror) {

                    // attach a reference to 'master' field's value to watch on
                    lpLabeledInputUtil.updateByMirrors(scope.allFields);

                    // Dynamically update pattern, depending on changing value in a 'master' field
                    // TODO: Once we shift to Angular 1.3+ we can use dynamic pattern update without re-compiling
                    scope.$watch('mirror.value', function(val) {
                        scope.pattern = '/^' + lpLabeledInputUtil.escapeRegExp(val) + '$/';
                        $timeout(customTemplateCompile).then(function () {
                            scope.value = null;
                        });
                    });
                }

                // compile template (to handle conditional input type)
                customTemplateCompile();

                // Check if we should show inline label
                scope.floatingPlaceholder = function () {
                    if (scope.isRequired === 'true' && scope.$input && !scope.$input.val()) {
                        scope.showFloatingPlaceholder = false;
                    } else if (scope.value || scope.value === undefined) {
                        scope.invalid = false;
                        scope.externalInvalid = false;
                        scope.externalVerificationOk = undefined;
                        scope.buttonValidationOk = undefined;
                        scope.showFloatingPlaceholder = true;
                        scope.showLabelText('main');
                    } else {
                        scope.showFloatingPlaceholder = false;
                    }
                };

                // Show specific label text
                scope.showLabelText = function (prop) {
                    utils.forOwn(scope.messages, function (value, key) {
                        scope.messages[key] = false;
                    });

                    if (prop) {
                        scope.messages[prop] = true;
                    }
                };

                // Main Blur Validation
                scope.checkValidityBlur = function () {
                    if (!scope.buttonInside && scope.externalVerification && scope.value) {
                        scope.checkExternalValidity();
                    } else {
                        scope.checkLocalValidity();
                    }
                };

                // Validate by button click
                scope.checkValidityButton = function () {
                    if (scope.buttonInside && scope.externalVerification && scope.value) {
                        scope.checkExternalValidity();
                    } else {
                        scope.checkLocalValidity();
                    }
                };

                // Validate locally field when it's losing focus
                scope.checkLocalValidity = function () {
                    if (scope.isRequired === 'true' && scope.$input && !scope.$input.val()) {
                        scope.showLabel = true;
                        scope.invalid = true;
                        scope.showLabelText('required');
                    } else if (scope.value === undefined) {
                        scope.showLabel = true;
                        scope.invalid = true;
                        scope.showLabelText('invalid');
                    } else {
                        scope.invalid = false;
                        scope.showLabelText('main');
                    }
                };

                // To have an ability to initiate external verification from outside
                lpCoreBus.subscribe('lp-enrollment:verify:by', function (name) {
                    if (scope.name === name) {
                        scope.checkExternalValidity();
                    }
                });

                // Handle CANCEL event (avoid showing both placeholders)
                lpCoreBus.subscribe('lp-enrollment:go:cancel', timeoutReset);

                // To have an ability to reset field from outside
                lpCoreBus.subscribe('lp-labeled-input:reset', timeoutReset);

                // To have an ability to reset field with certain name (or comma-separated names)
                lpCoreBus.subscribe('lp-labeled-input:reset:by:name', timeoutResetName);

                // Helper private method to determine if external validation message
                // should be displayed
                var showExternalInvalidErrorMessage = function(message) {
                    if (scope.buttonInside) {
                        scope.buttonValidationOk = false;
                    } else {
                        scope.externalInvalid = message;
                        scope.showLabelText('externalInvalid');
                    }
                };

                // Validate Externally field when it's loosing focus
                scope.checkExternalValidity = function () {
                    // Delay verification to allow to disable it if needed
                    $timeout(function() {
                        if (scope.disableExternalVerification) {
                            return;
                        }

                        var values = {};
                        var api = scope.api();
                        var validator = api[scope.externalVerification];

                        // add field value
                        values[scope.name] = scope.value;

                        if (validator && utils.isFunction(validator)) {
                            scope.loading = true; // start spinner

                            // decorate request with additional data (if necessary)
                            if (scope.extraData) {
                                values = utils.assign(values, scope.extraData());
                            }

                            var xhr = validator(values);

                            if (!xhr || !utils.isFunction(xhr.then)) {
                                return;
                            }

                            xhr.then(function(response) {
                                var message = response.data && response.data.message ? response.data.message : 'Validation failed!';
                                scope.loading = false; // stop spinner
                                if (response.valid === 'true' || response.valid === true) {
                                    if (scope.buttonInside) {
                                        scope.buttonValidationOk = true;
                                        scope.showLabel = false;
                                    } else {
                                        scope.externalInvalid = false;
                                    }
                                    scope.externalVerificationOk = true;
                                    lpCoreBus.publish('lp-enrollment:validation:external', {name: scope.name, result: true});
                                } else {
                                    showExternalInvalidErrorMessage(message);
                                    scope.externalVerificationOk = false;
                                    lpCoreBus.publish('lp-enrollment:validation:external', {name: scope.name, result: false, validationError: message});
                                }
                            }, function(error) {
                                var message = error.data && error.data.message ? error.data.message : 'Validation failed!';
                                scope.loading = false; // stop spinner
                                scope.externalVerificationOk = false;
                                showExternalInvalidErrorMessage(message);
                                if (error.status === 400) {
                                    lpCoreBus.publish('lp-enrollment:validation:external', {name: scope.name, result: false, validationError: message});
                                } else {
                                    lpCoreBus.publish('lp-enrollment:validation:external', {name: scope.name, result: false, serverError: error});
                                }
                            });
                        } else {
                            scope.showLabel = true;
                            scope.invalid = true;
                            scope.showLabelText('noValidator');
                        }
                    }, 100);
                };
            }
        };
    };
});
