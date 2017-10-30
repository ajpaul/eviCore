/*global module, global, browser, element, by, By*/
/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  ----------------------------------------------------------------
 */
/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 */

'use strict';

var utils = global.utils;
var async = require('async');

module.exports = function(config) {

    config = config || {
            name: 'widget-transactions-list',
            title: 'Transactions List',
            element: element(by.css('.lp-transactions-list'))
        };

    var widget = this;

    widget.body = utils.getWidgetElement(config);
    widget.name = config.name;
    widget.title = config.title;

    widget.MenuElement = element.all(by.repeater('account in group.accounts')).first();
    widget.ElementList = widget.body.all(by.repeater('transaction in transactions.transactions track by $index'));
    widget.ShowMoreBtn = element(by.css('a.lp-transactions-list-more-button'));
    widget.transferMoney = element(by.css('button[ng-click="transferMoney()"]'));

    widget.ElmList = {
        relativeWidget : element(by.css('p.pull-left span')),
        date : by.css('span[itemprop="dateTimeDate"]'),
        month : by.css('span[itemprop="dateTimeMonth"]'),
        name : by.css('.lp-transactions-list-item-name'),
        type : by.css('div[itemprop="transactionType"]'),
        price : by.css('.lp-transactions-list-item-amount-value'),
        blocktime : by.css('div[ng-if="transaction.details.bookingDateTime"]'),
        blockadress : by.css('div[ng-if="transaction.details.address"]'),
        merchantType : by.css('div[ng-show="transaction.details.merchantType"]'),
        detailvalue : by.css('.transaction-detail-value'),
        categorybtn : by.css('span[translate="Categories"]'),
        categorylist : by.css('ul.category-list'),
        createbtn : by.css('button[ng-click="changeCategory(newCategoryId)"]'),
        selectedcategory : by.repeater("category in transactionCategories | orderBy:'-priority' | selectedCategory:this"),
        titlecategory : by.css('.lp-transactions-list-item-name'),
        categoryfiler : by.css('[ng-model="categoryFilter"'),
        categorylistfilter : by.css('ul.category-list li'),
        marker : by.css('div.marker')
    };

    widget.isVisible = function () {
        utils.waitForElement(widget.body);
        return widget.MenuElement.isDisplayed();
    };

    widget.getWidgetBlock = function (){
        utils.waitForElement(widget.ElmList.relativeWidget); //relative widgets
        return widget.MenuElement.click();
    };

    widget.getFirstElement = function(){
        //.element(by.css('.lp-transactions-list-item-name'))
        return widget.ElementList.first().click().then(function(){
            return widget.ElementList.first();
        }).then(function(element){
            return element;
        });
    };

    widget.getBlockInfo = function(block){
        var info_block = block || widget.ElementList.first();
        return {
            date : info_block.element(widget.ElmList.date).getText(),
            month : info_block.element(widget.ElmList.month).getText(),
            name : info_block.element(widget.ElmList.name).getText(),
            type : info_block.element(widget.ElmList.type).getText(),
            price : info_block.element(widget.ElmList.price).getText()
        }

    };

    widget.getBlockDisplayed = function(block){

        var info_block = block || widget.ElementList.first();
        return {
            date : info_block.element(widget.ElmList.date).isDisplayed(),
            month : info_block.element(widget.ElmList.month).isDisplayed(),
            name : info_block.element(widget.ElmList.name).isDisplayed(),
            type : info_block.element(widget.ElmList.type).isDisplayed(),
            price : info_block.element(widget.ElmList.price).isDisplayed()
        }
    };

    //Block info
    widget.getInfoTime = function(block){
        var infoTime = block.element(widget.ElmList.blocktime).element(by.css('div.ng-binding'));
        utils.waitForElement(infoTime);
        return infoTime.isDisplayed();
    };
    widget.getInfo = function(block,type){
        var path = 'span[ng-show="address.'+type+'"]';
        return block.element(widget.ElmList.blockadress).element(by.css(path)).isDisplayed();
    };
    widget.getInfoMerchant= function(block){
        return block.element(widget.ElmList.merchantType).element(widget.ElmList.detailvalue).isDisplayed();
    };
    widget.getCategoryforSelect = function(category){
        return widget.body.element(widget.ElmList.categorylist).element(by.cssContainingText('span.ng-binding',category)).click();
    };

    widget.changeCategory = function(category,block){
        var info_block = block || widget.ElementList.first().element(widget.ElmList.titlecategory);
        return info_block.click().then(function(){
            utils.waitForElement(widget.body.element(widget.ElmList.categorybtn));
            return widget.body.element(widget.ElmList.categorybtn).click();
        }).then(function(){
            return widget.body.element(widget.ElmList.categoryfiler).clear().sendKeys(category);
        }).then(function(){
            return widget.getCategoryforSelect(category);
        }).then(function(){
            return widget.body.element(widget.ElmList.createbtn).click();
        })
    };

    widget.verifyCategory = function(block){
        var info_block = block || widget.ElementList.first().element(widget.ElmList.titlecategory);
        return info_block.click().then(function(){
            utils.waitForElement(widget.body.element(widget.ElmList.categorybtn));
            return widget.body.element(widget.ElmList.categorybtn).click();
        }).then(function(){
            return widget.body.element(widget.ElmList.selectedcategory).element(by.css('span.ng-binding')).getText();
        }).then(function(text){
            info_block.click();
            return  text
        });
    };

    widget.changeCategoryByFilter = function(category,block){
        var info_block = block || widget.ElementList.first().element(widget.ElmList.titlecategory);
        return info_block.click().then(function(){
            utils.waitForElement(widget.body.element(widget.ElmList.categorybtn));
            return widget.body.element(widget.ElmList.categorybtn).click();
        }).then(function(){
            return widget.body.element(widget.ElmList.categoryfiler).clear().sendKeys(category);
        }).then(function(){
            return widget.body.all(widget.ElmList.categorylistfilter).first().click();
        }).then(function(){
            return widget.body.element(widget.ElmList.createbtn).click();
        })
    };

    /**
     * function return number of transactions
     *
     * @count {integer} number of transaction more or equal for browser waiter
     *
     * @return promise number of transaction
     */
    widget.GetCountTransactions = function(count){
        return browser.executeScript('window.scrollTo(0,0);').then(function(){ // need scroll to top cause jasmine
            return browser.wait(function () {
                return widget.ElementList.count().then(function(currcount){
                    return currcount == count
                })
            })
        }).then(function(){
            return widget.ElementList.count()
        })

    };

    /**
     * function click to show more button
     *
     * @return promise click
     */
    widget.ClickShowMore = function(){
        return utils.click(widget.ShowMoreBtn);
    };

    /**
     * function show many times we need to click on the button
     *
     * @count {integer} number of click
     *
     * @return undefined
     */
    widget.GetTransactionListMore = function(count){
        var allfuncs = utils._.fill(Array(count), widget.ClickShowMore); // create arr of clicks to button
        async.eachSeries(allfuncs, function iterator(item, callback) {
            item().then(callback);
        });
        return browser.executeScript('window.scrollTo(0,0);');

    };

    /**
     * function get transaction by name of client
     *
     * @name {string} name of client
     *
     * @return {promise} block of transaction
     */
    widget.SelectTransactionByName = function (name){
        utils.waitForElement(widget.transferMoney);
        browser.sleep(1000); // load element from json can't create waiter
        return widget.ElementList.filter(function(item){
            return item.element(by.css('.lp-transactions-list-item-name')).getText().then(function(curname){
                curname = curname.replace(/(?:\r\n|\r|\n|Name\n)/g, '');
                return name === curname
            })
        }).then(function(item){
            if (item.length == 0){
                throw new Error("User name didn't found");
            }else {
                return item[0]
            }
        })
    };

    /**
     * function get color code from block of transaction
     *
     * @block {promise} block of transaction
     *
     * @return {string} category color code
     */
    widget.getCategoryColorName = function(block){
        return block.click()
        .then(function(){
            utils.waitForElement(widget.body.element(widget.ElmList.categorybtn));
            return widget.body.element(widget.ElmList.categorybtn).click();
        }).then(function(){
            return widget.body
                .element(widget.ElmList.selectedcategory)
                .element(widget.ElmList.marker)
                .getAttribute('style')
        }).then(function(text){
            return text.replace(/(?:background-color: |;)/g,'');
        });
    };
};
