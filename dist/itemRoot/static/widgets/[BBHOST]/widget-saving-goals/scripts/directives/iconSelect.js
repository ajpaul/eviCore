define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.iconSelect = function (lpWidget, lpCoreUtils) {

        /**
         * Main directive link function
         * @param  {object} scope   Angular scope object
         * @param  {HTMLElement} elem    DOM element
         * @param  {object} attrs   Elem attributes
         * @param  {object} ngModel ngModelController
         * @return {undefined}
         */
        function linkFn(scope, elem, attrs, ngModel) {
            scope.selectIcon = function (name) {
                scope.ngModel = name;
            };
        }

        /**
         * Inline template definition
         * @return {string} Template string
         */
        function templateFn() {
            return [
                '<div class="icon-select">',
                '<div class="icon-list" tabindex="3">',
                '<div class="icon {{ value }}"',
                '   ng-class="{selected: ngModel == name}"',
                '   ng-click="selectIcon(name)"',
                '   ng-repeat="(name, value) in icons">',
                '</div>',
                '</div>',
                '</div>'
            ].join('');
        }

        return {
            scope: {
                icons: '=',
                ngModel: '='
            },
            restrict: 'EA',
            template: templateFn,
            replace: true,
            link: linkFn
        };
    };
});
