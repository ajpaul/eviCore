
'use strict';

var utils = global.utils;

module.exports = function(config) {

    config = config || {
            name: 'widget-saving-goals',
            title: 'Saving Goals',
            element: element(by.css('.lp-saving-goals'))
        };

    var widget = this;
    //labels title by default
    widget.labelsname = ["Goal Title", "Select image", "Amount", "Account", "Due date"];

    widget.body = utils.getWidgetElement(config);
    widget.name = config.name;
    widget.title = config.title;
    widget.menuItem = element(by.cssContainingText('.lp-launcher-tab-text', widget.title));
    widget.savedamount = element(by.css('form[name="goalForm"] input[name="amount"]'));
    widget.headtitle = element(by.css('h3.widget-title span[data-lp-i18n="' + widget.title + '"]'));
    //Button in widget
    widget.setNewGoalBnt = element(by.id('set-new-goal'));
    widget.savinggoalbtn = element(by.id('create-saving-goal'));
    widget.updategoal = element(by.id('update-saving-goal'));
    widget.removebtn = element(by.id('="remove-saving-goal"'));
    widget.comfimbtn = element(by.cssContainingText('.btn', 'Confirm'));

    //form for add/edit saving goal
    widget.formerror = element(by.css('form.ng-invalid[name="goalForm"]'));
    widget.formtitle = widget.body.element(by.css('input[ng-model="editorCtrl.savingGoal.title"]'));
    widget.formamount = widget.body.element(by.css('input[ng-model="editorCtrl.savingGoal.amount"]'));
    widget.formaccountid = element.all(by.css('form[name="goalForm"] select[name="accountId"]'));

    // for labels
    widget.getLabelelement = widget.body.all(by.css("label.control-label"));


    widget.isVisible = function () {
        utils.waitForElement(widget.body);
        return widget.headtitle.isDisplayed();
    };

    widget.getTitle = function () {
        return widget.headtitle.getText();
    };

    widget.NewGoalButton = function () {
        return widget.setNewGoalBnt.isDisplayed();
    };

    widget.getLabelText = function (i) {
        return widget.getLabelelement.get(i).getText();
    };


    widget.InfoBlock = {
        getTitle : function () { return by.css('.title') },
        getImage : function (image) { return by.css('.icon-icons-goals_' + image) },
        getDate  : function () { return by.css('.goal-date') },
        getAmount: function () { return by.css('.amount .lp-amount-positive') }
    };

    widget.getFormImage = function (image) {
        return element(by.css('.icon-list .icon-icons-goals_' + image));
    };

    widget.getFormAccount = function (account) {
        return element(by.cssContainingText('form[name="goalForm"] option', account));
    };

    widget.getGoalTitle = function (title) {
        return element(by.cssContainingText('.lp-saving-goals .goal .title', title));
    };

    widget.FormButton = {
        setNewGoal       : function () { return widget.setNewGoalBnt.click()},
        createSavingGoal : function () { return widget.savinggoalbtn.click() },
        updateSavingGoal : function () { return widget.updategoal.click() },
        removeSavingGoal : function () { return widget.removebtn.click() }
    };



    widget.selectAccountID = function (account) {
        return widget.formaccountid.then(function (items) {
            if (items.length > 0) {
                return widget.getFormAccount(account).click();
            }
        });
    };

    widget.fillEditorForm = function (data) {
        return widget.formtitle.sendKeys(data.title)
            .then(function () {
                return widget.formamount.sendKeys(data.amount);
            }).then(function () {
                return widget.getFormImage(data.image).click();
            }).then(function () {
                return widget.selectAccountID(data.account);
            }).then(null, function (err) {
                console.error("An error was thrown! " + err);
            });
    };

    widget.editByTitle = function (title) {
        var editlink = widget.getGoalTitle(title).element(By.xpath('following-sibling::a'));
        utils.waitForElement(widget.setNewGoalBnt);
        utils.waitForElement(editlink);
        return editlink.click();
    };

    widget.addNewSaveGoal = function (data) {
        return widget.fillEditorForm(data).then(function(){
            return widget.FormButton.createSavingGoal();
        });
    };

    widget.editSavedGoal = function (old_title, data) {
        widget.editByTitle(old_title).then(function () {
            return widget.formtitle.clear().sendKeys(data.title);
        }).then(function () {
            return widget.savedamount.clear().sendKeys(data.amount);
        }).then(function () {
            return widget.getFormImage(data.image).click();
        }).then(function () {
            return widget.selectAccountID(data.account);
        }).then(function () {
            return widget.FormButton.updateSavingGoal();
        }).then(null, function (err) {
            console.error("An error was thrown! " + err);
        });
    };

    widget.removeSavedGoal = function (title) {
        widget.editByTitle(title).then(function () {
            return widget.FormButton.removeSavingGoal();
        }).then(function () {
            return widget.comfimbtn.click();
        }).then(null, function (err) {
            console.error("An error was thrown! " + err);
        });
    };

    // doesn't give all element, need to rewrite or remove
    widget.findGoalByTitle = function (title) {
        return widget.getGoalTitle(title)
            .evaluate('savingGoal')
            .then(function (savingGoal) {
                return {
                    title: savingGoal.title,
                    amount: savingGoal.amount,
                    image: savingGoal.image
                };
            });
    };

    widget.checkGoalInList = function (title) {
        utils.waitForElement(widget.setNewGoalBnt);
        return element(by.cssContainingText('.lp-saving-goals .goal .title', title)).isPresent();
    };

    widget.formHasErrors = function () {
        return widget.formerror.isPresent();
    };

    widget.GoalFullInfo = function (title) {

        var d = utils.q.defer();
        return element.all(by.repeater('savingGoal in listCtrl.state.savingGoals'))
            .then(function (goalinfo) {
                return Promise.all(goalinfo.map(function (goal) {
                    goal.element(by.css('.title')).getText().then(function (text) {
                        if (text === title) {
                            d.resolve(goal);
                        }
                    })
                }));

            }).then(function () {
                return d.promise
            });

    };
};
