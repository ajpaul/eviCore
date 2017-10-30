var mock = require('mock');

var Widget = function(){
  this.model = {
    contextItemName: 'retail-banking',
    uuid: '56224844-348d-4b7c-9839-0ee1d64e6143'
  };
  this.getPreference = function(){};
  this.setPreference = function(){};
};

// Test Stubs

var stubs = {
  content: '<p>Structured content<p>'
};


// Test Dummies

var dummies = {
  $http: {
    get: function() {
      return Promise.resolve(stubs.content)
    }
  },
  lpWidget: function(){ return new Widget(); }
}

// Exports

module.exports = {
  dummies: dummies,
  stubs: stubs
};