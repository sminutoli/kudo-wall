var mongoose = require('mongoose')
  , moment = require('moment')
  , Schema = mongoose.Schema
  , interpretar = require('../helpers/interpretar')
  , sanitizar = require('../helpers/sanitizar');

var kudoSchema = new Schema({
  autor: String,
  para: String,
  por: String,
  imagen: Number,
  updated_at: { type: Date, default: Date.now }
});

var Kudo = mongoose.model('Kudo', kudoSchema);

function sanitizarKudo(unKudo){
  unKudo.para = sanitizar(unKudo.para);
  unKudo.por = sanitizar(unKudo.por);
  return unKudo;
}

function _identity(x){
  return x;
}

Kudo.armar = function(texto, autor, cb){
    cb = cb || _identity;
    var mensaje = interpretar(texto);

    var elegirImagen = function(){
      return Math.floor(Math.random()*6);
    };

    var kudo = {
        autor: autor,
        para: mensaje.para,
        por: "por " + mensaje.por,
        imagen: elegirImagen()
    };

    sanitizarKudo(kudo);

    return Kudo.create(kudo, function (err, kudo) {
      if (err) return next(err);
      return cb(kudo);
    });
};

Kudo.actualizar = function(id, nuevoKudo, cb){
  cb = cb || _identity;
  sanitizarKudo(nuevoKudo);
  return Kudo.findByIdAndUpdate(id, nuevoKudo, cb);
}

Kudo.encontrarUltimos = function(cb){
  var ultimaSemana = moment().subtract(8, 'days');
  return Kudo.find({
      updated_at: {
        $gte: ultimaSemana.toDate()
      }
    }, cb);
}

module.exports = Kudo;
