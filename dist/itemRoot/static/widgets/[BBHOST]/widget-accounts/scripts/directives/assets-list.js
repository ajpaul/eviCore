    define(function(require, exports, module) {
        'use strict';

        exports.lpAccountsAssetsList = function() {
            function getTemplate() {
                return [
                    '<ul class="list-group">',
                        '<li class="list-group-item panel-body cursor-pointer"',
                            'tabindex="0" role="button"',
                            'ng-repeat="account in group.accounts"',
                            'on-select="selectAccount({account: account, groupCode: group.code})"',
                            'ng-class="{ selected: selectedAccountId == account.id }">',
                                '<span class="lp-line-item-arrow">',
                                    '<i class="lp-icon lp-icon-angle-right"></i>',
                                '</span>',
                            '<div lp-accounts-assets-account="" ',
                                ' account="account"',
                                ' group="group"',
                                ' selected-account-id="selectedAccountId"',
                                ' preferences="preferences">',
                            '</div>',
                        '</li>',
                    '</ul>'
                ].join('');
            }

            return {
                restrict: 'AE',
                scope: {
                    group: '=',
                    selectedAccountId: '=',
                    preferences: '=',
                    selectAccount: '&'
                },
                template: getTemplate
            };
        };
    });
