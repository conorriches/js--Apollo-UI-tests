var SELECTOR_ADD_OBJECT_BTN = '.top-section .toolbar .btn.btn-primary';
var SELECTOR_MODAL_SUBMIT_BTN = '.modal-footer .btn.btn-primary';
var SELECTOR_ADD_OBJECT_FORM_TITLE = '.modal-content .title input[name=title]';

module.exports = {
  createObject: function(objectName) {
    return this.client
      .cLog('HomePage.createObject(' + objectName + ')')
      .waitForElementPresent(SELECTOR_ADD_OBJECT_BTN)
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
      .assert.urlMatch(/objects\/object\/\d+\/description/, "Should be redirected into object page")
      .assert.elementPresent('.info-block-text h2 i')
      .assert.containsText('.info-block-text h2 i', objectName, 'Element for object "' + objectName + '" was found')
      ;
  },
}
