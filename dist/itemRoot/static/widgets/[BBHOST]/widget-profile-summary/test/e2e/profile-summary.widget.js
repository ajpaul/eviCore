'use strict';

var utils = global.utils;

module.exports = function(config) {

	config = config || {
		name: 'widget-profile-summary',
		title: 'Profile - Summary',
        element: element(by.css('.lp-widget-profile-summary'))
	};

	var widget = this;
	widget.name = config.name;
	widget.title = config.title;
	widget.body = utils.getWidgetElement(config);
	widget.usernameLink = widget.body.element(by.css('.lp-profile-summary-username'));
	widget.viewProfileLink = widget.body.element(by.css('div[ng-if="profileLink"] button'));
	widget.loggedUsername = widget.usernameLink.element(by.css('span'));
	widget.logoutLink = widget.body.element(by.css('button[ng-click="logout()"]'));
	widget.userPhoto = widget.body.element(by.css('.media img'));
	widget.profileWidget = element(by.css('h3.widget-title span[data-lp-i18n="Profile"]'));
	widget.profileWidgetCloseButton = element(by.css('button[aria-label="close Profile"'));
	widget.lastLogin = widget.body.$('.lp-last-login__datetime');

	/**
	 * Function to wait for widget to be loaded
	 * @return {undefined}
	 */
	widget.waitForWidgetToLoad = function() {
		utils.waitForElement(widget.logoutLink);
	};

	/**
	 * Function to check Profile Widget visibility
	 * @return {promise.<boolean>} is displayed
	 */
	widget.profileWidgeIsVisible = function() {
		return widget.profileWidget.isDisplayed();
	};

	/**
	 * Function to click profile widget close button
	 * @return {promise} last action
	 */
	widget.clickCloseProfileWidget = function() {
		return utils.click(widget.profileWidgetCloseButton);
	};

	/**
	 * Function to check logged user name
	 * @return {undefined}
	 */
	widget.checkUserName = function(name) {
		utils.waitForElement(widget.loggedUsername);
		utils.waitForElementToContainText(widget.loggedUsername, name);
	};

	/**
	 * Function to get logged user name
	 * @return {promise.<string>} user name
	 */
	widget.getUserName = function (){
        utils.waitForElement(widget.loggedUsername);
        return browser.wait(function(){
            return widget.loggedUsername.getText().then(function(text){
                return text != ''
            })
        }).then(function(){
            return widget.loggedUsername.getText();
        })
    };

	/**
	 * Function to check user photo visibility
	 * @return {promise.<boolean>} is displayed
	 */
	widget.userPhotoIsVisible = function() {
		return widget.userPhoto.isDisplayed();
	};

	/**
	 * Function to click on Username Link
	 * @return {promise} last action
	 */
	widget.clickUserLink = function() {
		return utils.click(widget.usernameLink);
	};

	/**
	 * Function to click on View Profile Link
	 * @return {promise} last action
	 */
	widget.clickProfileLink = function() {
		return utils.click(widget.viewProfileLink);
	};

	/**
	 * Function to logout
	 * @return {promise} last action
	 */
	widget.logout = function() {
		return utils.click(widget.logoutLink);
	};

	/**
	 * Function to check Logout Button visibility
	 * @return {promise.<boolean>} is displayed
	 */
	widget.logoutIsVisible = function() {
		return widget.logoutLink.isDisplayed();
	};

	/**
	 * Function to get last login date
	 * @return {string} last login date
	 */
	widget.getLastLogin = function () {
		return widget.lastLogin.getText();
	};

	/**
	 * Function to get last login date
	 * @example
	 * //Mar. 1st, 12:36PM
	 * @returns {string} date format for moment.js
     */
	widget.getLastLoginDateFormat = function () {
		return 'MMM. Do, h:mmA';
	};
};
