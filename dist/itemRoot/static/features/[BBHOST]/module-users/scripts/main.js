define(function (require, exports, module) {
    'use strict';

    module.name = 'module-user';

    var base = require('base');
    var core = require('core');
    var resetPassword = require('./components/user-reset-password/scripts/main');
    var channelSelector = require('./components/channel-selector/scripts/main');

    var deps = [
        core.name,
        resetPassword.name,
        channelSelector.name
    ];

    module.exports = base.createModule(module.name, deps)
        .provider(require('./authentication')) // lpUsersAuthentication
        .factory(require('./data/places')) // lpUserPlaces
        .factory(require('./image')) // lpDefaultProfileImage
        .factory(require('./details')) // lpUserDetails service
        .factory(require('./settings')) // lpUserSettings service
        .factory(require('./locations')) // lpUserLocations service
        .service(require('./preference')) // lpUsersPreference
        .directive(require('./profile-image'));
});
