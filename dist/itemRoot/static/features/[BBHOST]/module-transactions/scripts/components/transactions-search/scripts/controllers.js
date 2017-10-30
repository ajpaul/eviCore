/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : controllers.js
 *  Description:  Transactions Search Component Controllers
 *  ----------------------------------------------------------------
 */
define(function(require, exports) {
    'use strict';

    // @ngInject
    exports.lpExportTransactions = function($scope, $modalInstance) {
        $scope.download = function(option) {
            $modalInstance.close(option);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };
});
