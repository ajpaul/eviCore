/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* module-p2p testing
/*----------------------------------------------------------------*/
describe('module-p2p suite test ', function() {
    var lpModuleProvider;
    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function(_lpP2PProvider_) {
        lpModuleProvider = _lpP2PProvider_;
    }));

    /*----------------------------------------------------------------*/
    /* Main
    /*----------------------------------------------------------------*/
    describe('Main', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });

        it('should contain a provider', ngInject(function() {
            expect(lpModuleProvider).toBeObject();
        }));

        it('should contain a provider service', ngInject(function(lpP2P) {
            expect(lpP2P).toBeObject();
        }));
    });

});


