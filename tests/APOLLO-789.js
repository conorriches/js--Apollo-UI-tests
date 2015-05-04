var path = require('path');
var getName = require('../utils/generate-name');

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
var newLocationName = getName('Location');
var newLocationStreet = 'Кедышко';
var newArtistName = 'Stony C';
var listerCount;

module.exports = {
  tags: ['home'],

  'Create new object': function(client) {
    return client
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
  },
  'Add one image to an object': function(client) {
    // todo: add switchoff for phantom case ( cause it failed on uploading files
    return client
      .jqueryClick('.pull-tabs a[href$="/images"]')
      .waitForElementVisible('button.btn-addbox.btn-addwide')
      .jqueryClick('button.btn-addbox.btn-addwide')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image1)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image1.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
  },
  'Add multiple images to an object': function(client) {
    return client
      .click('.actions .add-image')
      .waitForElementPresent('.modal-content')
      .setValue('.modal-body input.files[type="file"]', image2)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image2.jpg')
      .setValue('.modal-body input.files[type="file"]', image3)
      .assert.valueContains('.modal-body input.files[type="file"]', 'image3.jpg')
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .click('.modal-footer .btn.btn-primary')
      .waitForElementNotPresent('.modal-content')
  },
  'Set a cover image for an object': function(client) {
    return client
      .moveToElement('#nav-artifact-images .images .image:nth-child(2) .image-component img', 5, 5)
      .waitForElementVisible('#nav-artifact-images .description')
      .jqueryClick('#nav-artifact-images .description a:contains("Use as Cover Image")')
      .moveToElement('.top-section-artifact .info-block', 10, 10)
      .waitForElementNotPresent('#nav-artifact-images .description')
  },
  'Upload a document': function(client) {
    return client
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
  },
  'Duplicate an object': function(client) {
    return client
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
  },
  'Move object to another group': function(client) {
    return client
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
  },
  'Delete an object': function(client) {
    return client
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
  },
  'Create a new group': function(client) {
    return client
      .page.home.load()
      .page.home.createGroup(groupName)
      .jqueryClick('a[href^="/group"] h4:contains("' + groupName + '")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementPresent('.top-section .btn')
  },
  'Set a cover image for a group': function(client) {
    return client
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
  },
  'Sort object table view (artist name / title / date modified) (use All Objects)': function(client) {
    return client
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
      .assert.jqueryExists('.ember-table-header-container .sorter.ascending:contains("Date"), .ember-table-header-container .sorter.descending:contains("Date")')
  },
  'Add a new purchase transaction': function(client) {
    return client
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
  },
  'Edit contacts in a purchase transaction': function(client) {
    return client
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
  },
  'Edit values for objects in a purchase transaction': function(client) {
    return client
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
  },
  'Add a new object to a purchase transaction': function(client) {
    return client
      .jqueryClick('.full-width-subtitle .btn:contains("Add Object")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Add Item')
      .page.common.setSelect2ValueByLabel('', addObjectName, '.modal-body')
      .jqueryClick('.modal-footer .btn:contains("Add")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .assert.jqueryExists('.btn.btn-checkmark:not(".active")', 'Nearly added object isn\'t selected')
      .assert.jqueryExists('.btn.btn-checkmark.active', 'Previously edited item is still selected')
  },
  'Remove an object from a purchase transaction': function(client) {
    return client
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
  },
  'Add a location change': function(client) {
    return client
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
  },
  'Add a new location': function(client) {
    return client
      .moveToElement('#sidebar', 5, 5)
      .jqueryClick('#sidebar .sidebar-section-handle:contains("Locations")')
      .waitForElementPresent('.leaflet-tile-container')
      .waitForElementPresent('.nums') //todo: wrap into helper
      .execute(function() {
        return parseInt($('.load-more .nums').text().split('/').pop().trim());
      }, [], function(result)  {
        listerCount = result.value;
      })
      .jqueryClick('.toolbar .btn:contains("Add location")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Add location')
      .assert.jqueryExists('.modal-footer .btn.disabled:contains("Save")')
      .setValue('.modal-body .title input', newLocationName)
      .moveToElement('input[placeholder="Please Enter Address"]', 5, 5)
      .click('input[placeholder="Please Enter Address"]')
      .setValue('input[placeholder="Please Enter Address"]', newLocationStreet)
      .waitForElementVisible('.pac-matched')
      .click('.pac-matched')
      .waitForElementNotVisible('.pac-matched')
      .setValue('.textarea[contenteditable=true]', itemComment)
      .assert.jqueryExists('!.modal-footer .btn.disabled:contains("Save")', 'After entering location data "Save" button should be enabled')
      .assert.valueContains('.modal-body .street_name input', newLocationStreet, 'Should get street from address')
      .jqueryClick('.modal-footer .btn:contains("Save")')
      .waitForElementPresent('.spinner')
      .waitForElementNotPresent('.spinner')
      .waitForElementNotPresent('.modal-content')
      .execute(function() {
        return parseInt($('.load-more .nums').text().split('/').pop().trim());
      }, [], function(result)  {
        return client.assert.equal(listerCount + 1, result.value, 'Adding location should increase counter');
      })
  },
  'Add 6 levels of sublocation to a location': function(client) {
    return client
      .page.common.addFilter('Name', newLocationName)
      .assert.jqueryExists('.ember-table-cell .title:contains("' + newLocationName + '")')
      .click('.ember-table-cell .title')
      .waitForElementPresent('.location-page')
      .assert.urlMatch(/location\/\d+/, 'Should be redirected into location page')
      .execute(function() {
        return parseInt($('.full-width-subtitle .group-info b').text().trim());
      }, [], function(result) {
        listerCount = result.value;
        return client.assert.equal(listerCount, 0, 'There should be no sublocations');
      })
      .forEach([1, 2, 3, 4, 5, 6], function(item) {
        var sublocationName = getName('SubLocation#' + item);
        return client
          .jqueryClick('.full-width-subtitle .btn:contains("Add Sublocation")')
          .waitForElementPresent('.modal-content')
          .setValue('.modal-body input[name="title"]', sublocationName)
          .jqueryClick('.modal-footer .btn:contains("Save")')
          .waitForElementNotPresent('.modal-content')
          .pause(500)
          .jqueryClick('.ember-table-table-row:contains("' + sublocationName + '") .btn-checkmark')
          .pause(500)
          .execute(function(){
            return $('.btn-checkmark.active').length;
          },[], function(result) {
            return client.assert.equal(result.value, 1, 'Should be checked only one sublocation');
          })
      })
      .execute(function() {
        return parseInt($('.full-width-subtitle .group-info b').text().trim());
      }, [], function(result) {
        listerCount = result.value;
        return client.assert.equal(listerCount, 6, 'There should be 6 sublocations');
      })
  },
  'Delete a location': function(client) {
    return client
      .moveToElement('#sidebar', 5, 5)
      .jqueryClick('#sidebar .sidebar-section-handle:contains("Locations")')
      .waitForElementPresent('.leaflet-tile-container')
      .page.common.addFilter('Name', newLocationName)
      .jqueryClick('.btn-checkmark')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Delete")')
      .acceptAlert()
      .waitForElementNotPresent('.ember-table-table-row')
      .assert.elementPresent('.quotum-1 .no-results')
  },
  'Add a new artist': function(client) {
    return client
      .moveToElement('#sidebar', 5, 5)
      .jqueryClick('#sidebar .sidebar-section-handle:contains("Artists")')
      .waitForElementPresent('.artists-page')
      .waitForElementPresent('.nums') //todo: wrap into helper
      .execute(function() {
        return parseInt($('.load-more .nums').text().split('/').pop().trim());
      }, [], function(result)  {
        listerCount = result.value;
      })
      .jqueryClick('.toolbar .btn:contains("Add Artist")')
      .waitForElementPresent('.modal-content')
      .assert.containsText('.modal-title', 'Create Artist')
      .page.common.setSelect2ValueByLabel('Artist', newArtistName)
      .waitForElementNotPresent('.modal-footer .btn.disabled.btn-primary')
      .jqueryClick('.modal-footer .btn:contains("Create Artist")')
      .waitForElementNotPresent('.modal-content')
      .execute(function() {
        return parseInt($('.load-more .nums').text().split('/').pop().trim());
      }, [], function(result)  {
        return client.assert.equal(listerCount + 1, result.value, 'Adding artist should increase counter');
      })
  },
  'Delete an artist': function(client) {
    return client
      .page.common.addFilter('Name', newArtistName) //note: this step depends from "Edit the object's attributes"
      .execute(function() {
        return parseInt($('.load-more .nums').text().split('/').pop().trim());
      }, [], function(result)  {
        return client.assert.equal(result.value > 0, true, 'Their should be at least one artist which was created on previous step')
      })
      // on test cases there are several items but .jqueryClick use only first
      .execute(function() {$('.ember-table-table-row .btn-checkmark').click(); })
      .assert.jqueryExists('.btn-checkmark.active', 'There should be checked items')
      .jqueryClick('.top-section .btn.dropdown-toggle[data-toggle="dropdown"]:contains("Actions")')
      .waitForElementPresent('.top-section .btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li')
      .jqueryClick('.btn.dropdown-toggle[data-toggle="dropdown"] + .dropdown-menu li a:contains("Delete")')
      .acceptAlert()
      .waitForElementNotPresent('.ember-table-table-row')
      .assert.elementPresent('.quotum-1 .no-results')
  },

  'APOLLO-789': function(client) {
    return client
      //Create a smart group based on artist's name //todo: please describe steps
      //Add tags to multiple objects (Group Actions > Add tags)
      //Sort object table view (artist name / title / date modified) (use All Objects)

      //Generate a full inventory report
      //todo: clarify details
      //Generate an inventory report with a selection of objects
      // todo

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
