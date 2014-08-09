var express = require('express');
var router = express.Router();
var Designer = require('../models/designerMdl');
require('../ffd_modules/connection').db();

// Designer index page
router.get('/designers', function(req, res) {
  Designer.find(function(err, designers) {
    if (err) {
      res.send(err);
      return;
    }

    res.render('designers', {
      title: 'Designers',
      designers: designers
    });
  });
});

router.get('/new-designer', function(req, res) {
  res.render('new_designer', {
    title: 'New Designer'
  });
});

module.exports = router;