define(function(require, exports, module) {
    'use strict';

    /**
     * @ngdoc directive
     * @module ui.on-select
     * @name onSelect
     *
     * @restrict A
     *
     * @description
     * The `onSelect` directive binds both click and keydown events to
     *
     * @usage
     *   <div tabindex="0" on-select="selectAccount(account)"></div>
     *
     * @ngInject
     */
    exports.onSelect = function($parse) {
        return {
            restrict: 'A',
            compile: function(el, attr) {
                var fn = $parse(attr.onSelect);
                return function ngEventHandler(scope, element) {
                    element.on('click keydown', function(event) {
                        if (event.type === 'click' || event.which === 13 || event.which === 32) {
                            event.preventDefault();
                            event.stopPropagation();
                            scope.$apply(function() {
                                fn(scope, {$event: event});
                            });
                        }
                    });
                };
            }
        };

    };
});
