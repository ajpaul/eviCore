/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : index.spec.js
 *  Description: lp-simple-account-select test spec
 *  ----------------------------------------------------------------
 */

'use strict';

var main = require('../../scripts/main');
require('angular-mocks');

var mockAccounts = require('../../mock/accounts.json');
var jQuery = require('jquery');
var ng = window.angular;
var ngModule = window.module;
var ngInject = window.inject;

window.$ = jQuery;

var markupAccounts = function() {
    return [
        '<lp-simple-account-select',
            ' model="accountsModel"',
            ' options="accountFrom">',
        '</lp-simple-account-select>'
    ].join('');
};
/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('Simple account select testing suite', function() {
    it('should export an object', function() {
        expect(main).toBeObject();
    });
});

/*----------------------------------------------------------------*/
/* Component testing
/*----------------------------------------------------------------*/
describe('Simple account select component', function() {

    var $compile, scope, element, accountElements;

    // Load the component module, which contains the directive
    beforeEach(ngModule(main.name));

    beforeEach(ngInject(function(_$compile_, _$rootScope_, _$document_){
        var selectedAccount;

        $compile = _$compile_;
        scope = _$rootScope_.$new();

        scope.accountsModel = {
            accounts: mockAccounts.accounts,
            loading: false,
            selected: null,
            opened: false
        };

        //component model
        scope.accountFrom = {
            id: this.id + '.account-from',
            label: 'From',
            isMobileApp: false,
            placeholder: 'Select from Account'
        };

        selectedAccount = scope.accountsModel.selected;
    }));

    it('should have isolated scope', function() {
        element = $compile(markupAccounts())(scope);

        expect(element.isolateScope()).toBeDefined();

        // check for model and options
        expect(element.isolateScope().model).toBeDefined();
        expect(element.isolateScope().options).toBeDefined()
    })

    it('should create an accounts selector', function() {

        element = $compile(markupAccounts())(scope);
        scope.$digest();

        // Check for 3 account elements.
        accountElements = jQuery('.select-list-item', element);
        expect(accountElements.length).toBe(scope.accountsModel.accounts.length);
        expect(element.html()).toContain('account-select-account-name');

        // Click first to select.
        ng.element($(element).find('.dropdown-menu li').eq(0)).triggerHandler('click');
        expect(scope.accountsModel.selected.id).toBe( scope.accountsModel.accounts[0].id);
        accountElements = $(element).find('span.account-select-button-value');
        expect(accountElements.length).toBe(1); // menu is now closed, with 1 selected.
        expect(ng.element(accountElements).html()).toContain(scope.accountsModel.selected.description);
    });

    it('should have accounts list hidden when mobile mode is selected', function() {
        scope.accountFrom.isMobileApp = true;
        element = $compile(markupAccounts())(scope);
        scope.$digest();

        accountElements = $(element).find('.select-list-items');
        expect(accountElements.length).toBe(0);
    });

    /*----------------------------------------------------------------*/
    /* Account list subcomponent testing
    /*----------------------------------------------------------------*/
    describe('Account list subcomponent', function() {
        var accountList = require('../../scripts/components/list/main');

        it('should export an object', function() {
            expect(accountList).toBeObject();
        });
    });
});
