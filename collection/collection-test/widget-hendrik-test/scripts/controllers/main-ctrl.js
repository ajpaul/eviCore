/**
 * Controllers
 * @module controllers
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(model, lpWidget, lpCoreUtils) {
        this.state = model.getState();
        this.utils = lpCoreUtils;
        this.widget = lpWidget;
        var ctrl = this;
    }

    MainCtrl.prototype.btnClick = function() {
        window.gadgets.pubsub.publish('hendrik.events.loadContainer');         
    }

    MainCtrl.prototype.$onInit = function() {
        // Do initialization here
        var ctrl = this;
    };

    module.exports = MainCtrl;
});
