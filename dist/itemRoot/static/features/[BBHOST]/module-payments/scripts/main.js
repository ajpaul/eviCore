define( function (require, exports, module) {
	'use strict';

	module.name = 'module-payments';

	var base = require('base');

	var deps = [
		require('core').name,
		require('./components/scheduled-transfer/scripts/main').name,
		require('./components/lp-amount-input/scripts/main').name,
		require('./components/otp-check/scripts/main').name,
		require('./deprecated/scripts/main').name,
		require('./migration/main').name,
		require('module-enrollment').name // NOTE: remove this dep in case of moving otp-check component away
	];

	module.exports = base.createModule(module.name, deps)
		.constant( require('./constants') )
		.provider( require('./payments') )
		.provider( require('./providers') )
		.service( require('./services/payment-orders') );
});
