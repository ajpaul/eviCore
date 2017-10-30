define(function (require, exports, module) {
    'use strict';

    /**
     * Export Template
     */
    module.exports = '' +
        '<!-- DESKTOP -->' +
        '<div class="lp-otp-check otp-check is-desktop">' +
        '   <div ng-show="otp.showChannelSelector">' +
        '       <div class="otp-content">' +
        '           <h3 lp-i18n="Verification required"></h3>' +
        '           <div class="text-muted" lp-i18n="Same sensitive payments require you to provide a verification code. This does not affect your registered devices."></div>' +
        '           <h5 ng-show="serverError" class="text-red" lp-i18n="{{ serverError }}"></h5>' +
        '           <h5 ng-hide="serverError" class="text-success">&nbsp;</h5>' +
        '           <h5 lp-i18n="Where do you want to receive your verification code?"></h5>' +
        '           <div class="channel-selector row">' +
        '               <div class="cell col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
        '                   <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="channelSelected" value="phone" name="numbers">' +
        '                       <div class="radio-label">' +
        '                           <div class="radio-label-main" lp-i18n="Use my mobile phone"></div>' +
        '                           <div class="radio-label-small" lp-i18n="{{ mask(\'phone\')(otpNext.phone.phoneNumber) }}"></div>' +
        '                       </div>' +
        '                   </div>' +
        '                   <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="channelSelected" value="email" name="numbers">' +
        '                       <div class="radio-label">' +
        '                           <div class="radio-label-main" lp-i18n="Use my email"></div>' +
        '                           <div class="radio-label-small" lp-i18n="{{ mask(\'email\')(otpNext.email.emailAddress) }}"></div>' +
        '                       </div>' +
        '                   </div>' +
        '               </div>' +
        '           </div>' +
        '       </div>  ' +
        '       <div class="otp-nav text-right">' +
        '           <button ng-click="cancel()" ng-disabled="loading" class="btn btn-link" lp-i18n="Cancel"></button>' +
        '           <button ng-click="select()" ng-disabled="!channelSelected || loading" class="btn btn-primary" lp-i18n="Send my code"></button>' +
        '           <i ng-show="loading" class="loading-button"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></i>' +
        '       </div>' +
        '   </div>' +
        '   <!-- Step 2: verify code -->' +
        '   <div ng-show="otp.showOtpVerification">' +
        '       <div class="otp-content">' +
        '           <h4 lp-i18n="Enter authentication code:"></h4>' +
        '           <div class="row">' +
        '               <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5">' +
        '                   <div lp-labeled-input-field="lp-labeled-input-field"' +
        '                       external-verification="{{ otp.input.externalVerification }}"' +
        '                       input-type="{{ otp.input.type }}"' +
        '                       api="otp.input.api()"' +
        '                       description="templates/otp.html"' +
        '                       button-inside="otp.input.buttonInside"' +
        '                       input-value="otp.input.value"' +
        '                       is-required="{{ otp.input.required }}"' +
        '                       input-pattern="{{ otp.input.pattern }}"' +
        '                       pattern-error-msg="{{ otp.input.errorMsg }}"' +
        '                       field-name="{{ otp.input.name }}"' +
        '                       placeholder-text="{{ otp.input.placeholder }}"></div>' +
        '               </div>' +
        '           </div>' +
        '           <h5 ng-show="serverResponseFails" class="text-red" lp-i18n="Server response failed!"></h5>' +
        '           <h5 ng-show="serverValidationFails" class="text-red" lp-i18n="{{serverValidationFails}}"></h5>' +
        '           <br><button ng-click="select()" ng-disabled="!channelSelected || loading" class="btn btn-link text-right" lp-i18n="Re-send code"></button>' +
        '           <span ng-show="codeSent" class="text-success" lp-i18n="{{ codeSent }}"></span>' +
        '           <i ng-show="loading" class="loading-button"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></i>' +
        '           <span ng-show="serverError" class="text-red text-center" lp-i18n="{{ serverError }}"></span>' +
        '       </div>' +
        '       <div class="otp-nav text-right">' +
        '           <button ng-click="back()" ng-disabled="loading" class="btn btn-link" lp-i18n="Back"></button>' +
        '           <button ng-click="verify()" class="btn btn-primary verify-button" ng-disabled="!otp.input.value || loading" lp-i18n="Verify"></button>' +
        '       </div>' +
        '   </div>' +
        '</div>';
});
