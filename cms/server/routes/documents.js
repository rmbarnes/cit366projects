var MODEL_PATH = '../models/';
var express = require('express');
var Document = require(MODEL_PATH + 'document');
var sequenceGenerator = require('../routes/SequenceGenerator');
var router = express.Router();

var getDocuments = function (response) {
  Document.find()
    .exec(function(err, documents) {
      if (err) {
        return response.status(500).json({
          title: 'an error occurred',
          error: err
        })
      }
      //console.log(documents);
      response.status(200).json({
        message: 'Success',
        obj: documents
      })
    });
};

var saveDocument = function (res, document) {
  var response = res;
  document.save(function(err, res) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getDocuments(response);
    /*
    res.status(201).json({
      message: 'Saved document',
      obj: result
    })*/
  })
}

var deleteDocument = function (res, document) {
  var response = res;
  document.remove(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getDocuments(res);
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
  getDocuments(response);
});

// Save
router.post('/', function(req, res, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");
  maxDocumentId = maxDocumentId.toString();

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    });

  saveDocument(res, document);

});

router.patch('/:id', function (req, res, next) {
  Document.findOne({id: req.params.id}, function (err, document) {
    if (err || !document) {
      return res.status(500).json({
        title: 'No document found',
        error: {document: 'Document not found'}
      });
    }
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  });

});

// Delete
router.delete('/:id', function(req, res, next) {
  var query = {id: req.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'No document found',
        error: err
      });
    }
    if (!document) {
       return res.status(500).json({
         title: 'No document found',
         error: {documentId: req.params.id}
       });
    }

    deleteDocument(res, document);

  });
});


module.exports = router;
