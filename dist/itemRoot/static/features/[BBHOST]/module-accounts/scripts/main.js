define(function(require, exports, module) {
    'use strict';

    module.name = 'module-accounts';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var accountSelect = require('./components/accounts-select/scripts/main');
    var payeeAccountSelect = require('./components/payee-account-select/scripts/main');
    var credentialInput = require('./components/credential-input/scripts/main');
    var formatAmount = require('./components/format-amount/scripts/main');
    var simpleAccountSelect = require('./components/simple-account-select/scripts/main');

    var deps = [
        core.name,
        ui.name,
        accountSelect.name,
        payeeAccountSelect.name,
        credentialInput.name,
        formatAmount.name,
        simpleAccountSelect.name
    ];

    /*
    * @deprecate
    */
    deps.push(require('./deprecated/main').name);

    module.exports = base.createModule(module.name, deps)
        .value('groupsTimeout', 600 * 1000)
        .value('accountsTimeout', 10 * 1000)
        .provider( require('./accounts') )
        // TODO: move to server
        .value('customerId', '3')
        .service( require('./services/accounts-model') )
        .service( require('./services/account-service') );
});
