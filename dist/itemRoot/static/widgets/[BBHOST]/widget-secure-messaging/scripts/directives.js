/**
 * Factories
 * @module factories
 */
define(function(require, exports) {

    'use strict';

    var Hammer = require('hammerjs');
    var $ = window.jQuery;
    var closeMessageIfSelected = function(message, scope) {
        if (scope.shared && scope.shared.selectedThread !== null &&
            message.id === scope.shared.selectedThread.id) {

            scope.shared.selectedThread = null;
        }
    };
    var quickDeleteThread = function(item, SharedData, scope, AlertsManager) {
        if (item.status === 'DRAFT') {
            scope.$parent.deleteDraft(item);
        } else {
            item.$remove().then(
                function(success) {
                    closeMessageIfSelected(item, scope);
                    switch (item.status) {
                        case 'ARCHIVED':
                            SharedData.removeFromList(SharedData.threads.archived, item);
                            break;
                        case 'SENT':
                            SharedData.removeFromList(SharedData.threads.sent, item);
                            break;
                        default:
                            if (item.containsUnread) {
                                SharedData.removeFromList(SharedData.threads.unread, item);
                            } else {
                                SharedData.removeFromList(SharedData.threads.read, item);
                            }
                    }
                    scope.$emit('refresh', true);
                },
                function(error) {
                    AlertsManager.push('DELETE_ERROR', 'danger', false);
                }
            );

        }
    };

    /* Message list display directive */
    // @ngInject
    exports.messageList = function($rootScope, SharedData, AlertsManager, lpWidget, lpCoreUtils, lpDefaultProfileImage) {
        var templatesDir = lpCoreUtils.getWidgetBaseUrl(lpWidget) + '/templates';

        return {
            restrict: 'E',
            scope: { title: '@', items: '=' },
            replace: true,
            templateUrl: templatesDir + '/message-list.html',
            link: function(scope, elem, attrs) {

                var decodePhotoUrl = function(photoUrl) {
                    return photoUrl ? decodeURIComponent(photoUrl) : lpDefaultProfileImage();
                };

                scope.showList = true;
                scope.shared = SharedData;
                scope.expandView = false;

                scope.toggleVisibility = function() {
                    scope.showList = !scope.showList;
                };

                scope.picture = function(url) {
                    return decodePhotoUrl(url);
                };

                scope.select = function(thread, event) {
                    event.stopPropagation();
                    return scope.$parent.selectThreadAction(thread);
                };

                scope.expanded = function() {
                    return scope.$parent.showSideContent();
                };

                scope.expand = function(index) {
                    scope.index = scope.index === index ? -1 : index;
                };

                scope.selectedItem = function() {
                    return scope.shared.selectedThread;
                };

                scope.quickReply = function(thread, event) {
                    event.stopPropagation();
                    if (scope.shared.selectedThread === null || scope.shared.selectedThread.id !== thread.id) {
                        scope.$parent.selectThreadAction(thread).promise.then(function(){
                            $rootScope.$broadcast('initiateReply');
                        });
                    } else {
                        $rootScope.$broadcast('initiateReply');
                    }
                };
                scope.quickDelete = function(item) {
                    quickDeleteThread(item, SharedData, scope, AlertsManager);
                };
                scope.quickArchive = function(item) {
                    item.$archive().then(
                        function(success) {
                            item.status = 'ARCHIVED';
                            if (item.containsUnread){
                                SharedData.removeFromList(SharedData.threads.unread, item);
                            } else {
                                SharedData.removeFromList(SharedData.threads.read, item);
                            }
                            SharedData.addToList(SharedData.threads.archived, item);
                        }
                    );
                };
            }
        };
    };

    /* Message content display directive */
    // @ngInject
    exports.messageContent = function($timeout, AlertsManager, Letter, lpWidget, lpCoreUtils, SharedData) {
        var templatesDir = lpCoreUtils.getWidgetBaseUrl(lpWidget) + '/templates';

        return {
            restrict: 'E',
            scope: { thread: '=' },
            replace: true,
            templateUrl: templatesDir + '/message-content.html',
            link: function(scope, elem, attrs) {

                scope.replySaveInProgressInd = false; // Used to display 'Saving..' text for user
                var replySaveTimeoutId = null;

                scope.$on('initiateReply', function() {
                    scope.openReplyAction();
                });

                scope.toggleMessageVisibility = function(message) {
                    if (!message.isLastInThread) {
                        message.show = !message.show;
                    }
                };

                /*
                 * UI Action to initiate Reply to message
                 */
                scope.openReplyAction = function() {
                    if (scope.thread.draft === null) {
                        scope.thread.draft = Letter.create();
                        scope.thread.draft.threadId = scope.thread.id;
                    }
                    setTimeout(function(){
                        $('#replyMessageFormBody').focus();
                        $('#replyMessageFormBody').on('input propertychange', function() {
                            if (scope.thread.draft !== null) {
                                clearTimeout(replySaveTimeoutId);
                                replySaveTimeoutId = setTimeout(function() {
                                    scope.saveReplyAction(scope.thread.draft);
                                }, scope.$parent.MSG_AUTOSAVE_TIMEOUT);
                            }
                        });
                    }, scope.$parent.MSG_AUTOSAVE_TIMEOUT);
                };
                scope.quickDelete = function(item) {
                     quickDeleteThread(item, SharedData, scope, AlertsManager);
                     scope.close();
                     scope.$emit('refresh', true);
                };
                /*
                 * Cancel Reply UI Action
                 * @param element - HTML element with reply form to clear validations
                 */
                scope.cancelReplyAction = function(element) {
                    if (scope.thread.draft !== null) {
                        scope.thread.draft.$remove();
                        scope.clearReplyAction(element);
                    }
                };
                /*
                 * Clear Reply Action, clears reply forms validation
                 * @param element - HTML element with reply form to clear validations
                 */
                scope.clearReplyAction = function(element) {
                    scope.thread.draft = null;
                    element.replyMessageForm.$setPristine();
                    element.replyMessageForm.submitted = false;
                };
                /*
                 * Save Reply UI Action
                 * @param letter - letter which should be send
                 */
                scope.saveReplyAction = function(letter) {
                    scope.replySaveInProgressInd = true;
                    letter.$respond().then(
                        function (success) {
                            // Add deplay for better user experience
                            $timeout(function() { scope.replySaveInProgressInd = false; }, scope.$parent.MSG_AUTOSAVE_TIMEOUT);
                        }
                    );
                };
                /*
                 * Send Reply UI Action
                 * @param letter - letter which should be send
                 */
                scope.sendReplyAction = function(letter) {
                    letter.timestamp = new Date();
                    letter.$respond().then(
                        function (success) {
                            letter.$send().then(
                                function(vSuccess) {
                                    AlertsManager.push('SEND_SUCCESSFULLY', 'success', true);
                                },
                                function(error) {
                                    AlertsManager.push('SEND_ERROR', 'danger', false);
                                }
                            );
                        },
                        function(error) {
                            AlertsManager.push('SEND_ERROR', 'danger', false);
                        }
                    );
                    this.clearReplyAction(this); // Clear reply
                    this.close(); // Close opened thread
                };
                /*
                 * Closes thread review
                 */
                scope.close = function() {
                    scope.thread = null;
                };
            }
        };
    };

    /* Directive to support touch swipe event */
    // @ngInject
    exports.swipe = function() {
        return {
            restrict: 'A',
            scope: {},
            replace: true,
            link: function(scope, elem, attrs) {
                var hammer = new Hammer(elem[0]);
                hammer.on('panleft', function(ev) { //2.0 removed use different
                    $(this).toggleClass('swipe-on');
                });
            }
        };
    };
});
