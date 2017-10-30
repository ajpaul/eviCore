/**
 * @module widget-alert-messages
 * @version 1.0.0
 * @file ng-widget-sample description
 * @copyright Backbase Amsterdam
 * @requires module:lp/main
 * @requires module:lp/modules/core
 * @requires interact
 *
 * @example Require Widget
 * // add this in the index.html
 * window.requireWidget( __WIDGET__ ,'scripts/index');
 */

define( function (require, exports, module) {

    'use strict';

    module.name = 'widget-automation-alerts';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var accounts = require('module-accounts');
    var automation = require('module-automation');

    var deps = [
        core.name,
        ui.name,
        accounts.name,
        automation.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpAutomation, lpCoreBus) {

        lpAccounts.setConfig({
            'accountsEndpoint': lpWidget.getPreference('accountsEndpoint')
        });

        lpAutomation.setConfig({
            'automationsEndpoint': lpWidget.getPreference('automationsEndpoint'),
            'automationEndpoint': lpWidget.getPreference('automationEndpoint'),
            'automationsActivationEndpoint': lpWidget.getPreference('automationsActivationEndpoint'),
            'automationsDeactivationEndpoint': lpWidget.getPreference('automationsDeactivationEndpoint'),
            'recipesEndpoint': lpWidget.getPreference('recipesEndpoint'),
            'locale': lpWidget.getPreference('locale'),
            'title': lpWidget.getPreference('title')
        });

        lpCoreBus.publish('cxp.item.loaded', {id: lpWidget.model.name});
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .directive( require('./directives') )
        .run( run );
});
