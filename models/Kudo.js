var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var kudoSchema = new Schema({
  autor: String,
  para: String,
  por: String,
  updated_at: { type: Date, default: Date.now } //expires: 604800
});

var Kudo = mongoose.model('Kudo', kudoSchema);

module.exports = Kudo;