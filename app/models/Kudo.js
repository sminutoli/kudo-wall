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
      return Math.floor(Math.random()*11);
    };

    var kudo = {
        autor: autor,
        para: mensaje.para,
        por: "por " + mensaje.por,
        imagen: elegirImagen()
    };

    sanitizarKudo(kudo);

    Kudo
      .find({})
      .where('autor').equals(kudo.autor)
      .where('para').equals(kudo.para)
      .where('por').equals(kudo.por)
      .limit(1)
      .exec(function(err, res){
        if (err) return next(err);
        if(res.length == 0){
          return Kudo.create(kudo, function (err, kudo) {
            if (err) return next(err);
            cb(kudo);
          });
        } else {
          cb(res[0]);
        }
      });
};

Kudo.actualizar = function(id, nuevoKudo, cb){
  cb = cb || _identity;
  sanitizarKudo(nuevoKudo);
  return Kudo.findByIdAndUpdate(id, nuevoKudo, cb);
}

Kudo.encontrarKudos = function (semanas, kudoPara, kudoPor, cb) {
  var ultimaSemana = moment().subtract(7 * semanas, "days");
  return Kudo.find(
    {
      updated_at: {
        $gte: ultimaSemana.toDate(),
      },
      para: { $regex: kudoPara, $options: "i" },
    },
    cb
  );
};

module.exports = Kudo;
