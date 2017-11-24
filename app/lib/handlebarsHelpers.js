'use strict';
var md = require( "markdown" ).markdown;
var Handlebars  = require('handlebars');

exports.md = function (msg) {
  return new Handlebars.SafeString(md.toHTML(msg));
};