
'use strict';

var utils = global.utils;

module.exports = function(config) {

    config = config || {
        name: 'widget-notifications',
        title: 'Notifications',
        element: element(by.css('.lp-notifications'))

        };

    var widget = this;

    widget.body = utils.getWidgetElement(config);
    var selectors = {
        notifications: by.repeater('notification in notCtrl.model.notifications track by notification.id'),
        danger: by.css('.alert-danger'),
        value : by.css('span[translate-values]'),
        close: by.css('.alert button')
    };

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
            widget.body = res.body;
            d.resolve(widget);
        });
        return d.promise;
    };
    /**
     * The widget should be visible on the page
     * @return {Boolean}
     */
    widget.isVisible = function() {
        utils.waitForElement(widget.body);
        return widget.body.isDisplayed();
    };
    /**
     *  function get notification popup
     * @param {string} index of elements from the list
     * @return {promise} element text
     */
    widget.getNotificationPopup = function(index) {
        return widget.body.element(selectors.notifications.row(index || 0)).element(selectors.value).getText();
    };
    /**
     *  function close popup message
     * @param {string} index of elements from the list
     * @return {promise} element click
     */
    widget.closePopupMessage = function(index) {
        widget.body // notification widget body
          .element(selectors.notifications.row(index || 0)) // div.sticky-notification
          .element(selectors.close) //button.close
          .click();
    };
};
