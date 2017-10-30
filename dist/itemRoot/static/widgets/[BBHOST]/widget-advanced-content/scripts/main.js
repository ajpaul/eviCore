/*global define, bd, be*/
define(function(require, exports, module) {
    'use strict';

    module.name = 'widget-advanced-content';

    var bus = require('base').bus;
    var ContentFactory = require('./content-factory');
    var ContentAccordion = require('./content-accordion');
    var AdvancedContentTemplate = require('./advanced-content');
    
    ContentFactory
        .registerConstructor(ContentAccordion)
        .registerConstructor(AdvancedContentTemplate);

    module.exports = function(widget) {
        bus.publish('cxp.item.loaded', {id: widget.model.name});
        
        return ContentFactory
            .setup(widget)
            .init();
    };
});