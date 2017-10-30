 /**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : directives.js
 *  Description: Directives for transactions
 *  ----------------------------------------------------------------
 */
define(function (require, exports, module) {

    'use strict';

     // @ngInject
    exports.lpBalanceUpdate = function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.addClass('lp-amount');

                scope.$watch(function() {
                    return ngModelCtrl.$modelValue;
                }, function(newValue, oldValue) {

                    if(newValue.id !== oldValue.id) {
                        return;
                    }

                    //class names
                    var cssClass = {
                        increase: 'lp-increase-amount',
                        decrease: 'lp-decrease-amount'
                    };

                    //time before removing class in milliseconds
                    var removeClassTimeout = 2000;


                    if(newValue.delta === 1) {

                        //flash green
                        element.addClass(cssClass.increase);
                        setTimeout(function() {
                            element.removeClass(cssClass.increase);
                        }, removeClassTimeout);

                    } else if(newValue.delta === -1) {

                        //flash red
                        element.addClass(cssClass.decrease);
                        setTimeout(function() {
                            element.removeClass(cssClass.decrease);
                        }, removeClassTimeout);
                    }

                    //set delta to equal so subsequent re-renders do not trigger the animation if the accounts model has not been reloaded
                    newValue.delta = 0;
                });
            }
        };
    };

    /**
     * Common directive used by multiple transactions widgets
     * to apply responsive classes to the element
     * and execute callback
     *
     *  Usage: <div lp-responsive-callback="mainCtrl.responsiveCallback(size)">...</div>
     */

    // @ngInject
    exports.lpResponsiveCallback = function($parse, lpUIResponsive, $timeout) {
        function linkFn (scope, element, attrs){
            var lpResponsiveCallback = $parse(attrs.lpResponsiveCallback);

            var applyRule = function(size) {
                return function(){
                    element.removeClass('lp-tile-size lp-small-size lp-medium-size lp-large-size');
                    element.addClass('lp-' + size + '-size');

                    $timeout(function() {
                        lpResponsiveCallback(scope, {size: size});
                    });
                };
            };

            lpUIResponsive.enable(element)
                .rule({
                    'max-width': 200,
                    then: applyRule('tile')
                })
                .rule({
                    'min-width': 201,
                    'max-width': 375,
                    then: applyRule('small')
                })
                .rule({
                    'min-width': 376,
                    'max-width': 600,
                    then: applyRule('medium')
                })
                .rule({
                    'min-width': 601,
                    then: applyRule('large')
                });
        }

        return {
            restrict: 'A',
            link: linkFn
        };
    };
});
