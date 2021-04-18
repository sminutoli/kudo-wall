var sanitizeHtml = require('sanitize-html');
var emoji = require("node-emoji");
var htmlEntities = require("html-entities");

module.exports =  function(mensaje){
    var sinHTML = sanitizeHtml(mensaje, {
      allowedTags: [],
      allowedAttributes: [],
      parser: {
        decodeEntities: false
      }
    });

  return htmlEntities.decode(emoji.emojify(sinHTML));
};
