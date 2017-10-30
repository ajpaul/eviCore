/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

window.gadgets = {
    pubsub: function() {}
};

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
        it('should be an object', function() {
            expect(widget).toBeObject();
        });
    });
});

