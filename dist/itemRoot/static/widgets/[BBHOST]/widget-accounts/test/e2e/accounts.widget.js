'use strict';

var utils = global.utils;

module.exports = function (config) {

    config = config || {
        name: 'widget-accounts',
        title: 'Accounts',
        element: element(by.css('.lp-widget-accounts'))
  };

    var widget = this;
    widget.name = config.name;
    widget.title = config.title;
    widget.body = utils.getWidgetElement(config);
    widget.internalAccountBlock = widget.body.element(by.css('div[is-open="mainCtrl.preferences.internalIsOpen"]'));
    widget.externalAccountBlock = widget.body.element(by.css('div[is-open="mainCtrl.preferences.externalIsOpen"]'));
    widget.allFinancesBlock = widget.body.element(by.css('.lp-all-finances-btn'));
    widget.internalCollection = by.repeater('group in mainCtrl.model.internalCollection');
    widget.externalCollection = by.repeater('group in mainCtrl.model.externalCollection');
    widget.iaLink = widget.internalAccountBlock.element(by.css('a.accordion-toggle'));
    widget.eaLink = widget.externalAccountBlock.element(by.css('a.accordion-toggle'));
    widget.indecator = by.css('i.pull-right');
    widget.accountList  = by.repeater('account in group.accounts');
    widget.SubCatTtitle = by.css('p.pull-left>span.ng-binding');
    widget.CategoryList = by.css('div.panel-collapse h4.panel-title a.accordion-toggle');
    widget.transactionSearch = element(by.css('div[data-widget-title="Transactions Search"]'));

    /**
     * The widget should be visible on the page
     * @return {Boolean}
     */
    widget.isVisible = function() {
        var body = widget.body;
        return utils.waitForElement(body)
            .then(function () {
                return body.isDisplayed();
            });
    };

    /**
     * Prepare all elements
     * @return {promise} Return widget.elements
     */
    widget.get = function() {
        var d = utils.q.defer();
        utils.waitForElement(widget.transactionSearch);
        utils.getWidget(config).then(function(res) {
            widget.chrome = res.chrome;
            widget.body = res.body;
            d.resolve(widget);
        });
        return d.promise;
    };

    /**
    * Function to click All Finances.
    * @return {promise} click to button
    */
    widget.clickAllFinances = function(){
        return widget.allFinancesBlock.click()
    };

    /**
     *  Account Object
     */
    widget.Account = function(block,collection) {
        this.block = block;
        this.collection = collection;

        /**
        * Function to get open account.
        * @return {element} element
        */
        this.isOpen = function(){
            return this.block.element(widget.indecator).getAttribute('class').then(function(attr){
                var subclass = 'fa-minus-circle'; // if element has this class account is open
                return attr.indexOf(subclass) > -1
            })
        };

        /**
        * Function to toggle Accounts.
        * @return {promise} click to button
        */
        this.toggleAccount = function(){
            return block.click()
        };

        /**
        * Function to wait for toggle.
        * @param {element} block Element
        * @return {promise}
        */
        this.waitUntileToggle = function(block){
            return browser.wait(function(){
                return block.getAttribute('style').then(function(style){
                    return style === 'height: auto;'
                })
            })
        };

        /**
        * Function to open accounts list.
        * @return {promise}
        */
        this.openList = function(){
            var that = this;
            var block = this.block;
            return this.isOpen().then(function(status){
                if (status){
                    return true
                } else {
                    return block.click().then(function(){
                        return that.waitUntileToggle(block.all(by.css('div.panel-collapse')).first());
                    })
                }
            })
        };

        /**
        * Function to get category list.
        * @return {array} category list
        */
        this.getCategoryList = function(){
            var block = this.block;
            var list = block.all(widget.CategoryList);
            return list.map(function(item){
                return item.getText()
            }).then(function(list){
                // remove empty item in list
                var uniqueArray = list.filter(function(elem) {
                    return elem != '';
                });
                return uniqueArray
            })
        };

        /**
        * Function to get category item.
        * @param {string} title Title of item
        * @return {string} title
        */
        this.getCategoryItem = function(title) {
            var block = this.block;
            return this.openList().then(function () {
                return block.all(collection).filter(function (elm) {
                    return elm.element(by.css('h4.panel-title')).getText().then(function (curTitle) {
                        return curTitle === title
                    })
                })
            })
        };

        /**
        * Function to open category.
        * @param {string} title Title of category
        * @return {element} element
        */
        this.openCategory = function(title){
            var that = this;
            var categoryBlock;
            return that.getCategoryItem(title).then(function(items){
                if (items === null || undefined) throw new Error('Can not find category');
                    categoryBlock = items[0];
                return categoryBlock.click()
            }).then(function(){
                return that.waitUntileToggle(categoryBlock.element(by.css('div.panel-collapse')));
            }).then(function(){
                return categoryBlock
            })
        };

        /**
        * Function to find if category exist.
        * @param {string} title Title of category
        * @return {boolean} 
        */
        this.findCategory = function(title){
            return this.getCategoryItem(title).then(function(items){
                return items.length > 0 ? true : false
            })
        };

        /**
        * Function to get sub category list.
        * @param {string} category Title of category
        * @return {string}
        */
        this.getSubCategoryList = function(category){
            return this.openCategory(category).then(function(categoryBlock){
                return categoryBlock.all(widget.accountList).map(function(elm){
                    return elm.element(widget.SubCatTtitle).getText()
                }).then(function(items){
                    return items
                })
            })
        };

        /**
        * Function to get sub category.
        * @param {string} category Title of category
        * @param {string} subCategory Title of sub category
        * @return {element} Sub category element
        */
        this.getSubCategory = function(category,subCategory){
            var options = {
                'innerTextSelector' : widget.SubCatTtitle
            };
            var obj = {};
            return this.openCategory(category).then(function(categoryBlock){
                return utils.selectByText(categoryBlock.all(widget.accountList), subCategory, options).then(function(elm){
                    return elm.element(by.css('span.lp-amount-positive')).getText().then(function(text){
                        obj.price = text;
                        obj.elm = elm;
                        return obj
                    })
                });
            })
        };

        /**
        * Function to find if sub category exist.
        * @param {string} category Title of category
        * @param {string} subCategory Title of sub category
        * @return {boolean}
        */
        this.findSubCategory = function(category, subCategory){
            return this.openCategory(category).then(function(categoryBlock){
                return categoryBlock.all(widget.accountList).filter(function(elm){
                    return elm.element(widget.SubCatTtitle).getText().then(function(curTitle){
                        return curTitle === subCategory
                    })
                }).then(function(items){
                    return items.length > 0 ? true : false
                })
            })
        };

        /**
        * Function to open sub category.
        * @param {string} category Title of category
        * @param {string} subCategory Title of sub category
        * @param {string} action 
        * @return {promise} click to button
        */
        this.OpenSubCategory = function(category,subCategory,action){
            var subCategoryElm;
            return this.getSubCategory(category,subCategory).then(function(obj){
                subCategoryElm = obj.elm;
                return subCategoryElm.click()
            }).then(function(){
                if (action) {
                    utils.waitForElement(element(by.css('a[data-lp-i18n="' + action + '"]')));
                    return element(by.css('a[data-lp-i18n="' + action + '"]')).click()
                } else {
                    return true
                }
            })
        }
    };

};
