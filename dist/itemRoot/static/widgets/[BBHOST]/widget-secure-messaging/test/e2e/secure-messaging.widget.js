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
		name: 'secure-messaging',
		title: 'Message Center'
	};

		var widget = this;
		widget.name = config.name;
		widget.title = config.title;

		/**
		 * Prepare all elements
		 * @return {promise} Return widget.elements
		 */
		widget.getWidget = function() {
			var d = utils.q.defer();
			utils.getWidget(widget.title).then(function(res) {
				widget.chrome = res.chrome;
				widget.body = res.body;
				d.resolve(widget);
			});
			return d.promise;
		};

		widget.get = function() {
			var d = utils.q.defer();
			widget.opener = element(by.cssContainingText('.lp-lc-tab-main', 'Message Center'));
			widget.opener.getAttribute('href').then(function(attr) {
				widget.id = attr.split('#')[1];
				widget.body = element(by.id(widget.id));
				widget.wrapper = $('.widget[data-panel="'+ widget.id +'"]');

				// Main view
				widget.createLetterBtn = element(by.name('new-message'), widget.wrapper);

				// New Letter view
				widget.newLetterView = $('#newMessageForm');
				widget.subject = element(by.name('subject'), widget.newLetterView);
				widget.body = element(by.name('body'), widget.newLetterView);
				widget.saveLetterBtn = element(by.name('save'), widget.newLetterView);
				widget.cancelLetterBtn = element(by.name('cancel'), widget.newLetterView);
				widget.sendLetterBtn = element(by.name('send'), widget.newLetterView);

				d.resolve(widget);
			});
			return d.promise;
		};

		/**
		 * Open Widget
		 */
		widget.toggle = function() {
			widget.opener.click();
			// Wait for loading indicator to disappear
			browser.wait(function() {
				var deferred = protractor.promise.defer();
				element(by.css(".loading-panel")).isPresent()
						.then(function (isPresent) {
							deferred.fulfill(!isPresent);
							});
				return deferred.promise;
			});
		};

		widget.isOpened = function() {
			return widget.wrapper.isDisplayed();
		};

		widget.isVisible = function() {
			return widget.body.isDisplayed();
		};

		widget.createLetter = function () {
			widget.createLetterBtn.click();
				// Wait for loading indicator to disappear
				browser.wait(function() {
					var deferred = protractor.promise.defer();
					element(by.css(".loading-panel")).isPresent()
					.then(function (isPresent) {
							deferred.fulfill(!isPresent);
							});
							return deferred.promise;
				});
		};
};
