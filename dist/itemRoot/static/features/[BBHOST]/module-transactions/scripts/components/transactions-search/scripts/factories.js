/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : directives.js
 *  Description:  Transactions Search Component
 *  ----------------------------------------------------------------
 */
define(function(require, exports) {

    'use strict';

    // @ngInject
    exports.lpDownloadTransactionsFile = function($window) {
        return function(link) {
            if (!$window.open(link, '_blank')) {
                console.log('lpDownloadTransactionsFile:error');
            }
        };
    };
});
