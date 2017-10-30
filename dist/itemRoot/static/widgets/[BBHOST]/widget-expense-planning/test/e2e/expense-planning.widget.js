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
		name: 'widget-expense-planning',
		title: 'Expense Planning',
        element: element(by.css('.lp-expense-planning'))
	};

	var widget = this;

	widget.name = config.name;
	widget.title = config.title;
    widget.headtitle = element(by.css('h3.widget-title span[data-lp-i18n="' + widget.title + '"]'));
    widget.body = utils.getWidgetElement(config);

    widget.agendaBtn = widget.body.element(by.css('a[ng-click="changeView(\'agenda\')"]'));
    widget.weekBtn = widget.body.element(by.css('a[ng-click="changeView(\'week\')"]'));
    widget.monthBtn = widget.body.element(by.css('a[ng-click="changeView(\'month\')"]'));
    widget.yearBtn = widget.body.element(by.css('a[ng-click="changeView(\'year\')"]'));
    widget.AccountList = widget.body.all(by.repeater('payment in value.payments'));

    /**
     * verify widget is visible
     * @return {boolean}
     */
	widget.isVisible = function () {
		utils.waitForElement(widget.body);
		return widget.headtitle.isDisplayed();
	};

    /**
     * Get account name in transaction
     * @return {promise} text of account name
     */
    widget.getDetailText = function(locationElement){
        return locationElement.element(by.css('td.col-xs-7 .h4')).getText();
    };

    /**
     * Get account amount in transaction
     * @return {promise} text of account amount
     */
    widget.getDetailAmount = function(locationElement){
        return locationElement.element(by.css('.lp-amount-positive')).getText();
    };

    /**
     * Get transaction detail
     * @return {promise} of element
     */
    widget.getTransactionDetail =  function(name, amount) {
        var locations  = widget.AccountList;
        return locations.map(function(locationElement, index) {
            return {
                index: index,
                name: widget.getDetailText(locationElement).getText(),
                amount : widget.getDetailAmount(locationElement).getText()
            }
        }).then(function(items) {
            var data = {};
            items.forEach(function(item) {
               // console.log(item);
                if (item.name === name  && item.amount === amount ) {
                    data = item;
                    return data
                }
            });
            return data
        });
    };

    /**
     * Summary of all amount of transactions
     * @return {float}
     */
    widget.getTotalAmount =  function() {
        var locations  = widget.AccountList;
        var totalAmount = 0;
        return locations.map(function(locationElement, index) {
            return {
                index: index,
                amount : widget.getDetailAmount(locationElement).getText()
            }
        }).then(function(items) {
            items.forEach(function(item) {
                totalAmount += parseFloat(item.amount);
            });
            return parseFloat(Math.round(totalAmount * 100) / 100).toFixed(2);
        });
    };

    /**
     * Verify week amount
     * @return {promise} text
     */
    widget.checkWeekAmount = function(day){
        return widget.weekBtn.click().then(function(){
            return widget.body.element(by.cssContainingText('div.cal-day',day))
                .element(by.xpath('..')).element(by.xpath('..'))
                .element(by.css('.lp-amount-positive')).getText();
        })
    };

    /**
     * Verify month amount
     * @return {promise} text
     */
    widget.checkMonthAmount = function(day){
        return widget.monthBtn.click().then(function(){
            return widget.body.all(by.cssContainingText('div.cal-day',day)).first()
                .element(by.xpath('..')).element(by.xpath('..'))
                .element(by.css('.lp-amount-positive')).getText();
        })
    };

    /**
     * Verify year amount
     * @return {promise} text
     */
    widget.checkYearAmount = function(month){
        return widget.yearBtn.click().then(function(){
            return widget.body.element(by.css('div[translate="'+month+'"]'))
                .element(by.xpath('..')).element(by.xpath('..'))
                .element(by.css('.lp-amount-positive')).getText();
        })
    };

    /**
     * get cuurent full name of month
     * @return {string} month name
     */
    widget.getFullMonth = function (){
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var d = new Date();
        return monthNames[d.getMonth()];
    };


};
