/**
 * Factories
 * @module factories
 */
define(function(require, exports) {

    'use strict';

    var $ = window.jQuery;

    /* Main view controller */
    // @ngInject
    exports.MessageController = function($scope, $q, lpWidget, SharedData, AlertsManager, Thread, Letter, Message, lpDefaultProfileImage, lpCoreUtils) {
        $scope.templatesDir = lpCoreUtils.getWidgetBaseUrl(lpWidget) + '/templates/'; // Used for template includes
        $scope.alerts = AlertsManager; // Takes care of alert notifications
        $scope.shared = SharedData; // Common data is stored here etc
        $scope.categories = lpWidget.getPreference('categoryList').split(','); // Fetch available categories
        $scope.MSG_AUTOSAVE_TIMEOUT = 500;
        $scope.tabs = { inbox: {}, sent: {}, archive: {} };
        $scope.modalShown = false;

        /*
         * Loads active (read/unread) threads
         * @param showLoadingIndicator - flag used to indicate if system should show loading indicator in the UI
         */
        $scope.loadThreads = function(showLoadingIndicator) {
            var tmpUnread = [], tmpRead = [];
            if (showLoadingIndicator) {
                SharedData.loading = true;
            }
            $q.all({
                    // Load threads
                    active: Thread.queryActive({}, function(data){
                            lpCoreUtils.forEach(data, function(message) {
                                var senderName = SharedData.resolveDisplayName(message.otherUser);
                                var subject = message.subject.split(' - ')[1];
                                message.senderName = senderName;
                                if (!lpCoreUtils.isUndefined(subject)) {
                                    message.subject = subject;
                                }
                                // Generate thread logo
                                message.logoPath = lpDefaultProfileImage(senderName, 55, 55);
                                if (message.containsUnread) { // Check if message is READ or UNREAD
                                    tmpUnread.push(message);
                                } else {
                                    tmpRead.push(message);
                                }
                            });
                            var threads = SharedData.threads;
                            threads.active = tmpUnread.concat(tmpRead);
                            threads.unread = tmpUnread;
                            threads.read = tmpRead;
                    }).$promise,

                    // Load archived threads
                    archived: Thread.queryArchived({}, function(data) {
                            $.each(data, function() {
                                var senderName = SharedData.resolveDisplayName(this.otherUser);
                                this.senderName = senderName;
                                this.logoPath = lpDefaultProfileImage(senderName, 55, 55);
                                this.status = 'ARCHIVED';
                            });
                            SharedData.threads.archived = data;
                    }).$promise,

                    // Load archived threads
                    sent: Thread.querySent({}, function(data) {
                            $.each(data, function() {
                                var senderName = SharedData.resolveDisplayName(this.otherUser);
                                var subject = this.subject.split(' - ')[1]; //show only second part of the subject
                                this.senderName = senderName;
                                this.logoPath = lpDefaultProfileImage(senderName, 55, 55);
                                this.status = 'SENT';
                                if (!lpCoreUtils.isUndefined(subject)) {
                                    this.subject = subject;
                                }
                            });
                            SharedData.threads.sent = data;
                    }).$promise,

                    // Load drafts
                    drafts: Letter.query({}, function(data) {
                            $.each(data, function() {
                                var subject = this.subject && this.subject.split(' - ')[1];
                                if (!lpCoreUtils.isUndefined(subject)) {
                                    this.subject = subject;
                                }
                                this.status = 'DRAFT';
                                this.timestamp = this.updatedDate; //since Thread & Letter has different date fields
                            });
                            SharedData.draftLetters = data;
                            if (data.length > 0) {
                                $scope.modalShown = true;
                            }
                    }).$promise
            }).then(function(result) {
                SharedData.loading = false;
            }, function(error) {
                SharedData.loading = false;
                AlertsManager.push('SERVICE_UNAVAILABLE', 'danger', false);
            });
        };

        /* UI Action to open message for review */
        // TODO: Move to message-list directive
        $scope.selectThreadAction = function(thread) {
             // create a deferred object
            var returnObj = $q.defer();

            // Close if clicked on selected message
            if ($scope.shared.selectedThread !== null) {
                if ($scope.shared.selectedThread.id === thread.id) {
                    $scope.closeContentAction();
                    returnObj.resolve();
                    return returnObj;
                }
            }

            // Edit thread if Draft
            if (thread.status === 'DRAFT') {
                $scope.closeModal();
                $scope.createEditLetterAction($.extend({}, thread));
                returnObj.resolve();
            } else {
                // Select thread
                $scope.shared.selectedThread = thread;
                $scope.isThreadLoading = true;

                // Load thread content
                Thread.messages({threadId: thread.id}).$promise.then(
                    function(data){
                        $scope.shared.selectedThread.messages = [];

                        $.each(data, function(index, value) {
                            var message = new Message(value);
                            // Generate message logo
                            message.logoPath = lpDefaultProfileImage(SharedData.resolveDisplayName(message.sender), 55, 55);

                            // Generate message sender display name
                            // Resolve other party name
                            message.senderName = $scope.shared.resolveDisplayName(message.sender);

                            // Mark unread message as read
                            if (message.status === 'UNREAD') {
                                message.show = true; // Mark unread messages to showup as expanded
                                message.$markAsRead({threadId: $scope.shared.selectedThread.id}); // Mark message as Read
                            }

                            // Store last thread message id. Needed for Reply functionality
                            if ((index + 1) === data.length) {
                                $scope.shared.selectedThread.lastMessageIdInThread = message.id;  // Mark last message in the thread
                            }
                            $scope.shared.selectedThread.messages.push(message);
                        });
                        $scope.isThreadLoading = false; // Thread loading finished
                    }
                );
                // Load thread draft
                Thread.letters({threadId: thread.id}).$promise.then(
                    function(data) {
                        $scope.shared.selectedThread.draft = null;
                        if (data.length > 0) {
                            $scope.shared.selectedThread.draft = new Letter(data[0]);
                            $scope.shared.selectedThread.draft.threadId = $scope.shared.selectedThread.id;
                        }
                        returnObj.resolve();
                    }
                );
            }
            // Scroll to the top of the window
            window.scrollTo(0, 0);
            return returnObj;
        };

        $scope.deleteDraft = function(item) {
            if (item.status === 'DRAFT') {
                item.$remove().then(
                    function() {
                        SharedData.removeFromList(SharedData.draftLetters, item);
                    },
                    function() {
                        AlertsManager.push('DELETE_ERROR', 'danger', false);
                    }
                );

                $scope.modalShown = false;
            }
        };

        /* UI Action to close message review */
        $scope.closeContentAction = function() {
            $scope.shared.selectedThread = null;
        };

        /*
         * UI Action to create or edit (draft) letter
         * @param letter - if provided Edit action will be triggered
         */
        $scope.createEditLetterAction = function(letter) {
            if (letter !== null && letter !== undefined) {
                $scope.shared.editLetter = letter;
            }
            $scope.shared.editLetterInd = true;
            // Close any opened item
            $scope.closeContentAction();
            // Switch to Inbox tab
            $scope.tabs['inbox'].active = true;
        };

        $scope.showSideContent = function() {
            return $scope.shared.selectedThread !== null || $scope.shared.editLetterInd;
        };

        $scope.tabSelected = function() {
            SharedData.selectedThread = null;
        };

        $scope.closeModal = function() {
            $scope.modalShown = false;
        };

        //On initial load we want to show loading indicator
        $scope.loadThreads(true);
        $scope.$on('refresh', $scope.loadThreads);
    };

    /* New letter creation container */
    // @ngInject
    exports.CreateLetterController = function($rootScope, $scope, $resource, SharedData, AlertsManager, lpWidget, Thread, Letter, lpCoreUtils, Topics) {
        var util = lpCoreUtils;

        $scope.shared = SharedData;
        $scope.alertsManager = AlertsManager;
        $scope.availableRecipients = [];
        var endpoint = util.resolvePortalPlaceholders(lpWidget.getPreference('recipientsSrc'));
        $resource(endpoint).get().$promise.then(
            function(data){
                $.each(data.addresses, function(index, value) {
                    var recipient = { address: value };
                    recipient.name = $scope.shared.resolveDisplayName(value);
                    $scope.availableRecipients.push(recipient);
                });

                if($scope.availableRecipients && $scope.availableRecipients.length > 0) {
                    Topics.loadDefault($scope.availableRecipients).then(function(topics){
                        $scope.subjects = topics || [];
                        $scope.$apply();
                    });
                }
            }
        );

        // Create or Edit
        if ($scope.shared.editLetter !== null) {
            $scope.letter = $scope.shared.editLetter;
        } else {
            $scope.letter = Letter.create();
        }

        /*
         * Pre-send message modifications
         * @param letter - message to modify
         */
        var prepareMessage = function (letter) {
            var selectedQuestion = $scope.selectedQuestion;
            if(selectedQuestion) {
                if (typeof selectedQuestion.recipient === 'string') {
                    letter.recipients = [selectedQuestion.recipient];
                }
                letter.subject = selectedQuestion.preQuestion + ' - ' + selectedQuestion.question;
                letter.category = selectedQuestion.category;
            }
            letter.timestamp = new Date();
            letter.status = 'DRAFT';
        };

        /*
        * Send message ui-action
        * @param message - message to send
        * @param element - form element to reset afterwards
        */
        $scope.save = function(letter, element) {
            prepareMessage(letter);
            letter.$save().then(
                function(success) {
                    SharedData.addToList(SharedData.draftLetters, letter);
                    AlertsManager.push('SAVE_SUCCESSFULLY', 'success', true);
                },
                function(error) {
                    AlertsManager.push('SAVE_ERROR', 'danger', false);
                });
            $scope.close(element);
        };

        /*
        * Send message ui-action
        * @param message - message to send
        * @param element - form element to reset afterwards
        */
        $scope.send = function(letter, element) {
            prepareMessage(letter);
            letter.$save().then(
                function() {
                    letter.$send().then(
                        function(success) {
                            var sentThread = new Thread(letter);
                            sentThread.status = 'SENT';
                            sentThread.id = success.threadId;

                            SharedData.addToList(SharedData.threads.sent, sentThread);
                            SharedData.removeFromList(SharedData.draftLetters, letter);

                            AlertsManager.push('SEND_SUCCESSFULLY', 'success', true);
                            $rootScope.$broadcast('refresh', false);
                        },
                        function(error) {
                            AlertsManager.push('SEND_ERROR', 'danger', false);
                        }
                    );
                });
            $scope.close(element);
        };

        /*
        * Cancel message ui-action.
        * Initiates cancellation of message creation
        * @param element - form element to reset afterwards
        */
        $scope.close = function(element) {
            $scope.shared.editLetterInd = false;
            $scope.shared.editLetter = null;
            element.newMessageForm.$setPristine();
            element.newMessageForm.submitted = false;
        };
    };
});
