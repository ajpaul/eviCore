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

widget.constant('widget',  require('./widgetMock'));

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Widget test suite ', function() {

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(window.module(widget.name, function($provide) {

    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should have a function', function() {
            expect(widget).toBeObject();
        });
    });

    /*----------------------------------------------------------------*/
    /* Controllers
    /*----------------------------------------------------------------*/
    xdescribe('Controllers', function() {

        var createController;

        beforeEach(inject(function($controller, $rootScope) {
            createController = function(ctrlName) {
                return $controller(ctrlName, {
                    //'$scope': $rootScope.$new()
                });
            };
        }));
        // MainCtrl
        describe('MainCtrl', function() {
            var ctrl;
            beforeEach(function(){
                ctrl = createController('MainCtrl');
            });

            it('should exists', function() {
                expect(ctrl).toBeObject();
            });
           
        });

    });

});

