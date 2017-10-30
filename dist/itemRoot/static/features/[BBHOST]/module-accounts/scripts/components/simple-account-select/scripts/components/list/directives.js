define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpAccountSelectList = function(lpMobileComponent) {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                options: '='
            },
            replace: true,
            template: function() {
                return [
                    '<ul class="account-select-list select-list dropdown-list dropdown-menu" role="menu">',
                        '<li ng-if="hasHeading(account)" ng-repeat-start="account in model.accounts track by $index" class="account-select-account select-list-item list-heading">{{account}}</li>',
                        '<li ng-if="!hasHeading(account)" role="menuitem" class="account-select-account select-list-item" ng-repeat-end ng-click="onClick(account)" ng-class="{\'select-list-item-selected\': account.account.id === model.selected.account.id}" tabindex="0">',
                            '<div class="account-select-account-name clearfix">',
                                '<span class="account-description truncate pull-left">{{account.description}}</span>',
                                '<span class="account-mask pull-left">({{account.accountMask}})</span>',
                                '<span class="account-balance pull-right" lp-amount="account.balance" lp-amount-currency="account.currencyCode"></span>',
                            '</div>',
                        '</li>',
                    '</ul>'
                ].join('');
            },
            link: function(scope) {
                var isMobileApp = scope.options.isMobileApp;
                var mobileComponent;

                scope.onClick = function(account) {
                    scope.select(account);
                };

                scope.select = function(account) {
                    scope.model.selected = account;
                    scope.model.opened = false;
                    scope.$parent.onSelect({selectedAccount: account.account});

                    if (isMobileApp) {
                        mobileComponent.sync();
                        mobileComponent.action('select');
                    }
                };

                scope.hasHeading = function(account) {
                    return (typeof account === 'string');
                };

                if (isMobileApp) {
                    mobileComponent = lpMobileComponent(scope);
                }
            }
        };
    };
});
