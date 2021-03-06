define(function (require, exports, module) {
    'use strict';

    module.name = 'module-places';

    var core = require('core');
    var base = require('base');
    var ui = require('ui');
    require('./libs/angular-gm');

    // requirejs async plugin
    // Is ignored by webpack
    require('async!//maps.google.com/maps/api/js?libraries=places');

    var deps = [
        core.name,
        ui.name,
        'AngularGM'
    ];

    module.exports = base.createModule(module.name, deps)
        .constant( require('./utils') )
        .service( require('./services') )
        .directive( require('./places-autocomplete') );
});
