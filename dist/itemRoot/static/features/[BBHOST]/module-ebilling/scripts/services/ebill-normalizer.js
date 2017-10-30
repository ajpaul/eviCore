define( function (require, exports, module) {
    'use strict';

    module.exports = function(data) {
        if (!data) { return {}; }

        // Response returns bool as string, remove once BE fixed
        data.furtherActionNeeded = data.furtherActionNeeded === 'true';

        if (!data.furtherActionNeeded) { return data; } // Setup finished

        if (!data.nextAction) { // Response not ready, keep checking
            data.checkStatus = true;
            return data;
        }

        if (data.nextAction.credentialsParams) {
            data.credentialsParams = data.nextAction.credentialsParams;
            data.credentialsParams.forEach(function(entry) {
                entry.inputFieldType = entry.masked ? 'PASSWORD' : 'TEXT';
            });
        }
        return data;
    };
});
