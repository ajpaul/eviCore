/**
 * String mask helpers.
 * @module string-mask
 */
define(function(require, exports, module) {
    'use strict';

    var StringMask = require('../libs/string-mask/src/string-mask');

    function clearDelimitersAndLeadingZeros(value) {
        var cleanValue = value.replace(/^-/, '').replace(/^0*/, '');
        cleanValue = cleanValue.replace(/[^0-9]/g, '');
        return cleanValue;
    }

    module.exports = {
        StringMask: StringMask,

        prepareNumberToFormatter: function (value, decimals) {
            return clearDelimitersAndLeadingZeros((parseFloat(value)).toFixed(decimals));
        },

/* todo: move these
        maxNumber: function maxValidator(ctrl, value, limit) {
            var max = parseFloat(limit);
            var validity = ctrl.$isEmpty(value) || isNaN(max)|| value <= max;
            ctrl.$setValidity('max', validity);
            return value;
        },

        minNumber: function minValidator(ctrl, value, limit) {
            var min = parseFloat(limit);
            var validity = ctrl.$isEmpty(value) || isNaN(min) || value >= min;
            ctrl.$setValidity('min', validity);
            return value;
        }
*/

        numberMask: function (decimals, decimalDelimiter, thousandsDelimiter) {
            var mask = '#' + thousandsDelimiter + '##0';

            if(decimals > 0) {
                mask += decimalDelimiter;
                for (var i = 0; i < decimals; i++) {
                    mask += '0';
                }
            }

            return new StringMask(mask, {
                reverse: true
            });
        },

        decimalMask: function (decimals) {
            var mask = '###0';

            if(decimals > 0) {
                mask += '.';
                for (var i = 0; i < decimals; i++) {
                    mask += '0';
                }
            }

            return new StringMask(mask, {
                reverse: true
            });
        }
    };
});

