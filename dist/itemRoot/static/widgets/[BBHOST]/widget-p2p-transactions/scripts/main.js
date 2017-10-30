define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-p2p-transactions';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');
    var contacts = require('module-contacts');
    var transactions = require('module-transactions');
    var p2p = require('module-p2p');

    var deps = [
        core.name,
        ui.name,
        contacts.name,
        transactions.name,
        p2p.name
    ];

    // @ngInject
    function run(lpCoreUtils, lpWidget, lpP2PTransactions, lpCoreBus) {
        var params = {
            transactionsEndpoint: lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('transactionsDataSrc')),
            transactionMessagesEndpoint: lpCoreUtils.resolvePortalPlaceholders(lpWidget.getPreference('messageSrc')),
            pageSize: 10,
            locale: lpWidget.getPreference('locale')
        };
        lpP2PTransactions.setConfig(params);
        if(lpWidget && lpWidget.model && lpWidget.model.name){
            lpCoreBus.publish('cxp.item.loaded', { id: lpWidget.model.name });
        }
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});
