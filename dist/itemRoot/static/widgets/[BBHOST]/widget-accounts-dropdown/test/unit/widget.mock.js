var Widget = module.exports = function Widget () {

};

Widget.prototype.model = {
    'name': 'MockedWidget'
};
Widget.prototype.getPreference = function() {
    return 'test';
};
Widget.prototype.setPreference = function() {};
