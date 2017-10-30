define(function (require, exports, module) {
    'use strict';

    var d3 = require('d3');
    var angular = require('base').ng;

    var TOOLTIP_WIDTH = 80;

    // @ngInject
    module.exports = function (state) {
        var $el = angular.element('<div class="details"><div class="line"/><table/></div>').width(TOOLTIP_WIDTH),
            $line = $el.find('.line'),
            item, width;

        $el.insertAfter(state.node);

        function row(d, i) {
            return '<tr><td><label class="legend asset-' + i + '">' + d.value + '%</label></td></tr>';
        }

        function tpl(d) {
            return d3.entries(d.assetAllocation).map(row).join('');
        }

        function resize(w, h) {
            width = w;
            $el.height(h);
        }

        function render() {
            if (!item) { return; }
            var x = state.xScale(state.parsers.x(item));
            var dx = x < 0 ? 0 :
                     x < TOOLTIP_WIDTH / 2 ? x :
                     x > width ? TOOLTIP_WIDTH :
                     x > width - TOOLTIP_WIDTH / 2 ? x + TOOLTIP_WIDTH - width : TOOLTIP_WIDTH / 2;
            $line.css('left', dx + 'px');
            $el.css('left', x - dx + 'px');
        }

        return {
            set: function (i) {
                item = i;
                $el.find('table').html(tpl(item));
                render();
            },
            resize: resize,
            render: render
        };
    };
});
