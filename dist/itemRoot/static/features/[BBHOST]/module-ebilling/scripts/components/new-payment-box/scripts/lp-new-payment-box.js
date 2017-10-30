/*eslint space-infix-ops:0*/

define(function(require, exports, module) {

    'use strict';

    var paymentBoxTemplate =
        '<form class="lp-new-payment-box">' +
            '<div class="form-group lp-new-payment-balances" ng-if="eBill">' +
                '<div class="clearfix" ng-if="eBill.outstandingBalance">' +
                    '<div class="col-xs-5 col-md-5">' +
                        '<div lp-custom-radio="" name="eBillAmount" ng-click="specificAmount.display = false" ' +
                                'ng-model="paymentOrder.amount" value="{{ eBill.outstandingBalance }}">' +
                                '<span lp-i18n="Statement Balance"></span>' +
                        '</div>' +
                    '</div>' +
                     '<div class="col-xs-7 col-md-7 text-right">' +
                        '<span class="radio h5" lp-amount="eBill.outstandingBalance" lp-amount-currency="paymentOrder.currencySym"></span>'+
                    '</div>' +
                '</div>' +

                '<div class="clearfix" ng-if="eBill.amountDue">' +
                    '<div class="col-xs-5 col-md-5">' +
                        '<div lp-custom-radio="" name="eBillAmount" ng-click="specificAmount.display = false" ' +
                                'ng-model="paymentOrder.amount" value="{{ eBill.amountDue }}">' +
                            '<span lp-i18n="Minimum Amount"></span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-xs-7 col-md-7 text-right">' +
                        '<span class="radio h5" lp-amount="eBill.amountDue" lp-amount-currency="paymentOrder.currencySym"></span>'+
                    '</div>' +
                '</div>' +

                '<div class="form-group clearfix">' +
                    '<div class="col-xs-5 col-md-5">' +
                        '<div lp-custom-radio="" name="eBillAmount" ng-click="specificAmount.display = true" ng-model="paymentOrder.amount" ng-value="specificAmount.amount">' +
                            '<span lp-i18n="Specified Amount"></span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-xs-7 col-md-7 lp-currency-amount-input" ng-show="specificAmount.display"">' +
                        '<div class="amount-area" name="amount" ng-model="specificAmount.amount" ' +
                           ' e-bill-amount-input="{currencySym: paymentOrder.currencySym }"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="form-group clearfix" ng-if="!eBill">' +
                '<div class="lp-st-section clearfix">' +
                    '<div class="pull-left lp-st-caption" lp-i18n="Amount to pay"></div>' +
                    '<div class="pull-left lp-st-control lp-currency-amount-input">' +
                         '<div class="amount-area" name="amount" ng-model="paymentOrder.amount" ' +
                               ' e-bill-amount-input="{currencySym: paymentOrder.currencySym}" required="required">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="form-group clearfix">' +
               '<div class="lp-st-section clearfix">' +
                   '<div class="pull-left lp-st-caption" lp-i18n="Pay with"></div>' +
                    '<div class="col-xs-12 col-sm-12">' +
                        '<div name="accountId" class="lp-accounts-header" ng-change=""' +
                            'lp-accounts-select="lp-accounts-select"' +
                            'ng-model="paymentOrder.account"' +
                            'lp-accounts="accounts" required="required">' +
                        '</div>' +
                    '</div>' +
               '</div>' +
            '</div>' +

            '<div lp-payment-date-box ' +
                'payment-order="paymentOrder" ' +
                'show-urgent-transfer="showUrgentTransfer()"' +
                'scheduled-transfer-frequencies="scheduledTransferFrequencies"' +
                'scheduled-transfer-end-options="scheduledTransferEndOptions">' +
            '</div>' +

            '<div class="memo">' +
                '<textarea aria-label="payment description" class="form-control memo-area"' +
                    'placeholder="Description (optional) Maximum number of characters is 140"' +
                    'maxlength="140"' +
                    'ng-model="paymentOrder.memo">' +
                '</textarea>' +
            '</div>' +
        '</form>';

    // @ngInject
    exports.lpNewPaymentBox = function($timeout) {
        var link = function(scope, element, attrs) {
            // Amount entered by the user
            scope.specificAmount = {};

            // Initialzes amount selection
            $timeout(function() {
                if (!scope.paymentOrder.amount && scope.eBill) {
                    scope.paymentOrder.amount = scope.eBill.amountDue;
                }
            });

            // Update the payment order model when user put custom amount
            scope.$watch('specificAmount.amount', function(value) {
                scope.paymentOrder.amount = value;
            });
        };

        return {
            restrict: 'A',
            scope: {
                paymentOrder: '=payment',
                accounts: '=accounts',
                eBill: '=?', // e.g. { amountDue: 98.65, outstandingBalance: 986.5, dueDate: "2015-03-31" } */
                showUrgentTransfer: '&',
                scheduledTransferFrequencies: '=?',
                scheduledTransferEndOptions: '=?'
            },
            replace: true,
            link: link,
            template: paymentBoxTemplate
        };
    };

});
