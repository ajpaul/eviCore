/* global angular, inject, installPromiseMatchers */

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : settings.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

describe('User settings service', function() {
    'use strict';

    var
        userSettings,
        api,
        promise,
        httpBackend;

    angular.module('lpUserSettingsTest', [require('core').name])
        .service(require('./settings'));

    beforeEach(function() {
        angular.mock.module('lpUserSettingsTest');

        installPromiseMatchers();
    });

    beforeEach(inject(function(_lpUserSettings_, $httpBackend) {
        userSettings = _lpUserSettings_;
        api = userSettings.api();
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should be configurable', function() {
        expect(function() {
            userSettings.setConfig({ url: '/some/endpoint' });
        }).not.toThrow();
    });

    describe('API', function() {

        var config = {
            getEmailByUsernameAndPhone: '/users/{username}/password-reminder/options',
            sendUsernameByEmail: '/users/username-reminder',
            requestAuthCodeByEmail: '/users/{username}/password-reminder/options/email',
            requestAuthCodeByPhone: '/users/{username}/password-reminder/options/phone',
            authenticateByTempPassword: '/users/{username}/password-reminder/authentication',
            createNewPassword: '/users/{username}/password-reminder/password'
        };

        beforeEach(inject(function() {
            userSettings.setConfig(config);
        }));

        it('should export an object for api', function() {
            expect(api).toBeObject();
        });

        describe('#sendRequest method', function() {
            it('should be a function', function() {
                expect(api.sendRequest).toBeFunction();
            });
            it('should make a request for passed endpoint', function() {
                userSettings.setConfig({ knownEndpoint: '/users/{username}/some/endpoint' });
                httpBackend.whenPOST('/users/bob/some/endpoint').respond(200);
                promise = api.sendRequest('knownEndpoint', 'bob');
                httpBackend.flush();
                expect(promise).toBeResolved();
            });
            it('should throw an exception unless passed enpoint is properly configured', function() {
                expect(function() {
                    api.sendRequest('unknownEndpoint');
                }).toThrow(Error('Endpoint "unknownEndpoint" not found. Make sure that lpUserSettings is configured properly.'));
            });
        });

        describe('#getEmailByUsernameAndPhone method', function() {
            it('should be a function', function() {
                expect(api.getEmailByUsernameAndPhone).toBeFunction();
            });
            it('should return email if username matches phone number', function() {
                httpBackend.whenGET('/users/bob/password-reminder/options?phone=01234')
                    .respond(200, { email: 'bob@backbase.com' });
                promise = api.getEmailByUsernameAndPhone('bob', '01234');
                httpBackend.flush();
                expect(promise).toBeResolvedWith(jasmine.objectContaining({ email: 'bob@backbase.com' }));
            });
            it('should return status 400 if username does not match phone number', function() {
                httpBackend.whenGET('/users/alisa/password-reminder/options?phone=01234')
                    .respond(400, {
                        errors: [{
                            code: 'INVALID_USERNAME_AND_MOBILE_NUMBER_COMBINATION',
                            message: 'Provided username and mobile phone number do not match.'
                        }]
                    });
                promise = api.getEmailByUsernameAndPhone('alisa', '01234');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 400 }));
            });
        });

        describe('#sendUsernameByEmail method', function() {
            it('should be a function', function() {
                expect(api.sendUsernameByEmail).toBeFunction();
            });
            it('should return status 200 if username is successfully sent to given email', function() {
                httpBackend.whenPOST('/users/username-reminder?email=bob@backbase.com')
                    .respond(200, '');
                promise = api.sendUsernameByEmail('bob@backbase.com');
                httpBackend.flush();
                expect(promise).toBeResolved();
            });
            it('should return status 404 if given email is not found', function() {
                httpBackend.whenPOST('/users/username-reminder?email=alisa@backbase.com')
                    .respond(404, '');
                promise = api.sendUsernameByEmail('alisa@backbase.com');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 404 }));
            });
        });

        describe('#requestAuthCode', function() {
            it('should be a function', function() {
                expect(api.requestAuthCode).toBeFunction();
            });
            it('should return authentication token for email channel if username matches phone number', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/options/email', { phone: '01234' })
                    .respond(200, { token: 'auth-token' });
                promise = api.requestAuthCode('email', 'bob', '01234');
                httpBackend.flush();
                expect(promise).toBeResolvedWith(jasmine.objectContaining({ token: 'auth-token' }));
            });
            it('should return status 400 for email channel if username does not match phone number', function() {
                httpBackend.whenPOST('/users/alisa/password-reminder/options/email', { phone: '01234' })
                    .respond(400, {
                        errors: [{
                            code: 'INVALID_USERNAME_AND_MOBILE_NUMBER_COMBINATION',
                            message: 'Provided username and mobile phone number do not match.'
                        }]
                    });
                promise = api.requestAuthCode('email', 'alisa', '01234');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 400 }));
            });
            it('should return authentication token for phone channel if username matches phone number', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/options/phone', { phone: '01234' })
                    .respond(200, { token: 'auth-token' });
                promise = api.requestAuthCode('phone', 'bob', '01234');
                httpBackend.flush();
                expect(promise).toBeResolvedWith(jasmine.objectContaining({ token: 'auth-token' }));
            });
            it('should return status 400 for phone channel if username does not match phone number', function() {
                httpBackend.whenPOST('/users/alisa/password-reminder/options/phone', { phone: '01234' })
                    .respond(400, {
                        errors: [{
                            code: 'INVALID_USERNAME_AND_MOBILE_NUMBER_COMBINATION',
                            message: 'Provided username and mobile phone number do not match.'
                        }]
                    });
                promise = api.requestAuthCode('phone', 'alisa', '01234');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 400 }));
            });
        });

        describe('#authenticateByTempPassword', function() {
            it('should be a function', function() {
                expect(api.authenticateByTempPassword).toBeFunction();
            });
            it('should return new authentication token if previous token and temp password are correct', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/authentication', { password: 'good' }, function(headers) {
                    return headers.token === 'auth-token';
                }).respond(200, { token: 'new-auth-token' });
                promise = api.authenticateByTempPassword('bob', 'good', 'auth-token');
                httpBackend.flush();
                expect(promise).toBeResolvedWith(jasmine.objectContaining({ token: 'new-auth-token' }));
            });
            it('should return status 401 if temp password is incorrect', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/authentication', { password: 'wrong' }, function(headers) {
                    return headers.token === 'auth-token';
                }).respond(401, {
                    errors: [{
                        code: 'CANNOT_AUTHENTICATE',
                        eventId: 'ID-cf576924d999-49804-1449824965496-58-12',
                        message: 'The provided authentication credentials are not correct.'
                    }]
                });
                promise = api.authenticateByTempPassword('bob', 'wrong', 'auth-token');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 401 }));
            });
            it('should return status 401 if previous token is incorrect', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/authentication', { password: 'good' }, function(headers) {
                    return headers.token === 'wrong-token';
                }).respond(401, {
                    errors: [{
                        code: 'CANNOT_AUTHENTICATE',
                        eventId: 'ID-cf576924d999-49804-1449824965496-58-12',
                        message: 'The provided authentication credentials are not correct.'
                    }]
                });
                promise = api.authenticateByTempPassword('bob', 'good', 'wrong-token');
                httpBackend.flush();
                expect(promise).toBeRejectedWith(jasmine.objectContaining({ status: 401 }));
            });
        });

        describe('#createNewPassword', function() {
            it('should be a function', function() {
                expect(api.createNewPassword).toBeFunction();
            });
            it('should return status 200 if password is successfully updated', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/password', { password: 'password' }, function(headers) {
                    return headers.token === 'auth-token';
                }).respond(200, '');
                promise = api.createNewPassword('bob', 'password', 'auth-token');
                httpBackend.flush();
                expect(promise).toBeResolved();
            });
            it('should return status 401 if authentication token is incorrect', function() {
                httpBackend.whenPOST('/users/bob/password-reminder/password', { password: 'password' }, function(headers) {
                    return headers.token === 'wrong-token';
                }).respond(401, '');
                promise = api.createNewPassword('bob', 'password', 'wrong-token');
                httpBackend.flush();
                expect(promise).toBeRejected();
            });
        });

    });

    describe('#changePassword method', function() {
        it('should be a function', function() {
            expect(userSettings.changePassword).toBeFunction();
        });
        it('should update password', function() {
            httpBackend.whenPOST('/path', {
                oldPassword: 'oldPassword',
                password: 'password'
            }).respond(200, '');
            promise = userSettings.changePassword('/path', 'oldPassword', 'password');
            httpBackend.flush();
            expect(promise).toBeResolved();
        });
    });

});
