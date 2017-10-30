/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var sampleMock = require('./sample.mock');
var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('Module payments', function() {
    var paymentsProvider;
    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function(lpPaymentsProvider) {
        paymentsProvider = lpPaymentsProvider;
    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });

        it('should contain a provider', ngInject(function() {
            expect(paymentsProvider).toBeObject();
        }));

        it('should contain a provider service', ngInject(function(lpPayments) {
            expect(lpPayments).toBeObject();
        }));

        it('should contain constants', ngInject(function(transferTypes, pendingPaymentOrdersTimeout, customerId, currencyMaxLength) {
            expect(transferTypes).toBeDefined();
            expect(pendingPaymentOrdersTimeout).toBeDefined();
            expect(customerId).toBeDefined();
            expect(currencyMaxLength).toBeDefined();
        }));

        it('should contain Account Transfer provider', ngInject(function(lpAccountTransfers) {
            expect(lpAccountTransfers).toBeObject();
        }));
    });

    /*----------------------------------------------------------------*/
    /* Payment Orders service API
    /*----------------------------------------------------------------*/
    describe('Payment Orders service', function() {
        var api;
        beforeEach(inject(function(_lpAccountTransfers_) {
            var lpAccountTransfers = _lpAccountTransfers_;
            api = lpAccountTransfers.api('payment-orders');
        }));

        it('should export an object', function() {
            expect(api).toBeObject();
        });

        it('should be configurable', function() {
            var config = api.getConfig();
            expect(config).toBeEmptyObject();
            api.setConfig({
                url: '/some/endpoint'
            });
            var url = api.getConfig('url');
            expect(url).toBe('/some/endpoint');
        });

        describe('HTTP calls', function() {
            var result;
            var errorStatus = '';
            var handler;
            var httpBackend;
            var response = { id: 'asdsd' };

            beforeEach(ngInject(function($httpBackend) {
                httpBackend = $httpBackend;
                result = [];
                errorStatus = '';
                handler = {
                    success: function(data) {
                        result = data;
                    },
                    error: function(err) {
                        errorStatus = err.status;
                    }
                };
                api.setConfig({
                    url: '/some/v2/endPoint'
                });
                spyOn(handler, 'success').and.callThrough();
                spyOn(handler, 'error').and.callThrough();

            }));

            afterEach(function() {
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it('should return the status on error', function() {
                httpBackend.whenPOST(api.getConfig('url')).respond(401, {status: 401});
                api.createOrder().then(handler.success, handler.error);
                httpBackend.flush();
                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus).toEqual(401);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual([]);
            });

            it('should have OTP channel selector', function() {
                expect(api.selectOtpChannel).toBeFunction();
            });

            it('should throw error for no URL call of OTP channel selector', function() {
                expect(function () {
                    api.selectOtpChannel();
                }).toThrow();
            });

            it('should have OTP verification', function() {
                expect(api.verifyOtp).toBeFunction();
            });

            it('should throw error for no URL or params call of OTP verificator', function() {
                expect(function () {
                    api.verifyOtp();
                }).toThrow();
                expect(function () {
                    api.verifyOtp('fake/url');
                }).toThrow();
                expect(function () {
                    api.verifyOtp('fake/url', {fake: 'no otpCode property in params'});
                }).toThrow();
            });

        });
    });

});


