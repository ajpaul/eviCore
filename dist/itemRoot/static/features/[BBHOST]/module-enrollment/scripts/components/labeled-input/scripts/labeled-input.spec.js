/* global angular, inject */

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : labeled-input.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

'use strict';

describe('labeled-input directive', function() {
    var
        $compile,
        $rootScope;

    angular.module('lpLabeledInputFieldTest', [require('core').name])
        .factory(require('./util'))
        .directive(require('./labeled-input'));

    beforeEach(function() {
        angular.mock.module('lpLabeledInputFieldTest');
    });

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should successfully compile to an input wrapper', function() {
        var element = $compile('<div lp-labeled-input-field></div>')($rootScope);
        $rootScope.$digest();
        expect(element.find('input').length).toEqual(1);
    });

    describe('attributes', function() {
        describe('is-disabled', function() {
            it('should enable the input by default', function() {
                var element = $compile('<div lp-labeled-input-field></div>')($rootScope);
                $rootScope.$digest();
                expect(element.find('input')[0].disabled).toEqual(false);
            });
            it('should disable the input if set to true', function() {
                var element = $compile('<div lp-labeled-input-field is-disabled="true"></div>')($rootScope);
                $rootScope.$digest();
                expect(element.find('input')[0].disabled).toEqual(true);
            });
            it('should be able to disable the input dynamically', function() {
                var element = $compile('<div lp-labeled-input-field is-disabled="{{ isDisabled }}"></div>')($rootScope);
                $rootScope.$digest();
                $rootScope.isDisabled = true;
                $rootScope.$digest();
                expect(element.find('input')[0].disabled).toEqual(true);
            });
        });
    });
});
