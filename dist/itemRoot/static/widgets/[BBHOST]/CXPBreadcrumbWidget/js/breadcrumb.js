/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : breadcrumb.js
 *  Description:
 *  Breadcrumb widget
 *  ----------------------------------------------------------------
 */
b$ = b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.BreadcrumbWidget = (function ($) {
    'use strict';

    var Breadcrumb = {
        /**
         * Widget startup method. Enhances preference form
         * @param  {Object} oWidget Backbase Widget object
         */
        start: function (oWidget) {
            var self = this,
                isMasterpage,
                templateUrl,
                dummy,
                template,
                partialTemplate;

            oWidget.helpTexts = {
                navStartResolver: {
                    text: 'Absolute: Set the path from your current context to a level in the hierarchy. Relative: Set the number of ancestors to show in the path.'
                },
                rootLevel: {
                    text: 'Highest level in the hierarchy that shows in the breadcrumb'
                },
                distance: {
                    text: 'Number of ancestors (steps) to show above the current context, Only numbers allowed'
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
                
                if (!$(oForm.htmlNode).hasClass('bd-breadcumb-preference-form')) {
                    $(oForm.htmlNode).addClass('bd-breadcumb-preference-form');
                }

                var toggleFormRow = function(value) {
                    if (value == 'fixedContextual') {
                        $(oForm.map.distance.htmlNode).closest('tr').addClass('breadcrumb-hidden-pref');
                        $(oForm.map.rootLevel.htmlNode).closest('tr').removeClass('breadcrumb-hidden-pref');
                    } else {
                        $(oForm.map.rootLevel.htmlNode).closest('tr').addClass('breadcrumb-hidden-pref');
                        $(oForm.map.distance.htmlNode).closest('tr').removeClass('breadcrumb-hidden-pref');
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

            oWidget.addEventListener('preferencesSaved', function (event) {
                var oWidget = event.target;
                if (oWidget === this) {
                    event.target.refreshHTML();
                }
            });
        }
    };

    return Breadcrumb;
})(jQuery);
