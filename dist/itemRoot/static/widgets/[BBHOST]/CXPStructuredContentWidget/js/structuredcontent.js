/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : structuredcontent.js
 *  Description:
 *
 * Source code for CXP Universal Structured content widget
 *  ----------------------------------------------------------------
 */

b$ = b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.StructuredContentWidget = (function($) {
    'use strict';

    var CONTENT_SERVICES_PROTOCOL = 'cs';

    var StructuredContent = {

        /**
         * prefModified callback
         * @param  {Object} oWidget Backbase widget object
         */
        prefModified: function(oWidget) {
            oWidget.refreshIncludes();

            var $widget = $(oWidget.htmlNode);
            $('.bd-structured-content-widget', $widget).attr('data-type', oWidget.getPreference('contentType') || 'Content');
        },
        /**
         * Initialize structured content widget
         * @param  {Object} oWidget Backbase widget object
         */
        start: function(oWidget) {
            var contentRef = oWidget.getPreference('contentRef'),
                dragItem,
                $widget = $(oWidget.htmlNode),
                isMasterpage = window.be ? be.utils.module('top.bd.PageMgmtTree.selectedLink')['isMasterPage'] : false,
                isManageable = isMasterpage || (
                    oWidget.model.manageable === 'true' ||
                    oWidget.model.manageable === '' ||
                    oWidget.model.manageable === undefined
                );

            if (!isManageable) return;
            if (!contentRef) {
                $widget.addClass('bd-empty-structured-content');
            }

            $('.bd-structured-content-widget', $widget).attr('data-type', oWidget.getPreference('contentType') || 'Content');

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

            oWidget.addEventListener('bdDrop.enter', function(e) {
                // console.log('bdDrop.enter');
                var item = e.detail.info.helper.bdDragData.fileDataArray[0]; // e.detail.info.helper is a HTMLElement!@$#%

                if (item.metaData && item.metaData['cmis:objectTypeId'] &&
                    item.metaData['cmis:objectTypeId'].property === 'bb:structuredcontent') {
                        dragItem = item;
                        $widget.addClass('bd-over-structured-content');
                } else {
                    dragItem = undefined;
                }
            });
            oWidget.addEventListener('bdDrop.leave', function(e) {
                // console.log('bdDrop.leave');
                $widget.removeClass('bd-over-structured-content');
            });
            oWidget.addEventListener('bdDrop.drop', function(e) {
                // console.log('bdDrop.drop');
                if (dragItem) {
                    if (!oWidget.model.preferences.getByName('contentRef')) {
                        var contentRefPref = b$.portal.portalModel.createPreference('contentRef', 'contentRef', undefined, '');
                        oWidget.model.preferences.add(contentRefPref);
                    }
                    oWidget.setPreference('contentRef', [CONTENT_SERVICES_PROTOCOL, dragItem.repository === 'contentRepository' ? dragItem.repository : '@portalRepository', dragItem.contentUId].join(':'));
                    oWidget.model.save(function(){
                        oWidget.refreshHTML();
                        $widget.removeClass('bd-empty-structured-content');
                    });
                    $widget.removeClass('bd-over-structured-content');
                }
                dragItem = undefined;
            });

            if (window.bd && window.bd.bindDropEvents) {
                window.bd.bindDropEvents(oWidget.htmlNode);
            }
        }
    };

    return StructuredContent;
})(jQuery);