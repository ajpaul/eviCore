/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : index.spec.js
 *  Description: otp-check test Spec
 *  ----------------------------------------------------------------
 */

'use strict';

// include the component
var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* Basic testing
 /*----------------------------------------------------------------*/
describe('OTP Check component', function() {
    it('should be an object', function() {
        expect(main).toBeObject();
    });
});