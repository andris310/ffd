var express = require('express');
var router = express.Router();
var Furniture = require('../models/furnitureMdl');
require('../ffd_modules/connection').db();

router.get('/overview-panel', function(req, res) {
  var furnitureList, designers;
  Furniture.find(function(err, furnitures) {
    if (err) {
      res.send(err);
    }

    res.render('overview_panel', {
      furniture: furnitures
    });
  });
});

module.exports = router;