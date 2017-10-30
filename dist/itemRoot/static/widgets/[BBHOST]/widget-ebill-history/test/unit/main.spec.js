/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;
// Mock __WIDGET__ object
main.constant('widget',  require('./widget.mock'));

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Widget test ', function() {

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function($provide) {

    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });
    });

    /*----------------------------------------------------------------*/
    /* DEMO UNIT TEST for Controllers
    /*----------------------------------------------------------------*/
    xdescribe('Controllers', function() {

        var createController;

        beforeEach(inject(function($controller, $rootScope) {
            createController = function(ctrlName) {
                return $controller(ctrlName, {
                    // add dep injections mock here
                });
            };
        }));
        // MainCtrl
        xdescribe('MainCtrl', function() {
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

