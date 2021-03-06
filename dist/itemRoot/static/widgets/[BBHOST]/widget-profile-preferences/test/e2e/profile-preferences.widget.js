
'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = config || {
        name: 'widget-profile-preferences',
        title: 'Profile - Preferences',
		element: element(by.css('.lp-preferences'))

		};

    var widget = this;
    widget.name = config.name;
    widget.title = config.title;

	/**
	 * Test elements
	 */
	widget.body = utils.getWidgetElement(config);
	widget.preferredName = widget.body.element(by.css('div[ng-model="control.preferredName.value"]'));
	widget.preferredNameInput = widget.preferredName.element(by.css('input[ng-model="model.text"]'));
	widget.preferredNameEditBtn = widget.preferredName.element(by.css('span'));
	widget.preferredNameEditInput = widget.preferredName.element(by.css('div[ng-show="editting"] input'));
	widget.preferredNameSaveBtn = widget.preferredName.element(by.css('div[ng-show="editting"] button[ng-click="save(model.value)"]'));

	widget.preferredLanguage = widget.body.element(by.css('div[ng-model="control.locale.value"]'));
	widget.preferredLanguageButton = widget.preferredLanguage.element(by.css('button'));
	widget.preferredLanguageList = widget.preferredLanguage.element(by.css('ul'));
	widget.preferredLanguageValue = widget.preferredLanguage.element(by.css('span.ng-binding'));

	widget.defaultAccounts = widget.body.element(by.css('div[ng-model="control.defaultAccount.value"]'));
	widget.defaultAccountsButton = widget.defaultAccounts.element(by.css('button'));
	widget.defaultAccountsList = widget.defaultAccounts.element(by.css('ul'));
	widget.defaultAccountsValue = widget.defaultAccounts.element(by.css('span.ng-binding'));

	widget.defaultBalances = widget.body.element(by.css('div[ng-model="control.preferredBalanceView.value"]'));
	widget.defaultBalancesButton = widget.defaultBalances.element(by.css('button'));
	widget.defaultBalancesList = widget.defaultBalances.element(by.css('ul'));
	widget.defaultBalancesValue = widget.defaultBalances.element(by.css('span.ng-binding'));

	widget.categorizations = widget.body.element(by.css('div[ng-model="control.pfm.value"]'));
	widget.categorizationsButton = widget.categorizations.element(by.css('button'));
	widget.categorizationsList = widget.categorizations.element(by.css('ul'));
	widget.categorizationsValue = widget.categorizations.element(by.css('span.ng-binding'));


	/**
	 * Wait For Widget To be Loaded
	 */
	widget.waitForWidgetToLoad = function() {
		return utils.waitForElement(widget.categorizationsValue);
	};

	/**
	 * Get Preferred Name value
	 */
	widget.getName = function() {
		return widget.preferredNameInput.getAttribute('value');
	};

	/**
	 * Set Preferred Name value
	 */
	widget.setName = function(value) {
		return utils.click(widget.preferredNameEditBtn)
			.then(function () {
                return widget.preferredNameEditInput.clear();
            })
            .then(function () {
                return widget.preferredNameEditInput.sendKeys(value);
            });
	};

	/**
	 * Save Preferred Name value
	 */
	widget.saveName = function() {
		return utils.click(widget.preferredNameSaveBtn);
	};

	/**
	 * Get Preferred Language value
	 */
	widget.getLanguage = function() {
		return widget.preferredLanguageValue.getText();
	};

	/**
	 * Set Preferred Language value
	 */
	widget.setLanguage = function(value) {
		return utils.click(widget.preferredLanguageButton)
			.then(function () {
                return widget.preferredLanguageList.element(by.xpath("//a[contains(.,'"+ value +"')]")).click();
            });
	};

	/**
	 * Get Default account value
	 */
	widget.getAccount = function() {
		return widget.defaultAccountsValue.getText();
	};

	/**
	 * Set Default account value
	 */
	widget.setAccount = function(value) {
		return utils.click(widget.defaultAccountsButton)
			.then(function () {
                return widget.defaultAccountsList.element(by.xpath("//a[contains(.,'"+ value +"')]")).click();
            });
	};

	/**
	 * Get Default balance value
	 */
	widget.getBalance = function() {
		return widget.defaultBalancesValue.getText();
	};

	/**
	 * Set Default balance value
	 */
	widget.setBalance = function(value) {
		return utils.click(widget.defaultBalancesButton)
			.then(function () {
                return widget.defaultBalancesList.element(by.xpath("//a[contains(.,'"+ value +"')]")).click();
            });
	};

	/**
	 * Get Categorization value
	 */
	widget.getCategorization = function() {
		return widget.categorizationsValue.getText();
	};

	/**
	 * Set Categorization value
	 */
	widget.setCategorization = function(value) {
		return utils.click(widget.categorizationsButton)
			.then(function () {
                return widget.categorizationsList.element(by.xpath("//a[contains(.,'"+ value +"')]")).click();
            });
	};

});

