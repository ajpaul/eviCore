define(function (require, exports, module){
	'use strict';
	var d3 = require('d3');
    var angular = require('base').ng;

	var AXIS_FORMAT = d3.time.format.multi([
		['%Y', function(d) { return d.getMonth() === 0; }],
		['%b', function(d) { return d.getDate() === 1; }],
		['', function() { return true; }]
	]);
    var X_LABELS_DY = -20;

    function getTimespan(date2, span) {
        var date1 = new Date(date2);
        if (span.indexOf('year') === -1) {
            date1.setMonth(date2.getMonth() - parseInt(span, 10));
        } else {
            date1.setFullYear(date2.getFullYear() - parseInt(span, 10));
        }
        return [date1, date2];
    }

	// @ngInject
	exports.lpWealthMinimap = function ($window, utils, wealthUtils, lpCoreBus, areaFactory, axesFactory, brushFactory) {
        var bus = lpCoreBus;
        var date = utils.property('date');
        var value = function (d) {
            return d.datapoint.totalPortfolioValue;
        };

        function main(scope, element) {
            var config = scope.config;
            var el = element.find('svg')[0];
            var svg = d3.select(el);
            var x = d3.time.scale();
            var y = d3.scale.linear();
            var zoom;

            var state = {
                node: svg,
                xScale: x,
                yScale: y,
                parsers: {
                    x: date,
                    y: value
                },
                formatters: {
                    x: AXIS_FORMAT
                }
            };

            var area = areaFactory(state).attr('class', 'area');
            var axes = axesFactory(state).ticks({y: 0});
            axes.x.tickPadding(X_LABELS_DY);

            var brush = brushFactory(state);

            function getZoomFn(eventName) {
                return function () {
                    bus.publish(eventName, brush.range());
                };
            }

            function hasEnoughData(data, frequency) {
                if (!data || !data[frequency] || data[frequency].length < 2) {
                    return false;
                }
                return true;
            }

            function updateRange(range, span) {
                if (!hasEnoughData(scope.data, config.frequency)) {
                    return;
                }
                var timespan = getTimespan(range[1], span),
                    domain = x.domain();

                if (timespan[0] < domain[0]) {
                    timespan[0] = domain[0];
                }

                brush
                    .range(timespan)
                    .render();
                zoom();
            }

            function render() {
                var data = scope.data;
                if (!hasEnoughData(data, config.frequency)) {
                    return;
                }
                data = data[config.frequency];
                state.data = data;

                x.domain(d3.extent(data, date));
                y.domain(d3.extent(data, value));

                area.render();
                axes.render();
                updateRange(x.domain(), config.timespan);
            }

            function resize() {
                var width = element.innerWidth(),
                    height = element.innerHeight();
                if (width <= 0 || height <= 0) {
                    return;
                }
                x.range([0, width]);
                y.range([height, 0]);
                svg.attr({width: width, height: height});
                area.resize(width, height);
                axes.resize(width, height);
                brush.resize(width, height);
                render();
            }

            zoom = getZoomFn('portfolio-rangeSelected');
            brush.on('brush', getZoomFn('portfolio-rangeSelected-live'))
                .on('brushend', zoom);


            resize();
            wealthUtils.sticky(element, 50);
            wealthUtils.onParentPanelToggle(element, resize);

            scope.$watch('data', render);
            scope.$watch('config.timespan', function (t) {
                updateRange(brush.range(), t);
            });
            scope.$watch('config.frequency', resize);

            scope.$on('$destroy', function () {
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
                data: '=ngModel',
                config: '=lpWealthMinimap',
                onRender: '&onRender'
            }
        };

    };
});
