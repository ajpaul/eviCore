define(function (require, exports, module) {
    'use strict';

    var base = require('base');
    var angular = base.ng;
    var utils = base.utils;
    var d3 = require('d3');

    function parse(data) {
        var parser = d3.time.format('%Y').parse;
        data.forEach(function (d) {
            d.date = parser(d.year);
        });
        return data;
    }

    var date = utils.property('date');
    var amount = utils.property('amount');

    // @ngInject
    exports.lpAggregatedBars = function ($window, lpCoreI18n, axesFactory, barsFactory, tooltipFactory, wealthUtils) {
        function link(scope, element) {
            var $ = element.html('<div class="ytm"/>');
            var x = d3.scale.ordinal();
            var y = d3.scale.linear();
            var svg = d3.select(element[0]).append('svg');
            var state = {
                node: svg,
                xScale: x,
                yScale: y,
                parsers: {
                    x: date,
                    y: amount
                },
                formatters: {
                    x: d3.time.format('%Y'),
                    tooltip: utils.compose(lpCoreI18n.formatCurrency, amount)
                },
                data: []
            };
            var bars = barsFactory(state).attr('class', 'bars');
            var axes = axesFactory(state).ticks({y: 0});
            axes.x.tickPadding(-25);
            var tooltip = tooltipFactory(state);

            function render() {
                tooltip.offset({x: x.rangeBand() / 2});
                axes.render();
                bars.render();
            }

            function update(data) {
                var parent = element.parent().parent(),
                    width = parent.parent().width(),
                    height = parent.height();
                if (width <= 0 || height <= 0) {
                    return;
                }

                $.find('.ytm').html('<h2>' + data.averageYieldToMaturity.toFixed(2) + '%</h2>Avg. YTM');
                data = parse(data.datapoints);
                state.data = data;
                x.domain(data.map(date));
                y.domain([0, d3.max(data, amount)]);

                render();
            }

            function resize() {
                var parent = element.parent().parent(),
                    width = parent.parent().width(),
                    height = parent.height();
                if (width <= 0 || height <= 0) {
                    return;
                }

                width -= $.find('.ytm').width();
                x.rangeBands([0, width], .1);
                y.range([height, 0]);
                svg.attr({width: width, height: height});
                axes.resize(width, height);
                tooltip.resize(width, height);
                render();
            }
            resize();

            wealthUtils.onParentPanelToggle(element, function(){
                resize();
                update(scope.data);
            });
            angular.element($window).on('resize', utils.debounce(resize, 250));
            scope.$watch('data', update);
        }

        return {
            restrict: 'EA',
            require: '?ngModel',
            priority: Number.MAX_VALUE,
            link: link,
            scope: {
                data: '=lpAggregatedBars'
            }
        };
    };
});
