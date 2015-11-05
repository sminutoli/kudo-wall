var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Kudo = require('../models/Kudo');

/*
 * GET Kudos
 */

exports.list = function(req, res, next){
  Kudo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
};


exports.add = function(req, res, next) {
  Kudo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};