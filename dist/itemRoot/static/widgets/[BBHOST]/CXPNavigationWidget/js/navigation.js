/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : navigation.js
 *  Description:
 *  Navigation widget
 *  ----------------------------------------------------------------
 */
b$ = b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.NavigationWidget = (function($) {
    'use strict';
    var backbaseDoc = top && top.bd && top.bd.uiEditingOptions.backbaseDocumentation || {},
        Navigation = {
            /**
             * Widget startup method. Enhances preference form
             * @param  {Object} oWidget Backbase Widget object
             */
            start: function(oWidget) {
                var self = this,
                    isMasterpage,
                    templateUrl,
                    dummy,
                    template,
                    partialTemplate;

                oWidget.helpTexts = {
                    navStartResolver: {
                        text: 'Select the navigation root type. Fixed root: the navigation root is fixed for all pages using ' +
                        'this navigation widget. Contextual root (relative): the navigation root and its depth are relative to ' +
                        'the page. Contextual root (absolute): the navigation root is relative to the page, while its depth is ' +
                        'counted from the absolute root.'
                    },
                    uuid: {
                        text: 'Set a page to be the navigation root. The navigation root is the first node of the navigation tree.'
                    },
                    distance: {
                        text: 'Set a depth relative to the current page to be the navigation root. The navigation root is the ' +
                        'first node of the navigation tree. For example: "1 level up" means the parent of this page is the ' +
                        'navigation root. "All levels" means the navigation root is the absolute root.'
                    },
                    rootLevel: {
                        text: 'Set the depth, counting from the absolute root, of the navigation root. The navigation root ' +
                        'is the first node of the navigation tree. For example: "Top level" means the absolute root is the ' +
                        'navigation root.'
                    },
                    showParent: {
                        text: 'Whether to include the navigation root, the first node of the navigation tree, in the navigation menu. '
                    },
                    depth: {
                        text: 'Depth of nested children to show in the menu. A value of "1 level" means that no children are included. ' +
                        'A value "3 Levels" means children and grandchildren are included.'
                    }
                };


                if (bd.designMode === 'true') {
                    isMasterpage = be.utils.module('top.bd.PageMgmtTree.selectedLink').isMasterPage;
                    if (isMasterpage) {
                        templateUrl = oWidget.getPreference('template').replace(/\$\(contextRoot\)/, b$.portal.config.serverRoot);
                        dummy = {
                            links: [{
                                title: '[Level up]',
                                children: [{title: '[Level up]', children: [{title: '[Current page]', children: []}]}]
                            }]
                        };
                        dummy.links[0].children[0].children[0].children.isEmpty = true;
                        template = be.utils.loadTemplateByUrl(templateUrl, false);
                        partialTemplate = be.utils.loadTemplateByUrl(templateUrl.replace(/mustache_top_level/, 'mustache_mid_level'), false);
                        oWidget.body.innerHTML = Mustache.render(template, dummy, {'mustache_mid_level': partialTemplate});
                    }
                }

                oWidget.addEventListener('preferences-form', function(event) {
                    var aPrefs = b$.portal.portalModel.filterPreferences(oWidget.model.preferences.array);
                    for (var i = aPrefs.length - 1; i >= 0; i--) {
                        if (aPrefs[i].label == 'Template') {
                            var sTemplateVariants = oWidget.getPreference('templateList');
                            var arr = sTemplateVariants.split(',');
                            for (var j=0, k=0; j < arr.length; j++, k++) {
                                aPrefs[i].inputType.options[k] = {
                                    label: arr[j],
                                    value: arr[j + 1]
                                };
                                j++;
                            }
                        }
                    }
                });

                oWidget.addEventListener('preferenceFormReady', function (event) {
                    var oForm = event.target;

                    if (!$(oForm.htmlNode).hasClass('bd-navigation-preference-form')) {
                        $(oForm.htmlNode).addClass('bd-navigation-preference-form');
                    }

                    var toggleFormRow = function(value) {
                        if (value == 'fixed') {
                            $(oForm.map.uuid.htmlNode).closest('tr').removeClass('navigation-hidden-pref');
                            $(oForm.map.distance.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                            $(oForm.map.rootLevel.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                        } else if (value == 'fixedContextual') {
                            $(oForm.map.uuid.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                            $(oForm.map.distance.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                            $(oForm.map.rootLevel.htmlNode).closest('tr').removeClass('navigation-hidden-pref');
                        } else {
                            $(oForm.map.uuid.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                            $(oForm.map.distance.htmlNode).closest('tr').removeClass('navigation-hidden-pref');
                            $(oForm.map.rootLevel.htmlNode).closest('tr').addClass('navigation-hidden-pref');
                        }
                    };
                    // skipping queue
                    setTimeout(function() {toggleFormRow(oWidget.getPreference('navStartResolver'))}, 0);

                    oForm.map.navStartResolver.childNodes.forEach(function(option, index) {
                        option.addEventListener('mousedown', function(e) {
                            var sValue = e.target.getAttribute('value');
                            toggleFormRow(sValue);
                        });
                    });
                });

                oWidget.addEventListener('preferencesSaved', function(event) {
                    var oWidget = event.target;
                    if (oWidget === this) {
                        event.target.refreshHTML();
                    }
                });
            }
        };

        return Navigation;
})(jQuery);
