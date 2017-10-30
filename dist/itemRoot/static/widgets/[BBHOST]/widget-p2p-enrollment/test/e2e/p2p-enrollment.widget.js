/**
*  ----------------------------------------------------------------
*  Copyright © Backbase B.V.
*  ----------------------------------------------------------------
*  Author : Backbase R&D - Amsterdam - New York
*/

'use strict';

var utils = global.utils;

module.exports = function(config) {

    config = config || {
        name: 'widget-p2p-enrollment',
        title: 'Send to Friend - Sign Up'
    };

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;
    /**
    * Prepare all elements
    * @return {promise} Return widget.elements
    */
    widget.get = function () {
        var d = utils.q.defer();
        utils.getWidget(widget.title).then(function (res) {
            widget.chrome = res.chrome;
            widget.body = res.body;
            d.resolve(widget);
        });
        return d.promise;
    };
    /**
    * The widget should be visible on the page
    * @return {Boolean}
    */
    widget.isVisible = function () {
        return widget.body.isDisplayed();
    };

    //Step 1 of the Registration wizard
    widget.getStepOne = function () {
        return widget.body.element(by.css('.enrollment-step-one')).isDisplayed();
    };

  //Step 2 of the Registration wizard
    widget.getStepTwo = function () {
        return widget.body.element(by.css('.enrollment-step-two')).isDisplayed();
    };

    //Step 3 of the Registration wizard - confirmation about successful sign up
    widget.getStepThree = function () {
        return widget.body.element(by.css('.enrollment-step-three')).isDisplayed();
    };

    //Sign Up form - Step 1
    //email field
    widget.setUpEmail = function () {
        var email = widget.body.element(by.model('options.email.value'));
        email.clear();
        email.sendKeys(utils.randomString() + '@backbase.com');
    };

    widget.openAccDropdown = function () {
        return widget.body.element(by.css('.dropdown button')).click();
    };

    widget.accountsList = function (index) {
        var accounts = by.repeater('option in group.options');
        if (utils.isNumber(index)) {
            return widget.body.element(accounts.row(index));
        } else {
            return widget.body.all(accounts);
        }
    };

    //Selecting a random account
    widget.selectRandomAccount = function () {
        widget.openAccDropdown();
        var randomAccountItem = widget.accountsList().get(utils.random(0, 1));
        randomAccountItem.click();
    };

  //Agree to terms and conditions checkbox
    widget.agreeCheckbox = function () {
        return widget.body.element(by.name('terms')).click();
    };

    //Submit sign up form (Step 1)
    widget.submitStep = function () {
        return widget.body.element(by.name('submitForm')).click();
    };

    //Verification code (Step 2)
    widget.typeCode = function () {
        var code = widget.body.element(by.name('verification-code'));
        code.clear();
        code.sendKeys('1234');
    };
};
