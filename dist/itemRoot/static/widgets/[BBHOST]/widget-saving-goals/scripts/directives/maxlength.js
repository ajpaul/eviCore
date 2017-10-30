define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.maxlength = function () {
        return {
            scope: {},
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.on('input', function () {
                    var maxLength = this.maxLength;
                    if (this.value.length > maxLength) {
                        this.value = this.value.substr(0, maxLength);
                    }
                });
            }
        };
    };
});
