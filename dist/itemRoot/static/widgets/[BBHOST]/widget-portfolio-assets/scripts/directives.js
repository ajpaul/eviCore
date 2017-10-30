define(function (require, exports, module) {
    'use strict';
    var d3 = require('d3');
    var angular = require('base').ng;
    var tooltipFactory = require('./tooltip');

    var AXIS_FORMAT = d3.time.format.multi([
        ['%b %Y', function(d) { return d.getMonth() === 0; }],
        ['%b', function(d) { return d.getDate() === 1; }],
        ['', function() { return true; }]
    ]);
    var MARGIN = {top: 0, bottom: 15};

    // @ngInject
    exports.lpWealthAssets = function ($window, utils, lpChartUtils, lpCoreBus, axesFactory, stackFactory) {
        var date = utils.property('date');
        var assets = utils.property('assetAllocation');

        function main(scope, element) {
            var x = d3.time.scale();
            var y = d3.scale.linear();
            var ticks = lpChartUtils.ticks();

            var getItemByDate = (function() {
                var bisector = d3.bisector(function (d, vDate) { return d.date - vDate; }).left;
                return function (vDate) {
                    vDate = d3.time.month(vDate);
                    return scope.data[bisector(scope.data, vDate)];
                };
            })();

            var svgNode = element.find('svg')[0];
            var svg = d3.select(svgNode);

            var state = {
                node: svg,
                xScale: x,
                yScale: y,
                parsers: {
                    x: date,
                    y: assets
                },
                formatters: {
                    x: AXIS_FORMAT
                }
            };
            var axes = axesFactory(state).ticks({x: ticks, y: 0});
            axes.x.tickPadding(3);

            var tooltipState = Object.create(state);
            tooltipState.node = svgNode;
            var tooltip = tooltipFactory(tooltipState);

            var stack = stackFactory(state).itemAttr({
                class: function (d, i) {
                    return 'asset-' + i;
                }
            });

            svg.on('click', function () {
                var vDate = x.invert(d3.mouse(this)[0]);
                if (vDate.getDate() > 15) {
                    vDate.setMonth(vDate.getMonth() + 1, 1);
                }
                lpCoreBus.publish('portfolio-itemSelected', getItemByDate(vDate).date);
            });

            function render() {
                if (scope.range) {
                   x.domain(scope.range);
                }
                axes.render();
                stack.render();
                tooltip.render();
            }

            var selectItem = utils.compose(tooltip.set, getItemByDate);
            var onRange = utils.compose(render, function (r) { scope.range = r; });

            function resize() {
                var w = element.innerWidth(),
                    h = element.innerHeight() - MARGIN.top - MARGIN.bottom;
                if (w <= 0 || h <= 0) {
                    return;
                }

                ticks.width(w);
                x.range([0, w]);
                y.range([0, h]);
                svg.attr({
                    width: w,
                    height: h + MARGIN.top + MARGIN.bottom
                });
                axes.resize(w, h);
                tooltip.resize(w, h);
                render();
            }

            function update() {
                var data = scope.data;
                if (!data) {
                    return;
                }
                var max = d3.max(data, utils.flow(assets, d3.values, d3.sum));
                y.domain([0, max]);
                stack.set(data);
                utils.flow(utils.last, date, selectItem)(data);
                render();
            }

            resize();

            angular.element($window).on('resize', utils.debounce(resize, 250));
            lpCoreBus.subscribe('portfolio-rangeSelected', onRange);
            lpCoreBus.subscribe('portfolio-rangeSelected-live', onRange);
            lpCoreBus.subscribe('portfolio-itemSelected', selectItem);
            scope.$watch('data', update);
        }

        return {
            restrict: 'EA',
            require: '?ngModel',
            priority: Number.MAX_VALUE,
            link: main,
            template: '<svg/>',
            scope: {
                config: '=lpWealthAssets',
                data: '=ngModel'
            }
        };
    };
});
