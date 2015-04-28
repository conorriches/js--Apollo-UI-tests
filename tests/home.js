var path = require('path');
var getName = require('../utils/generate-name');

module.exports = {
  tags: ['home'],

  'Try to create object and them search it': function(client) {
    var objectName = getName('Object');

    return client
      .page.home.load()
      .page.home.createObject(objectName)
      .page.home.searchObject(objectName)
      .useXpath()
      .isVisible('//h2[text()="' + objectName + '"]', function(result) {
        this.assert.equal(result.value, true);
      })
      .useCss()
    ;
  },

  'Try to add/remove section': function(client) {
    var sectionName = getName('Section');
    return client
      .page.home.load()
      .page.home.createSection(sectionName)
      .page.home.removeSection(sectionName)
      ;
  },


  'Try to add/remove group': function(client) {
    var groupName = getName('Group');
    return client
      .page.home.load()
      .page.home.createGroup(groupName)
      .page.home.removeGroup(groupName)
      ;
  },

  before: function(client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '..', 'pages'));

    return client.page.auth
      .login(client.globals.credentials.CORRECT_LOGIN, client.globals.credentials.CORRECT_PASSWORD)
      .resizeWindow(1024, 800) // done to get normal creen size with phantomjs screenshots
    ;
  }
}
