var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kudoSchema = new Schema({
  autor: String,
  kudo: Boolean,
  updated_at: { type: Date, default: Date.now },
});

var Kudo = mongoose.model('Kudo', kudoSchema);

module.exports = Kudo;