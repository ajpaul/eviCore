define(function (require, exports, module) {
    'use strict';

    /**
     * structured content directive
     * attrs:
     *     lp-content-item - (optional) content reference
     *     template-url - (optional) template url
     * event-listeners:
     *     content.changed({ contentRef, templateUrl }) - Asynchronously replaces the content
     * usage: <div lp-content-item="" template-url=""></div>
     *        If the content-ref (via lp-content-item) or the template-url is provided, the contents
     *        will be loaded asynchronously.
     * @ngInject
     */
    exports.lpContentItemAsync = function ($compile, lpContent, lpContentUtils) {
        var CONTENT_REF_ATTR = 'lpContentItemAsync';
        var TEMPLATE_URL_ATTR = 'templateUrl';

        var createParams = function (contentRef, templateUrl) {
            var TEMPLATE_URL_PARAM = 'templateUrl';
            var CONTENT_REF_PARAM = 'contentRef';

            var params = {};

            // directive uses custom template url preference
            if (templateUrl) {
                params[TEMPLATE_URL_PARAM] = [
                    TEMPLATE_URL_PARAM,
                    templateUrl
                ];
            }

            // directive uses custom content reference preference
            if (contentRef) {
                params[CONTENT_REF_PARAM] = [
                    CONTENT_REF_PARAM,
                    contentRef
                ];
            }

            return params;
        };

        var linkFn = function (scope, element, attrs) {
            var render = function (contentRef, templateUrl) {
                var params = createParams(contentRef, templateUrl);
                return lpContent.get(params)
                    .then(function (response) {
                        var content = $compile(response && response.data)(scope);
                        element.html(content);
                    });
            };

            var init = function () {
                var contentRef = attrs[CONTENT_REF_ATTR];
                var templateUrl = attrs[TEMPLATE_URL_ATTR];

                if (contentRef || templateUrl) {
                    render(contentRef, templateUrl);
                }
            };

            init();
        };

        return {
            restrict: 'AE',
            link: linkFn
        };
    };

    /**
     * structured content drag-n-drop directive
     * attrs:
     *     lp-content-item-picker - (optional) the initial content ref (probably from the widget preferences)
     *     on-change - (optional) callback for changes in contentRef, provides `contentRef` in scope
     * usage: <div lp-content-item-picker="{{contentRef}}" on-change="updateWidget(contentRef)"></div>
     *        Does not asynchronously load content - if this is required, use lpContentItem.
     * @ngInject
     */
    exports.lpContentItem = function ($compile, $parse, lpContent, lpContentUtils, lpWidget) {
        var CONTENT_REF_ATTR = 'lpContentItem';

        var ACTIVE_CLASS = 'lp-over-content-item';
        var EMPTY_CLASS = 'lp-empty-content-item';

        var CONTENT_SERVICES_PROTOCOL = 'cs';

        var generateRef = function (item) {
            return [CONTENT_SERVICES_PROTOCOL,
                    item.repository === 'contentRepository' ? item.repository : '@portalRepository',
                    item.contentUId
                   ].join(':');
        };

        // init in the CXP manager
        var initDesignMode = function (element, contentRef, contentRefChanged) {
            var dragItem;

            if (!contentRef) {
                element.addClass(EMPTY_CLASS);
            }

            lpWidget.addEventListener('bdDrop.enter', function(e) {
                var item = e.detail.info.helper.bdDragData.fileDataArray[0]; // e.detail.info.helper is a HTMLElement!@$#%

                if (item.metaData && item.metaData['cmis:objectTypeId'] &&
                    item.metaData['cmis:objectTypeId'].property === 'bb:structuredcontent') {
                        dragItem = item;
                        element.addClass(ACTIVE_CLASS);
                } else {
                    dragItem = undefined;
                }
            });

            lpWidget.addEventListener('bdDrop.leave', function(e) {
                element.removeClass(ACTIVE_CLASS);
            });

            // save contentRef preference on a widget
            lpWidget.addEventListener('bdDrop.drop', function(e) {
                if (!dragItem) {
                    return;
                }

                var newRef = generateRef(dragItem);

                dragItem = undefined;
                element.removeClass(EMPTY_CLASS);
                element.removeClass(ACTIVE_CLASS);

                contentRefChanged(newRef);
            });
        };

        var linkFn = function (scope, element, attrs) {
            var contentRef = attrs[CONTENT_REF_ATTR];

            var setContentRef = function (ref) {
                if (!attrs.onChange) { return; }
                $parse(attrs.onChange)(scope, { contentRef: ref });
            };

            // init in the CXP manager
            if (lpContentUtils.isEditable(lpWidget)) {
                initDesignMode(element, contentRef, setContentRef);
            }
        };

        return {
            restrict: 'AE',
            link: linkFn
        };
    };
});
