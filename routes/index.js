var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design'
  });
});

router.get('/furniture', function(req, res) {
  var db = req.db;
  var collection = db.get('furniturecollection');
  collection.find({}, {}, function(e, results) {
    res.render('furniture', {
      "furniture": results
    });
  });
});

router.get('/designers', function(req, res) {
  res.render('furniture', {
    title: 'Designers'
  });
});

router.get('/new-furniture', function(req, res) {
  res.render('new_furniture', {
    title: 'New Furniture'
  });
});

router.post('/add-furniture', function(req, res) {
  var db = req.db;
  var collection = db.get('furniturecollection');
  console.log(req, 'REQ BODY...');

  var payload = {
    "name": req.body.name,
    "designer": req.body.designer,
    "year": req.body.year,
    "description": req.body.description
  };

  collection.insert(payload, function(err, results) {
    if (err) {
      res.send('There was a problem adding information to the database.');
    } else {
      res.location('furniture');
      res.redirect('furniture');
    }


  });

});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;