/**
*  ----------------------------------------------------------------
*  Copyright © Backbase B.V.
*  ----------------------------------------------------------------
*  Author : Backbase R&D - Amsterdam - New York
*/

'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

	config = config || {
		name: 'widget-external-accounts',
		title: 'External Accounts',
		element: element(by.css('.lp-external-accounts'))
		};

	var widget = this;

	widget.name = config.name;
	widget.title = config.title;

	var uiMap = {
		steps: {
			first: {
				searchInput: by.css('input[ng-model="search.name"]'),
				tabs: {
					rootElement: by.css('.btn-group-justified'),
					tabByName: function (name) {
						return by.css('.btn-filter .filter-row[translate="'+name+'"]');
					},
					activeTab: by.css('.btn-filter.active')
				},
				accounts: by.css('[ng-repeat="fi in fiModel.financialInstitutes"] .col-xs-10>span'),
				getAccountByName: function (name) {
					return by.xpath('.//li[@ng-repeat="fi in fiModel.financialInstitutes"][.//span[.="'+name+'"]]');
				},
			},
			second: {
				title: by.css('[ng-controller="CredentialsViewController"] .selected-fi div.col-xs-11>span.h4'),
				usernameInput: by.css('input[aria-label="Username"]'),
				passwordInput: by.css('input[aria-label="Password"]'),
				loginButton: by.css('button[translate="Log In"]'),
				goBackButton: by.css('button[translate="Go Back"]'),
			},
			third: {
				title: by.css('.selected-fi div.col-xs-11 div[ng-show="!fiModel.selected.isConnecting"]>span[translate]'),
				doneButton: by.css('.btn-primary[translate="I am done"]'),
				addAnother: by.css('.btn[translate="Add another account"]')
			}
		},
		stepsNavigationBar: by.css('.wizard-header'),
		activeStep: by.css('.wizard-active-step .wizard-step-number'),
		goToStep: function (num) {
			return by.xpath('.//span[contains(@class, "wizard-step-number")][.="'+num+'"]');
		},
		progressDivHidden: by.css('.fi-list .progress-indicator.ng-hide'),
	};

	widget.waitForProgress = function () {
		return utils.waitForElement(widget.elementInside(uiMap.progressDivHidden));
	};

	widget.stateSteps = {
		first: {
			search: function (text) {
				var searchInput = widget.elementInside(uiMap.steps.first.searchInput);
				return searchInput.sendKeys(text)
					.then(function () {
						return widget.waitForProgress();
					});
			},
			tabs: {
				rootElement: function() {
					return widget.elementInside(uiMap.steps.first.tabs.rootElement);
				},
				open: function (name) {
					return this.rootElement().element(uiMap.steps.first.tabs.tabByName(name)).click();
				},
				activeTab: function () {
					return this.rootElement().element(uiMap.steps.first.tabs.activeTab).getText();
				}
			},
			getAccounts: function () {
				var accountElements = widget.body.all(uiMap.steps.first.accounts);
				var result = [];
				var promisesToComplete = [];
				return accountElements
					.map(function (accountElement) {
						promisesToComplete.push(
							accountElement.getText()
								.then(function (accountText) {
									result.push(accountText);
								})
						)
					})
					.then(function () {
						return utils.q.all(promisesToComplete)
							.then(function () {
								return result;
							})
					})
			},
			clickOnAccount: function (name) {
				return widget.elementInside(uiMap.steps.first.getAccountByName(name)).click()
					.then(function () {
						return widget.waitForProgress();
					});
			}
		},

		second: {
			getTitle: function () {
				return widget.elementInside(uiMap.steps.second.title).getText();
			},
			setUsername: function (text) {
				var userInput = widget.elementInside(uiMap.steps.second.usernameInput);
                return userInput.clear()
					.then(function () {
						return userInput.sendKeys(text);
					})
			},
			setPassword: function (text) {
				var passwordInput = widget.elementInside(uiMap.steps.second.passwordInput);
                return passwordInput.clear()
					.then(function () {
						return passwordInput.sendKeys(text);
					})

			},
			clickOnLoginButton: function () {
				return widget.elementInside(uiMap.steps.second.loginButton).click()
					.then(function () {
						return widget.waitForProgress();
					})
			},
			clickOnGoBackButton: function () {
				return widget.elementInside(uiMap.steps.second.goBackButton).click();
			}
		},

		third: {
			getTitle: function () {
				return widget.elementInside(uiMap.steps.third.title).getText();
			},
			clickOnDoneButton: function () {
				return widget.elementInside(uiMap.steps.third.doneButton).click();
			},
			clickOnAddAnotherButton: function () {
				return widget.elementInside(uiMap.steps.third.addAnother).click();
			},
		},

		stepsNavigationBar: function () {
			return widget.elementInside(uiMap.stepsNavigationBar);
		},
		getActiveStep: function () {
			return this.stepsNavigationBar().element(uiMap.activeStep).getText();
		},

		goToStep: function (num) {
			return this.stepsNavigationBar().element(uiMap.goToStep(num)).click();
		},

	};

	widget.actions = {
		loginIn: function (user, password) {
			return widget.stateSteps.second.setUsername(user)
				.then(function () {
					return widget.stateSteps.second.setPassword(password);
				})
				.then(function () {
					return widget.stateSteps.second.clickOnLoginButton();
				})
		}
	}

});
