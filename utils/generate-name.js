var localName = process.env.USER;

module.exports = function(name) {
  return '' + name + '_for_' + localName + '_' + Date.now();
}
