/**
 * Simple helper command to wrap function
 * NOTE: this - inside function is 'client'
 * @param callback
 * @returns {exports}
 */
module.exports.command = function(callback) {
  callback.call(this);
  return this;
}
