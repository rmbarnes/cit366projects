var MODEL_PATH = '../models/';
var express = require('express');
var Contact = require(MODEL_PATH + 'contact');
var sequenceGenerator = require('./SequenceGenerator');
var router = express.Router();


var getContacts = function (response) {
  Contact.find()
    .populate('group')
    .exec(function(err, contacts) {
      if (err) {
        return response.status(500).json({
          title: 'an error occurred',
          error: err
        });
      }
      response.status(200).json({
        message: 'Success',
        obj: contacts
      })
    });
};


var saveContact = function(res, contact) {


  //replace contacts in group with primary key values
  if (contact.group && contact.group.length >  0) {
    for (var groupContact in contact.group) {
      groupContact = groupContact._id;
    }
  }
  var response = res;
  contact.save(function(err, res) {
    // commented out 7:48pm
    // response.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getContacts(response);
    /*
    res.status(201).json({
      message: 'Saved document',
      obj: result
    })*/
  })
};

var deleteContact = function(res, contact) {
  var response = res;
  contact.remove(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getContacts(res);
    /*
    res.status(200).json({
      message: 'Deleted message',
      obj: result
    })
    */
  })
};

/* ************************ Routers ****************************** */

// Get
router.get('/', function(request, response, next){
    getContacts(response);
});


// Save
router.post('/', function(req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  //added this to change the number to a string
  maxContactId = maxContactId.toString();

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  saveContact(res, contact);

});

router.patch('/:id', function (req, res, next) {
  Contact.findOne({id: req.params.id}, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No contact found',
        error: {contact: 'Contact not found'}
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact);
  });

});

// Delete
router.delete('/:id', function(req, res, next) {
  var query = {id: req.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'No contact found',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No contact found',
        error: {contactId: req.params.id}
      });
    }

    deleteContact(res, contact);

  });
});

module.exports = router;
