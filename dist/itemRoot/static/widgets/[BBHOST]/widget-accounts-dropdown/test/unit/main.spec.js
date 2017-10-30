/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var _ = require('lodash');

var widget = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;
// Mock __WIDGET__ object
var Widget = require('./widget.mock');

// mocks
var accounts = require('./mocks/accounts');
var model = require('./mocks/model');

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Widget accounts dropdown', function() {
    var lpWidget;
    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/

    beforeEach(ngModule(widget.name, function($provide) {
        $provide.value('lpWidget',  new Widget());
    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(widget).toBeObject();
        });
    });

    /*----------------------------------------------------------------*/
    /* UNIT TEST for Controllers
    /*----------------------------------------------------------------*/
    describe('Controllers', function() {

        var createController, scope, ctrl, lpCoreBus;

        beforeEach(inject(function($controller, $rootScope, _lpCoreBus_) {
            scope = $rootScope.$new();
            lpCoreBus = _lpCoreBus_;

            createController = function(ctrlName, injectedParams) {
                if (!_.isPlainObject(injectedParams)) {
                    injectedParams = {};
                }

                return $controller(ctrlName, _.assign({
                    $scope: scope
                }, injectedParams));
            };
        }));

        // AccountsDropdownController
        describe('AccountsDropdownController', function() {
            var lpAccountsModel = model;

            beforeEach(function(){
                ctrl = createController('MainCtrl', {
                    lpAccountsModel: lpAccountsModel
                });

                ctrl.accounts = accounts;
                ctrl.selectedAccount = null;

                // Necessary when using Controller as controller in main template
                scope.mainCtrl = ctrl;
            });

            it('should exists', function() {
                expect(ctrl).toBeObject();
            });

            it('lpAccountsModel should be defined', inject(function(lpAccountsModel) {
                expect(lpAccountsModel).toBeDefined();
            }));

            it('lpAccountsModel has load function', inject(function(lpAccountsModel) {
                expect(lpAccountsModel.load).toBeFunction();
            }));

            it('lpAccountsModel: load returns promise', inject(function(lpAccountsModel) {
                var promise = lpAccountsModel.load();
                expect('then' in promise).toBeTrue();
            }));

            // it('lpAccountsModel should return AA id', inject(function(lpAccountsModel) {
            //     expect(lpAccountsModel.getAllAccountsId).toBeFunction();
            //     expect(lpAccountsModel.getAllAccountsId()).toBeString();
            // }));

            // it('lpAccountsModel should add AA item', inject(function(lpAccountsModel) {
            //     var fnAdd = lpAccountsModel.addAllAccountsItem;
            //     var fnId = lpAccountsModel.getAllAccountsId;

            //     expect(fnAdd).toBeFunction();
            //     expect(fnAdd([])).toBeArray();
            //     expect(fnAdd([]).length === 1).toBeTrue();
            //     expect(fnAdd([])[0].id === fnId()).toBeTrue();
            // }));

            // Regression tests
            xit('should publish a global event when account selected is changed', function() {
                var obj = {
                    accountId: ctrl.model.accounts[1].id,
                    allAccounts: false,
                    _noBehavior: true
                };

                // Stub lpCoreBus
                spyOn(lpCoreBus, 'publish');

                // Change selected account
                ctrl.selectedAccount = ctrl.accounts[1];

                // Trigger digest cycle
                scope.$digest();

                expect(lpCoreBus.publish).toHaveBeenCalledWith('launchpad-retail.accountSelected', obj, true);
            });
        });

    });

});

