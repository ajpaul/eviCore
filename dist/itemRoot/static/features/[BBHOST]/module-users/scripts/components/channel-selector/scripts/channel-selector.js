define(function (require, exports, module) {
    'use strict';

    /**
     * @ngdoc directive
     * @module channel-selector
     * @name lpUsersChannelSelector
     *
     * @restrict EA
     *
     * @description
     * The `<lp-users-channel-selector>` exposes a radio-group allowing user to choose
     * a channel for receiving messages between their phone or email.
     *
     * @param {string} ng-model Assignable angular expression to data-bind to.
     * @param {string} email User's email (will be shown in a label).
     * @param {string} phone User's phone (will be shown in a label).
     *
     * @usage
     *
     *   <lp-users-channel-selector
     *       ng-model="channelSelected"
     *       email="'bob@backbase.com'"
     *       phone="'1231231231'"
     *       ></lp-users-channel-selector>
     *
     * @ngInject
     */
    exports.lpUsersChannelSelector = function($templateCache) {

        $templateCache.put('lpUsersChannelSelector.html', [
            '<div class="channel-selector row">',
            '    <div class="cell col-xs-12 col-sm-12 col-md-12 col-lg-12">',
            '        <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="model" value="phone" name="numbers">',
            '            <div class="radio-label">',
            '                <div class="radio-label-main" lp-i18n="Use my mobile phone"></div>',
            '                <div class="radio-label-small" lp-i18n="{{ phone }}"></div>',
            '            </div>',
            '        </div>',
            '        <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="model" value="email" name="numbers">',
            '            <div class="radio-label">',
            '                <div class="radio-label-main" lp-i18n="Use my email"></div>',
            '                <div class="radio-label-small" lp-i18n="{{ email }}"></div>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join(''));

        return {
            restrict: 'EA',
            scope: {
                email: '@',
                model: '=ngModel',
                phone: '@'
            },
            template: $templateCache.get('lpUsersChannelSelector.html')
        };
    };

});
