'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

	config = config || {
		name: 'widget-addressbook',
		title: 'Address Book',
		element: element(by.css('.lp-contacts'))
		};

	var widget = this;

	widget.name = config.name;
	widget.title = config.title;

	var uiMap = {
		contactList: by.css('tbody[ng-repeat^="contact in contactsModel.contacts"] span'),
		contactByName: function (name) {
			return by.xpath('//tbody[contains(@ng-repeat, "contact in contactsModel.contacts")][.//span[contains(., "'+name+'")]]');
		},
		searchInput: by.css('input[name="search"]'),
		addContact: by.css('button[name="addContact"]'),
		contactDetails: {
			rootElement: by.css('div[ng-show*="filteredContacts"]'),
			name: by.css('.col-contact-form>div.h3'),
			account: by.css('.col-contact-form>small.text-muted.ng-binding'),
			editButton: by.css('button span[translate="Edit"]'),
			detail: {
				allElements: by.css('div[ng-repeat*="contactsModel.currentDetails"]'),
				type: by.css('span[ng-switch="key"]>small>span[translate]'),
				value: by.css('span[ng-switch="key"]>small.ng-binding'),
			},
			transaction: {
				allElements: by.css('[ng-repeat="transaction in lpTransactions.transactions"]'),
				month: by.css('.lp-month'),
				day: by.css('.lp-day'),
				title: by.css('.lp-transactions-item-title>span'),
				description: by.css('.lp-transactions-item-description'),
				amount: by.css('.lp-cell-amount [class^="lp-amount"]'),
			},
		},
		newTransfer: {
			rootElement: by.css('form[name="paymentOrderForm"]'),
			account: by.css('.dropdown.lp-large-account-select-size'),
			descriptionInput: by.css('textarea[name="remittanceInformation"]'),
			amountInput: by.css('input[name="instructedAmount"]'),
			transferButton: by.css('button[name="submitForm"]'),
			selectAccountPopup: {
				accountById: function (id) {
					return by.xpath('//ul[contains(@class, "dropdown-menu")]/li[.//div[@class="lp-acct-num"]//span[@aria-hidden="true"][.="'+id+'"]]');
				}
			}
		},
		contactEdit: {

		},
		contactNew: {

		}

	};

	var elementInsideWidget = function (locator) {
		return widget.body.element(locator);
	};

	var elementsInsideWidget = function (locator) {
		return widget.body.all(locator);
	};
	/**
	* Prepare all elements
	* @return {promise} Return widget.elements
	*/
	widget.get = function() {
		var d = utils.q.defer();
		utils.getWidget(config).then(function(res) {
			widget.chrome = res.chrome;
			widget.body = res.body;
			d.resolve(widget);
		});
		return d.promise;
	};

	widget.getContactsNames = function () {
		var contactList = elementsInsideWidget(uiMap.contactList);
		return utils.getTextFromElements(contactList);
	};

	widget.openContact = function (name) {
		return elementInsideWidget(uiMap.contactByName(name)).click();
	};

	widget.search = function (text) {
		var searchInput = elementInsideWidget(uiMap.searchInput);
		return searchInput.sendKeys(text)
	};

	widget.editMode = {

	};

	widget.contactDetails = new function () {
		var elementInideObject = function(locator){
			return widget.body.element(uiMap.contactDetails.rootElement).element(locator);
		};
		this.getName = function () {
			return elementInideObject(uiMap.contactDetails.name).getText();
		};
		this.getAccount = function () {
			return elementInideObject(uiMap.contactDetails.account).getText();
		};
		this.getDetails = function () {
			return utils.getObjectFromElements(widget.body.all(uiMap.contactDetails.detail.allElements), function (element, results, promises) {
				var obj = {};
				promises.push(element.element(uiMap.contactDetails.detail.type).getText()
					.then(function (key) {
						obj[key] = null;
						return element.element(uiMap.contactDetails.detail.value).getText()
							.then(function (value) {
								obj[key] = value;
							})
					})
				);
				results.push(obj);
			});
		};
		this.getTransactions = function () {
			return utils.getObjectFromElements(elementInideObject(uiMap.contactDetails.transaction.allElements), function (element, results, promises) {
				var obj = {};
				promises.push(
					element.element(uiMap.contactDetails.transaction.day).getText()
						.then(function (day) {
							obj.day = day;
							return element.element(uiMap.contactDetails.transaction.month).getText();
						})
						.then(function (month) {
							obj.month = month;
							return element.element(uiMap.contactDetails.transaction.title).getText();
						})
						.then(function (title) {
							obj.title = title;
							return element.element(uiMap.contactDetails.transaction.description).getText();
						})
						.then(function (description) {
							obj.description = description;
							return element.element(uiMap.contactDetails.transaction.amount).getText();
						})
						.then(function (amount) {
							obj.amount = amount;
						})
				);
				results.push(obj);
			});
		};
	};
	widget.newTransfer = new function () {
		var elementInideObject = function(locator){
			return widget.body.element(uiMap.newTransfer.rootElement).element(locator);
		};
		this.setAccount = function (id) {
			return elementInideObject(uiMap.newTransfer.account).click()
					.then(function () {
						var elementInPopup = elementInideObject(uiMap.newTransfer.selectAccountPopup.accountById(id));
                        return utils.waitForElement(elementInPopup)
							.then(function () {
								return elementInPopup.click();
							})
					})
		};
		this.setDescription = function (text) {
			var description = new utils.Elements.Controls.Input(elementInideObject(uiMap.newTransfer.descriptionInput));
			return description.sendKeys(text);
		};
		this.setAmount = function (num) {
			var amount = new utils.Elements.Controls.Input(elementInideObject(uiMap.newTransfer.amountInput));
			return amount.sendKeys(num);
		};
		this.transfer = function () {
			return elementInideObject(uiMap.newTransfer.transferButton).click();
		};
	};
});
