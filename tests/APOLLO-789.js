var path = require('path');
var getName = require('../utils/generate-name');

module.exports = {
  tags: ['home'],

  'APOLLO-789': function(client) {
    var objectName = getName('Object');
    var artist = {firstName: getName('Artist first name'), lastName: getName('Artist last name')};
    var image1 = path.resolve(__dirname + '/../files/image1.jpg');
    var image2 = path.resolve(__dirname + '/../files/image2.jpg');
    var image3 = path.resolve(__dirname + '/../files/image3.jpg');

    //Create a new object
    return client
      .page.home.createObject(objectName)
      .pause(2000)
      .waitForElementPresent('.collectable-page')
    //Edit the object's attributes
      .jqueryClick('.subtitle h4:contains("Artists") + div button:contains("Add")')
      .jqueryClick('.artist-select .btn.btn-menu') // Add new artist
      .waitForElementPresent('input[name="first_name"]')
      .setValue('input[name="first_name"]', artist.firstName)
      .setValue('input[name="last_name"]', artist.lastName)
      .jqueryClick('.artist-select .btn.btn-primary:contains("Create")')
      .waitForElementNotPresent('input[name="first_name"]')
      .waitForElementPresent('.accordion-group a[href^="/artist/"][href$="objects"]')
      .assert.jqueryExists('a:contains("' + artist.firstName + '")')
    //Add one image to an object
      .jqueryClick('.pull-tabs a[href$="/images"]')
      .waitForElementVisible('button.btn-addbox.btn-addwide')
      .jqueryClick('button.btn-addbox.btn-addwide')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image1)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image1.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
    //Add multiple images to an object
      .click('.actions .add-image')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image2)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image2.jpg')
      .setValue('.modal-body input.files[type="file"]', image3)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image3.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
    //Set a cover image for an object
      .moveToElement('#nav-artifact-images .images .image:nth-child(2) .image-component img', 5, 5)
      .waitForElementVisible('#nav-artifact-images .description')
      .jqueryClick('#nav-artifact-images .description a:contains("Use as Cover Image")')
      .moveToElement('.top-section-artifact .info-block', 10, 10)
      .waitForElementNotPresent('#nav-artifact-images .description')
      .pause(10000)
    //Upload a document
    //Duplicate an object
    //Move object to another group
    //Delete an object
    //Create a new group
    //Create a smart group based on artist's name
    //Add tags to multiple objects (Group Actions > Add tags)
    //Sort object table view (artist name / title / date modified) (use All Objects)
    //Set a cover image for a group
    //Add a new purchase transaction
    //Edit contacts in a purchase transaction
    //Edit values for objects in a purchase transaction
    //Add a new object to a purchase transaction
    //Remove an object from a purchase transaction
    //Add a location change
    //Add a new location
    //Delete a location
    //Add 6 levels of sublocation to a location
    //Generate a full inventory report
    //Generate an inventory report with a selection of objects
    //Add a new artist
    //Delete an artist
    //Add a new contact
    //Delete a contact
    //Save User settings / Account settings
    //Save a new password
    //Add a user via Multi-Access tab
    //Switch from one account to another via the sidebar
    //Search for an object
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
