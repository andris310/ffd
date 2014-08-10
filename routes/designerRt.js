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
      alias: 'designers',
      designers: designers
    });
  });
});

router.get('/new-designer', function(req, res) {
  res.render('new_designer', {
    title: 'New Designer',
    alias: 'new_designer'
  });
});

// Crete new furniture
router.post('/add-designer', function(req, res) {
  var designer = new Designer();

  designer.firstname = req.body.firstname;
  designer.lastname = req.body.lastname;
  designer.bio = req.body.bio;

  designer.save(function(err) {
    if (err) {
      res.send('There was a problem adding information to the database.');
      return;
    }

    res.location('designers');
    res.redirect('designers');
  });
});

module.exports = router;