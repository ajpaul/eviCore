define(function(require, exports, module){
    'use strict';

    var _ = require('base').utils;

    // Uncomment this when using widget standalone
    var tempQueryParams = '';

    // @ngInject
    exports.bpModel = function(lpEBillPayService) {

        this.paymentMethods = {
            CHECK: 'CHECK',
            ELECTRONIC: 'ELECTRONIC'
        };

        this.paymentModel = lpEBillPayService.getModel();

        this.currentBiller = {
            payeeId: null,
            ebillEligible: null,
            paymentMethod: null,
            ebills: null
        };

        this.payment = null;

        this.isCurrentBillerCheck = function() {
            return this.currentBiller.paymentMethod === this.paymentMethods.CHECK;
        };
    };

    // Bill Payments Service

    // @ngInject
    exports.bpService = function($http, $filter, lpWidget, lpCoreUtils, lpEBillService) {
        var model = this;
        var billPaymentsEndpoint = lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('billPaymentsDataSrc'));
        var instantPaymentOrdersDataSrc = lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('instantPaymentOrdersDataSrc'));

        model.getTopVendors = function() {
            model.isConnecting = true;
            model.errors = null;
            return $http.get(billPaymentsEndpoint + '/top-billers' + tempQueryParams)
                .then(function(res) {
                    model.billers = (res && res.data && res.data.billerGroups) || [];
                    return model.billers;
                }, function(err) {
                    model.errors = err.data.errors;
                })['finally'](function() {
                    model.isConnecting = false;
                });
        };

        model.searchVendors = function(params) {
            model.isConnecting = true;
            model.errors = null;
            return $http.get(billPaymentsEndpoint + '/billers' + tempQueryParams, { params: params })
                .then(function(res) {
                    model.billers = res && res.data && res.data.billers || [];
                    return model.billers;
                }, function(err) {
                    model.errors = err.data.errors;
                })['finally'](function() {
                    model.isConnecting = false;
                });
        };

        model.cancelSearch = function() {
            model.isConnecting = false;
        };

        /**
         * Adds biller to users biller list
         */
        model.addPayee = function(payee) {
            model.isConnecting = true;
            model.errors = null;
            var createPayee = {
                id: payee.id,
                name: payee.name,
                account: payee.account,
                address: payee.address,
                paymentMethod: payee.paymentMethod
            };
            // TODO: update url
            return $http.post(billPaymentsEndpoint + '/payees' + tempQueryParams, createPayee)
                .then(function(response) {
                    model.isConnecting = false;
                    if (response.data.errors && response.data.errors.length > 0) {
                        model.errors = response.data.errors;
                        return payee;
                    }
                    payee = response.data;
                    payee.ebillEligible = response.data.eBillsStatus === 'ELIGIBLE';
                    return payee;
                }, function(response) {
                    model.isConnecting = false;
                    model.errors = response.data && response.data.errors;
                    if (response.data.addresses) {
                        payee.addresses = response.data.addresses;
                        return payee;
                    }
                });
        };

        model.getAccounts = function() {
            model.isConnecting = true;
            model.errors = null;
            return $http.get(billPaymentsEndpoint + '/accounts' + tempQueryParams)
                .then(function(response) {
                    model.isConnecting = false;
                    var accounts = [];
                    _.forEach(response.data.accounts, function(value, key) {
                        var account = {
                            id: value.accountCode,
                            alias: value.nickName || value.description,
                            bookedBalance: value.totalAmountDue,
                            availableBalance: value.balance,
                            isPrimaryAccount: value.primaryBillPaymentAccount
                        };
                        accounts.push(account);
                    });

                    return accounts;
                }, function(response) {
                    model.isConnecting = false;
                    model.errors = response.data && response.data.errors;
                });
        };

        /**
         * Schedule a payment.
         * If payment.urgentTransfer === true creates an expedited payment
         * (marked to be processed as soon as it is created).
         */
        model.makeAPayment = function(payment) {
            model.isConnecting = true;
            model.errors = null;
            return $http.post(instantPaymentOrdersDataSrc + tempQueryParams, payment)
                .then(function(response) {
                    model.isConnecting = false;
                    return payment;
                }, function(response) {
                    model.isConnecting = false;
                    model.errors = [{
                        code: '500'
                    }];
                });
        };

        model.fetchPayee = function(payee) {
            return $http.get(billPaymentsEndpoint + '/payees/' + payee.payeeId +
                tempQueryParams).then(function(response) {
                    return response.data;
                });
        };

        model.setupEBills = function(payee) {
            model.isConnecting = true;
            return lpEBillService.setup(payee)
                .then(function(data) {
                    model.isConnecting = false;
                    payee.ebills = data;
                }, function(response) {
                    model.isConnecting = false;
                    model.errors = response.data && response.data.errors;
                });
        };
    };

    // @ngInject
    exports.calendarService = function($http, lpWidget, lpCoreUtils) {
        var model = this;
        var calendarEndpoint = lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('calendarDataSrc'));

        /**
         * Get the business day after specified business days (offset).
         */
        model.getBusinessDay = function(startDate, offset) {
            model.isConnecting = true;
            model.errors = null;
            return $http.get(calendarEndpoint + '/business-days-after' +
                tempQueryParams, { params: {date: startDate, offset: offset} })
                .then(function(response) {
                    model.isConnecting = false;
                    if (response.data.errors.length > 0) {
                        model.errors = response.data.errors;
                    }
                    return response.data.businessDay;
                }, function(response) {
                    model.isConnecting = false;
                    model.errors = response.data && response.data.errors;
                });
        };

    };
});
