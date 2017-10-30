/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    var angular = require('angular');

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(lpWidget, lpCoreUtils, lpCoreError) {
        this.utils = lpCoreUtils;
        this.error = lpCoreError;
        this.widget = lpWidget;

        this.iconClasses = [];
        this.filter = '';
        this.order = '+';
        this.size = 'large';

        this.changeOrder = function () {
            this.order = this.order === '+' ? '-' : '+';
        };

        function iconIsNotExcluded(icon) {
            var excludedIcons = ['small', 'medium', 'large', 'blank', 'red'];
            return excludedIcons.indexOf(icon) === -1;
        }

        function iconIsNew(iconClasses, icon) {
            return iconClasses.indexOf(icon) === -1;
        }

        function getIconName(cssRule) {
            var match;
            if (cssRule instanceof CSSStyleRule) {
                match = /\.(lp-icon-[\w|-]+)\b/g.exec(cssRule.cssText);
            }
            return match && match.length > 1 ? match[1] : null;
        }

        angular.forEach(document.styleSheets, function (stylesheet) {
            angular.forEach(stylesheet.cssRules, function (cssRule) {
                var iconName = getIconName(cssRule);
                if (iconName && iconIsNotExcluded(iconName) && iconIsNew(this.iconClasses, iconName)) {
                    this.iconClasses.push(iconName);
                }
            }, this);
        }, this);

    }

    exports.MainCtrl = MainCtrl;
});
