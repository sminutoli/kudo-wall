var sanitizeHtml = require('sanitize-html');

module.exports =  function(mensaje){
    var sinHTML = sanitizeHtml(mensaje, {
      allowedTags: [],
      allowedAttributes: [],
      parser: {
        decodeEntities: false
      }
    });

    return sinHTML.replace(/&quot;/g, '"');
};
