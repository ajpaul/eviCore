/**
 *  ----------------------------------------------------------------
 *  Copyright Â© Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 */

'use strict';

var utils = global.utils;

module.exports = function(config) {

    config = config || {
            name: 'widget-review-transfers',
            title: 'Review Transfers',
            element: element(by.css('.lp-review-transfers-widget'))
        };

    var widget = this;
    var NewTransferWidget = utils.requireLocal('widget-new-transfer');
    var nt_widget = new NewTransferWidget();
    widget.name = config.name;
    widget.title = config.title;

    widget.body = utils.getWidgetElement(config);
    widget.NewTransferBtn = widget.body.element(by.css('button[name="makePayment"]'));
    widget.TransactionList = widget.body.all(by.repeater('paymentOrder in group.paymentOrders'));
    widget.sumbitBtn = widget.body.element(by.css('button[name="submitPayments"]'));
    widget.SuccessMsg = widget.body.element(by.css('div[type="success"] span.ng-binding'));
    widget.verificationCode = element(by.css('body')).all(by.css('.modal-dialog')).last().element(by.model('verify.verificationCode'));
    widget.AlertMsgText = element(by.css('div.notification-item span'));
    widget.AlertMsgClose = element(by.css('div.notification-item button'));
    widget.SubmitBtn = element(by.css('body')).all(by.css('.modal-dialog')).last().element(by.css('button[type="submit"]'));
    widget.AccountInfo = widget.body.element(by.css('.lp-amount-positive'));
    widget.modalWindow = element(by.css('.modal-backdrop'));
    widget.EditBtn = by.css('button[ng-click="mainCtrl.editOrder(paymentOrder)"]');

    /**
     * The widget should be visible on the page
     * @return {Boolean}
     */
    widget.isVisible = function() {
        utils.waitForElement(widget.NewTransferBtn);
        return widget.body.isDisplayed();
    };

    /**
     * Select Widget from Left menu
     * @return {Boolean} false
     */
    widget.getWidgetBlock = function(){
        utils.OpenMenuScroll(widget.title);
    };


    widget.getDetailText = function(block){
        return block.element(by.css('span[itemprop="counterpartyName"]'));
    };
    widget.getAccountNumber = function(block){
        return block.element(by.css('small[itemprop="counterpartyIban"'));
    };

    /**
     * Change amount
     * example : 55 -> $55.00
     * @return {string} new format of amount
     */
    widget.changeAmountFormat = function(curr,amount){
        return curr + parseInt(amount).toFixed(2);
    };

    widget.getAmount = function(block){
        return block.element(by.css('span.lp-amount-positive')).getText();
    };

    widget.getRemoveBtn = function(block){
        var RmvBtn = block.element(by.css('button[ng-click="mainCtrl.removeOrder(group, paymentOrder)"]'));
        return browser.wait(function(){
            return widget.modalWindow.isPresent().then(function(isVisible){
                return !isVisible
            })
        },5000).then(function(){
            return utils.click(RmvBtn);
        })
    };

    /**
     * Submit transfer transaction after enter code from 4 digital number
     * @return {promise} click
     */
    widget.submitTransaction = function(code){
        utils.waitForElement(widget.sumbitBtn);
        return utils.click(widget.sumbitBtn).then(function(){
            utils.waitForElement(widget.verificationCode);
            return widget.verificationCode.clear().sendKeys(code);

        }).then(function(){
            return widget.SubmitBtn.click()
        }).then(function(){
            return utils.waitForElement(widget.SuccessMsg);
        })
    };

    /**
     * Delete transaction by name
     * @return {promise} click
     */
    widget.DeleteTransaction = function(name) {
        utils.waitForElement(widget.NewTransferBtn);
        var locations  = widget.TransactionList;
        locations.map(function(locationElement, index) {
            return {
                index: index,
                text: widget.getDetailText(locationElement).getText()
            }
        }).then(function(items) {
            items.some(function(item) {
                if (item.text === name) {
                    return widget.getRemoveBtn(locations.get(item.index)).then(function(){
                        return widget.SubmitBtn.click();
                    });
                    return true
                }

            });
        });
    };

    /**
     * Delete all transactions in review window
     * @return {promise} click
     */
    widget.DeleteTransactionAll = function() {
        utils.waitForElement(widget.NewTransferBtn);
        var locations  = widget.TransactionList;
        locations.each(function(element, index) {
            widget.getRemoveBtn(element).then(function(){
                utils.click(widget.SubmitBtn);
            });
        });
    };

    /**
     * get transaction by name
     * @return {promise} element
     */
    widget.getTransactionByName = function(name){
        var locations  = widget.TransactionList;
        var itemElement;
        return locations.map(function(locationElement, index) {
            return {
                index: index,
                text: widget.getDetailText(locationElement).getText()
            }
        }).then(function(items) {
            items.some(function(item) {
                if (item.text === name) {
                    itemElement = locations.get(item.index);
                    return true
                }
            });
            return itemElement
        }).then(function(itemElement){
            return itemElement
        });
    };

    /**
     * edit transaction by name
     * @return {promise} click
     */
    widget.EditTransaction = function (name,currency) {
        widget.getTransactionByName(name).then(function(transaction){
            return transaction.element(widget.EditBtn).click().then(function(){
                utils.waitForElement(nt_widget.CurrencyBtn);
                var data = {currency:currency};
                return nt_widget.SelectCurrency(data);
            }).then(function(){
                return nt_widget.submitTransfer.click();
            })
        });
    };

    /**
     * submit transactions without confirmation code
     * @return without
     */
    widget.submitTransactionForm = function(){
        utils.waitForElement(widget.AccountInfo);
        utils.waitForElement(widget.sumbitBtn);
        browser.sleep(200); //need added cause form jumping after elements shows
        return utils.click(widget.sumbitBtn).then(function () {
            return utils.waitForElement(widget.SuccessMsg);
        });
    };


    widget.transactionCount = function(name){
        utils.waitForElement(widget.NewTransferBtn);
        utils.waitForElement(widget.sumbitBtn);
        return widget.body.all(by.cssContainingText('span[itemprop="counterpartyName"]', name)).count();
    };

    widget.Transaction = {
        block : null,
        getByName : function(name){
            var transaction = this;
            var locations  = widget.TransactionList;
            var itemElement;
            return locations.map(function(locationElement, index) {
                return {
                    index: index,
                    text: widget.getDetailText(locationElement).getText()
                }
            }).then(function(items) {
                items.some(function(item) {
                    if (item.text === name) {
                        itemElement = locations.get(item.index);
                        return true
                    }
                });
                return itemElement
            }).then(function(itemElement){
                transaction.block = itemElement;
                return itemElement
            });
        },
        getByAccountNumber : function(name){
            var transaction = this;
            var locations  = widget.TransactionList;
            var itemElement;
            return locations.map(function(locationElement, index) {
                return {
                    index: index,
                    text: widget.getAccountNumber(locationElement).getText()
                }
            }).then(function(items) {
                items.some(function(item) {
                    if (item.text === name) {
                        itemElement = locations.get(item.index);
                        return true
                    }
                });
                return itemElement
            }).then(function(itemElement){
                transaction.block = itemElement;
                return itemElement
            });
        },
        delete : function() {
            if (this.block === null) throw new Error('Block is null please run get function');
            return widget.getRemoveBtn(this.block).then(function(){
                return widget.SubmitBtn.click();
            })
        },
        edit : function(data){
            if (this.block === null) throw new Error('Block is null please run get function');
            return this.block.element(widget.EditBtn).click().then(function(){
                utils.waitForElement(nt_widget.CurrencyBtn);
                return nt_widget.SelectCurrency(data);
            }).then(function(){
                return nt_widget.SelectAmount(data);
            }).then(function(){
                return nt_widget.submitTransfer.click();
            });
        }
    }
};
