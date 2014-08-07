var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var furnitureSchema = new Schema({
  name: {
    type: String,
    required: true
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
  imageUrl: String
});

module.exports = mongoose.model('Furniture', furnitureSchema);