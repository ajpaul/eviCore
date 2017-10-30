'use strict';

var utils = global.utils;

module.exports = function(config) {

    config = utils.defaults(config || {}, {
            name: 'widget-transactions-list',
            title: 'Transactions List'
        });

    var widget = this;

    widget.body = $(".bp-container.lp-springboard-container");
    widget.name = config.name;
    widget.title = config.title;

    widget.locators = {
        navigationLing: by.css("a[href='/springboard']"),
        areaHolders: by.css(".lp-springboard-area-holder"),
        holderByName: function (name) {
            return by.xpath("//div[contains(@class, 'lp-springboard-area-holder')][.//div[@class='lp-springboard-widget-title'][.='"+name+"']]");
        },
        Holder: {
            buttonRemove: by.css("button.lp-widget-control-close"),
            buttonMaximize: by.css("button.lp-widget-control-maximize")
        },
        popupCloseButton: by.css(".bd-dialog-container>a.bd-dialog-closeIcon")
    };

    widget.openSpringboard = function () {
        var link = element(widget.locators.navigationLing);
        return utils.waitForElement(link)
            .then(function () {
                return link.click();
            });
    };

    widget.isVisible = function () {
        return utils.waitForElement(widget.body)
            .then(function () {
                return element.all(widget.locators.areaHolders);
            })
            .then(function (areaHolders) {
                return areaHolders.map(function (areaHolder) {
                    return utils.waitForVisible(areaHolder);
                })
            })
            .then(function (areaHoldersVisiblePromises) {
                return utils.q.all(areaHoldersVisiblePromises);
            });
    };

    widget.Holder = function (rootElement) {
        this.rootElement = rootElement;

        this.isDisplayed = function () {
            return this.rootElement.isDisplayed();
        };

        this.open = function () {
            return this.rootElement.click();
        };

        this.remove = function () {
            return this.rootElement.$(widget.locators.Holder.buttonRemove).click();
        };

        this.maximize = function () {
            return this.rootElement.$(widget.locators.Holder.buttonMaximize).click();
        };
    };

    widget.getHolder = function (name) {
        return new this.Holder(this.body.element(this.locators.holderByName(name)));
    };

//Encapsulated behavior
    widget.actions = {};

    widget.actions.openHolder = function (name) {
        return widget.getHolder(name).open();
    };
    //TODO: Move it from here!
    widget.actions.getLocationWidgetElement = function () {
        var element = $(".lp-springboard-widget-body>.lp-places");
        return element;
    };

    widget.actions.closeAnyPopup = function () {
        var closeButton = $(widget.locators.popupCloseButton);
        return closeButton.isPresent()
            .then(function (isPresent) {
                if(isPresent) return closeButton.click();
            })
    }

};