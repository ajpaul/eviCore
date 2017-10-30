define(function(require, exports, module) {

    'use strict';

    var utils = require('base').utils;
    var defaultDateFormat = 'MMM. Do, hh:mmA';

    // @ngInject
    exports.lpLastLogin = function($timeout, $parse, lpCoreUtils) {
        var tmpl = [
            '<div class="lp-last-login" ng-show="show">',
            '    <span class="lp-last-login__label" lp-i18n="Last seen"></span> : <span class="lp-last-login__datetime">{{ formattedDatetime }}</span>',
            '</div>'
        ].join('');

        function templateFn() {
            return tmpl;
        }

        function linkFn(scope, element, attrs) {
            var lastLoginDateTimeUnregister;

            scope.show = true;

            lastLoginDateTimeUnregister = scope.$watch('lastLoginDateTime', function(datetime) {
                if (datetime) {
                    scope.formattedDatetime = utils.date(datetime).format(scope.dateFormat || defaultDateFormat);
                    var lapse = parseInt(scope.hideAfter, 10);

                    if (!lpCoreUtils.isNaN(lapse) && lapse > 0) {
                        $timeout(function() {
                            scope.show = false;
                        }, lapse * 1000);
                    }

                    lastLoginDateTimeUnregister();
                }
            });

        }

        return {
            restrict: 'AE',
            scope: {
                lastLoginDateTime: '=lpLastLogin',
                hideAfter: '=',
                dateFormat: '@'
            },
            link: linkFn,
            template: templateFn
        };
    };
});
