/* global angular, inject, installPromiseMatchers */

var lpTransactionsModule = require('./providers');

describe('Transactions provider', function() {
    'use strict';

    var
        lpTransactions,
        promise,
        $httpBackend,
        lpTagsUtils = function() {
            return {};
        };

    angular.module('lpTransactionsTest', [require('core').name]);

    beforeEach(function() {
        angular.mock.module('lpTransactionsTest');

        installPromiseMatchers();
    });

    beforeEach(inject(function(_$httpBackend_, $injector, $http, $q, lpCoreUtils, lpCoreError) {
        $httpBackend = _$httpBackend_;

        // Tricky way to disable cache for $http.get
        $http.defaults.cache = false;
        lpTransactions = $injector
            .instantiate(lpTransactionsModule.lpTransactions)
            .$get($http, $q, lpCoreUtils, lpCoreError, lpTagsUtils);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an object', function() {
        expect(lpTransactions).toBeObject();
    });

    it('should be configurable', function() {
        expect(function() {
            lpTransactions.setConfig({ url: '/some/endpoint' });
        }).not.toThrow();
    });

    describe('API', function() {
        var api,
            config = {
                transactionsEndpoint: '/transactions'
            };

        beforeEach(function() {
            lpTransactions.setConfig(config);
            api = lpTransactions.api();
            api.account = {};
            api.getQueryParamaters = function() {
                return {};
            };
        });

        it('should return an API object', function() {
            expect(api).toBeObject();
        });

        it('should have a #loadMoreTransactions method', function() {
            expect(api.loadMoreTransactions).toBeFunction();
        });

        it('should throw an error unless account is specified', function() {
            delete api.account;
            expect(function() {
                api.loadMoreTransactions();
            }).toThrow(Error('No account specified'));
        });

        it('should correctly process transactions endpoint call with empty response', function() {
            $httpBackend.whenGET('/transactions?f=0&l=21').respond(200);
            promise = api.loadMoreTransactions();
            $httpBackend.flush();
            expect(promise).toBeResolvedWith([]);
        });

        it('should correctly process transactions endpoint response', function() {
            $httpBackend.whenGET('/transactions?f=0&l=21').respond(200, []);
            promise = api.loadMoreTransactions();
            $httpBackend.flush();
            expect(promise).toBeResolvedWith(jasmine.any(Array));
        });

        it('should fill transactions endpoint response with some default data', function() {
            $httpBackend.whenGET('/transactions?f=0&l=21').respond(200, [{}]);
            promise = api.loadMoreTransactions();
            $httpBackend.flush();
            expect(promise).toBeResolvedWith([
                {
                    newDate: true,
                    details: null,
                    detailTabs: {
                        details: true,
                        categories: false
                    }
                }
            ]);
        });

        it('should save properties of transactions endpoint response', function() {
            $httpBackend.whenGET('/transactions?f=0&l=21').respond(200, [
                { accountId: '4495316' }
            ]);
            promise = api.loadMoreTransactions();
            $httpBackend.flush();
            expect(promise).toBeResolvedWith(jasmine.objectContaining([
                jasmine.objectContaining({ accountId: '4495316' })
            ]));
        });

        xit('should retrieve counterpartyName and counterpartyAccount properties from counterparty data', function() {
            $httpBackend.whenGET('/transactions?f=0&l=21').respond(200, [
                {
                    counterparty: {
                        account: '0000001050',
                        location: null,
                        logo: null,
                        name: 'Dr. John C Benavidez III'
                    }
                }
            ]);
            promise = api.loadMoreTransactions();
            $httpBackend.flush();
            expect(promise).toBeResolvedWith(jasmine.objectContaining([
                jasmine.objectContaining({
                    counterpartyName: 'Dr. John C Benavidez III',
                    counterpartyAccount: '0000001050'
                })
            ]));
        });
    });
});
