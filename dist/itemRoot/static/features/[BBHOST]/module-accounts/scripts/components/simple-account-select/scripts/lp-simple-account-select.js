define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpSimpleAccountSelect = function (lpMobileComponent) {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                options: '=',
                onSelect: '&'
            },
            replace: true,
            template: function() {
                return [
                    '<div class="lp-simple-account-select">',
                        '<div class="account-select select" data-id="{{options.id}}" ng-class="{desktop: !options.isMobileApp}">',
                            '<div data-role="account-select-components" dropdown on-toggle="toggle(open)">',
                                '<button class="account-select-button select-button" dropdown-toggle>',
                                    '<span ng-if="!model.loading">',
                                        '<span class="account-select-button-label select-button-label lp-form-label pull-left" ng-class="{\'upper-label\': model.selected}">{{options.label}}</span>',
                                        '<span ng-if="model.selected" class="account-select-button-value select-button-value lp-button-caption pull-left">',
                                            '<span class="account-description truncate pull-left">{{model.selected.description}}</span>',
                                            '<span class="account-mask pull-left">({{model.selected.accountMask}})</span>',
                                            '<span class="account-balance pull-right" lp-amount="model.selected.balance" lp-amount-currency="model.selected.currencyCode"></span>',
                                        '</span>',
                                        '<i class="lp-icon pull-right" ng-class="caret()"></i>',
                                        '<span class="account-select-button-placeholder select-button-label-placeholder lp-form-placeholder pull-right" ng-if="!model.selected">{{options.placeholder}}</span>',
                                    '</span>',
                                    '<span ng-if="model.loading">',
                                        '<span class="account-select-button-label select-button-label lp-form-label pull-left">Loading...</span>',
                                        '<i class="lp-icon lp-icon-spinner2 glyphicon-refresh-animate pull-right"></i>',
                                    '</span>',
                                '</button>',
                                '<lp-account-select-list model="model" options="options" ng-if="!options.isMobileApp && !model.loading"></lp-account-select-list>',
                            '</div>',
                        '</div>',
                    '</div>'
                ].join('');
            },
            link: function(scope) {
                var isMobileApp = scope.options.isMobileApp;
                var mobileComponent;

                scope.close = function() {
                    scope.model.opened = false;
                };

                scope.open = function() {
                    scope.model.opened = true;
                    if (isMobileApp) {
                        mobileComponent.sync();
                        mobileComponent.action('open');
                    }
                };

                scope.toggle = function(open) {
                    if (!open) {
                        scope.close();
                    } else {
                        scope.open();
                    }
                };

                scope.caret = function() {
                    return (scope.model.opened) ? 'lp-icon-caret-up' : 'lp-icon-caret-down';
                };

                if (isMobileApp) {
                    mobileComponent = lpMobileComponent(scope);
                }
            }
        };
    };
});
