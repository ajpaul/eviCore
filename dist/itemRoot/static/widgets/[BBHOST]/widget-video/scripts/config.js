/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description: ${widget.description}
 *  ----------------------------------------------------------------
 */
define(function(require, exports, module){

    var utils = require('base').utils;
    var enabledVideoUrls = require('./constants').lpEnabledVideoUrls;

    /**
     * [config description]
     * @param $sceDelegateProvider
     * @returns {*}
     */
     // @ngInject
    module.exports = function config($sceDelegateProvider) {
        var urls = utils(enabledVideoUrls)
            .values()
            .map(function(url){
                return url + '**';
            })
            .value()
            .concat('self');

        $sceDelegateProvider.resourceUrlWhitelist(urls);
    };
});
