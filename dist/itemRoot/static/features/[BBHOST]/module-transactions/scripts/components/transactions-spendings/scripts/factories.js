define(function(require, exports, module) {
    'use strict';

    function factory(endpointSrc, cfg){

        // @ngInject
        var fn = function($resource, lpTransactions) {
            var endpoint = lpTransactions.getEndpoint(endpointSrc);
            return $resource(endpoint, null, cfg);
        };
        return fn;
    }


    exports.CategorySpendingsResource = factory('categorySpendingEndpoint', {
        'get': {method: 'GET'}
    });

    exports.CategoriesResource = factory('categoriesEndpoint', {
        'get': {method: 'GET', isArray: true}
    });

});
