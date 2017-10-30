define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpAccountsAssetsAccount = function() {
        function getTemplate() {
            return [
                '<div class="grouped-account clearfix" ng-class="{ \'bg-danger\': account.alerts }">',
                    '<span ng-if="group.code === \'card\'"',
                          'class="account-icon lp-icon lp-icon-credit-card pull-left"',
                          'ng-style="{ color: account.iconColor }"></span>',
                    '<p ng-if="group.code !== \'card\'" ng-show="preferences.showAccountHolderName">{{ account.holder }}</p>',
                    '<p class="pull-left">',
                        '<span>',
                            '{{ account.alias }} <span ng-if="account.shortReferenceId">({{ account.shortReferenceId }})</span>',
                        '</span>',
                    '</p>',
                    '<span ng-if="preferences.defaultBalance !== \'current\'" class="account-balance pull-right"',
                          'lp-amount="account.availableBalance" lp-amount-currency="account.currency"',
                          'hide-trailing-zeroes="true" ng-model="account"></span>',
                    '<span ng-if="preferences.defaultBalance === \'current\'" class="account-balance pull-right"',
                          'lp-amount="account.bookedBalance" lp-amount-currency="account.currency"',
                          'hide-trailing-zeroes="true" ng-model="account"></span>',
                    '<p ng-if="group.code !== \'card\'" ng-show="preferences.showAccountType">{{ account.product }}</p>',
                    '<p ng-if="group.code !== \'card\'" ng-show="preferences.showAccountHolderCategory">',
                        '{{ account.relationship }}',
                    '</p>',
                '</div>'
            ].join('');
        }

        function linkFn(scope, element, attrs) {

        }

        return {
            restrict: 'AE',
            scope: {
                account: '=',
                group: '=',
                selectedAccountId: '=',
                preferences: '='
            },
            template: getTemplate,
            link: linkFn
        };
    };
});
