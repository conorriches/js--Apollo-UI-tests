/**
 * Check if jquery selector can match elements on the page
 * to use positive assertion ( that elements are present ) - use normal jquery selector
 * this.client.assert.jqueryExists('body')
 * to use inverted assertion ( that elements are NOT presented ) add prefix !
 * this.client.assert.jqueryExists('!body.fakeClass')
 */

var util = require('util');

var execute = function(selector) {
  return $(selector).length;
};

exports.assertion = function(selector, msg) {
  var defaultMessage;

  if (selector[0] === '!') {
    this.isPositiveTest = false;
    this.selector = selector.replace('!', '');
    defaultMessage = util.format('Testing if the $("%s") is NOT presented at page', this.selector)
  } else {
    this.isPositiveTest = true;
    this.selector = selector;
    defaultMessage = util.format('Testing if the $("%s") is presented at page', this.selector)
  }

  this.message = msg || defaultMessage;

  this.expected = function() {
    return selector;
  };


  this.pass = function(value) {
    return this.isPositiveTest ? value > 0 : value == 0;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    this.api.execute(execute, [this.selector], callback);
    return this;
  };

};
