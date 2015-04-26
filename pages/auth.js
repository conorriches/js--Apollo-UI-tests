module.exports = {
  login: function (username, password) {
    var client = this.client;

    return this.client
      .url(client.globals.urls.SIGN_IN_URL, function() {
        client.deleteCookies();
      })
      .waitForElementPresent('body', client.globals.timeouts.WAIT_FOR_CONDITIONAL_TIMEOUT)
      .assert.elementPresent('.btn')
      .assert.elementPresent('.login input')
      .assert.elementPresent('.password input')
      .assert.elementPresent('.forgot-password')
      .setValue('.login input[type=text]', username)
      .setValue('.password input[type=password]', password)
      .moveToElement('.btn', 10, 10)
      .click('.btn')
  },
};

