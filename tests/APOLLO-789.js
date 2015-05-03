var path = require('path');
var getName = require('../utils/generate-name');

module.exports = {
  tags: ['home'],

  'APOLLO-789': function(client) {
    var objectName = getName('Object');
    var artist = { firstName: getName('Artist first name'), lastName: getName('Artist last name') };
    var accession = getName('Accession');
    var accessionArtist = getName('Accession Artist');
    var image1 = path.resolve(__dirname + '/../files/image1.jpg');
    var image2 = path.resolve(__dirname + '/../files/image2.jpg');
    var image3 = path.resolve(__dirname + '/../files/image3.jpg');
    var groupName = getName('Group');
    var buyerName = "Museum"; // todo: create users and other for test cases
    var sellerName = "Gallery";
    var newBuyerName = 'New';
    var newSellerName = 'Sommer';
    var purchaseInvoiceNumber = getName('Invoice');
    var itemComment = getName('Item comment');
    var addObjectName = 'Obj';
    var destinationName = 'mus';

    //Create a new object
    return client
/*      .cLog('Create new object', 'yellow')
      .page.home.createObject(objectName)
      .waitForElementPresent('.collectable-page')
      //Edit the object's attributes
      .cLog('Edit the object\'s attributes', 'yellow')
      .jqueryClick('.subtitle h4:contains("Artists") + div button:contains("Add")')
      .jqueryClick('.artist-select .btn.btn-menu') // Add new artist
      .waitForElementPresent('input[name="first_name"]')
      .setValue('input[name="first_name"]', artist.firstName)
      .setValue('input[name="last_name"]', artist.lastName)
      .jqueryClick('.artist-select .btn.btn-primary:contains("Create")')
      .waitForElementNotPresent('input[name="first_name"]')
      .waitForElementPresent('.accordion-group a[href^="/artist/"][href$="/objects"]')
      .assert.jqueryExists('a:contains("' + artist.firstName + '")')
      //Add one image to an object
      // todo: add switchoff for phantom case ( cause it failed on uploading files
      .cLog('Add one image to an object', 'yellow')
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
      .cLog('Add multiple images to an object', 'yellow')
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
      .cLog('Set a cover image for an object', 'yellow')
      .moveToElement('#nav-artifact-images .images .image:nth-child(2) .image-component img', 5, 5)
      .waitForElementVisible('#nav-artifact-images .description')
      .jqueryClick('#nav-artifact-images .description a:contains("Use as Cover Image")')
      .moveToElement('.top-section-artifact .info-block', 10, 10)
      .waitForElementNotPresent('#nav-artifact-images .description')
      //Upload a document
      .cLog('Upload a document', 'yellow')
      .jqueryClick('.pull-tabs a[href*="/documents"]')
      .jqueryClick('.quotum-1.container-cols .full-width-subtitle .btn:contains("Add")')
      .waitForElementPresent('.quotum-1 .no-results')
      .assert.elementPresent('.quotum-1 .no-results', 'Created object has not attachments')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image1)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image1.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
      .waitForElementNotPresent('.quotum-1 .no-results')
      .assert.jqueryExists('.documents-table .ember-table-body-container .ember-table-table-row p:contains("image1.jpg")')
      //Duplicate an object
      .cLog('Duplicate an object', 'yellow')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Duplicate Object")')
      .waitForElementPresent('.modal-content')
      .setValue('input[name=accession_number]', accession)
      .setValue('input[name=artist_accession_number]', accessionArtist)
      .jqueryClick('.modal-footer .btn:contains("Duplicate")')
      .waitForElementNotPresent('.modal-content')
      .waitForElementNotPresent('.pull-tabs a.active[href*="/documents"]')
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.info-block-text h5')
      .assert.jqueryExists('.info-block-text h5:contains("' + accession + '")')
      //Move object to another group
      .cLog('Move object to another group', 'yellow')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn-wrap .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Copy to Another Group")')
      .waitForElementPresent('.modal-content')
      .page.common.setSelect2ValueByLabel('Group', 'Group')
      .jqueryClick('.modal-footer .btn.btn-primary:contains("Copy")')
      .waitForElementNotPresent('.spinner')
      .waitForElementNotPresent('.modal-content')
      .waitForElementPresent('.group-page')
      .assert.urlMatch(/\/group\/\d+/, 'Should be redirected to group page')
      //Delete an object
      .cLog('Delete an object', 'yellow')
      .page.home.searchObject(objectName)
      .assert.jqueryExists('!.btn-checkmark.active', 'There should be no checked items')
      .execute(function(objName) {
        $('h2.sub-title:contains("' + objName + '")').parents('.ember-table-table-row').find('.btn-checkmark').click();
      }, [objectName])
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Delete")')
      .acceptAlert()
      .waitForElementNotPresent('.ember-table-table-row')
      .assert.elementPresent('.quotum-1 .no-results')
      //Create a new group
      .cLog('Create a new group', 'yellow')
      .page.home.load()
      .page.home.createGroup(groupName)
      .jqueryClick('a[href^="/group"] h4:contains("' + groupName + '")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.top-section .btn')
      //Set a cover image for a group
      .cLog('Set a cover image for a group', 'yellow')
      .page.group.createObject(objectName)
      .jqueryClick('.pull-tabs a[href$="/images"]')
      .waitForElementVisible('button.btn-addbox.btn-addwide')
      .jqueryClick('button.btn-addbox.btn-addwide')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image1)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image1.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
      .click('.top-section .breadcrumb li:first-of-type a')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .assert.urlMatch(/group\/\d+/, 'Breadcrumb should redirect to group page')
      .assert.jqueryExists('!.btn-checkmark.active', 'There should be no checked items')
      .execute(function(objName) {
        $('h2.sub-title:contains("' + objName + '")').parents('.ember-table-table-row').find('.btn-checkmark').first().click();
      }, [objectName])
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Use As Group Cover Image")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .page.home.load()
      .execute(function(groupName) {
        return $('h4:contains("' + groupName + '")').parents('[data-sort-id]').find('img[src^="http"]').length;
      }, [groupName], function(result) {
        // no-imagae setted with data-url
        this.assert.equal(result.value, 1, 'Group should have cover image');
      })
      //Create a smart group based on artist's name //todo: please describe steps
      //Add tags to multiple objects (Group Actions > Add tags)
      //Sort object table view (artist name / title / date modified) (use All Objects)
      .cLog('Sort object table view (artist name / title / date modified) (use All Objects)', 'yellow')
      .moveToElement('#sidebar', 5, 5)
      .jqueryClick('#sidebar .sidebar-section-handle:contains("Objects")')
      .waitForElementVisible('.sidebar-section a.icon-objects + ul.nav-pills')
      .assert.jqueryExists('.sidebar-section-content-item a:contains("All Objects")')
      .jqueryClick('.sidebar-section-content-item a:contains("All Objects")')
      .waitForElementNotPresent('.spinner')
      .assert.jqueryExists('.active:contains("All Objects")', 'Selected menu item should be active')
      .assert.elementPresent('.collectables-table')
      .assert.elementPresent('.ember-table-header-container')
      .jqueryClick('.ember-table-header-container .sorter:contains("Artist")')
      .waitForElementNotPresent('.spinner')
      .assert.elementPresent('.ember-table-table-row')
      .assert.jqueryExists('.ember-table-header-container .sorter.ascending:contains("Artist"), .ember-table-header-container .sorter.descending:contains("Artist")')
      .jqueryClick('.ember-table-header-container .sorter:contains("Title")')
      .waitForElementNotPresent('.spinner')
      .assert.elementPresent('.ember-table-table-row')
      .assert.jqueryExists('.ember-table-header-container .sorter.ascending:contains("Title"), .ember-table-header-container .sorter.descending:contains("Title")')
      .jqueryClick('.ember-table-header-container .sorter:contains("Date")')
      .waitForElementNotPresent('.spinner')
      .assert.elementPresent('.ember-table-table-row')
      .assert.jqueryExists('.ember-table-header-container .sorter.ascending:contains("Date"), .ember-table-header-container .sorter.descending:contains("Date")')*/
      //Add a new purchase transaction
      .cLog('Add a new purchase transaction', 'yellow')
      .page.home.load()
      .jqueryClick('a[href^="/group/"] h4:contains("Group_for_vvs_1430652278995")') //todo: use generated group name
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .jqueryClick('.ember-table-table-row .btn-checkmark')
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .page.common.runToolbarMenuAction("Add Purchase")
      .waitForElementPresent('.modal-content')
      .assert.elementPresent('.modal-title', 'Should show modal')
      .assert.containsText('.modal-title', 'Add Purchase')
      .page.common.setSelect2ValueByLabel('Buyer', buyerName)
      .page.common.setSelect2ValueByLabel('Seller', sellerName)
      .setValue('input[name="invoice_number"]', purchaseInvoiceNumber)
      .jqueryClick('.modal-footer .btn:contains("Save and Continue")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementNotPresent('.modal-content')
      .waitForElementPresent('.transaction-page')
      .assert.urlMatch(/transactions\/invoice\/\d+/, 'Should be redirected into purchase transaction page')
      //Edit contacts in a purchase transaction
      .cLog('Edit contacts in a purchase transaction', 'yellow')
      .jqueryClick('.nav-tabs a:contains("Details")')
      .waitForElementPresent('.invoice_info')
      .assert.jqueryExists('.nav-tabs a.active:contains("Details")', 'Details tab should be active')
      .jqueryClick('.contacts h4:contains("Contacts") + * .btn:contains("Edit")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Contacts')
      .page.common.setSelect2ValueByLabel('Buyer', newBuyerName)
      .page.common.setSelect2ValueByLabel('Seller', newSellerName)
      .jqueryClick('.modal-footer .btn:contains("Save")')
      .waitForElementNotPresent('.modal-content')
      .assert.jqueryExists('.contacts a:contains("' + newBuyerName  +'")')
      .assert.jqueryExists('.contacts a:contains("' + newSellerName  +'")')
      //Edit values for objects in a purchase transaction
      .cLog('Edit values for objects in a purchase transaction', 'yellow')
      .jqueryClick('.nav-tabs a:contains("Objects")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.ember-table-table-row')
      .jqueryClick('.ember-table-table-row .btn-checkmark')
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .jqueryClick('.full-width-subtitle .btn:contains("Actions")')
      .waitForElementVisible('.full-width-subtitle .btn + .dropdown-menu')
      .jqueryClick('.full-width-subtitle .btn + .dropdown-menu li a:contains("Edit")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Edit item')
      .setValue('.textarea[contenteditable=true]', itemComment)
      .jqueryClick('.modal-footer .btn:contains("Save")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .assert.jqueryExists('.cell-content .shortened:contains("' + itemComment + '")')
      //Add a new object to a purchase transaction
      .cLog('Add a new object to a purchase transaction', 'yellow')
      .jqueryClick('.full-width-subtitle .btn:contains("Add Object")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Add Item')
      .page.common.setSelect2ValueByLabel('', addObjectName, '.modal-body')
      .jqueryClick('.modal-footer .btn:contains("Add")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .assert.jqueryExists('.btn.btn-checkmark:not(".active")', 'Nearly added object isn\'t selected')
      .assert.jqueryExists('.btn.btn-checkmark.active', 'Previously edited item is still selected')
      //Remove an object from a purchase transaction
      .cLog('Remove an object from a purchase transaction', 'yellow')
      .execute(function(objName) {
        // add class to mark original item
        $('.ember-table-table-row .btn-checkmark.active').addClass('save-on-remove').click();
      })
      .assert.jqueryExists('!.btn-checkmark.active', 'There should be no checked items')
      .execute(function(objName) {
        $('.ember-table-table-row .btn-checkmark:not(.save-on-remove)').click();
      })
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .jqueryClick('.full-width-subtitle .btn:contains("Actions")')
      .waitForElementVisible('.full-width-subtitle .btn + .dropdown-menu')
      .jqueryClick('.full-width-subtitle .btn + .dropdown-menu li a:contains("Delete")')
      .acceptAlert()
      .waitForElementNotPresent('.btn-checkmark.active')
      //Add a location change
      .cLog('Add a location change', 'yellow')
      .page.home.load()
      .jqueryClick('a[href^="/group/"] h4:contains("Group_for_vvs_1430652278995")') //todo: use generated group name
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .jqueryClick('.ember-table-table-row .btn-checkmark')
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .page.common.runToolbarMenuAction("Add Location Change")
      .waitForElementPresent('.modal-content')
      .assert.elementPresent('.modal-title', 'Should show modal')
      .assert.containsText('.modal-title', 'Add Location Change')
      .page.common.setSelect2ValueByLabel('Destination Place', destinationName)
      .jqueryClick('.modal-footer .btn:contains("Save and Continue")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementNotPresent('.modal-content')
      .waitForElementPresent('.transaction-page')
      .assert.urlMatch(/transactions\/location\-change\/\d+/, 'Should be redirected into change location transaction page')
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
