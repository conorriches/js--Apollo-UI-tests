var SELECTOR_ADD_OBJECT_BTN = '.top-section-home .btn.btn-primary';
var SELECTOR_ADD_OBJECT_FORM_TITLE = '.modal-content .title input[name=title]';
var SELECTOR_MODAL_SUBMIT_BTN = '.modal-footer .btn.btn-primary';

module.exports = {
  load: function() {
    var client = this.client;
    return this.client
      .url(function(currentUrl) {
        if(currentUrl !== client.globals.urls.APPLICATION_URL) {
          return client
            .url(client.globals.urls.APPLICATION_URL)
            .waitForElementNotPresent('.spinner');
        }
      })
    ;
  },

  createObject: function(objectName) {
    return this.client
      .moveToElement(SELECTOR_ADD_OBJECT_BTN, 10, 10)
      .click(SELECTOR_ADD_OBJECT_BTN)
      .assert.elementPresent('.modal-title')
      .assert.containsText('.modal-title', 'Add Object')
      .click(SELECTOR_ADD_OBJECT_FORM_TITLE)
      .setValue(SELECTOR_ADD_OBJECT_FORM_TITLE, objectName)
      .moveToElement(SELECTOR_MODAL_SUBMIT_BTN, 10, 10)
      .click(SELECTOR_MODAL_SUBMIT_BTN)
      .waitForElementNotPresent('.spinner')
    ;
  },

  searchObject: function(objectName) {
    var enter = this.client.keys.ENTER;
    return this.client
      .moveToElement('#sidebar input.search', 10, 10)
      .setValue('#sidebar input.search', objectName)
      .pause(500)
      .keys([enter])
      .pause(500)
      .waitForElementNotPresent('.spinner')
    ;
  }
}
