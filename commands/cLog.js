/**
 * Logs a message to the console, allowing for adding messages to test output
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser
 *      .log('Testing submitting form')
 *      .click('#weirdSelectorThatMakesItNotClearWeAreSubmitting');
 * };
 * ```
 *
 * @method log
 * @param {string} message The message to log to the console.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */
var chalk = require('chalk');
var infoSymbol = String.fromCharCode('9432');

var log = function(message, color, callback) {
  var browser = this;
  var msg;
  if(arguments.length < 2) {
    callback = color;
    msg = chalk.blue.bold(infoSymbol) + '  ' + message;
  } else {
    msg = chalk.blue.bold(infoSymbol) + '  ' + (chalk.yellow || chalk.white)(message);
  }


  browser.perform(function() {
    console.log(msg);
  });

  if (typeof callback === 'function') {
    callback.call(this);
  }

  return this;
};

exports.command = log;
