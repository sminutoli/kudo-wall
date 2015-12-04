var express = require('express')
  , Kudo = require('../models/Kudo')
  , router = express.Router()
  , sanitizar = require('../helpers/sanitizar');

router.get('/json', function(req, res, next){
  Kudo.find(function (err, kudos) {
    if (err) return next(err);
    res.json(kudos);
  });
});

router.get('/:id', function(req, res, next) {
  Kudo.findById(req.params.id, function (err, kudo) {
    if (err) return next(err);
    res.render('edit', kudo);
  });
});

router.get('/', function(req, res, next){
  Kudo.find(function (err, kudos) {
    if (err) return next(err);
    
    res.render('index', { kudos: kudos });
  });
});

router.post('/', function(req, res, next) {
  if(req.body.token != (process.env.TOKEN || 'Tis a token')){
    res.send('Hmmmmm.... algo no está bien');
    return;
  }
    
  var mensaje = req.body.text.match(/a (.*) por (.*)/i);
 
  if(mensaje === null || mensaje.length != 3){
    res.send('El formato del Kudo debe ser: `/kudo para [alguien] por [algo]`.');
    return;
  }
  
  var elegirImagen = function(){
    return Math.floor(Math.random()*6);
  };
    
  var kudo = {
      autor: req.body.user_name,
      para: sanitizar(mensaje[1]),
      por: "*por* " + sanitizar(mensaje[2]),
      imagen: elegirImagen()
  };
    
  Kudo.create(kudo, function (err, kudo) {
    if (err) return next(err);
    var respuesta = {
                      "text": "Gracias por dejar tu Kudo!",
                      "attachments": [
                                      {
                                        "title":"Editar / Borrar el nuevo Kudo",
                                        "title_link": `http://${process.env.URL || 'localhost:3000'}/${kudo._id}`
                                      }
                                    ]
                    };
    console.log(respuesta);
    res.send(respuesta);
  });
});

router.delete('/:id', function(req, res, next) {
  Kudo.findByIdAndRemove(req.params.id, req.body, function (err, kudo) {
    if (err) return next(err);
    res.redirect(200, '/');
  });
});

router.put('/:id', function(req, res, next) {
  req.body.para = sanitizar(req.body.para);
  req.body.por = sanitizar(req.body.por);
  
  console.log(req.body);
  
  Kudo.findByIdAndUpdate(req.params.id, req.body, function (err, kudo) {
    if (err) return next(err);
    res.redirect(200, req.params.id);
  });
});


module.exports = router;