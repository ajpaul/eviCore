/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* Widget New Transfer
/*----------------------------------------------------------------*/
describe('Widget video ', function() {
    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });
    });
});
