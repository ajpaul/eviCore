'use strict';

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : accounts-model.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var AccountsModel = require('./accounts-model.js');
var mock = require('../../test/mock');



/*----------------------------------------------------------------*/
/* Account provider service
/*----------------------------------------------------------------*/

describe('Accounts model service', function() {


    it('should be an object', function() {
        expect(AccountsModel).toBeObject();
    });



    describe('Accounts model instance', function() {
        var lpAccountsModel;

        beforeEach(function() {
            lpAccountsModel = new AccountsModel.lpAccountsModel(mock.dummies.lpAccounts);
        });

        it('should be an object', function() {
            expect(lpAccountsModel).toBeObject();
        });

        it('should have getConfig and setConfig method defined', function() {
            expect(lpAccountsModel.setConfig).toBeFunction();
            expect(lpAccountsModel.getConfig).toBeFunction();
        });

        it('should resolve getConfig without parameters as an Object', function() {
            expect(lpAccountsModel.getConfig()).toBeObject();
        });

        it('should be configurable', function() {
            expect(lpAccountsModel.getConfig('test')).toBeUndefined();
            lpAccountsModel.setConfig({'test2': 123});
            expect(lpAccountsModel.getConfig('test2')).toBe(123);
        });

        it('returns a promise when calling load method', function() {
            var promise = lpAccountsModel.load();
            expect(promise).toBeObject();
        });

        it('returns model after _loadCallback was called', function() {
            var model = lpAccountsModel._loadCallback(mock.stubs.accounts);
            expect(model).toBeObject();
            expect(model.accounts).toBeDefined();
            expect(model.accounts.length).toBe(mock.stubs.accounts.length);
            expect(model.selectedId).toBeUndefined();
        });

        it('should set selectedId on a model id onAccountSelected called', function() {
            var accountId = '12345';
            lpAccountsModel.onAccountSelected({accountId: accountId});
            var model = lpAccountsModel.model;

            expect(model.selectedId).toBe(accountId);
        });

        it('should set selectedId and selected on the model if card account is passed', function() {
            var account = mock.stubs.accounts[0];

            // pubsub callback
            lpAccountsModel.onAccountSelected({account: account});
            var model = lpAccountsModel.model;


            expect(model.selectedId).toBe(account.id);
            expect(model.selected).toBeObject();
            expect(model.selected).toBe(account);
        });

        // test callbacks and utilities

        it('test _errorCallback', function() {
            expect(lpAccountsModel._errorCallback('test')).toBe('test');
        });


        it('should add allAccounts item if configured', function() {
            lpAccountsModel.setConfig({'showAllAccountsItem': true});
            var model = lpAccountsModel._loadCallback(mock.stubs.accounts);
            expect(model.accounts.length).toBe(mock.stubs.accounts.length + 1);
        });


        it('should be different model for different instances', function() {
            var lpAccountsModel2 = new AccountsModel.lpAccountsModel(mock.dummies.lpAccounts);

            lpAccountsModel2.setConfig({'showAllAccountsItem': true});

            var model = lpAccountsModel._loadCallback(mock.stubs.accounts);
            var model2 = lpAccountsModel2._loadCallback(mock.stubs.accounts);

            // console.log(model.accounts.length, model2.accounts.length);
            expect(model.accounts.length).not.toBe(model2.accounts.length);
        });


    });


});
