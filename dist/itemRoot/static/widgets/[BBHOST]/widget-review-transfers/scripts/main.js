/**
 * @module widget-review-transfers
 * @version 1.0.0
 * @file widget-review-transfers description
 * @copyright Backbase Amsterdam
 * @requires module:lp/base
 * @requires module:lp/resources/core
 * @requires module:lp/resources/ui
 * @requires interact
 *
 * @example Require Widget
 * // add this in the index.html
 * window.requireWidget( __WIDGET__,'scripts/index');
 */

define(function(require, exports, module) {

    'use strict';

    module.name = 'widget-review-transfers';

    /**
     * Dependencies
     */
    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var accounts = require('module-accounts');
    var payments = require('module-payments');
    var p2p = require('module-p2p');

    /**
     * Angular - Translate libs
     */
    // require('translateMessageFormat');
    // require(['messageformatLocale/en']);
    // require(['messageformatLocale/lt']);

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        payments.name,
        p2p.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpCoreBus, lpPayments) {
        // Pass config to module providers.
        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsDataSrc')
        });
        lpPayments.setConfig({
            'paymentsEndpoint': lpWidget.getPreference('pendingPaymentOrdersDataSrc')
        });

        if(lpWidget && lpWidget.model && lpWidget.model.name){
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .constant(require('./constants'))
        .controller(require('./controllers'))
        .service(require('./models'))
        .run(run);
});
