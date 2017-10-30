define(function (require, exports, module) {
    'use strict';

    // Configure input fields for different steps
    exports.fields = {
        verifyOtp: {
            name: 'otpCode',
            required: true,
            externalVerification: 'verifyOtp',
            buttonInside: true,
            type: 'text',
            pattern: '/^[0-9]{6}$/',
            errorMsg: 'Wrong format: should be at least 6 digits',
            placeholder: 'Enter your code',
            value: null
        }
    };
});
