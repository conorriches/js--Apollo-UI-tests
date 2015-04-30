module.exports = {
  login: function(username, password) {
    var client = this.client;

    return this.client
      .cLog('AuthPage.login(' + username + ', ' + password + ')')
      .url(client.globals.urls.SIGN_IN_URL, function() {
        client.deleteCookies();
      })
      .waitForElementPresent('body')
      .assert.elementPresent('.btn')
      .assert.elementPresent('.login input')
      .assert.elementPresent('.password input')
      .assert.elementPresent('.forgot-password')
      .setValue('.login input[type=text]', username)
      .setValue('.password input[type=password]', password)
      .moveToElement('.btn', 10, 10)
      .click('.btn')
      .pause(1000)
      .waitForElementNotPresent('.spinner')
  },
};

