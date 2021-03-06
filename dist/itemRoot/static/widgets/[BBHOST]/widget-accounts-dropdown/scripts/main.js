define(function(require, exports, module) {
    'use strict';

    module.name = 'widgets-accounts-dropdown';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var accounts = require('module-accounts');

    var deps = [
        core.name,
        ui.name,
        accounts.name
    ];

    // @ngInject
    function run(lpWidget, lpAccounts, lpCoreBus, lpAccountsModel) {
        lpAccounts.setConfig({
            accountsEndpoint: lpWidget.getPreference('accountsDataSrc'),
            locale: lpWidget.getPreference('locale')
        });

        lpAccountsModel.setConfig({
            'defaultAccountId': lpWidget.getPreference('defaultAccountId'),
            'showAllAccountsItem': lpWidget.getPreference('showAllAccountsItem')
        });

        lpCoreBus.publish('cxp.item.loaded', {
            id: lpWidget.model.name
        });
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
