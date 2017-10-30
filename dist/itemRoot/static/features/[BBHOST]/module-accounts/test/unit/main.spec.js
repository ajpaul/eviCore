/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : core.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Module accounts', function() {
    var accountsProvider;

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function(lpAccountsProvider) {
        accountsProvider = lpAccountsProvider;
    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Accounts Main Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });

        it('should contain an accounts provider', ngInject(function() {
            expect(accountsProvider).toBeObject();
        }));


        describe('Account provider service', function() {
            var lpAccounts;

            beforeEach(ngInject(function(_lpAccounts_) {
                lpAccounts = _lpAccounts_;
            }));


            it('should be an object', function() {
                expect(lpAccounts).toBeObject();
            });
        });
    });


    /*----------------------------------------------------------------*/
    /* Account service
    /*----------------------------------------------------------------*/
    describe('Account service', function() {
        var lpAccountService;
        var serviceConfig = {
            url: 'path/to/service'
        };
        beforeEach(inject(function(_lpAccountService_) {
            lpAccountService = _lpAccountService_;
        }));

        it('should be an object', function() {
            expect(lpAccountService).toBeObject();
        });

        it('should be configurable', function() {
            var config = lpAccountService.getConfig();
            expect(config).toBeEmptyObject();
            lpAccountService.setConfig(serviceConfig);
            var url = lpAccountService.getConfig('url');
            expect(url).toBe(serviceConfig.url);
        });
    });
});
