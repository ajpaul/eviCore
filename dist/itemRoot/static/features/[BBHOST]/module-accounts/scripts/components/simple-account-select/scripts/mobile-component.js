define(function (require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpMobileComponent = function (lpCoreBus) {
        return function createMobileComponent (scope) {
            var syncMessage = 'sync.' + scope.options.id;
            var stopSync = false;

            function applyChanges (data) {
                if (!stopSync) {

                    stopSync = true;

                    scope.model = data.model;
                    scope.$digest();

                    stopSync = false;
                }
            }

            function publishChanges () {

                stopSync = true;
                lpCoreBus.publish(syncMessage, {
                    model: scope.model
                });
                stopSync = false;
            }

            // Update model on sync message
            lpCoreBus.subscribe(syncMessage, applyChanges);

            return {
                /**
                 * Navigates component to subcomponent or back
                 * @param {String} action - Action
                 * @public
                 */
                action: function (action) {
                    var navigateMsg = scope.options.id + '.' + action;
                    lpCoreBus.publish(navigateMsg);
                },

                /**
                 * Synchronizes a model of the multipage component across pages
                 * @public
                 */
                sync: function () {
                    publishChanges();
                }
            };
        };
    };
});
