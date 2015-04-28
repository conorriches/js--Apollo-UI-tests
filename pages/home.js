var SELECTOR_ADD_OBJECT_BTN = '.top-section-home .btn.btn-primary';
var SELECTOR_ADD_OBJECT_FORM_TITLE = '.modal-content .title input[name=title]';
var SELECTOR_MODAL_SUBMIT_BTN = '.modal-footer .btn.btn-primary';

module.exports = {
  load: function() {
    var client = this.client;
    return this.client
      .url(function(currentUrl) {
        if(currentUrl.value !== client.globals.urls.HOME_URL) {
          return client
            .url(client.globals.urls.HOME_URL)
            .waitForElementNotPresent('.spinner');
        }
      })
    ;
  },

  createObject: function(objectName) {
    return this.client
      .moveToElement(SELECTOR_ADD_OBJECT_BTN, 10, 10)
      .click(SELECTOR_ADD_OBJECT_BTN)
      .assert.elementPresent('.modal-title', 'Should show modal')
      .assert.containsText('.modal-title', 'Add Object', 'Modal title shoul be "Add object"')
      .click(SELECTOR_ADD_OBJECT_FORM_TITLE)
      .setValue(SELECTOR_ADD_OBJECT_FORM_TITLE, objectName)
      .moveToElement(SELECTOR_MODAL_SUBMIT_BTN, 10, 10)
      .click(SELECTOR_MODAL_SUBMIT_BTN)
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.info-block-text h2 i')
      // todo: add urlMatch assertion
      .assert.urlContains('objects/object', "Should be redirected into object page")
      .assert.urlContains('description')
      .assert.elementPresent('.info-block-text h2 i')
      .assert.containsText('.info-block-text h2 i', objectName, 'Element for object "' + objectName + '" was found')
    ;
  },

  searchObject: function(objectName) {
    var enter = ['\uE006'];

    return this.client
      .moveToElement('#sidebar input.search', 10, 10)
      .setValue('#sidebar input.search', objectName + '\n')
      .pause(500)
      .keys(enter)
      .pause(500)
      .waitForElementNotPresent('.spinner')
    ;
  },

  createSection: function(sectionName) {
    return this.client
      .click('.top-section-home .pull-right .btn:first-of-type')
      .assert.elementPresent('.modal-content', "Should open modal")
      .click('.modal-body input[name=name]')
      .setValue('.modal-body input[name=name]', sectionName)
      .click('.modal-footer .btn-primary')
      .waitForElementNotPresent('.spinner')
      .useXpath()
      .isVisible('//h2[text() = "' + sectionName + '"]', function(result) {
        this.assert.equal(result.value, true, 'Element for created section "' + sectionName + '" was found at page');
      })
      .useCss()
    ;
  },

  createGroup: function(groupName, groupDescription) {
    groupDescription = groupDescription || '';

    return this.client
      .click('.top-section-home .pull-right .btn:nth-child(2)')
      .assert.elementPresent('.modal-content', "Should open modal")
      .click('.modal-body input[name=name]')
      .setValue('.modal-body input[name=name]', groupName)
      .click('.modal-body input[name=description]')
      .setValue('.modal-body input[name=description]', groupDescription)
      .click('.modal-footer .btn-primary')
      .waitForElementNotPresent('.spinner')
      .useXpath()
      .isVisible('//h4[text() = "' + groupName + '"]', function(result) {
        this.assert.equal(result.value, true, 'Element for "'+ groupName +'" was not found');
      })
      .useCss()
      ;
  },

  removeSection: function(sectionName) {
    var jqSelector = 'h2:contains("' + sectionName + '") + .btn-wrap .btn:contains("Delete Section")';
    var client = this.client;

    return this.client
      .execute(function() {
        // patch for phaantomjs
        // todo: create compatibility file
        window.confirm = function(){return true;};
        window.alert = function(){return true;};
      })
      .jqueryClick(jqSelector)
      .acceptAlert()
      .jqueryElement(jqSelector, function(el) { // todo: create assertation for jquery selector
        this.assert.equal(el, null, 'Element for section "' + sectionName + '" was not found at page');
      })
    ;
  },

  removeGroup: function(groupName) {
    var jqSelector = 'a[href^="/group"] h4:contains("' + groupName  + '")';
    var client = this.client;

    return this.client
      .jqueryClick(jqSelector)
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.top-section .btn')
      .execute(function() {
        // patch for phantomjs
        // todo: create compatibility file
        window.confirm = function(){return true;};
        window.alert = function(){return true;};
      })
      .jqueryClick('.top-section .btn:contains("Delete Group")')
      .acceptAlert()
      .waitForElementNotPresent('.spinner')
      .url(function(currentUrl) {
        this.assert.equal(currentUrl.value, client.globals.urls.HOME_URL, 'After removing group should be redirected into home page');
      })
      .jqueryElement(jqSelector, function(el) {
        if(!!el) {
          client.saveScreenshot(client.global.path + '/' + groupName + '.png');
        }
        this.assert.equal(el, null, 'Element for group "' + groupName + '" was not found at page');
      })
    ;
  }
}
