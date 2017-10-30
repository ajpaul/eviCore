define(function (require, exports, module) {
    'use strict';

    var views = [
        {id: 'assetAllocations', name: 'Assets Allocation', type: 'treemap'},
        {id: 'geographicalAllocations', name: 'Geographical Allocation', type: 'treemap'},
        {id: 'combinedAllocations', name: 'Combined Assets and Geographical', type: 'treemap'},
        {id: 'equitySectors', name: 'Equity Sectors', type: 'treemap'},
        {id: 'bonds', name: 'Bonds Details', type: 'barchart'}
    ];

    // @ngInject
    exports.AggregatedCtrl = function (aggregatedModel, lpCoreBus) {
        var ctrl = this;

        function renderComponent(data) {
            ctrl.loading = false;
            ctrl.views = views;
            ctrl.current = views[0];
            ctrl.data = data;
        }

        ctrl.set = function (view) {
            ctrl.current = view;
        };

        lpCoreBus.subscribe('launchpad-retail.portfolioSelected', function (ptf) {
            ctrl.loading = true;
            aggregatedModel.getData(ptf.id).then(renderComponent);
        });
    };
});
