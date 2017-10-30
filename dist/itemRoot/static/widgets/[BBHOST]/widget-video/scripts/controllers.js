/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl($scope, lpWidget, lpCoreBus, lpCoreError, lpUIResponsive, lpEnabledVideoUrls) {
        this.$scope = $scope;
        this.widget = lpWidget;
        this.error = lpCoreError;
        this.bus = lpCoreBus;
        this.responsive = lpUIResponsive;
        this.enabledVideoUrls = lpEnabledVideoUrls;

        this.init();
    }

    /**
     * Configure Responsive and start rendering
     */
    MainCtrl.prototype.init = function () {
        var render = function () {
            this.showError = false;

            this.updateUrl();
            this.updateHeight();

            if (!this.$scope.$$phase) {
                this.$scope.$digest();
            }
        }.bind(this);

        this.widget.addEventListener('preferencesSaved', render);
        this.responsive
            .enable(this.widget.body)
            .rule({
                any: render
            });

        // test if widget is inside panel, LPMAINT-148
        var el = this.widget.body.parentNode;
        while (el) {
            var elementController = el.viewController;
            if (elementController && elementController.nodeName === 'PanelContainer' && elementController.parentNode) {
                this.bus.subscribe(elementController.parentNode.model.name + '-DeckPanelLoaded', function (panelName) {
                    if (this.model.name === panelName) {
                        render();
                    }
                }.bind(elementController));
            }

            el = el.parentNode;
        }

        render();
    };

    MainCtrl.prototype.throwException = function (error) {
        this.showError = error;
        this.error.throwExceptionAsync(error);
    };

    /**
     * Update iFrame height to provide responsiveness
     */
    MainCtrl.prototype.updateHeight = function () {
        var height = parseInt(this.widget.getPreference('height'), 10),
            width = parseInt(this.widget.getPreference('width'), 10),
            ratio = height / width;

        if (!height || !width || isNaN(ratio)) {
            this.throwException('Height or Width is zero, undefined on NaN!');
        }

        this.height = Math.round(this.widget.getWidth() * ratio);
    };

    /**
     * Get iFrame URL
     * @returns {string}
     */
    MainCtrl.prototype.updateUrl = function () {
        var source = this.widget.getPreference('source'),
            videoSrc = this.enabledVideoUrls[source],
            videoId = this.widget.getPreference('videoId');

        if (!videoId) {
            this.throwException('videoId is undefined!');
        } else if (!videoSrc) {
            this.throwException('Source is undefined or doesn\'t have a handler!');
        }

        return this.url = videoSrc + videoId;
    };

    /**
     * Export Controllers
     */
    exports.MainCtrl = MainCtrl;
});