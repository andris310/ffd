var express = require('express');
var router = express.Router();
var Furniture = require('../models/furnitureMdl');
var crypto = require('crypto');

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

router.get('/furniture/:furniture_url', function(req, res) {
  Furniture.findOne({url: req.params.furniture_url}, function(err, result) {
    res.render('furniture_page', {
      alias: 'furniture_page',
      furniture: result
    });
  });
});

// New furniture template page
router.get('/new-furniture', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  res.render('new_furniture', {
    alias: 'new_furniture',
    title: 'New Furniture'
  });
});

router.get('/update-furniture/:id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Furniture.findById(req.params.id, function(err, furniture) {
    res.render('new_furniture', {
      alias: 'new_furniture',
      furniture: furniture
    });
  });
})
.post('/update-furniture/:id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Furniture.findByIdAndUpdate(req.params.id, {
    "name": req.body.name,
    "designer": req.body.designer,
    "year": req.body.year,
    "image_url": req.body.image_url,
    "description": req.body.description,
    "url": req.body.name.toLowerCase().replace(/\s+/g, '-')
  }, function(err, result) {
    if (err) {
      res.send(err);
    }

    res.redirect('/furniture');
  });
});

// Crete new furniture
router.post('/add-furniture', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  var furniture = new Furniture();

  furniture.name = req.body.name;
  furniture.designer = req.body.designer;
  furniture.year = req.body.year;
  furniture.image_url = req.body.image_url;
  furniture.description = req.body.description.replace(/\r|\n|\r\n/g, '<br>');
  furniture.url = furniture.name.toLowerCase().replace(/\s+/g, '-');

  furniture.save(function(err) {
    if (err) {
      res.send('There was a problem adding information to the database.');
      return;
    }

    res.location('furniture');
    res.redirect('furniture');
  });
});

router.get('/sign_s3', function(req, res){
    var object_name = req.query.s3_object_name;
    var mime_type = req.query.s3_object_type;

    var now = new Date();
    var expires = Math.ceil((now.getTime() + 10000)/1000); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";
    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+process.env.S3_BUCKET+"/"+object_name;
    var signature = crypto.createHmac('sha1', process.env.AWS_SECRET_KEY).update(put_request).digest('base64');
    signature = encodeURIComponent(signature.trim());
    signature = signature.replace('%2B','+');

    var url = 'https://'+process.env.S3_BUCKET+'.s3.amazonaws.com/'+object_name;

    var credentials = {
        signed_request: url+"?AWSAccessKeyId="+process.env.AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
        url: url
    };
    res.write(JSON.stringify(credentials));
    res.end();
});

// Delete new furnitire
router.delete('/destroy-furniture/:furniture_id', function(req, res) {
  if (!req.user) {
    res.redirect(307, '/');
  }

  Furniture.remove({
    _id: req.params.furniture_id
  }, function(err, furniture) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(req.get('referer'));
  });
});

module.exports = router;