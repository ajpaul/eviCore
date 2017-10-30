define(function(require, exports, module) {
    'use strict';

    /**
     * Services
     * @param  {DI services list}
     * @return {object}
     * @ngInject
     */
    function Services(EmailService, EnrollService) {

        // registered services
        var services = {
            'email-service': EmailService,
            'enroll-service': EnrollService
        };

        return {
            api: function(name) {
                if (typeof services[name] === 'undefined') {
                    throw new Error('Unknown service ' + name + ' !!!');
                }
                return services[name];
            }
        };
    }

    /**
     * lpP2P provider
     * @return {object} angular provider
     * @ngInject
     */
    exports.lpP2P = function() {
        this.$get = Services;
    };
});
