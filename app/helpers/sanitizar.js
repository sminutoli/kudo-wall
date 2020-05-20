var sanitizeHtml = require('sanitize-html');
var emoji = require("node-emoji");

module.exports =  function(mensaje){
    var sinHTML = sanitizeHtml(mensaje, {
      allowedTags: [],
      allowedAttributes: [],
      parser: {
        decodeEntities: false
      }
    });

  return emoji.emojify(sinHTML);
};
