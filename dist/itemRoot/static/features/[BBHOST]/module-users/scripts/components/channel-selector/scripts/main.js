define(function(require, exports, module) {
    'use strict';

    var base = require('base');

    module.name = 'channel-selector';

    module.exports = base.createModule(module.name, [])
        .directive(require('./channel-selector'));
});
