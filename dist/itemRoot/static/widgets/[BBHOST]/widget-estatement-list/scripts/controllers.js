/**
 * Controllers
 * @module controllers
 */
define(function(require, exports) {

    'use strict';

    var utils = require('base').utils;

    /**
     * MainCtrl description.
     * @ngInject
     */
    exports.MainCtrl = function(lpWidget, lpPortal, lpEstatements, lpUserDetails, $q, $element, $timeout, lpCoreError) {
        var ctrl = this;
        var docsToLoad = 10;
        var EstatementsError = lpCoreError.createException('EstatementsError');

        // Constants
        ctrl.VIEW = {
            'MAIN': 'MAIN',
            'DETAIL': 'DETAIL',
            'NO_RESULTS': 'NO_RESULTS',
            'ERROR': 'ERROR'
        };

        // Loads all the statements
        var fetchEstatements = function() {
            ctrl.estatementsLoading = true;
            var promise = lpEstatements.getAll();
            promise.then(function(estatements) {
                ctrl.estatementList = estatements;
            }, function() {
                lpCoreError.throwException( new EstatementsError('Unable to fetch data.') );
            })
            ['finally'](function() {
                ctrl.estatementsLoading = false;
            });
            return promise;
        };

        var onFetchSuccess = function() {
            var hasEstatements = !!ctrl.estatementList.length;
            var VIEW = ctrl.VIEW;
            ctrl.setCurrentView(hasEstatements ? VIEW.MAIN : VIEW.NO_RESULTS);
        };

        var handleError = function(err) {
            lpCoreError.captureException(err);
            ctrl.setCurrentView(ctrl.VIEW.ERROR);
        };

        var initialize = function() {
            ctrl.initializing = true;
            ctrl.enrolled = null;
            ctrl.estatementList = null;
            ctrl.estatementsLoading = true;
            ctrl.categoryStatements = null;
            ctrl.setCurrentView(ctrl.VIEW.MAIN);

            var endpoint = lpWidget.getResolvedPreference('detailsEndpoint') || (lpPortal.root + '/services/rest/v1/party-data-management/party');
            var userDetailsPromise = lpUserDetails.get(endpoint).then(function(data) {
                ctrl.userName = [data.firstName, data.lastName].join(' ');
            });

            var estatementsPromise = fetchEstatements();

            $q.all([userDetailsPromise, estatementsPromise])
                .then( onFetchSuccess, handleError )
                ['finally'](function() {
                    ctrl.initializing = false;
                });
        };

        var checkLoadedDocs = function() {
            if (ctrl.docs.length === ctrl.categoryStatements.documents.length) {
                ctrl.stopLoadingDocs = true;
            }
        };

        var loadDocuments = function() {
            ctrl.stopLoadingDocs = false;
            ctrl.docs = ctrl.categoryStatements.documents.slice(0, docsToLoad);
            checkLoadedDocs();
        };

        ctrl.reload = function() {
            ctrl.setCurrentView(ctrl.VIEW.MAIN);
            ctrl.initializing = true;

            fetchEstatements()
            .then( onFetchSuccess, handleError )
            ['finally'](function() {
                ctrl.initializing = false;
            });
        };

        /**
         * Checks if `view` is being displayed
         * @param  {String} view Name of the view to check
         * @return {Boolean}
         */
        ctrl.showCurrentView = function(view) {
            return ctrl.currentView === view;
        };

        /**
         * Displays the `view` and hide the current one
         * @param  {String} view Name of the view to display
         */
        ctrl.setCurrentView = function(view) {
            ctrl.currentView = view;
        };

        /**
         * Shows the full list of statements for a certain category
         * @param  {String} categoryName Name of the category
         */
        ctrl.showCategoryStatements = function(categoryName) {
            ctrl.categoryStatements = utils(ctrl.estatementList).findWhere({ name: categoryName });
            loadDocuments();
            ctrl.setCurrentView(ctrl.VIEW.DETAIL);
            // When changing from categories reset the scroll
            $timeout(function() {
                $element.find('.category-detail-body')[0].scrollTop = 0;
            });
        };

        /**
         * Returns a subset of the documents provided
         * @param  {Array} documents List of documents
         * @param  {Number} num       Number of documents to return
         * @return {Array}           List of the first `num` documents
         */
        ctrl.sliceDocuments = function(documents, num) {
            return documents.slice(0, num);
        };

        /**
         * Loads more documents of the selected category
         */
        ctrl.loadMoreDocuments = function() {
            ctrl.docs = ctrl.docs.concat(ctrl.categoryStatements.documents.slice(ctrl.docs.length, ctrl.docs.length + docsToLoad));
            checkLoadedDocs();
        };

        // Bootstrap
        initialize();
    };
});
