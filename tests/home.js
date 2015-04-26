var path = require('path');

module.exports = {
  tags: ['home'],

  'Try to create object and them search it': function(client) {
    var searchStr = '#' + Date.now();
    var objectName = 'Object ' + searchStr;

    return client
      .page.home.load()
      .page.home.createObject(objectName)
      .waitForElementPresent('.info-block-text h2 i')
      // todo: add urlMatch assertion
      .assert.urlContains('objects/object')
      .assert.urlContains('description')
      .assert.elementPresent('.info-block-text h2 i')
      .assert.containsText('.info-block-text h2 i', objectName)
      .page.home.searchObject(searchStr)
      .useXpath()
      .isVisible('//h2[text()="' + objectName + '"]', function(result) {
        this.assert.equal(result.value, true);
      })
    ;
  },

  before: function(client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '..', 'pages'));

    return client.page.auth
      .login(client.globals.credentials.CORRECT_LOGIN, client.globals.credentials.CORRECT_PASSWORD)
    ;
  }
}
