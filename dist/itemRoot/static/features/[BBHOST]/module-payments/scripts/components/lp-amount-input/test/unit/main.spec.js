/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : index.spec.js
 *  Description: lp-amount-input test Spec
 *  ----------------------------------------------------------------
 */

'use strict';

// include the component
var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('Amount input component', function() {
    it('should export an object', function() {
        expect(main).toBeObject();
    });
});

/*----------------------------------------------------------------*/
/* Directives testing
/*----------------------------------------------------------------*/
describe('Amount input directive ', function() {
    var scope, $compile, lpUIUtils, StringMask;

    // Load the component module, which contains the directive
    beforeEach(ngModule(main.name));

    beforeEach(ngInject(function(_$compile_, _$rootScope_, _$document_, _lpUIUtils_){
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        lpUIUtils = _lpUIUtils_;
        StringMask = lpUIUtils.StringMask;
    }));

    it('should throw an error if used without ng-model', function() {
        expect(function() {
            $compile('<input lp-amount-input />')(scope);
        }).toThrow();
    });

    it('should register a $parser and a $formatter', function() {
        var input = $compile('<input ng-model="model">')(scope);
        var model = input.controller('ngModel');

        var maskedInput = $compile('<input lp-amount-input ng-model="maskedModel" />')(scope);
        var maskedModel = maskedInput.controller('ngModel');

        expect(maskedModel.$parsers.length).toBe(model.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(model.$formatters.length + 1);
    });

    it('should format initial model values', function() {
        scope.model = '3456.78';
        var input = $compile('<input lp-amount-input ng-model="model" />')(scope);
        scope.$digest();

        var model = input.controller('ngModel');
        expect(model.$viewValue).toBe('$ 3,456.78');
    });

    it('should allow to change currency symbol dynamically', function() {
        scope.model = '3456.78';
        scope.options = {
            currencySymbol: '€'
        };
        var input = $compile('<input lp-amount-input="{{options}}" ng-model="model" />')(scope);
        var model = input.controller('ngModel');

        scope.$digest();
        expect(model.$viewValue).toBe('€ 3,456.78');

        scope.options.currencySymbol = '$';

        scope.$digest();
        expect(model.$viewValue).toBe('$ 3,456.78');
    });

    it('should support number values', function() {
        scope.model = 345.00;
        var input = $compile('<input lp-amount-input ng-model="model" />')(scope);
        scope.$digest();

        var model = input.controller('ngModel');
        expect(model.$viewValue).toBe('$ 345.00');
    });

    it('should hide thousands delimiter when hide-group-sep is true', function() {
        scope.model = 3456.78;
        var input = $compile('<input lp-amount-input="{hideGroupSep:true}" ng-model="model" />')(scope);
        scope.$digest();

        var model = input.controller('ngModel');
        expect(model.$viewValue).toBe('$ 3456.78');
    });

    it('should allow negative value', function() {
        scope.model = -3456.78;
        var input = $compile('<input lp-amount-input="{allowNegative:true}" ng-model="model" />')(scope);
        scope.$digest();

        var model = input.controller('ngModel');
        expect(model.$viewValue).toBe('-$ 3,456.78');
        expect(model.$valid).toBe(true);
    });

    it('should not allow negative value', function() {
        scope.model = -3456.78;
        var input = $compile('<input lp-amount-input ng-model="model" />')(scope);
        scope.$digest();

        var model = input.controller('ngModel');
        expect(model.$viewValue).toBe('$ 3,456.78');
    });

    it('should format money with three decimal places', function() {
        var input = $compile('<input lp-amount-input="{decimals:3}" ng-model="model" />')(scope),
            model = input.controller('ngModel'),
            formatterView = new StringMask('$ #,##0.000', {reverse: true}),
            formatterModel =  new StringMask('###0.000', {reverse: true}),
            numberToFormat = '';

        for (var i = 1; i <= 9; i++) {
            numberToFormat += i;

            input.val(numberToFormat).triggerHandler('input');

            expect(model.$viewValue).toBe(formatterView.apply(numberToFormat));
            expect(model.$modelValue).toBe(parseFloat(formatterModel.apply(numberToFormat)));
        }
    });
});
