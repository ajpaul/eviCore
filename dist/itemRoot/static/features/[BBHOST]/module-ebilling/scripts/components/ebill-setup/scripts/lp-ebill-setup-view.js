define(function(require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    /**
     * Directive to display E-Bill setup view for Payee.
     *
     * @param payee - Payee for with E-Bills should be setuped
     * @param callback - Callback function, called when ebill setup is finished or cancelled
     * @param logErrors - If specified error messages will be mapped to this object,
     *                    otherwise directive will display errors itself.
     * @ngInject
     */
    exports.lpEbillSetupView = function($timeout, lpCoreTemplate, lpEBillService, lpCoreUtils) {

        var TPL_ALERTS =
            '<div class="lp-alerts" tabindex="-1">' +
            '  <div class="alert alert-danger" ng-if="errors">' +
            '    <p ng-repeat="error in errors">' +
            '      <i class="lp-icon lp-icon-alert-error"></i><span lp-i18n="{{error.code}}"></span>' +
            '    </p>' +
            '  </div>' +
            '</div>';

        var TPL_SITE =
            '<div class="panel-heading panel-title clearfix">' +
            '  <strong lp-i18n="Select Billers Site"></strong>' +
            '</div>' +
            '<p lp-i18n="EBillsMultipleSitesFoundInstructions" translate-values="{ billerName: payee.name }"></p>' +
            '<div class="panel-body">' +
            '  <p lp-i18n="Select site"></p>' +
            '  <div lp-field="lp-field"' +
            '    label="{{ \'Select biller site\' | translate }}"' +
            '    aria-label="{{ \'Select biller sites\' | translate }}">' +
            '    <div dropdown-select="dropdown-select"' +
            '      ng-model="payee.ebills.billerSite"' +
            '      ng-options="site as site.name for site in payee.ebills.nextAction.billerSites">' +
            '    </div>' +
            '  </div>' +
            '</div>';

        var TPL_LOGIN =
            '<div class="e-bill-setup-login">' +
            '   <div class="row header">' +
            '       <h3 class="col-ss-12 col-xs-12 col-sm-12 col-md-12 col-lg-12" lp-i18n="EBillsLoginTo" translate-values="{ billerName: payee.name }"></h3>' +
            '   </div>' +
            '   <div class="row instructions">' +
            '       <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6" lp-i18n="EBillsLoginInstructions" translate-values="{ billerName: payee.name }"></div>' +
            '   </div>' +
            '   <div class="row">' +
            '       <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
            '           <div ng-repeat="credential in payee.ebills.nextAction.credentialsParams">' +
            '                   <div lp-labeled-input-field="lp-labeled-input-field"' +
            '                   input-type="{{ credential.inputFieldType }}"' +
            '                   input-value="credential.fieldValue"' +
            '                   is-required="true" input-pattern="/^[a-zA-Z0-9.\'\-_\\s]{1,20}$/"' +
            '                   pattern-error-msg="{{ \'Field is required\' }}" field-name="{{ credential.fieldLabel.replace(\' \',\'\') }}"' +
            '                   placeholder-text="{{ credential.fieldLabel }}"></div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>';

        var TPL_ACCOUNT =
            '<div class="e-bill-confirm-account">' +
            '   <div class="row header">' +
            '     <h3 class="col-ss-12 col-xs-12 col-sm-12 col-md-12 col-lg-12" lp-i18n="Select E-Bills Account"></h3>' +
            '   </div>' +
            '   <div class="row instructions" ng-switch="payee.ebills.nextAction.accounts.length">' +
            '       <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6" ng-switch-when="0">' +
            '         <div class="text-danger" lp-i18n="We were unable to locate an account using the logon credentials you provided."></div>' +
            '       </div>' +
            '       <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6" ng-switch-when="1" ng-init="payee.ebills.account = payee.ebills.nextAction.accounts[0]">' +
            '         <div lp-i18n="EBillsConfirmAccountNumber" translate-values="{ accountNumber: payee.ebills.nextAction.accounts[0].name }"></div>' +
            '       </div>' +
            '       <div ng-switch-default>' +
            '           <div lp-i18n="Select the account for which you would like to receive eBills."></div>' +
            '               <div lp-field="lp-field"' +
            '               label="{{ \'Select account\' | translate }}"' +
            '               aria-label="{{ \'Select account\' | translate }}">' +
            '               <div dropdown-select="dropdown-select"' +
            '                   ng-model="payee.ebills.account"' +
            '                   ng-options="val as val.name for val in payee.ebills.nextAction.accounts">' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div> ';

        var TPL_CONTROLS =
            '<div class="row">' +
            '   <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
            '      <div class="row">' +
            '          <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
            '              <button type="submit" ng-disabled="continueButtonIsDisabled()" ng-click="confirm()" class="btn btn-primary col-sm-12 col-md-12 col-lg-12" lp-i18n="Continue"></button>' +
            '          </div>' +
            '          <div class="col-ss-12 col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
            '              <button type="button" ng-click="cancel()" class="btn btn-link col-sm-12 col-md-12 col-lg-12 text-left" lp-i18n="Cancel"></button>' +
            '          </div>' +
            '      </div>' +
            '   </div>' +
            '</div>';

        var TPL =
            '<div progress-indicator="loading">' + TPL_ALERTS +
            '  <div ng-if="payee.ebills.nextAction">' +
            '    <div ng-if="payee.ebills.nextAction.billerSites">' + TPL_SITE + TPL_CONTROLS + '</div>' +
            '    <div ng-if="payee.ebills.nextAction.credentialsParams">' + TPL_LOGIN + TPL_CONTROLS + '</div>' +
            '    <div ng-if="payee.ebills.nextAction.accounts">' + TPL_ACCOUNT + TPL_CONTROLS + '</div>' +
            '  </div>' +
            '</div>';


        var link = function(scope, element, attrs) {
            scope.loading = false;

            /**
             * If external log function provided - pass error to it,
             * else use local error display
             *
             * @param errors - array of errors
             */
            function handleError(err) {
                if (!utils.isUndefined(scope.logErrors)) {
                    scope.logErrors(err);
                } else {
                    scope.errors = err;
                }
            }

            /**
             * Validate form (simple check if each field is valid according to field's pattern)
             *
             * @returns {boolean}
             */
            scope.continueButtonIsDisabled = function() {
                var valid;

                // Login template (presuming all fields are required)
                if (lpCoreUtils.has(scope.payee, 'ebills.nextAction.credentialsParams')) {
                    valid = lpCoreUtils.chain(scope.payee.ebills.nextAction.credentialsParams).map('fieldValue').reduce(function(v1, v2){return v1 && v2;}).value();
                    return !valid;
                }
                
                // Button enabled by default
                return false;
            };

            function handleEBillResponse(data) {
                if (data.checkStatus) {
                    $timeout(function() {
                        lpEBillService.checkStatus(scope.payee.ebills)
                            .then(handleEBillResponse, function(err) {
                                scope.loading = false;
                                handleError(err.data.errors);
                            });
                    }, 2000);
                } else {
                    scope.payee.ebills = data;
                    if (!data.furtherActionNeeded) {
                        scope.payee.eBillsStatus = 'ACTIVE';
                        scope.callback();
                    }
                    scope.loading = false;
                }
            }

            scope.confirm = function() {
                scope.loading = true;
                handleError(null); // Clear errors
                lpEBillService.performAction(scope.payee.ebills)
                    .then(handleEBillResponse, function(error) {
                        handleError(error.data.errors);
                        scope.loading = false;
                    });
            };

            scope.cancel = function() {
                scope.payee.ebills = null;
                scope.callback();
            };

        };
        return {
            restrict: 'A',
            scope: {
                payee: '=',
                callback: '&',
                logErrors: '=?'
            },
            link: link,
            template: TPL
        };
    };

});
