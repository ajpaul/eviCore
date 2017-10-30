'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = config || {
        name: 'accounts-dropdown',
        title: 'Accounts dropdown',
        element: element(by.css('div[lp-accounts-select="lp-accounts-select"]'))
    };

    var widget = this;
    widget.body = utils.getWidgetElement(config);
    widget.name = config.name;
    widget.title = config.title;
    widget.MenuBtn = widget.body.element(by.css('button.btn'));
    widget.AccountType = widget.body.element(by.css('.lp-acct-name')).all(by.css('span.ng-binding')).first();
    widget.Lpaccount = widget.body.element(by.css('.lp-acct-num')).all(by.css('span.ng-binding')).first();
    widget.AccountAmount = widget.body.element(by.css('.lp-account-amount')).element(by.css('span.lp-amount'));
    widget.AccountBal = widget.body.element(by.css('.lp-account-bal')).element(by.css('span.lp-amount-positive'));
    widget.transactionList = element(by.id('transactions-list'));
    widget.Filter = element.all(by.css('div.lp-search-tags input')).first();
    widget.ListElementitem = element.all(by.css('div.lp-transactions-list-item-content'));
    widget.Elementitem = element(by.css('div.lp-transactions-list-item-content'));

    widget.ElmList = {
        relativeWidget : element(by.css('p.pull-left span'))
    };

    widget.selectAccount = function(account){
        return widget.MenuBtn.click().then(function(){
            return widget.body.element(by.cssContainingText('div.lp-acct-name span.ng-binding',account)).click();
        })
    };

    //checking for transactions list recipient name
    widget.ChecktransactionByName = function(name){
        return widget.Filter.clear().sendKeys(name).then(function(){
            return widget.Filter.sendKeys(protractor.Key.ENTER);
        }).then(function(){
            utils.waitForElement(widget.Elementitem);
            return widget.ListElementitem.first()
        })
    }

});