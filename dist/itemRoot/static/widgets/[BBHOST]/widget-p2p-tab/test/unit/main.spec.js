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
describe('Widget P2P Tab ', function() {

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

});
