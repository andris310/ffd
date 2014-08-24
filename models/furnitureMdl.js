var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var furnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  designer: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Furniture', furnitureSchema);