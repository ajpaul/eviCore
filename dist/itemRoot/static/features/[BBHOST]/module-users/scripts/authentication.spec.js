/* global angular, inject, installPromiseMatchers */

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : authentication.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

describe('Authentication provider', function() {
    'use strict';

    var
        lpUsersAuthentication,
        promise,
        httpBackend;

    angular.module('lpUsersAuthenticationTest', [require('core').name])
        .provider(require('./authentication'));

    beforeEach(function() {
        angular.mock.module('lpUsersAuthenticationTest');

        installPromiseMatchers();
    });

    beforeEach(inject(function(_lpUsersAuthentication_, $httpBackend) {
        lpUsersAuthentication = _lpUsersAuthentication_;
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an object', function() {
        expect(lpUsersAuthentication).toBeObject();
    });

    it('should be configurable', function() {
        expect(function() {
            lpUsersAuthentication.setConfig({ url: '/some/endpoint' });
        }).not.toThrow();
    });

    describe('Session status', function() {

        it('should support `Initiated` session status', function() {
            lpUsersAuthentication.MOCKABLE.session.status = 'Initiated';
            expect(lpUsersAuthentication.isInitiated()).toBeTrue();
        });

        it('should support `PasswordChangeRequired` session status', function() {
            lpUsersAuthentication.MOCKABLE.session.status = 'PasswordChangeRequired';
            expect(lpUsersAuthentication.isPasswordChangeRequired()).toBeTrue();
        });

        it('should support `Verified` session status', function() {
            expect(lpUsersAuthentication.isVerified).toBeDefined();

            // Mock status
            lpUsersAuthentication.MOCKABLE.session.status = 'verified';
            expect(lpUsersAuthentication.isVerified()).toBeTrue();

            // Check again with uppercase.
            lpUsersAuthentication.MOCKABLE.session.status = 'VERIFIED';
            expect(lpUsersAuthentication.isVerified()).toBeTrue();
        });

    });

    describe('Sending OTP (OneTimePassword)', function() {

        var config = {
            sendOtpEndPoint: '/authentication/:id/send-otp'
        };

        beforeEach(inject(function() {
            lpUsersAuthentication.setConfig(config);
        }));

        // TODO: This method should be tested separately
        it('should have #setDeliveryMethod method', function() {
            expect(lpUsersAuthentication.setDeliveryMethod).toBeFunction();
        });

        it('should set correct delivery method', function() {
            expect(function() {
                lpUsersAuthentication.setDeliveryMethod('email');
            }).not.toThrow();
        });

        it('should not set incorrect delivery method', function() {
            expect(function() {
                lpUsersAuthentication.setDeliveryMethod('xxx');
            }).toThrow(Error('Bad argument: `xxx`. It only accepts `email` or `phone`.'));
        });

        it('should have #sendOTP method', function() {
            expect(lpUsersAuthentication.sendOTP).toBeFunction();
        });

        it('should process successful send-otp endpoint call', function() {
            httpBackend.whenPOST('/authentication/good_session_id/send-otp').respond(200);
            lpUsersAuthentication.MOCKABLE.session.id = 'good_session_id';
            promise = lpUsersAuthentication.sendOTP();
            httpBackend.flush();
            expect(promise).toBeResolved();
        });

        it('should process failed send-otp endpoint call', function() {
            httpBackend.whenPOST('/authentication/bad_session_id/send-otp')
                .respond(401, {
                    errors: [{
                        code: 'SEND_FAILED',
                        message: 'The sending of OTP code has failed.'
                    }]
                });
            lpUsersAuthentication.MOCKABLE.session.id = 'bad_session_id';
            promise = lpUsersAuthentication.sendOTP();
            httpBackend.flush();
            expect(promise).toBeRejectedWith(jasmine.objectContaining({
                status: 401,
                code: 'SEND_FAILED',
                message: 'The sending of OTP code has failed.'
            }));
        });

        it('should process send-otp endpoint call when server fails', function() {
            httpBackend.whenPOST('/authentication/good_session_id/send-otp').respond(500);
            lpUsersAuthentication.MOCKABLE.session.id = 'good_session_id';
            promise = lpUsersAuthentication.sendOTP();
            httpBackend.flush();
            expect(promise).toBeRejectedWith(jasmine.objectContaining({
                code: 'UNKNOWN_ERROR',
                message: 'There was an error processing your request. Contact your administrator'
            }));
        });

        it('should pass given value of delivery method while sending OTP', function() {
            httpBackend.whenPOST('/authentication/good_session_id/send-otp', 'deliveryMethod=phone').respond(200);
            lpUsersAuthentication.MOCKABLE.session.id = 'good_session_id';
            lpUsersAuthentication.setDeliveryMethod('phone');
            promise = lpUsersAuthentication.sendOTP();
            httpBackend.flush();
            expect(promise).toBeResolved();
        });

        it('should not pass incorrect delivery method while sending OTP', function() {
            httpBackend.whenPOST('/authentication/good_session_id/send-otp', 'deliveryMethod=phone').respond(200);
            lpUsersAuthentication.MOCKABLE.session.id = 'good_session_id';
            lpUsersAuthentication.setDeliveryMethod('email');
            lpUsersAuthentication.sendOTP();
            expect(function() {
                httpBackend.flush();
            }).toThrow(Error('Unexpected request: POST /authentication/good_session_id/send-otp\nNo more request expected'));
        });

    });

});
