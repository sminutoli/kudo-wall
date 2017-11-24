'use strict';
var md = require("node-markdown").Markdown;
var Handlebars  = require('handlebars');

exports.md = function (msg) {
  return new Handlebars.SafeString(md(msg));
};