var MODEL_PATH = '../models/';
var express = require('express');
var Message = require(MODEL_PATH + 'message');
var sequenceGenerator = require('../routes/SequenceGenerator');
var router = express.Router();

var getMessages = function (response) {
  Message.find()
    .exec(function(err, messages) {
      if (err) {
        return response.status(500).json({
          title: 'an error occurred',
          error: err
        });
      }
      response.status(200).json({
        message: 'Success',
        obj: messages
      })
    });
};

var saveMessage = function (res, message) {
  var response = res;
  message.save(function(err, res) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getMessages(response);
    /*
    res.status(201).json({
      message: 'Saved document',
      obj: result
    })*/
  })
}

var deleteMessage = function (res, message) {
  var response = res;
  message.remove(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getMessages(res);
    /*
    res.status(200).json({
      message: 'Deleted message',
      obj: result
    })
    */
  })
}



/* ************************ Routers ****************************** */
// Get
router.get('/', function(request, response, next){
  getMessages(response);
});


// Save
router.post('/', function(req, res, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");
  maxMessageId = maxMessageId.toString();

  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  saveMessage(res, message);

});

router.patch('/:id', function (req, res, next) {
  Message.findOne({id: req.params.id}, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message);
  });

});

// Delete
router.delete('/:id', function(req, res, next) {
  var query = {id: req.params.id};

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'No message found',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No message found',
        error: {messageId: req.params.id}
      });
    }

    deleteMessage(res, message);

  });
});

module.exports = router;
