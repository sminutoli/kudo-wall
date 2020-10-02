var mongoose = require('mongoose')
  , moment = require('moment')
  , Schema = mongoose.Schema
  , interpretar = require('../helpers/interpretar')
  , sanitizar = require('../helpers/sanitizar')
  , config = require('../config');

const {GoogleSpreadsheet} = require('google-spreadsheet')


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
const elegirImagen = function(){
    return Math.floor(Math.random()*11);
};

Kudo.armar = function(texto, autor, cb){
    cb = cb || _identity;
    var mensaje = interpretar(texto);

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

Kudo.encontrarUltimos = async function(){
    const getSheetBy= async(index) => {
        const doc = new GoogleSpreadsheet('1jT88W4FYi3oAakE6AGASPUdlQtRqGDXKo-m3i5OxObQ')

        await doc.useServiceAccountAuth(config.credentials);
        await doc.loadInfo(); // loads document properties and worksheets
        return doc.sheetsByIndex[index];
    }

    const sheet = await getSheetBy(0);
    const rows = await sheet.getRows({limit: 150, offset: 0})
    return rows
        .filter((kudo) => kudo._rawData[0] !== undefined &&  kudo._rawData[1] !== undefined)
        .map((kudo,index) => {
            return  Kudo.crearKudoParaNico(kudo._rawData[0],kudo._rawData[1],index)
        });
}

Kudo.crearKudoParaNico = function(quien,mensaje,index){
    return {
        id: index,
        autor: quien,
        para: 'NicoPS',
        por: mensaje,
        imagen: elegirImagen()
    };
};
module.exports = Kudo;
