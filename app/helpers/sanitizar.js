var sanitizeHtml = require('sanitize-html')
  , md = require('node-markdown').Markdown;

module.exports =  function(mensaje){
    var sinHTML = sanitizeHtml(mensaje, {
      allowedTags: [],
      allowedAttributes: []
    });
    return sinHTML;
};
