define(function (require, exports, module) {
    'use strict';
    
    var constructors = [];
    var AdvancedContentTemplate = require('./advanced-content');
    
    var ContentFactory = {
        widget: null,
        templateUrl: null,
        setup: function (widget) {
            this.widget = widget;
            this.templateUrl = widget.model.getPreference('templateUrl');
            return this;
        },
        registerConstructor: function (constructor) {
            constructors.push(constructor);
            return this;
        },
        init: function () {
            var ContentConstructor = null;
            var messageConstructorFound = 'Constructor has been found';
            
            try {
                constructors.forEach(function (Constructor) {
                    if (typeof Constructor.isSameType === 'function' && Constructor.isSameType(ContentFactory.templateUrl)) {
                        ContentConstructor = Constructor;
                        throw new Error(messageConstructorFound);
                    }
                });
            } catch (error) {
                if (error.message !== messageConstructorFound) {
                    return console.log('Something went wrong during the initialization');
                }
            }

            ContentConstructor = ContentConstructor || AdvancedContentTemplate;

            return new ContentConstructor().setup(this.widget).init();
        }
    };
    
    module.exports = ContentFactory;
});