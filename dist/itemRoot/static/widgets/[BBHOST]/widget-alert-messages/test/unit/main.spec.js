/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var widget = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;
// Mock __WIDGET__ object
widget.constant('widget',  require('./widget.mock'));
widget.constant('lpWidget',  require('./widget.mock'));

// Mocks
var automation = require('./mocks/automation');
var automations = require('./mocks/automations');
var recipes = require('./mocks/recipes');
var accounts = require('./mocks/accounts');
var trigger = require('./mocks/trigger');

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Alerts and Automation Widget tests ', function() {

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(widget.name, function($provide) {

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
    /* Controllers
    /*----------------------------------------------------------------*/
    describe('Controllers', function() {

        var createController, scope, ctrl;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            createController = function(ctrlName) {
                return $controller(ctrlName, {
                    $scope: scope
                });
            };
        }));

        // MainCtrl
        describe('MainCtrl', function() {

            beforeEach(function(){
                ctrl = createController('MainCtrl');
                scope.automationsModel.recipes = recipes;
                scope.accountsModel.accounts = accounts;
                scope.automationsModel.automations = automations;
            });

            it('should exists', function() {
                expect(ctrl).toBeObject();
            });

            it('should have input defaults', function() {
                expect(scope.inputModel).toBeObject();
            });

            it('should have amount defaults', function() {
                expect(scope.automationsModel.amountDirection).toBeArray();
            });

            it('should create objects on creation starts and remove it on cancellation', function() {
                scope.createAutomation();
                expect(scope.fillingAutomationProgress).toBeTrue();
                expect(scope.currentAutomationObject.isNew).toBeTrue();

                scope.cancelAddingNewAutomation();
                expect(scope.fillingAutomationProgress).toBeFalse();
                expect(scope.currentAutomationObject).toBeNull();
            });

            it('should fill in objects on updating the automation', function() {
                var preFilled = scope.updateAutomation(automation, true);
                expect(preFilled.current).toBeObject();
                expect(preFilled.model).toBeObject();
            });

            it('should fill update info right', function() {
                var preFilled = scope.updateAutomation(automation, true);
                var model = preFilled.model;

                expect(model).toBeObject();
                expect(model.filters).toBeNonEmptyArray();
                expect(model.automationName).toBeNonEmptyString();
                expect(scope.accountsModel.selected).toBeObject();
            });

            it('should create a backup when updating', function() {
                scope.updateAutomation(automation, true);
                expect(ctrl.updateBackup).toBeObject();
            });

            it('should fill in account selected on updating the automation', function() {
                scope.updateAutomation(automation);
                scope.selectAccount();

                expect(scope.currentAutomationObject.data.accountId).toBeNonEmptyString();
            });

            it('should add a trigger to temp model once selected', function() {
                scope.createAutomation();
                scope.selectTrigger(trigger);

                expect(scope.currentAutomationObject.trigger).toBeObject();
            });

        });

    });

});

