var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , interpretar = require('../helpers/interpretar')
  , sanitizar = require('../helpers/sanitizar');

var kudoSchema = new Schema({
  autor: String,
  para: String,
  por: String,
  imagen: Number,
  updated_at: { type: Date, default: Date.now, expires: '8 days' }
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

module.exports = Kudo;
