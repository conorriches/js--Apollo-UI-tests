var path = require('path');
var getName = require('../utils/generate-name');
var util = require('util');
var _ = require('lodash');

module.exports = {
  tags: ['home'],

  'Try to create object and them search it': function(client) {
    var objectName = getName('Object');

    return client
      .page.home.load()
      .page.home.createObject(objectName)
      .page.home.searchObject(objectName)
      .assert.jqueryExists('h2:contains("' + objectName + '")')
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

  'Remove test or empty groups': function(client) {
    var groupName = getName('Group');
    return client
      .forEach([1,2], function(item) {
        return this.page.home.createGroup(groupName + item)
      })
      .page.home.getSectionsList(function(sections) {
      var allGroups = _.flatten(_.pluck(sections, 'groups'));
      var testGroups = _.filter(allGroups, function(group) {
        return group.title.indexOf('Group_for_') == 0
      });

      return client.forEach(testGroups, function(item) {
        return this.page.home.removeGroup(item.title);
      })
    })
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
