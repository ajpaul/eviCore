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
        name: 'widget-budgets',
        title: 'Your Finances',
        element: element(by.css('.lp-budgets'))
    };

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;

    /**
     * Prepare all elements
     * @return {promise} Return widget.elements
     */
    widget.get = function() {
        var d = utils.q.defer();
        utils.getWidget(config).then(function(res) {
            widget.chrome = res.chrome;
            widget.wrapper = res.body;
            widget.body = res.body;
            d.resolve(widget);
        });

        widget.activeBudget = null;
        widget.createBudgetBtn = element(by.css('.tile-new'), widget.wrapper);
        widget.editBudgetsBtn = element(by.id('editBtn'), widget.wrapper);
        widget.budgetRemoveBtn = element(by.css('.removeBtn'), widget.wrapper);

        // new budget wizard elements
        widget.budgetNameInput = $('#name', widget.wrapper);
        widget.categoryClothing = element(by.id('olb.trns.category.Clothing'), widget.wrapper);
        widget.finish = element(by.name('finish'), widget.wrapper);
        widget.budgetAmount = element(by.id('amount'), widget.wrapper);

        return d.promise;
    };

    widget.newBudget = {
        selectExpenseCategory: function (categories) {
            if (Object.prototype.toString.call(categories) !== '[object Array]') categories = [categories];
            return utils.q.all(categories.map(function (category) {
                var categoryElement = element(by.xpath("//div[contains(@class,'budget-edit')]//span[contains(@class, 'category-name')][contains(.,'" + category + "')]"));
                return utils.waitForElement(categoryElement)
                    .then(function () {
                        utils.click(categoryElement);
                    })
            }));
        },
        create: function () {
            return widget.createBudgetBtn.click().then(
                function () {
                    browser.wait(function() {
                        var deferred = protractor.promise.defer();
                        element(by.css(".loading-panel")).isPresent()
                            .then(function (isPresent) {
                                deferred.fulfill(!isPresent);
                            });
                        return deferred.promise;
                    });
                });
        },
        gotoStep: function (step) {
            return utils.click(element(by.name('proceedToStep'+step), widget.wrapper));
        },
        setAmount: function (amount) {
            return widget.budgetAmount.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
                .then(function () {
                    return widget.budgetAmount.sendKeys(amount);
                })
        },
        setName: function (name) {
            return widget.budgetNameInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
                .then(function () {
                    return widget.budgetNameInput.sendKeys(name);
                });
        },
        setIcon: function (icon) {
            return widget.wrapper.element(icon).click();
        },
        finish: function () {
            return widget.finish.click();
        },
        budgetIcons: {
            shopping: by.css("#shopping"),
            food: by.css("#food"),
            coffee: by.css("#coffee")
        }

    };

    widget.Budget = function(rootElement){
        var budget = this;

        var elementSpent = rootElement.$("[lp-amount='budget.spent']>span");
        var elementAmount = rootElement.$("[lp-amount='budget.amount']>span");
        var elementName = rootElement.$(".budget-name>span");
        var buttonRemove = rootElement.$(".budget-icon.lp-icon-remove-sign");
        var elementsTransactions = rootElement.$$("[ng-repeat='transaction in transactions']");
        this.rootElement = rootElement;

        this.getSpent = function () {
            return elementSpent.getText();
        };
        this.getAmount = function () {
            return utils.waitForElement(elementAmount)
                .then(function () {
                    return elementAmount.getText();
                });
        };
        this.getName = function () {
            return elementName.getText();
        };
        this.view = function () {
            return rootElement.click();
        };
        this.edit = function () {
            return widget.switchEditMode()
                .then(function () {
                    return utils.click(rootElement);
                });
        };
        this.remove = function () {
            return widget.switchEditMode()
                .then(function () {
                    return utils.click(buttonRemove);
                });
        };
        this.getTransactions = function () {
            var promises = [];
            return widget.switchOffEditMode()
                .then(function () {
                    return budget.view();
                })
                .then(function () {
                    return utils.waitForElement(
                        rootElement.$("[ng-repeat='transaction in transactions']")
                    )
                })
                .then(function () {
                    return elementsTransactions
                        .map(function (transactionElement) {
                            var elementTransactionCategoryName = transactionElement.$('td>.category-name');
                            var elementTransactionAmount = transactionElement.$('.pull-right>.category-name');
                            var transaction = {
                                name: "",
                                amount: ""
                            };
                            promises.push(elementTransactionCategoryName.getText()
                                .then(function (name) {
                                    transaction.name = name.trim();
                                }));
                            promises.push(elementTransactionAmount.getText()
                                .then(function (amount) {
                                    transaction.amount = amount.trim();
                                }));
                            return transaction;
                        })
                        .then(function (result) {
                            return utils.q.all(promises)
                                .then(function () {
                                    return result;
                                })
                        })
                })
        }
    };

    widget.switchOffEditMode = function(){
      return this.switchEditMode(true);
    };

    widget.switchEditMode = function (off) {
        return widget.isEditMode()
            .then(function (isEditMode) {
                if(!isEditMode != off) return widget.editBudgetsBtn.click();
            })
            .then(function () {
                return utils.scrollToTop();
            });
    };

    widget.isEditMode = function () {
        return widget.editBudgetsBtn.$('span').getText()
            .then(function (text) {
                return text !== 'Edit budgets';
            })
    };

    widget.getBudget = function (name, wait) {
        var budgetElement = widget.wrapper.element(by.xpath("//div[@budget][.//div[contains(@class,'budget-name')]/span[.='"+name+"']]"));
        if (wait) utils.waitForVisible(budgetElement);
        return budgetElement.isPresent()
            .then(function (isBudgetExist) {
                if(isBudgetExist){
                    widget.activeBudget = new widget.Budget(budgetElement);
                    return widget.activeBudget;
                }else{
                    return null
                }
            })
    };

    widget.budgetLists = function () {
        return element.all(by.repeater('b in budgetsManager.budgets()'));
    };

});
