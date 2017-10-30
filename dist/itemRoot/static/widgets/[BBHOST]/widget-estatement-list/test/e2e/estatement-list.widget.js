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
        name: 'widget-estatement-list',
        title: 'Estatements'
    };

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;
    widget.body = utils.getWidgetElement(config);
    widget.welcomeValue = widget.body.element(by.css('h5[translate-values="{userName:mainCtrl.userName}"]'));
    widget.categoryTitle = widget.body.element(by.css('.category-title'));
    widget.estatements = by.repeater('document in mainCtrl.sliceDocuments(category.documents, 4)');
    widget.docLable = by.css('.document-label');
    widget.eyeIco = by.css('i.fa-eye');
    widget.pdfIco = by.css('i.fa-file-pdf-o');
    widget.BlockTitle = by.css('.category-title');
    widget.ListCategory = widget.body.all(by.repeater('category in mainCtrl.estatementList'));
    widget.CategoriesBlock = widget.body.all(by.repeater('category in mainCtrl.estatementList'));
    widget.docList = by.repeater('document in mainCtrl.sliceDocuments(category.documents, 4)');
    widget.docTitle = by.css('.document-label');

    widget.GetEstatementByCategory = function(name){
        return widget.ListCategory.filter(function(elem, index) {
            return widget.getDetailText(elem).getText().then(function(text) {
                return name === data.accountName
            });
        }).then(function(items) {
           return items
        });
    };

    /**
     * The widget should be visible on the page
     * @return {Boolean}
     */
    widget.isVisible = function() {
        utils.waitForElement(widget.categoryTitle);
        return widget.body.isDisplayed();
    };

    /**
     * Select Widget from Left menu
     * @return {Boolean} false
     */
    widget.getWidgetBlock = function(){
        utils.OpenMenuScroll(widget.title);
    };

    /**
     * function to get estaments list
     *
     * @index {object} number of item from the list
     *
     * @return {promise} if number exist return item from the list other case return list
     */
    widget.estatementList = function(index) {
        if (utils.isNumber(index)) {
            return widget.body.element(widget.estatements.row(index));
        } else {
            return widget.body.all(widget.estatements);
        }
    };

    widget.GetDocLabel = function(estatement){
        return estatement.element(widget.docLable);
    };

    widget.GetEyeIco = function(estatement){
        return estatement.element(widget.eyeIco);
    };

    widget.GetPdfIco = function(estatement){
        return estatement.element(widget.pdfIco);
    };

    /**
     * function get category by title
     *
     * @title {string} title of category that we need to find
     *
     * @return {promise} category block element
     */
    widget.getCategoryByTitle = function(title){
        utils.waitForElement(widget.CategoriesBlock.first());
        return widget.CategoriesBlock.filter(function(item,index){
            return item.element(widget.BlockTitle).getText().then(function(text){
                return title === text
            })
        }).then(function(item){
            return item[0]
        })
    };

    /**
     * object of functions for estatment category block
     *
     */
    widget.estatementsBlock = {
        isVisible : function(block){
            return block.isVisible()
        },
        getTitle : function(block){
            return block.element(widget.BlockTitle).getText()
        },
        getElementByTitle : function(block,title){
            return block.all(widget.docList).filter(function(item,index){
                return item.element(widget.docTitle).getText().then(function(text){
                    return title === text
                })
            }).then(function(item){
                return item[0]
            })
        },
        getEyeOfDoc : function(doc){
            return doc.element(widget.eyeIco).isPresent()
        },
        getPdfOfDoc : function(doc){
            return doc.element(widget.pdfIco).isPresent()
        }

    }

};
