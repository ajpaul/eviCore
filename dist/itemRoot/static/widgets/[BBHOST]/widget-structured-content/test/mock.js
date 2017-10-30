/*global require, module */

var mock = {
    utils: {
        noop: function () { return undefined; }
    }
};

var callback = function (fn) { fn && fn(); };

var widget = function () {
    return {
        getPreference: mock.utils.noop,
        setPreference: mock.utils.noop,
        addEventListener: mock.utils.noop,
        refreshHTML: callback,
        model: {
            save: callback
        }
    };
};

var contentUtils = function () {
    return {
        isEditable: function (widget) {
            return false;
        }
    };
};

var location = function () {
    return {
        url: function () {
            return '';
        }
    };
};

var portal = function () {
    return {
        root: 'TEST_ROOT'
    };
};

var dummies = {
    $location: function () { return location(); },
    lpContentUtils: function () { return contentUtils(); },
    lpWidget: function () { return widget(); },
    lpPortal: function () { return portal(); }
};

module.exports = {
    dummies: dummies
};
