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

// var mock = require('mock');
var mock = require('../mock');

/*----------------------------------------------------------------*/
/* module-content testing
/*----------------------------------------------------------------*/
describe('module-content suite test ', function() {
    var lpContentProvider;

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function(_lpContentProvider_, $provide) {
        lpContentProvider = _lpContentProvider_;
        $provide.value('lpWidget', mock.dummies.lpWidget());
    }));

    /*----------------------------------------------------------------*/
    /* Main
    /*----------------------------------------------------------------*/
    describe('Main', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });

        it('should contain a provider', ngInject(function() {
            expect(lpContentProvider).toBeObject();
        }));

        it('should contain a provider service', ngInject(function(lpContent) {
            expect(lpContent).toBeObject();
        }));

        it('should contain a utils constant', ngInject(function(lpContentUtils) {
            expect(lpContentUtils).toBeDefined();
        }));
    });

});


