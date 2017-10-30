define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpAccountsAssetsGroup = function(lpAccountsUtils) {
        function getTemplate(element, attrs) {
            var accordionEnabled = [
                '<div accordion-group="accordion-group" is-open="group.isOpen" ng-show="preferences.showGroups && group.accounts.length > 0">',
                    '<div accordion-heading="accordion-heading">',
                        '<span lp-i18n="{{ group.title }}"></span>',
                        '<i class="fa" ng-class="{ \'fa-caret-up\': group.isOpen, \'fa-caret-down\': !group.isOpen }"></i>',
                        '<span ng-show="preferences.showTotals" class="group-totals pull-right"',
                              'lp-amount="groupTotal.totalBalance"',
                              'hide-trailing-zeroes="true"',
                              'lp-amount-currency="groupTotal.currency"></span>',
                    '</div>',
                    '<div lp-accounts-assets-list=""',
                        ' select-account="selectAccount({account: account, groupCode: group.code})"',
                        ' group="group"',
                        ' preferences="preferences"',
                        ' selected-account-id="selectedAccountId">',
                    '</div>',
                '</div>'
            ].join('');

            var accordionDisabled = [
                '<div class="panel-heading panel-round clearfix cursor-pointer"',
                     'ng-show="preferences.showGroups && group.accounts.length > 0" tabindex="0"',
                     'ng-click="group.isCollapsed = !group.isCollapsed">',
                    '<span class="pull-left" lp-i18n="{{ group.title }}"></span>',
                    '<span class="pull-right caret"></span>',
                    '<span ng-show="preferences.showTotals" class="group-totals pull-right"',
                          'lp-amount="groupTotal.totalBalance"',
                          'hide-trailing-zeroes="true"',
                          'lp-amount-currency="groupTotal.currency"></span>',
                '</div>',
                '<div lp-accounts-assets-list=""' +
                    ' select-account="selectAccount({account: account, groupCode: group.code})"',
                    ' group="group"',
                    ' preferences="preferences"',
                    ' selected-account-id="selectedAccountId"',
                    ' ng-hide="group.isCollapsed">',
                '</div>'
            ].join('');

            return attrs && attrs.accordionEnabled === 'true' ? accordionEnabled : accordionDisabled;
        }

        function linkFn(scope) {
            scope.groupTotal = lpAccountsUtils.getGroupTotal(scope.group, scope.preferences.defaultBalance);
        }

        return {
            restrict: 'AE',
            scope: {
                group: '=',
                preferences: '=',
                selectedAccountId: '=',
                selectAccount: '&'
            },
            template: getTemplate,
            link: linkFn
        };
    };
});
