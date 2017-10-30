'use strict';

var utils = global.utils;

module.exports = utils.extends(utils.Elements.getParentWidgetClass(), function(config) {

    config = utils.defaults(config || {}, {
        name: 'widget-places',
        title: 'Places',
        element: element(by.css('.lp-places'))
    });

    var widget = this;

    widget.name = config.name;
    widget.title = config.title;

    /**
     * Test elements
     */
    widget.body = config.body || utils.getWidgetElement(config);
    widget.searchInput = widget.body.element(by.css('div.search-input input'));
    widget.servicesButton = widget.body.element(by.css('div[dropdown="dropdown"] button'));
    widget.servicesList = widget.body.element(by.css('div[dropdown="dropdown"] button'));
    widget.tabs = widget.body.element(by.css('ul.nav-tabs'));
    widget.placesList = widget.body.element(by.css('ul.list-group'));
    widget.placesListItems = widget.placesList.element(element.all(by.css('li.list-group-item')));
    widget.map = widget.body.element(by.css('div.map_canvas'));

    /**
     * Wait For Widget To be Loaded
     */
    widget.waitForWidgetToLoad = function() {
        return utils.waitForElement(widget.searchInput);
    };

    /**
     * Open Services list
     */
    widget.openServicesList = function() {
        return utils.click(widget.servicesButton);
    };

    /**
     * Check Services list visibility
     */
    widget.servicesListIsVisible = function() {
        return widget.servicesList.isDisplayed();
    };

    /**
     * Check map visibility
     */
    widget.mapIsVisible = function() {
        return widget.map.isDisplayed();
    };

    /**
     * Check places List visibility
     */
    widget.placesListIsVisible = function() {
        return widget.placesList.isDisplayed();
    };

    /**
     * Get places List item
     */
    widget.getPlacesListItem = function(value) {
        return widget.placesList.element(by.css("li.list-group-item:nth-child(" + value + ")"));
    };

    /**
     * Search for location
     */
    widget.search = function(value) {
        return widget.searchInput.sendKeys(value)
            .then(function () {
                return widget.searchInput.sendKeys(protractor.Key.ENTER);
            });
    };

    /**
     * Get Search value
     */
    widget.getSearchValue = function() {
        return widget.searchInput.getAttribute('value');
    };

    /**
     * Open location widget tab
     */
    widget.openLocationTab = function(value) {
        return utils.click(widget.tabs.element(by.css("span[translate='" + value + "']")));
    };
});
