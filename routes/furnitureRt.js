var express = require('express');
var router = express.Router();
var Furniture = require('../models/furnitureMdl');
require('../ffd_modules/connection').db();

// Furniture index page
router.get('/furniture', function(req, res) {
  Furniture.find(function(err, furnitures) {
    if (err) {
      res.send(err);
      return;
    }

    res.render('furniture', {
      alias: 'furniture',
      furniture: furnitures
    });
  });
});

// New furniture template page
router.get('/new-furniture', function(req, res) {
  res.render('new_furniture', {
    alias: 'new_furniture',
    title: 'New Furniture'
  });
});

// Crete new furniture
router.post('/add-furniture', function(req, res) {
  var furniture = new Furniture();

  furniture.name = req.body.name;
  furniture.designer = req.body.designer;
  furniture.year = req.body.year;
  furniture.description = req.body.description;

  furniture.save(function(err) {
    if (err) {
      res.send('There was a problem adding information to the database.');
      return;
    }

    res.location('furniture');
    res.redirect('furniture');
  });
});

// Delete new furnitire
router.delete('/destroy-furniture/:furniture_id', function(req, res) {
  var furniture = new Furniture();
  console.log('ID........' + req.params.furniture_id)
  Furniture.remove({
    id: req.params.furniture_id
  }, function(err, furniture) {
    if (err) {
      res.send(err);
      return;
    }

    res.location('furniture');
    res.redirect('furniture');
  });
});

module.exports = router;