/**
 * Allow iterate over collection and make some action on it's items
 * @type {exports|module.exports}
 * @private
 *
.assert.elementPresent('.error-msg')
.forEach([5,6,7,8,9], function(item) {
  // note this = client
  return this
    .url('http://some.url/sign-in#' + item)
    .url(function(result){
      this.cLog(result.value);
    })
    .pause(15000)
})
.then(function() {
    this.assert.containsText('.error-msg', 'doesn\'t match our records')
})
 */
var _ = require('lodash');
var util = require('util');
var events = require('events');

function forEach() {
  events.EventEmitter.call(this);
}

util.inherits(forEach, events.EventEmitter);


forEach.prototype.command = function(collection, iterator, callback) {
  collection = collection instanceof Array? collection: [];
  var self = this;
  var counter = 0;
  var count = collection.length;

  collection.forEach(function() {
    //console.log(util.inspect(self));
    iterator.apply(self.api, arguments)
    .then(function() {
      counter++;
      self.api.cLog('Iteration #' + counter, collection[counter - 1]);

      if(counter == count) {
        self.emit('complete');
      }
    })
  });

  return this;
};

module.exports = forEach;
