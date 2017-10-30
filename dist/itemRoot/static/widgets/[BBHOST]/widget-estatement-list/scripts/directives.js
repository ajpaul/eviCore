/**
 * Directives
 * @module directives
 */
define(function(require, exports) {
    'use strict';

    exports.lpEstatementsLink = function () {
        var TYPE_STYLE = {
            'pdf': 'fa-file-pdf-o',
            'html': 'fa-eye'
        };

        function getTemplate () {
            return [
                '<a href="{{link.href}}" target="_blank" ng-if="!isDisabled" title="{{type}}">',
                    '<i class="fa {{iconClass}} {{type}}"></i>',
                '</a>',
                '<i ng-if="isDisabled" class="fa {{iconClass}} {{type}} disabled"></i>'
            ].join('');
        }

        function linkFn(scope, el, attrs) {
            scope.type = scope.link.type.split('/')[1];
            scope.iconClass = TYPE_STYLE[scope.type];
            scope.isDisabled = scope.link.href === 'null&admin=0';
        }

        return {
            restrict: 'AE',
            scope: {
                link: '='
            },
            template: getTemplate(),
            link: linkFn
        };
    };
});
