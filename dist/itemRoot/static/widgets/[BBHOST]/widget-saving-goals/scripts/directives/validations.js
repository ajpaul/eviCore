/**
 * Form custom validations
 * @module validations
 */
define(function (require, exports, module) {
    'use strict';

    /**
     * Validates the amount is greater than zero
     * @ngInject
     */
    exports.greaterThanZero = function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var floatValue = parseFloat(viewValue.replace(',', '.'));
                    if (parseFloat(floatValue) > 0) {
                        ctrl.$setValidity('GreaterThanZero', true);
                        return floatValue;
                    } else {
                        ctrl.$setValidity('GreaterThanZero', false);
                        return undefined;
                    }
              });
            }
        };
    };
});
