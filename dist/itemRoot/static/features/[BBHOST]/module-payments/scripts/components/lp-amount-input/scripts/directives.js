define(function(require, exports, module) {

    'use strict';

    var defaults = {
        decimals: 2,
        hideGroupSep: false,
        allowNegative: false,
        currencySymbol: '' //use locale settings by default
    };

    /**
     * lp-amount-input custom element directive
     * @ngInject
     */
    exports.lpAmountInput = function(lpUIUtils, $locale, $parse) {

        var StringMask = lpUIUtils.StringMask;

        /**
         * Main directive link function
         *
         * @param  {object} scope   Angular scope object
         * @param  {HTMLElement} elem    DOM element
         * @param  {object} attrs   Elem attributes
         * @param  {object} ctrl  ngModelController
         * @return {undefined}
         */
        function linkFn(scope, elem, attrs, ctrl) {
            if (attrs.lpAmountInput) {
                // Convert string to object.
                attrs.lpAmountInput = $parse(attrs.lpAmountInput)(scope);
            }

            var options = lpUIUtils.defaults(attrs.lpAmountInput || {}, defaults);

            var moneyMask,
                decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
                thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
                currencySym = options.currencySymbol || $locale.NUMBER_FORMATS.CURRENCY_SYM;

            function maskFactory(maskDecimals) {
                var decimalsPattern = maskDecimals > 0 ? decimalDelimiter + new Array(maskDecimals + 1).join('0') : '';
                var maskPattern = currencySym + ' #' + thousandsDelimiter + '##0' + decimalsPattern;
                return new StringMask(maskPattern, {reverse: true});
            }

            if (options.hideGroupSep) {
                thousandsDelimiter = '';
            }

            moneyMask = maskFactory(options.decimals);

            function formatter(value) {
                if (!value) {
                     return '';
                }

                var prefix = (options.allowNegative && value < 0) ? '-' : '';
                var valueToFormat = lpUIUtils.prepareNumberToFormatter(value, options.decimals);
                return prefix + moneyMask.apply(valueToFormat);
            }

            function parser(value) {
                if (!value) {
                    return '';
                }

                var actualNumber = value.replace(/[^\d]+/g, ''),
                    formatedValue;

                    actualNumber = actualNumber.replace(/^[0]+([1-9])/, '$1');
                    formatedValue = moneyMask.apply(actualNumber);

                if (options.allowNegative) {
                    var isNegative = (value[0] === '-'),
                    needsToInvertSign = (value.slice(-1) === '-');

                    //only apply the minus sign if it is negative or(exclusive)
                    //needs to be negative and the number is different from zero
                    if (needsToInvertSign ^ isNegative && !!actualNumber) {
                        actualNumber *= -1;
                        formatedValue = '-' + formatedValue;
                    }
                }

                if (value !== formatedValue) {
                    ctrl.$setViewValue(formatedValue);
                    ctrl.$render();
                }

                formatedValue = formatedValue ? parseInt(formatedValue.replace(/[^\d\-]+/g, ''), 10) / Math.pow(10, options.decimals) : null;

                return formatedValue;
            }
            // observe attribute changes
            attrs.$observe('lpAmountInput', function(value) {
                value = $parse(value)(scope);
                if (value !== null && typeof value === 'object') {
                    if (value.currencySymbol !== '') {
                        currencySym = value.currencySymbol;
                    }
                    moneyMask = maskFactory(options.decimals);
                    parser(ctrl.$viewValue);
                }
            });
            // Add formatters and parsers.
            ctrl.$formatters.push(formatter);
            ctrl.$parsers.push(parser);
        }

        return {
            require: 'ngModel',
            restrict: 'A',
            link: linkFn
        };
    };
});
