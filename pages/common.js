module.exports = {
  'setSelect2ValueByLabel': function(label, value) {
    return this.client
      .execute(function(name, val) {
        $('.form-group label:contains("' + name + '")').first().next().find('.select2-choice').mousedown();
        $('.select2-search input').val(val).trigger('input')
      }, [label, value])
      .waitForElementNotPresent('.select2-searching')
      .click('.select2-results li:first-of-type .select2-result-label')
      .waitForElementNotPresent('.select2-results li')
    ;
  },

  'runToolbarMenuAction': function(actionName) {
    return this.client
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("' + actionName + '")')
    ;
  }
}
