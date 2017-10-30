define(function (require, exports, module) {
    'use strict';

    var countries = require('./countries');
    var regions = require('./regions');

    // @ngInject
    exports.lpUserPlaces = function() {
        return {
            regions: regions,
            countries: countries
        };
    };
});
