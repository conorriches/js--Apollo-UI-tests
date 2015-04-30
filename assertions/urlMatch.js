var util = require('util');
exports.assertion = function(expected, msg) {

  this.message = msg || util.format('Testing if the URL match "%s".', expected);
  this.expected = expected;

  this.pass = function(value) {
    if (!(this.expected instanceof  RegExp)) {
      this.expected = new RegExp(this.expected)
    }
    return this.expected.test(value);
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    this.api.url(callback);
    return this;
  };

};
