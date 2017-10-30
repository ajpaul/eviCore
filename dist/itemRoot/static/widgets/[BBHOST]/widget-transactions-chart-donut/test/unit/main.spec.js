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

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Widget Transactions Overview', function() {
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
    /* DEMO UNIT TEST for Controllers
    /*----------------------------------------------------------------*/
    xdescribe('Controllers', function() {

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
            var ctrl;
            beforeEach(function(){
                ctrl = createController('TransactionsOverviewController');
            });

            it('should exists', function() {
                expect(ctrl).toBeObject();
            });

        });

    });

});

