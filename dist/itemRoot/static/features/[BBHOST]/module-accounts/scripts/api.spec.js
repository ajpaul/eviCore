'use strict';

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : core.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var API = require('./api');
var mock = require('../test/mock');
var utils = require('base').utils;

/*----------------------------------------------------------------*/
/* Account provider service
/*----------------------------------------------------------------*/

describe('Module accounts API', function() {

    var lpAccounts, options, url;

    beforeEach(function() {
        lpAccounts = new API({
            $http: mock.dummies.$http,
            lpCoreError: mock.dummies.lpCoreError
        });

        url = 'path/to/url';

        options = {
            'accountsEndpoint': url
        };
    });

    describe('Account provider service', function() {

        it('should be an object', function() {
            expect(lpAccounts).toBeObject();
        });

        describe('configure service', function() {
            it('should be undefined if no options are provided', function() {
                lpAccounts.setConfig();
                expect(lpAccounts.config).toBeUndefined();
            });

            it('should set accounts endpoint', function() {
                lpAccounts.setConfig(options);
                expect(lpAccounts.config.accountsEndpoint).toEqual(url);
            });

            it('should resolve placeholders of the accounts endpoint', function() {
                var urlWithoutPlaceholders = '/path/without/placeholders';
                spyOn(utils, 'resolvePortalPlaceholders').and.returnValue(urlWithoutPlaceholders);

                lpAccounts.setConfig(options);

                expect(utils.resolvePortalPlaceholders).toHaveBeenCalledWith(url);
                expect(lpAccounts.config.accountsEndpoint).toEqual(urlWithoutPlaceholders);
            });
        });

        describe('load accounts', function() {
            it('should throw an error if accountsEndpoint is not configured', function() {
                expect(function() { lpAccounts.load(); }).toThrow();
            });

            it('should refresh accounts', function(done) {
                lpAccounts.setConfig(options);
                spyOn(lpAccounts, 'refreshAccounts').and.returnValue();
                lpAccounts.load().then(function() {
                    expect(lpAccounts.refreshAccounts).toHaveBeenCalled();
                    done();
                });
            });

            it('should have a #getAll method that is an alias of #load', function() {
                var force = true;
                spyOn(lpAccounts, 'load').and.returnValue();
                lpAccounts.getAll(force);
                expect(lpAccounts.load).toHaveBeenCalledWith(force);
            });
        });
        // TODO: Add tests to cover all the code
    });

});
