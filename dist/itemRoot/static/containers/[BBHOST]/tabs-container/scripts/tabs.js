/*global b$, window, console $*/
(function (b$, window, $) {
    "use strict";

    var NS = b$.bdom.getNamespace('launchpad');
    var DeckContainer = NS.classes.DeckContainer;


    // Constants
    var CONTAINERS = {
        TABS: 'Tabs',
        PANEL: 'PanelContainer'
    };

    //  ----------------------------------------------------------------
    var Tabs = DeckContainer.extend(function (bdomDocument, node) {
        DeckContainer.apply(this, arguments);
        this.isPossibleDragTarget = false;
    }, {
        localName: 'Tabs',
        namespaceURI: 'launchpad',
        DOMReady: function() {
            DeckContainer.prototype.DOMReady.call(this, arguments);
            var self = this;
            $(this.getDisplay('tab', true)).on({
                click: function (event) {
                    var sId = $(this).data('id');
                    self.setTabSelected(sId);
                },
                keydown: function (event) {
                    var enterKeyCode = 13;
                    var spaceKeyCode = 32;
                    if (event.which === spaceKeyCode || event.which === enterKeyCode) {
                        var sId = $(this).data('id');
                        self.setTabSelected(sId);
                    }
                }
            });
        },
        setTabSelected: function(sId) {
            this.showPanel(sId);
            //this.updateUrl();
        },

        showPanel: function(panelId){
            var aTabs = this.getDisplay('tab', true);
            var panel;

            for (var i = 0; i < aTabs.length; i++) {
                $(aTabs[i]).removeClass('active');
            }

            if (typeof panelId === 'number' || typeof panelId === 'string') {
                panel = this.getPanel(panelId);
            } else if (typeof panelId === 'object') {
                panel = panelId;
            }

            if (panel) {
                $(this.htmlNode).find('.--tab[data-id="' + panel.model.name + '"]').addClass('active');
            }

            DeckContainer.prototype.showPanel.apply(this, arguments);
        },

        /**
         * Overrides DeckContainer that provides preferences when creating new panels
         * @param  {object} data Default values
         * @return {object}      New panel model object
         */
        _getNewPanelData: function(data){
            var order = this._getPanels().length;
            data = data || {};
            data.title = data.title || this.PANEL_NAME_PREFIX + ( order + 1 );

            var props = [{
                type: 'string',
                name: 'title',
                label: 'Title',
                value: data.title || '',
                viewHint: 'text-input,designModeOnly,manager'
            }, {
                type: 'string',
                name: 'icon',
                value: data.icon || '',
                label: 'Icon (optional)',
                viewHint: 'text-input,designModeOnly,manager'
            }]

            return {
                area: data.order || order,
                order: data.order || order,
                id: data.id || this._getNewPanelName(),
                properties: props
            };
        }
    }, {
        template: function (json) {
            var data = {
                item: json.model.originalItem
            };
            var sTemplate = window['templates_' + this.localName][this.localName](data);
            return sTemplate;
        },
        handlers: {
            'preferencesSaved': function(event) {
                var container = event.target;
                var containerType = container.nodeName;

                if (containerType === CONTAINERS.PANEL) {
                    event.currentTarget.refreshHTML();
                }
            }
        }
    }
);
})(b$, window, $);
