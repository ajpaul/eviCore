
'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = config || {
        name: 'widget-alert-messages',
        title: 'Alert Messages',
        title_display: 'Alerts and Actions',
        element: element(by.css('.lp-automation-alerts-widget'))
    };

    var widget = this;

    widget.body = utils.getWidgetElement(config);
    widget.name = config.name;
    widget.title = config.title;
    widget.title_display = config.title_display;
    //button
    widget.createNewBtn = widget.body.element(by.css('.create-new-button'));
    widget.NextBtn = widget.body.all(by.cssContainingText('.btn','Next'));
    widget.SaveBtn = widget.body.element(by.cssContainingText('button.btn','Save and Enable'));
    widget.saveChangeBtn = widget.body.element(by.css('button[translate="Save Changes"]'));

    widget.NameCounterParty = widget.body.element(by.css('input[ng-model="inputModel.filters[$index][filter.name].value"]'));
    widget.emailInput = widget.body.element(by.css('input[ng-model="action.location.emailAddress"]'));
    widget.automationNameInput = widget.body.element(by.css('input[ng-model="inputModel.automationName"]'));
    widget.headtitle = element(by.css('h3.widget-title span[data-lp-i18n="' + widget.title + '"]'));
    widget.AlertActionList = widget.body.all(by.repeater('automation in automationsModel.automations track by $index'));
    widget.InfoBlock = element(by.css('.automation-show-details-wrapper'));
    widget.AlertDetail = element(by.css('div[title="Click to view details"]'));

    /**
     * functions to find child in particular element block
     *
     * @param {Element} Element for find a child
     *
     * @return {Element} element with found in parent element
     */
    widget.getUpdateBtn = function(block){
        return block.element(by.css('div[translate="Update"]'));
    };
    widget.getDetailLink = function(block){
        return block.element(by.css('.view-details-link'));
    };
    widget.getViewDetail = function(block){
        return block.element(by.css('div[title="Click to view details"]'));
    };
    widget.getDeleteBtn = function(block){
        return block.element(by.css('div[title="Delete Automation"]'));
    };
    widget.getAnimationElm = function(block){
        return block.element(by.css('.animated')).getCssValue('animation-duration');
    };
    widget.getDeleteConfBtn = function(block){
        return block.element(by.cssContainingText('.button-content','Delete!'))
    };
    widget.getNewButton = function(){
        utils.waitForElement(widget.createNewBtn);
        return widget.createNewBtn.isDisplayed()
    };


    /**
     * functions to find element by text inside of element
     *
     * @param {string} Text that inside of element
     *
     * @return {Element} element with found by text
     */
    widget.getTriggerAutomation = function (text) {
        return element(by.cssContainingText('div.btn-automation', text));
    };
    widget.getTriggerAction = function(text) {
        return element(by.cssContainingText('div[class="row"] li div', text));
    };

    /**
     * common functions
     */
    widget.getInfofromBlock = function(block,input){
        return block.element(by.cssContainingText('.property-value',input)).getText();
    };
    widget.checkAlertInList = function (title) {
        return element(by.cssContainingText('.view-details-link', title)).isPresent();
    };
    widget.getNextBtn = function(i){
        return widget.NextBtn.get(i);
    };
    widget.hideInfoBlock = function(block){
        return  widget.getViewDetail(block).click()
    };

    /**
     * function check if element has class
     *
     * @param {element} {string} element and class
     *
     * @return {boolean}  true if have and false if not
     */
    widget.hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    /**
     * function create new Alert message
     *
     * @param {string} text for find particular Alert message block
     *
     * @return {promise} element ful block of Alert message
     */
    widget.getAlertBlock = function(title) {
        var d = utils.q.defer();
        return utils.waitForVisible(widget.createNewBtn).then(function () {
            return widget.AlertActionList.then(function (list) {
                return Promise.all(list.map(function (alert_item) {
                    widget.getDetailLink(alert_item).getText().then(function(text){
                        if (text === title){
                            d.resolve(alert_item);
                        }
                    });
                }));
            }).then(function(){ return  d.promise });
        });
    };

    /**
     * function get Alert message info
     *
     * @param {string} text by title of Alert messagge
     *
     * @return {promise} element block promise
     */
    widget.getAlertInfo = function(title){
        return widget.getAlertBlock(title).then(function(block){
            return widget.getViewDetail(block).click().then(function(){
                return block;
            });
        });
    };

    /**
     * function create new Alert message
     *
     * @param {object} data object with data for creating
     *
     * @return {promise} click promise
     */
    widget.createNewAlert = function (data) {
        utils.waitForElement(widget.createNewBtn);
        return widget.createNewBtn.click().then(function(){
            return widget.getTriggerAutomation(data.triggerAutomation).click();
        }).then(function(){
            return widget.NameCounterParty.clear().sendKeys(data.counterParty);
        }).then(function(){
            return widget.getNextBtn(2).click(); // hidden button emelent with the same name and path to him
        }).then(function(){
            return widget.getTriggerAction(data.triggerAction).click();
        }).then(function(){
            return widget.getNextBtn(3).click();
        }).then(function(){
            return widget.emailInput.clear().sendKeys(data.emailInput);
        }).then(function(){
            return widget.getNextBtn(4).click();
        }).then(function(){
            return widget.automationNameInput.clear().sendKeys(data.automationName);
        }).then(function(){
            return widget.SaveBtn.click();
        })
    };

    /**
     * function edit new Alert message
     *
     * @param {string},{string} title - find Alert message by title and
     * change by new date new_date
     *
     * @return {promise} click promise
     */
    widget.EditbyTitle = function(title,new_data){
        return widget.getAlertBlock(title).then(function(block) {
            return widget.getUpdateBtn(block).click();
        }).then(function(){
            return widget.getNextBtn(0).click(); // hidden button emelent with the same name and path to him
        }).then(function(){
            return widget.NameCounterParty.clear().sendKeys(new_data.counterParty);
        }).then(function(){
            return widget.getNextBtn(2).click();
        }).then(function(){
            return widget.hasClass(widget.getTriggerAction(new_data.triggerAction),'selected').then(function(status){
                if (!status){ return widget.getTriggerAction(new_data.triggerAction).click(); }
            });
        }).then(function(){
            return widget.getNextBtn(3).click();
        }).then(function(){
            return widget.emailInput.clear().sendKeys(new_data.emailInput);
        }).then(function(){
            return widget.getNextBtn(4).click();
        }).then(function(){
            return widget.automationNameInput.clear().sendKeys(new_data.automationName);
        }).then(function(){
            return widget.saveChangeBtn.click();
        })

    };

    /**
     * function delete new Alert message
     *
     * @param {string} title - find Alert message by title
     *
     * @return {promise} click promise
     */
    widget.DeletebyTitle =  function(name) {
        var locations  = widget.AlertActionList;
        return locations.map(function(locationElement, index) {
            return {
                index: index,
                text: widget.getDetailLink(locationElement).getText()
            }
        }).then(function(items) {
            items.forEach(function(item) {
                if (item.text == name) {
                    widget.getDeleteBtn(locations.get(item.index)).click().then(function(){
                        return widget.getAnimationElm(locations.get(item.index)).then(function(duration) {
                            //get time for css animation and do a sleep for wait the button
                            var time_out = parseFloat(duration) * 2000;
                            browser.sleep(time_out);
                        });
                    }).then(function(){
                        return widget.getDeleteConfBtn(locations.get(item.index)).click();
                    }).then(function(){
                        return browser.sleep(1000);
                    })
                }
            });
        });
    };

});
