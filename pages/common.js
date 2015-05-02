module.exports = {
  'setSelect2ValueByLabel': function(label, value) {
    return this.client
      .execute(function(name, val) {
        $('.form-group label:contains("' + name + '")').next().find('.select2-choice').mousedown();
        $('.select2-search input').val(val).trigger('input')
      }, [label, value])
      .waitForElementNotPresent('.select2-searching')
      .click('.select2-results li:first-of-type .select2-result-label')
      .waitForElementNotVisible('.select2-results li')
    ;
  }
}
