'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = config || {
        name: 'widget-profile-portfolio',
        title: 'Profile - Portfolio',
        element: element(by.css('.lp-portfolio'))
    };

    var widget = this;
    widget.name = config.name;
    widget.title = config.title;

    /**
     * Test elements
     */
    widget.body = utils.getWidgetElement(config);
    widget.content = widget.body.element(by.css('.lp-widget-content.widget-body'));

    /**
     * Wait For Widget To be Loaded
     */
    widget.waitForWidgetToLoad = function() {
        return utils.waitForElement(widget.content);
    };

    /**
     * Get profile portfolio text
     */
    widget.getContentText = function() {
        return widget.content.getText();
    };
});
