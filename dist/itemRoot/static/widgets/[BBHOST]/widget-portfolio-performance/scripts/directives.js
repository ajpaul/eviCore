define(function (require, exports, module) {
    'use strict';
    var d3 = require('d3');
    var angular = require('base').ng;

    var DEFAULT_Y_DOMAIN = 10; // If there is no range how much of the single value should be covered (%) on the Y axis
    var DEFAULT_BAR_WIDTH = 50; // In case there is no range, bar width should not use whole chart
    var MARGIN = {top: 10, bottom: 20},
        Y_LABELS_SHIFT = {top: -5, left: 15},
        AXIS_FORMATS = {
            monthly: d3.time.format.multi([
                ['%b %Y', function(d) { return d.getMonth() === 0; }],
                ['%b', function(d) { return d.getDate() === 1; }],
                ['', function() { return true; }]
            ]),
            yearly: d3.time.format.multi([
                ['%Y', function(d) { return d.getMonth() === 0; }],
                ['', function() { return true; }]
            ])
        };
    var yLabelsTransform = 'translate(' + Y_LABELS_SHIFT.left + ',' + Y_LABELS_SHIFT.top + ')';

    // @ngInject
    exports.lpWealthPerformance = function ($window, utils, wealthUtils, lpChartUtils, lpCoreBus, lpCoreI18n, axesFactory, barsFactory, lineFactory, pointsFactory, tooltipFactory) {
        var bus = lpCoreBus;
        var date = utils.property('date');
        var data = utils.property('data');

        var hasVCR = function (d, none) { return d.datapoint.valueChangeRate === null ? 0 : 1; },
            getFirstIndex = d3.bisector(hasVCR).right;

        var dateBisect = d3.bisector(date).left;

        function getFirstDate(vData) {
            var i = getFirstIndex(vData),
                item = vData[i];
            return i === 0 && hasVCR(item) ? -1 : date(item);
        }

        function main(scope, element) {
            var config = scope.config;
            var x = d3.time.scale();
            var y = d3.scale.linear();
            var ticks = lpChartUtils.ticks();
            var accum, width, height, domainWidth, firstVCRDate, mode, modeIsAvailable, singleTick, barWidth;
            var modeIsSet = true;
            var el = element.find('svg')[0];
            var yRate;

            function value(d) {
                return d.datapoint.totalPortfolioValue;
            }

            function rate(d) {
                return mode ? d.datapoint.valueChangeRate : d.datapoint.totalPortfolioValue;
            }

            function maxExtent(arr1, arr2) {
                return [Math.min(d3.min(arr1), d3.min(arr2)), Math.max(d3.max(arr1), d3.max(arr2))];
            }

            function barClassName(d) {
                return rate(d) < 0 ? 'negative' : '';
            }

            yRate = utils.compose(y, rate);

            function barY(d) {
                return singleTick ? 0 : (mode ? Math.min(y(0), yRate(d)) : yRate(d));
            }

            function barX(d) {
                return singleTick ? ((width - DEFAULT_BAR_WIDTH) / 2) : (state.xScale(state.parsers.x(d)) - barWidth / 2);
            }

            var svg = d3.select(el);
            var chart = svg.append('g').attr('transform', 'translate(0,' + MARGIN.top + ')');

            var numFormat = d3.format('.2s');
            var timeFormats = {
                    monthly: d3.time.format('%b %Y'),
                    yearly: d3.time.format('%Y')
                };
            var rateFormat = d3.format('+,.2f');

            var state = {
                node: chart,
                centerSingleTick: true,
                xScale: x,
                yScale: y,
                parsers: {
                    x: date,
                    y: function (d) {
                        return Math.max(0, rate(d));
                    }
                },
                formatters: {
                    y: function (d) { return mode ? d + '%' : numFormat(d); },
                    tooltip: function (d) {
                        var currency = d.datapoint.currency;
                        return (
                            '<div>' + timeFormats[config.frequency](date(d)) + '</div>' +
                            '<div>' + lpCoreI18n.formatCurrency(value(d), currency) + '</div>' +
                            (mode ? '<div>' + rateFormat(rate(d)) + '%</div>' : '') +
                            '<div> &rarr; ' + lpCoreI18n.formatCurrency(d.datapoint.cashIn, currency) + '</div>' +
                            '<div> &larr; ' + lpCoreI18n.formatCurrency(d.datapoint.cashOut, currency) + '</div>' +
                            (mode ? '<div>Cumul: ' + data(accum[dateBisect(accum, date(d))]).toFixed(2) + '%</div>' : '')
                        );
                    }
                }
            };

            var accumState = {
                node: chart,
                xScale: x,
                yScale: y,
                parsers: {
                    x: date,
                    y: data
                }
            };

            var axes = axesFactory(state).ticks({x: ticks, y: 5});
            var bars = barsFactory(state)
                .attr('class', 'bars')
                .itemAttr({
                    class: barClassName,
                    y: barY,
                    x: barX,
                    height: function (d) {
                        return singleTick ? height : (mode ? Math.abs(y(0) - yRate(d)) : height - yRate(d));
                    }
                });
            var line = lineFactory(accumState);
            var points = pointsFactory(accumState).attr('class', 'dots');

            chart.append('g').attr('class', 'x axis zero').append('line');

            var tooltip = tooltipFactory(state);

            function accumulative(range, vData) {
                var from = dateBisect(vData, range[0], 0, vData.length - 1);
                var to = dateBisect(vData, range[1] || range[0], 0, vData.length - 1);
                var ret = [];
                var curr1, prev1, curr2, prev2;

                for (var i = from, j; i <= to; i++) {
                    j = i - from;
                    curr1 = 1 + rate(vData[i]) / 100;
                    curr2 = j === 0 ? curr1 : curr1 * (j === 1 ? prev1 : prev2);
                    prev1 = curr1;
                    prev2 = curr2;

                    ret.push({
                        date: vData[i].date,
                        data: (curr2 - 1) * 100
                    });
                }

                return ret;
            }

            function zoom() {
                if (!scope.data) {
                     return;
                }

                var model = scope.data[config.frequency];
                var range = scope.range;
                singleTick = true;
                if (range && model.length > 1) {
                    singleTick = false;
                    x.domain(range);
                    if (modeIsAvailable !== range[0] > firstVCRDate) {
                        modeIsAvailable = range[0] > firstVCRDate;
                        mode = modeIsAvailable && modeIsSet;
                        scope.onSwitch({modeIsAvailable: modeIsAvailable});
                    }
                }

                if (mode) {
                    accum = accumulative(range, model);
                    y.domain(maxExtent(accum.map(data), model.map(rate)));
                } else {
                    accum = [];
                    var firstVal = value(model[0]);
                    y.domain(singleTick ? [firstVal * (1 - DEFAULT_Y_DOMAIN / 100), firstVal] : d3.extent(model, rate));
                }

                accumState.data = accum;
                line.render();
                points.render();

                axes.render();
                barWidth = (domainWidth / wealthUtils.getDomainSize(x) * 0.75) || DEFAULT_BAR_WIDTH;
                bars.barWidth(barWidth);
                bars.render();

                chart.select('.x.axis').attr('transform', 'translate(' + (singleTick ? (width / 2) : 0) + ',' + height + ')');
                chart.select('.y.axis').selectAll('text').attr('transform', yLabelsTransform);
                chart.select('.x.zero').attr('transform', 'translate(0,' + y(0) + ')');
            }

            function resize() {
                width = element.innerWidth();
                height = element.innerHeight() - MARGIN.top - MARGIN.bottom;
                if (width <= 0 || height <= 0) {
                    return;
                }

                ticks.width(width);
                x.range([0, width]);
                y.range([height, 0]);
                svg .attr('width', width)
                    .attr('height', height + MARGIN.top + MARGIN.bottom);

                axes.resize(width, height);
                tooltip.resize(width, height);

                chart.select('.x.zero line').attr('x2', width);
                render();
            }

            function render() {
                var vData = scope.data;
                if (!vData) {
                    return;
                }
                vData = vData[config.frequency];
                if (!vData || vData.length < 1) {
                    return;
                }

                state.data = vData;
                firstVCRDate = getFirstDate(vData);
                x.domain(d3.extent(vData, date));
                domainWidth = width / vData.length * wealthUtils.getDomainSize(x);

                state.formatters.x = AXIS_FORMATS[config.frequency];

                zoom();
            }

            resize();

            wealthUtils.onParentPanelToggle(element, resize);

            var onRange = utils.compose(zoom, function (r) { scope.range = r; });

            bus.subscribe('portfolio-rangeSelected', onRange);
            bus.subscribe('portfolio-rangeSelected-live', onRange);

            scope.$watch('data', render);
            scope.$watch('config.frequency', render);
            scope.$watch('config.mode', function (m) {
                modeIsSet = m;
                mode = modeIsAvailable && modeIsSet;
                zoom();
            });

            angular.element($window).on('resize', utils.debounce(resize, 250));
        }

        return {
            restrict: 'EA',
            require: '?ngModel',
            priority: Number.MAX_VALUE,
            link: main,
            template: '<svg/>',
            scope: {
                config: '=lpWealthPerformance',
                data: '=ngModel',
                onSwitch: '&'
            }
        };
    };
});
