define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpFormatAmount = function(lpCoreI18n, widget) {
        return {
            restrict: 'A',
            scope: {
                account: '=lpFormatAmount'
            },
            link: function(scope, element, attrs) {
                scope.$watch('account', function(account) {
                    var balanceList = [];
                    balanceList.available = account.availableBalance;
                    balanceList.current = account.bookedBalance;

                    var preferredBalance = widget.getPreferenceFromParents('preferredBalanceView') || 'current';
                    var formattedAmount = lpCoreI18n.formatCurrency(balanceList[preferredBalance], account.currency);
                    //wrap decimals in span for styling
                    formattedAmount = formattedAmount.replace( /(\d*)$/, '<span class="decimals">$1</span>');

                    element.html(formattedAmount);
                });
            }
        };
    };
});
