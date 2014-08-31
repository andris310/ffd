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
      title: 'Famous Furniture Designers',
      alias: 'designers',
      designers: designers
    });
  });
});

router.get('/designers/:url', function(req, res) {
  Designer.findOne({url: req.params.url}, function(err, result) {
    res.render('designer_page', {
      title: result.firstname + ' ' + result.lastname,
      alias: 'designer_page',
      metaDescription: result.metadescription,
      designer: result
    });
  });
});

router.get('/new-designer', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  res.render('new_designer', {
    title: 'New Designer',
    alias: 'new_designer'
  });
});

// Crete new furniture
router.post('/add-designer', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  var designer = new Designer();

  designer.firstname = req.body.firstname;
  designer.lastname = req.body.lastname;
  designer.bio = req.body.bio;
  designer.metadescription = req.body.metadescription;
  designer.url = req.body.firstname.toLowerCase() + '-' + req.body.lastname.toLowerCase();

  designer.save(function(err) {
    if (err) {
      res.send('There was a problem adding information to the database.');
      return;
    }

    res.location('designers');
    res.redirect('designers');
  });
});

router.get('/update-designer/:id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Designer.findById(req.params.id, function(err, result) {
    res.render('new_designer', {
      alias: 'new_designer',
      designer: result
    });
  });
})
.post('/update-designer/:id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Designer.findByIdAndUpdate(req.params.id, {
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "bio": req.body.bio,
    "metadescription": req.body.metadescription,
    "url": req.body.firstname.toLowerCase() + '-' + req.body.lastname.toLowerCase()
  }, function(err, result) {
    if (err) {
      res.send(err);
    }

    res.redirect('/designers');
  });
});

// Delete new furnitire
router.delete('/destroy-designer/:designer_id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Designer.remove({
    _id: req.params.designer_id
  }, function(err, designer) {
    if (err) {
      res.send(err);
      return;
    }
    res.location('designers');
    res.redirect('designers');
  });
});

module.exports = router;