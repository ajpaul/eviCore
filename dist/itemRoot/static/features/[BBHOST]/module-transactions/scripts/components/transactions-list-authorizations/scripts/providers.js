/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : providers.js
 *  Description: Retrieves a list of card transactions under authorization
 *  ----------------------------------------------------------------
 */
define(function (require, exports, module) {

    'use strict';

    // @ngInject
    exports.lpTransactionsAuth = function() {

        // @ngInject
        this.$get = function($http, lpCoreUtils, lpCoreError, $q, lpTransactions) {

            var config = {
                pageSize: 20,
                from: 1,
                sort: '-bookingDateTime'
            };
            var utils = lpCoreUtils;

            function API() {

                var TransactionsAuthModel = function() {
                    this.from = config.from;
                    this.sort = config.sort;
                    this.transactions = [];
                    this.account = null;
                    this.errorCode = null;
                };

                /**
                 * Clears list of transactions and resets from counter
                 */
                TransactionsAuthModel.prototype.clearTransactionsAuthList = function() {
                    this.transactions = [];
                    this.moreAvailable = true;
                    this.from = config.from;
                    return this;
                };

                /**
                 * Loads a new set of transactions for the given account
                 * @param account
                 */
                TransactionsAuthModel.prototype.loadTransactionsAuth = function(account) {
                    this.clearTransactionsAuthList();
                    this.account = account;
                    return this.loadMoreTransactionsAuth();
                };

                // TODO: add pre-processing (if needed)
                TransactionsAuthModel.prototype.preprocessTransactions = function(list) {
                    // validate collection
                    if (utils.isArray(list)) {
                        utils.forEach(list, function (item, index) {
                            var t;

                            // handle ID property
                            if (!item.id) {
                                list[index].id = utils.uniqueId();
                            }

                            // handle category ID property
                            if (!item.categoryId) {
                                list[index].categoryId = '1';
                            }

                            // handle Debit property
                            if (!item.creditDebitIndicator || item.creditDebitIndicator === 'DBIT') {
                                list[index].creditDebitIndicator = 'DBIT';
                                item.amount *= -1;
                            }

                            // handle date property
                            if (item.dateTime) {
                                // To comply standard in a strict way --> FF can't parse yyyy-mm-dd,
                                t = item.dateTime.replace(/-/g, '/');
                                list[index].dateTime = Date.parse(t);
                            }

                        });
                    }

                    return list;
                };

                /**
                 * Load transactions
                 * @param account (pass account only for first load)
                 */
                TransactionsAuthModel.prototype.loadMoreTransactionsAuth = function() {

                    var self = this;

                    if(!this.account) {
                        lpCoreError.throwException(new Error('Auth list: No account specified'));
                    }
                    var accountHoldsEndpoint = lpTransactions.getConfig('accountHoldsEndpoint');
                    if(!accountHoldsEndpoint){
                        // accountHolds endpoint is not specified
                        return $q.when([]);
                    }

                    var queryParams = {
                        f: this.from,
                        l: config.pageSize
                    };

                    this.loading = true;

                    //the minus here means descending order
                    queryParams.sort = this.sort;

                    //update paging info
                    this.from = this.from + config.pageSize;

                    return $http.get(accountHoldsEndpoint, {
                        data: {
                            accountIds: this.account.ids || this.account.id || ''
                        },
                        params: queryParams
                    })
                    .success(function(data) {
                        self.errorCode = null;

                        //need to normalize null data to empty array
                        if(data === null || data === 'null') {
                            data = [];
                        }
                        self.transactions = self.preprocessTransactions(data);

                        return self.transactions;
                    })
                    .error(function(data) {
                        self.errorCode = data.errorCode || 500;

                        return data;
                    })
                    ['finally'](function() {
                        self.loading = false;
                    });
                };

                /**
                 * Checks for errors during download and ensures that no transactions have been loaded
                 * @returns {boolean}
                 */
                TransactionsAuthModel.prototype.noTransactionsAuthFound = function() {
                    return (!this.loading && this.transactions.length === 0) && !this.errorCode;
                };

                return new TransactionsAuthModel();
            }

            return {
                api: API
            };
        };
    };
});
