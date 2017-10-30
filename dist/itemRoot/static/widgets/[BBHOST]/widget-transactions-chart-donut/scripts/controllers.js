/**
 * Transactions Donut Chart controller
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function(lpCoreBus, lpWidget, $timeout, lpCoreUtils, lpAccountsModel) {

        var ctrl = this;
        ctrl.accountsModel = lpAccountsModel.model;

        // listen on hidden panel activation and reactivate svg chart
        // TODO: update deck container to set a perspective on widget instead

        var subscribe = function(panelCont){
            var deckCont = panelCont.parentNode;
            lpCoreBus.subscribe(deckCont.model.name + '-DeckPanelLoaded', function(panelName){
                if (panelCont.model.name === panelName) {
                    // this passing selected accountId to the lpCategoriesSpendings directive
                    // TODO: directive should not listen to global pubsub events but only on the attribute values changes
                    lpCoreBus.publish('launchpad-retail.accountSelected', {
                        accountId: ctrl.accountsModel.selectedId
                    });
                }
            });
        };

        // test recursively if widget is inside panel
        (function isInsidePanel(el){
            var parent = el.parentNode;
            if(parent && parent.nodeName === 'PanelContainer' && parent.parentNode){
                subscribe(parent);
            }
            return parent ? isInsidePanel(parent) : false;
        })(lpWidget);


        var applyModel = function(model) {
            if (model && model.selected && model.selected.id) {
                // trigger angular to refresh
                $timeout(function() {
                    ctrl.accountsModel = model;
                });
            }
        };

        var selectAccount = function(data){
            var model = lpAccountsModel.onAccountSelected(data);
            applyModel(model);
        };

        lpCoreBus.subscribe('launchpad-retail.accountSelected', selectAccount);
        lpCoreBus.subscribe('launchpad-retail.cardSelected', selectAccount);

        lpAccountsModel.load().then(function(model){
            applyModel(model);

            // this passing accounts to the lpCategoriesSpendings directive
            // TODO: directive should not listen to global pubsub events but only on the attribute values changes
            lpCoreBus.publish('lpAccounts.loaded', model.accounts);
        });

        ctrl.donut = {
            options: {
                animation: lpWidget.getPreference('animation'),
                animationDirection: lpWidget.getPreference('animation-direction')
            }
        };
    };
});
