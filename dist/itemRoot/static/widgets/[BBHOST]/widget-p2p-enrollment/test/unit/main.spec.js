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
describe('Widget P2P Enrollment', function() {

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(widget.name, function($provide) {
        $provide.value('widget', widget);
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
    describe('Controllers', function() {

        var controller;

        beforeEach(inject(function($controller, $rootScope) {
            controller = $controller('P2PEnrollmentController', {
                $scope: $rootScope.$new(),
                widget: {getPreference: function() {}}
            });
        }));

        // MainCtrl
        xdescribe('P2PEnrollmentController', function() {
            it('should exists', function() {
                //expect(controller).toBeObject();
            });
        });

    });

});

