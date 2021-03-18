var express = require('express')
  , Kudo = require('../models/Kudo')
  , router = express.Router();

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
  const semanas = req.query.semanas || 1;
  Kudo.encontrarUltimos(semanas, function (err, kudos) {
    if (err) return next(err);

    res.render('index', { kudos: kudos });
  }).sort({updated_at: 'desc'});
});

router.post('/nuevo', function(req, res, next) {
  if(req.body.token != (process.env.TOKEN || 'Tis a token')){
    res.send('Hmmmmm.... algo no está bien');
    return;
  }

  try{
    Kudo.armar( req.body.text, req.body.user_name, function(kudoCreado){
      res.send({
              "text": "Gracias por dejar tu Kudo!",
              "attachments": [{
                  "title":"Editar / Borrar el nuevo Kudo",
                  "title_link": `http://${process.env.URL || 'localhost:3000'}/${kudoCreado._id}`
              }]
      });
    });
  } catch(e){
    res.send(e.message);
  }
});

router.delete('/:id', function(req, res, next) {
  Kudo.findByIdAndRemove(req.params.id, req.body, function (err, kudo) {
    if (err) return next(err);
    res.redirect(200, '/');
  });
});

router.put('/:id', function(req, res, next) {
  Kudo.actualizar(req.params.id, req.body)
  res.redirect(200, req.params.id);
});


module.exports = router;
