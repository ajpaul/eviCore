'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = config || {
        name: 'widget-new-transfer',
        title: 'New Transfer',
        element: element(by.css('.lp-new-transfer'))
    };

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;

    widget.body = utils.getWidgetElement(config);
    widget.leftMenu = element(by.css('span[data-lp-i18n="New Transfer"]'));
    widget.CurrencyBtn = widget.body.element(by.css('div.currency-select button'));
    widget.AmountInp = widget.body.element(by.css('input[name="wholeAmountInput"]'));
    widget.AddressBookBtn = widget.body.element(by.css('i.lp-icon-addressbook'));
    widget.AccountList = widget.body.all(by.css('div.filter-contact'));
    widget.submitTransfer = widget.body.element(by.css('button[aria-label="Submit Transfer"]'));
    widget.NewTransferBtn = element(by.css('button[name="makePayment"]'));
    widget.ElementList = {
        contactName : by.css('.contact-name'),
        toggleAccount: by.css('p.toggle-accounts'),
        viewAllAccounts: by.css('p[class="toggle-accounts"]'),
        AriaAcc: by.css('div[aria-account="account"]')
    };

    /**
     * function get name leement form the list
     *
     * @param {element} block from the list for get value
     * @return {element} contact name element
     */
    widget.getDetailText = function(block){
        return block.element(widget.ElementList.contactName);
    };
    /**
     * function select currency
     *
     * @param {object} data get currency from object (data.currency)
     * @return {element} element click
     */
    widget.SelectCurrency = function(data){
        return utils.click(widget.CurrencyBtn).then(function(){
            return utils.click(widget.body.element(by.cssContainingText('ul.dropdown-menu li a span.ng-binding',data.currency)))
        })
    };
    /**
     * function select amount
     *
     * @param {object} data get amount from object (data.amount)
     * @return {element} element send keys
     */
    widget.SelectAmount = function(data){
        return utils.waitForElement(widget.AmountInp).then(function(){
            return widget.AmountInp.clear().sendKeys(data.amount);
        })
    };

    /**
     * function to select account from the list using name as value
     *
     * @param {string} name of account to select from the list
     * @param {string} type User have account and email to select
     *
     * @return {promise} click to element
     */
    widget.SelectAccountByName =  function(name,type) {
        var locations  = widget.AccountList;
        utils.waitForElement(widget.AddressBookBtn);
        return widget.AddressBookBtn.click().then(function(){
            return locations.map(function(locationElement, index) {
                return {
                    index: index,
                    text: widget.getDetailText(locationElement).getText()
                }
            }).then(function(items) {
                return items.forEach(function(item) {
                    if (item.text == name) {
                        return locations.get(item.index).all(widget.ElementList.toggleAccount).first().isDisplayed().then(function(visible){
                            if (!visible){
                                if (type == 'email'){
                                    return locations.get(item.index).all(widget.ElementList.AriaAcc).last().click()
                                } else {
                                    return locations.get(item.index).all(widget.ElementList.AriaAcc).first().click()
                                }
                            } else {
                                return locations.get(item.index).all(widget.ElementList.toggleAccount).first().click().then(function(){
                                    if (type == 'email'){
                                        return locations.get(item.index).all(widget.ElementList.AriaAcc).last().click()
                                    } else {
                                        return locations.get(item.index).all(widget.ElementList.AriaAcc).first().click()
                                    }
                                })
                            }

                        })
                    }
                });
            });
        })
    };

    /**
     * function to select account from the list using name as value (new one for fool combinations)
     *
     * @param {object} data object of all parameters for select account
     *
     * @return {promise} click to element
     */

    widget.SelectAccountNew =  function(data) {
        var locations  = widget.AccountList;
        utils.waitForElement(widget.AddressBookBtn);
        return widget.AddressBookBtn.click().then(function(){
            return locations.filter(function(elem, index) {
                return widget.getDetailText(elem).getText().then(function(text) {
                    return text === data.accountName
                });
            }).then(function(items) {
                var item = items[0];
                // checking if account info is open
                return item.all(by.css('.toggle-accounts')).first().isDisplayed().then(function(visible){
                    if(visible){
                        return item.all(by.css('.toggle-accounts')).first().click().then(function(){
                            return item.all(widget.ElementList.AriaAcc).first().click()
                        })
                    }else{
                        return item.all(widget.ElementList.AriaAcc).first().click()
                    }
                })


            });

        })
    };

    /**
     * function to select account from the list using index
     *
     * @param {integer} index from the list of element
     * @param {string} type for select account email or account number
     *
     * @return {promise} click to element
     */
    widget.SelectAccountByIndex =  function(index, type) {
        var locations  = widget.AccountList;
        var block;
        utils.waitForVisible(widget.AddressBookBtn);
        return widget.AddressBookBtn.click().then(function(){
            block = locations.get(index || 0);
            return utils.click(block.element(widget.ElementList.viewAllAccounts))
        }).then(function(){
            if (type == 'email'){
                return block.all(widget.ElementList.AriaAcc).last().click()
            } else {
                return block.all(widget.ElementList.AriaAcc).first().click()
            }
        })
    };

    /**
     * function to crete a new Transaction
     *
     * @param {object} data Name of account to select from the list
     *
     * @return {promise} click to submit button
     */
    widget.createNewTransfer = function(data){

        return widget.SelectCurrency(data).then(function(){
            return widget.SelectAmount(data);
        }).then(function(){
            return widget.SelectAccountByName(data.accountName,data.type);
        }).then(function(){
            return widget.submitNewTransferForm();
        })
    };

    /**
     * function go to form for create new transfer
     *
     * @return {promise} click to button
     */
    widget.goNewTransactionForm = function(){
        utils.waitForElement(widget.NewTransferBtn);
        browser.sleep(750); // ^ wait doesn't work and protractor bug (element is not attached to the page document)
        return widget.NewTransferBtn.click();
    };

    /**
     * function to submit a form
     *
     * @return {promise} click to submit button
     */
    widget.submitNewTransferForm = function(){
        utils.waitForElement(widget.submitTransfer);
        return utils.click(widget.submitTransfer)
    };

    /**
     * function to crete a new Transactions with all combinations of input files
     *
     * @param {object} data all information for transaction
     *
     * @return undefined (return console.log about success info)
     */
    widget.CreateNewTransferFull = function(data){
        var async = require('async');
        var allfuncs = [];
        var listoffuncs = utils.reShuffle([ // Creating combination of function
                widget.SelectCurrency,
                widget.SelectAmount,
                widget.SelectAccountNew
            ]);
        listoffuncs.forEach(function(item,index){
            item.push(widget.submitNewTransferForm); // submit form after each combination
            if(index < listoffuncs.length-1 ) {
                item.push(widget.goNewTransactionForm); // add func to open form for creating new transfer
            }
            allfuncs = allfuncs.concat(item); // creating simple arr for async lib
        });
        async.eachSeries(allfuncs, function iterator(item, callback) {
            item(data).then(callback);
        }, function done() {
            console.log('All combinations added');
        });
    }

});
