'use strict';

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : all-accounts.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var allAccounts = require('./all-accounts.js');
var mock = require('../../test/mock');



/*----------------------------------------------------------------*/
/* Account provider service
/*----------------------------------------------------------------*/

describe('All accounts model', function() {

    it('should be an object', function() {
        expect(allAccounts).toBeObject();
    });


    describe('method #getItem', function() {
        it('should return allAccountsItem object', function() {
            var allAccountsItem = allAccounts.getItem();
            expect(allAccountsItem).toBeObject();
            expect(allAccountsItem.id).toBe('000-000-000');
            expect(allAccountsItem.ids).toBe('');
        });
    });


    describe('All Account item', function() {

        var allAccountsItem;
        var accounts = mock.stubs.accounts;

        beforeEach(function() {
            allAccountsItem = allAccounts.getItem(accounts);
        });

        it('should contain list of ids of passed accounts', function() {
            var ids = allAccountsItem.ids;

            expect(ids).toBeDefined();
            expect(ids.length).toBeGreaterThan(0);
            expect(ids.split(',').length).toBe(accounts.length);
        });

    });

});
