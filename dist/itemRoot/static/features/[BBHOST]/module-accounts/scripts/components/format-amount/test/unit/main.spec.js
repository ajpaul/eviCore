/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : index.spec.js
 *  Description: format-amount test Spec
 *  ----------------------------------------------------------------
 */

'use strict';

// include the component
var main = require('../../scripts/main');

require('angular-mocks');

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('format-amount testing suite', function() {
    it('should export an object', function() {
        expect(main).toBeObject();
    });
});
