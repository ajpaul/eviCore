/*global b$, window */
(function () {
    'use strict';

    var Container = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('container');

    Container.extend(function (bdomDocument, node) {
        Container.apply(this, arguments);
        this.isPossibleDragTarget = true;
    }, {
        localName: 'SimplePageLayoutContainer',
        namespaceURI: 'launchpad'
    }, {
        template: function(json) {
            var data = {item: json.model.originalItem};
            return window['templates_' + this.localName][this.localName](data);
        },
        handlers: {
            'preferences-form': function () {
                var model = b$.getVC(this.htmlNode).model;
                var lists = {
                    layoutType: model.getPreference('layoutTypeList').split(';'),
                    verticalPosition: model.getPreference('verticalPositionList').split(';')
                };
                var parts;

                model.preferences.array.forEach(function(pref) {

                    if (pref.name !== 'layoutType' && pref.name !== 'verticalPosition') return;

                    lists[pref.name].forEach(function(item, i) {
                        parts = item.split(',');
                        pref.inputType.options = pref.inputType.options || {};
                        pref.inputType.options[i] = {
                            label: parts[0],
                            value: parts[1]
                        };
                    });
                });
            },
            preferencesSaved: function () {
                this.refreshHTML();
            }
        }
    });
})();
