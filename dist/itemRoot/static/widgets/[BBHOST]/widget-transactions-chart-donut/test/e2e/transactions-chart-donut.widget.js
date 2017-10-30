
'use strict';

var utils = global.utils;
var TransactionsListWidget = utils.requireLocal('widget-transactions-list');
var tranWidget = new TransactionsListWidget();

module.exports = function(config) {

    config = config || {
            name: 'transactions-chart-donut',
            title: 'Transactions chart donut',
            element: element(by.css('.lp-transactions-chart-donut'))

        };

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;

    widget.body = utils.getWidgetElement(config);
    widget.ChartDonutBtn = element(by.css('i.lp-icon-category-spendings-chart'));
    widget.ChartModel = element(by.model('selectedItem'));
    widget.ChartName = widget.ChartModel.element(by.css('text.name'));
    widget.ChartAmount = widget.ChartModel.element(by.css('text.amount'));
    widget.ChartShare = widget.ChartModel.element(by.css('text.share'));
    widget.ChartDelta = widget.ChartModel.element(by.css('text.delta'));
    widget.ChartListElm = widget.ChartModel.all(by.css('path.arc'));

    /**
     * Select Widget
     * @return {promise} click to button
     */
    widget.getWidgetBlock = function(){
        utils.waitForElement(widget.ChartDonutBtn);
        return utils.click(widget.ChartDonutBtn)
    };

    /**
     * function get amount
     *
     * @return {promise} amount string
     */
    widget.getAmount = function(){
        return widget.ChartAmount.getText()
    };

    /**
     * function get Name of category
     *
     * @return {promise} category name
     */
    widget.getName = function(){
        return widget.ChartName.getText()
    };

    /**
     * function get share of category
     *
     * @return {promise} share in % string
     */
    widget.getChartShare = function(){
        return widget.ChartShare.getText().then(function(text){
            return text.trim()
        })
    };

    /**
     * function get delta of category
     *
     * @return {promise} delta in % string
     */
    widget.getChartDelta = function(){
        return widget.ChartDelta.getText().then(function(text){
            return text.trim().replace('/[↑↓]/g','')
        })
    };

    /**
     * function select chart by color code
     *
     * @color {string} color code loke rgb(182, 195, 32)
     *
     * @return {promise} waiter of changed text
     */
    widget.selectChartByColor = function(color){
        var chartElm = widget.ChartModel.element(by.css('path[style="fill: ' + color + ';"]'));
        utils.waitForElement(widget.ChartName);
        //wait until category name will change
        return widget.getName().then(function(categoryName_old){
            return utils.click(chartElm).then(function(){
                return browser.wait(function(){
                    return widget.getName().then(function(categoryName_new){
                        return categoryName_old != categoryName_new
                    })
                });
            });

        })
    };

    /**
     * function select chart by category using transaction user name
     *
     * @name {string} user name for transaction
     *
     * @return {promise} function selectChartByColor
     */
    widget.selectChartByCategory = function(name){
        return tranWidget.SelectTransactionByName(name).then(function(block){
            return tranWidget.getCategoryColorName(block).then(function(color){
                return browser.executeScript('window.scrollTo(0,0);').then(function() {
                    return widget.selectChartByColor(color);
                })
            })
        });
    };

    /**
     * function select chart by category using transaction user name after selected category
     *
     * @name {string} user name for transaction
     *
     * @return {promise} function selectChartByColor
     */
    widget.SelectCategoryAfterRandom = function(name,randomColor){
        return tranWidget.SelectTransactionByName(name).then(function(block){
            return tranWidget.getCategoryColorName(block).then(function(color){
                return browser.executeScript('window.scrollTo(0,0);').then(function() {
                    return widget.selectChartByColor(randomColor);
                }).then(function(){
                    return widget.selectChartByColor(color);
                })
            })
        });
    }
};
