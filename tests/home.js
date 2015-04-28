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
      .useCss()
    ;
  },

  'Try to add/remove section': function(client) {
    var sectionName = 'Section #' + Date.now();
    return client
      .page.home.load()
      .page.home.createSection(sectionName)
      .useXpath()
      .isVisible('//h2[text() = "' + sectionName + '"]', function(result) {
        this.assert.equal(result.value, true, 'Element for created section was found at page');
      })
      .useCss()
      .page.home.removeSection(sectionName)
      .useXpath()
      .jqueryElement('h3.some_strinage_class', function(el) {
        this.assert.equal(el, null, 'Element for created section was not found at page');
      })
      ;
  },


  'Try to add group': function(client) {
    var groupName = 'Group #' + Date.now();
    return client
      .page.home.load()
      .page.home.createGroup(groupName)
      .useXpath()
      .isVisible('//h4[text() = "' + groupName + '"]', function(result) {
        this.assert.equal(result.value, true);
      })
      .useCss() //todo: create command to wrap xpath commands
      ;
  },

  before: function(client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '..', 'pages'));

    return client.page.auth
      .login(client.globals.credentials.CORRECT_LOGIN, client.globals.credentials.CORRECT_PASSWORD)
    ;
  }
}
