define(function (require, exports, module) {
    'use strict';

    var base = require('base');
    var angular = base.ng;
    var utils = base.utils;
    var d3 = require('d3');

    var CATEGORIES_COUNT = 8;

    function categoryClass(d, i) {
        return 'cat-' + i % CATEGORIES_COUNT;
    }

    function convert(d) {
        return {
            name: d.assetTypeName && d.zoneName
                ? d.assetTypeName + '<br/>' + d.zoneName
                : d.assetTypeName || d.zoneName || d.equitySectorName,
            size: d.percentage
        };
    }

    function parse(data) {
        return {children: data.map(convert)};
    }

    function text(d) {
        return d.name + '<br/>' + d.size + '%';
    }

    // @ngInject
    exports.lpAggregatedTreemap = function ($window, tooltipFactory, treemapFactory, wealthUtils) {
        function main(scope, element) {
            var node = d3.select(element[0]);

            var tooltip = tooltipFactory({
                node: node,
                formatters: {
                    tooltip: text
                }
            });

            var state = {
                node: node,
                parser: utils.property('size'),
                formatter: utils.compose(function (s) { return '<span>' + s + '</span>'; }, text)
            };
            var treemap = treemapFactory(state)
                .attr('class', 'treemap')
                .itemAttr({class: categoryClass})
                .on({
                    mouseover: tooltip.show,
                    mouseout: tooltip.hide
                });

            function render() {
                treemap.render();
            }

            function resize() {
                var parent = element.parent().parent(),
                    w = parent.parent().width(),
                    h = parent.height();
                if (w <= 0 || h <= 0) {
                    return;
                }
                treemap.resize(w, h);
                render();
            }
            resize();

            function update(data) {
                state.data = parse(data);
                treemap.render();
                render();
            }

            wealthUtils.onParentPanelToggle(element, resize);
            angular.element($window).on('resize', utils.debounce(resize, 250));
            scope.$watch('data', update);
        }

        return {
            restrict: 'EA',
            require: '?ngModel',
            priority: Number.MAX_VALUE,
            link: main,
            scope: {
                data: '=lpAggregatedTreemap'
            }
        };
    };
});
