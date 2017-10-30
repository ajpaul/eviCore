/**
 * Topics Service
 * @module topics-service
 */
define(function(require, exports) {
    'use strict';
    var base = require('base');

    /* Provides the list of message topics */
    // @ngInject
    exports.Topics = function() {

        return {
           loadDefault: function(availableRecipients) {
                // Real call NYI implemented in demo service.
                return base.fetch('real/api/to/demo-service').then(function(response) {
                        return response.data.topics;
                }, function handleError() {
                    var topics = require('./defaultTopics');

                    // Append recipient address;
                    topics.forEach(function(topic){
                        topic.recipient = availableRecipients[topic.recipient];
                    });

                    return topics;
                });
            }
        };
    };
});
