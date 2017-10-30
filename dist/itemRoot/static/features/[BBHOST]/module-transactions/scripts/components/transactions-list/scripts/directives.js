/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : directives.js
 *  Description:  Transaction list directive
 *  ----------------------------------------------------------------
 */
define(function (require, exports) {

    'use strict';

    var $ = window.jQuery;
    var angular = require('base').ng;
    var moment = require('moment');

    /**
     * Check if the current browser is ES3 compliant only
     *
     * @returns {boolean}
     */
    function isES3Browser() {
        var es3Browser = false;
        try {
            Object.defineProperty({}, 'x', {});
        } catch (e) { /* this is ES3 Browser */
            es3Browser = true;
        }
        return es3Browser;
    }

    // @ngInject
    exports.lpTransactionsList = function ($timeout, $compile, $templateCache, lpCoreBus, lpCoreUtils, lpCoreTemplate, lpTransactions) {
        var customTemplateSrc = lpTransactions.getConfig('customTemplateSrc'),
            groupTransactionsByDate = lpTransactions.getConfig('groupTransactionsByDate'),
            customTemplateCache = customTemplateSrc && $templateCache.get(customTemplateSrc),
            customTemplatePath = customTemplateSrc && lpCoreTemplate.resolvePath(customTemplateSrc),
            enableVerticalScrollbar = function (element) {
                $timeout(function () {
                    // Handle fixed height with scrollbar
                    var rawElement = element.length ? element[0] : element;
                    var currentHeight = rawElement.offsetHeight;

                    if (currentHeight) {
                        rawElement.style.height = currentHeight + 'px';
                        rawElement.style.overflowY = 'auto';
                    }
                });
            };

        function findTransactionElem(transaction) {
            return $('#transaction-' + transaction.id);
        }

        function findTransactionCategoryElem(transaction) {
            return findTransactionElem(transaction).find('[data-role="transactions-list-item-category"]');
        }

        function linkFn(scope, elem, attrs) {
            /*----------------------------------------------------------------*/
            /* Private methods & variables
             /*----------------------------------------------------------------*/
            var isOldBrowser = isES3Browser(),
                ie8CategoryFull = 160,
                ie8CategoryCollapsed = 9;

            scope.groupTransactionsByDate = groupTransactionsByDate;
            /*----------------------------------------------------------------*/
            /* Watchers
             /*----------------------------------------------------------------*/
            scope.$watch('accounts.selected', function (account) {
                if (account) {
                    scope.transactions
                        .loadTransactions(account)
                        .then(function () {
                            lpCoreBus.publish('widget-transactions:transactions:ready', scope.transactions.transactions);
                            if (scope.showScrollbar) {
                                enableVerticalScrollbar(elem.find('.transactions-list-wrapper'));
                            }
                        });
                }
            });

            scope.isTodayOrYesterday = function (timestamp) {
                var today = moment(new Date().getTime()).startOf('day'),
                    yesterday = moment(today).subtract(1, 'days'),
                    date = moment(parseInt(timestamp, 10)).startOf('day'),
                    result = false;
                if (today.isSame(date)) {
                    scope.todayOrYesterday = 'Today';
                    result = true;
                } else if (yesterday.isSame(date)) {
                    scope.todayOrYesterday = 'Yesterday';
                    result = true;
                }
                return result;
            };

            scope.$on('$destroy', function () {
                // clean up
            });



            /*----------------------------------------------------------------
             /* Public methods & properties
             /*----------------------------------------------------------------*/
            scope.previewAll = false;

            scope.transactionKeydown = function (evt, transaction) {
                if (evt.which === 13 || evt.which === 32) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    scope.loadTransactionDetails(transaction);
                    scope.openDetails(transaction);
                }
            };

            scope.loadTransactionDetails = function (transaction) {
                transaction.isLoading = true;
                scope.transactions.loadTransactionDetails(transaction)
                    .then(function (details) {
                        if (transaction.categoryId) {
                            scope.transactionsCategories.getById(transaction.categoryId).then(function (category) {
                                details.category = category;
                            });
                        }
                    })
                    ['finally'](function () {
                    transaction.isLoading = false;
                });
            };

            scope.loadMoreTransactions = function () {
                scope.transactionsLoading = true;
                if (scope.transactions.loading) {
                    return;
                }
                scope.transactions.loadMoreTransactions().then(function () {
                    scope.transactionsLoading = false;
                });
            };

            scope.updateTransactionCategory = function (transaction, categoryId, similar) {
                var promise;
                if (!similar) {
                    promise = scope.transactions.updateTransactionCategory(transaction, categoryId);
                } else {
                    promise = scope.transactions.updateSimilarTransactionCategory(transaction, categoryId);
                }

                promise.success(function () {
                });
            };

            scope.openDetails = function (transaction, selectedTab) {
                var $transaction = elem.find('#transaction-details-' + transaction.id);

                transaction.showDetails = !transaction.showDetails;

                if (!$transaction.children().size()) {
                    var $details = $(require('../templates/info'));
                    $transaction.append($details);
                    $compile($details)($transaction.scope());
                }

                var setDetailTabValues = function (tabs, selectedDetailTab) {
                    for (var tab in tabs) {
                        if (tabs.hasOwnProperty(selectedDetailTab)) {
                            tabs[tab] = false;
                            if (tab === selectedDetailTab) {
                                tabs[tab] = true;
                            }
                        }
                    }
                };

                if (selectedTab === null || selectedTab === undefined) {
                    selectedTab = 'details';
                }

                if (transaction.showDetails) {
                    $timeout(function () {
                        setDetailTabValues(transaction.detailTabs, selectedTab);
                    }, 0);
                }
                if (selectedTab === 'details') {
                    scope.loadTransactionDetails(transaction);
                }
                scope.closePreview(transaction);

                if (scope.categorySmallLayout && transaction.showDetails) {
                    $('body').animate({
                        scrollTop: $('#transaction-' + transaction.id).offset().top - 5 - (scope.offsetTopCorrection || 0)
                    }, 500);
                }

                // fix for chrome redraw issue
                var transactionTabs = document.getElementById('transactions-tabs');
                if (!scope.showDetails && transactionTabs) {
                    transactionTabs.style.display = 'none';
                    transactionTabs.style.display = 'block';
                }
            };

            scope.selectDetailsTab = function (transaction) {
                scope.loadTransactionDetails(transaction);
            };

            scope.openPreview = function (transaction) {
                transaction.preview = true;
                if (!transaction.showDetails) {
                    if (isOldBrowser) {
                        // support IE8
                        $('#transaction-' + transaction.id + ' .categories').width(ie8CategoryFull);
                    } else {
                        $('#transaction-' + transaction.id).addClass('preview');
                    }
                }
            };

            scope.closePreview = function (transaction) {
                transaction.preview = false;

                if (isOldBrowser) {
                    // support IE8
                    $('#transaction-' + transaction.id + ' .categories').width(ie8CategoryCollapsed);
                } else {
                    $('#transaction-' + transaction.id).removeClass('preview');
                }

                findTransactionElem(transaction)
                    .removeClass('lp-transactions-list-item-head-noanim')
                    .css('padding-left', '');

                findTransactionCategoryElem(transaction).css('width', '');
            };

            scope.categoryClick = function (event, transaction) {
                if (event !== null && event !== undefined) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                scope.openDetails(transaction, 'categories');
            };

            scope.categorySwipeStart = function swipeStart(event, transaction) {
                findTransactionElem(transaction).addClass('lp-transactions-list-item-head-noanim');
            };

            scope.categorySwipe = function swipe(event, transaction) {
                var $category = findTransactionCategoryElem(transaction);
                var width = Math.max(event.deltaX, 0);
                var calculatedWidth;

                $category.width(width);
                calculatedWidth = $category.width();

                findTransactionElem(transaction).css('padding-left', calculatedWidth);
            };

            scope.categorySwipeEnd = function swipeEnd(event, transaction) {
                scope.closePreview(transaction);
            };

            // Service is returning Array[0] when empty
            // so we have to check for that
            var parseTransactionAttribute = function (attribute) {
                if (lpCoreUtils.isString(attribute)) {
                    return lpCoreUtils.trim(attribute);
                } else if (lpCoreUtils.isArray(attribute) && !attribute.length) {
                    return '';
                }

                return attribute || '';
            };

            scope.getTransactionDescription = function (transaction) {
                var counterpartyName = parseTransactionAttribute(transaction.counterpartyName);
                var description = parseTransactionAttribute(transaction.transactionDescription);
                var type = parseTransactionAttribute(transaction.transactionType);

                return counterpartyName || description || type;
            };

            scope.getTransactionSubDescription = function (transaction) {
                var accountName = parseTransactionAttribute(transaction.accountName);
                var counterpartyName = parseTransactionAttribute(transaction.counterpartyName);
                var description = parseTransactionAttribute(transaction.transactionDescription);
                var transactionType = parseTransactionAttribute(transaction.transactionType);

                if (accountName) {
                    return accountName;
                } else if (counterpartyName || description) {
                    return transactionType;
                } else {
                    return '';
                }
            };

            scope.toggleCategoryView = function () {
                lpCoreUtils.safeApply(scope, function() {
                    scope.previewAll = !scope.previewAll;
                });
            };

            lpCoreBus.subscribe('launchpad-retail.module-transactions.toggleCategoryView', scope.toggleCategoryView);

        }

        /**
         * Compile function
         * @param  {object} el    angular dom el object
         * @param  {object} attrs el attributes
         * @return {function}       link controller function
         */
        function compileFn(elem, attrs) {
            return linkFn;
        }

        // Directive configuration
        return {
            scope: {
                accounts: '=lpAccounts',
                transactions: '=lpTransactions',
                transactionsCategories: '=lpTransactionsCategories',
                categoryLayout: '=',
                showCategories: '=',
                showTransactionIcons: '=',
                showDatesAllTransactions: '=',
                hideDetailsPreference: '=',
                offsetTopCorrection: '=?',
                showScrollbar: '='
            },
            restrict: 'AE',
            compile: compileFn,
            templateUrl: !customTemplateCache && customTemplatePath,
            template: customTemplateCache || (!customTemplateSrc && require('../templates/list'))
        };
    };

    // @ngInject
    exports.lpTransactionsListDetails = function ($templateCache, $timeout, lpCoreUtils) {
        function linkFn(scope, elem, attrs) {
        }

        function compileFn(elem, attrs) {
            return linkFn;
        }

        return {
            restrict: 'AE',
            scope: {
                transaction: '=',
                categories: '=',
                isLoading: '='
            },
            compile: compileFn,
            template: require('../templates/details')
        };
    };

    // @ngInject
    exports.lpStickyTitle = function ($timeout, lpCoreBus) {
        function linkFn(scope, element, attrs) {
            var $sticky;
            var onScrolling;
            var outerHeight;

            scope.isSpecialDate = function () {
                return scope.isTodayOrYesterday({bookingDateTime: scope.transaction.bookingDateTime});
            };

            onScrolling = function () {
                var stickies = document.querySelectorAll('.followMeBar');
                for(var i = 0, len = stickies.length; i < len; i++) {
                    var domSticky = stickies[i];
                    var next = i + 1;
                    var prev = i - 1;
                    var $thisSticky = angular.element(domSticky);
                    var scrollTop = window.scrollY;
                    var stickyPosition = parseInt(domSticky.getAttribute('data-original-position'), 10);
                    var originalHeight = parseInt(domSticky.getAttribute('data-original-height'), 10);

                    var domNextSticky;
                    var nextStickyPosition;

                    domNextSticky = stickies[next];

                    var domPrevSticky;
                    var $prevSticky;

                    domPrevSticky = stickies[prev];
                    $prevSticky = angular.element(domPrevSticky);

                    if (isNaN(stickyPosition)) {
                        stickyPosition = $(domSticky).offset().top;
                    }
                    if (isNaN(originalHeight)) {
                        originalHeight = $(domSticky).outerHeight();
                    }

                    if (stickyPosition <= scrollTop) {
                        $thisSticky.addClass('fixed');
                        if(domNextSticky) {
                            nextStickyPosition = parseInt(domNextSticky.getAttribute('data-original-position'), 10) - originalHeight;

                            if (stickyPosition >= nextStickyPosition) {

                                $thisSticky.addClass('absolute').css('top', nextStickyPosition + 'px');
                            }
                        }
                    } else {
                        $thisSticky.removeClass('fixed');
                        if(domPrevSticky) {

                            if (scrollTop <= stickyPosition - originalHeight) {

                                $prevSticky.removeClass('absolute').css('top', parseInt(domNextSticky.getAttribute('data-original-position'), 10) + 'px');
                            }
                        }
                    }
                }
            };

            $sticky = element.find('.followMeBar').wrap('<div class="followWrap"/>');
            var domSticky = $sticky[0];

            $timeout(function () {
                outerHeight = $(domSticky).outerHeight();

                domSticky.setAttribute('data-original-position', $(domSticky).offset().top);
                domSticky.setAttribute('data-original-height', outerHeight);
                domSticky.parentNode.style.height = outerHeight + 'px';
            }, 100);

            angular.element(window).off('touchmove.stickies, touchend.stickies, scroll.stickies').on('touchmove.stickies, touchend.stickies, scroll.stickies', function () {
                onScrolling();
            });
        }

        function compileFn(elem, attrs) {
            return linkFn;
        }

        return {
            restrict: 'AE',
            priority: 400,
            scope: {
                transaction: '=',
                todayOrYesterday: '=',
                isTodayOrYesterday: '&'
            },
            compile: compileFn,
            template: function () {
                return '' +
                    '<div class="header followMeBar">' +
                    '<span ng-if="isSpecialDate()">{{todayOrYesterday}}, </span>' +
                    '<span itemprop="dateTimeMonth">{{transaction.bookingDateTime | date:\'MMM\'}}</span> ' +
                    '<span itemprop="dateTimeDate">{{transaction.bookingDateTime | date:\'dd\'}}</span>' +
                    '</div>';
            }
        };
    };
});
