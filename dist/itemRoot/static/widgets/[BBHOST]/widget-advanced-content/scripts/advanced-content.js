define(function (require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var BaseICE = require('./base-ice');
    var DraggableICEBehavior = require('./draggable-ice');
    var superProto = BaseICE.prototype;
    var CONSTANTS = {
        bgImage: '.bg-image',
        bpWidget: '.bp-widget'
    };
    var imageTargeters = {
        widget: function (widget) {
            return $(widget.body).closest(CONSTANTS.bpWidget);
        },
        fullscreen: function () {
            return $("#main");
        }
    };
    /**
     * @param {jQuery} $htmlNode root node to start searching from
     * @returns {String} background image src that is suitable for a LP background
     */
    function getLPBackground($htmlNode) {
        return $htmlNode.find('.lp-background-image:first img').prop('src');
    }
    
    function setBackgroundImage(config) {
        var widget = config.widget;
        var $widget = config.$widget;
        var bgImageContainer = widget.getPreference('bgImageContainer');
        var bgImage = $widget.find(CONSTANTS.bgImage);
        var containerType = widget.getPreference('bgImageContainer');
        var bgImageTarget = imageTargeters[containerType](widget);
        var bgSize = widget.getPreference('bgImageSize');
        var bgImageScroll = widget.getPreference('bgImageScroll');

        // If there is no image, return
        if (bgImage.length === 0) {
            return;
        }

        if (bgImage && bgImageTarget) {
            bgImageTarget.css({
                'background-image': 'url(' + bgImage.attr('src') + ')',
                'background-size': bgSize,
                'background-position': 'center top',
                'background-repeat': 'no-repeat',
                'background-attachment': bgImageScroll
            });
        }
    }
    
    /**
     * @param widget
     * @constructor
     */
    var AdvancedContentTemplate = function () {
        BaseICE.call(this);
    };

    AdvancedContentTemplate.prototype = new BaseICE();
    AdvancedContentTemplate.prototype.setHeight = function () {
        var height = this.widget.getPreference('height');
        if (height) {
            this.$widget.height(height);
        }
    };
    AdvancedContentTemplate.prototype.setBackground = function () {
        superProto.fixEditing(this.$widget);
        setBackgroundImage({
            widget: this.widget,
            $widget: this.$widget
        });
    };
    AdvancedContentTemplate.prototype.init = function () {
        var self = this;
        superProto
            .init
            .call(this)
            .then(function () {
                self.DraggableICEBehavior = new DraggableICEBehavior(self.widget, {});
                self.DraggableICEBehavior.init(bd.designMode);

                self.setHeight();

                if (self.$widget.is(':visible')) {
                    self.setBackground();
                }

                self.widget.model.addEventListener('PrefModified', function (evt) {
                    if (evt.attrName === 'widgetContentsUpdated') {
                        self.setHeight();
                        self.setBackground();
                    }
                });

                function launchpadShowHandler() {
                    self.setBackground();
                    if ($(self.widget.htmlNode).attr('data-event') === 'launchpad:show') {
                        // clear "deferred" event bus
                        $(self.widget.htmlNode).removeAttr('data-event');
                    }
                }

                $(self.widget.htmlNode).on('launchpad:show', function () {
                    launchpadShowHandler();
                });

                // expect "deferred" event in case
                // if 'launchpad:show' was fired before 'launchpad:show' listener was added
                if ($(self.widget.htmlNode).attr('data-event') === 'launchpad:show') {
                    launchpadShowHandler();
                }

                // LPES-3167
                if (bd.designMode) {
                    var node = self.widget;
                    var panel;
                    while (node.parentNode) {
                        node = node.parentNode;
                        if (node.nodeName === 'TCont') {
                            var tCont = node;
                            break;
                        }
                        panel = node;
                    }

                    if (tCont) {
                        $(tCont.htmlNode).find('.bp-tContFn-tab').on('click', function (e) {
                            var panelIndex = tCont.childNodes.indexOf(panel);
                            var index = $(e.currentTarget).index();
                            // tCont childNodes are shifted and the fallback node is the first actually:
                            // [1] -> 1
                            // [2] -> 2
                            // [*] -> 0 (its node is inserted first)
                            // so we shift the index as well:
                            index = (index + 1) % tCont.childNodes.length;

                            if (panelIndex === index && getLPBackground($(panel.htmlNode)) === getLPBackground(self.$widget)) {
                                self.setBackground();
                            }
                        });
                    }

                    self.widget.addEventListener('preferences-form', function() {
                        var aPrefs = b$.portal.portalModel.filterPreferences(self.widget.model.preferences.array);
                        for (var i = 0; i < aPrefs.length; i++) {
                            var item = aPrefs[i];
                            if (item.name === 'templateUrl') {
                                var sTemplateVariants = self.widget.getPreference('templateList');
                                var arr = sTemplateVariants.split(',');
                                for (var j = 0, k = 0; j < arr.length; j++, k++) {
                                    aPrefs[i].inputType.options[k] = {
                                        label: arr[j],
                                        value: arr[j + 1]
                                    };
                                    j++;
                                }
                                break;
                            }
                        }
                    });
                }
            });
    };

    module.exports = AdvancedContentTemplate;
});