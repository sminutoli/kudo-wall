var sanitizeHtml = require('sanitize-html')
  , md = require('node-markdown').Markdown;

module.exports =  function(mensaje){
    var sinHTML = sanitizeHtml(mensaje, {
      allowedTags: [],
      allowedAttributes: []
    });
    /*var conMarkdown = md(sinHTML, true, 'b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|'+
                                        'i|li|ol|pre|sup|sub|strong|strike|ul|br|hr');
    return conMarkdown;*/
    return sinHTML;
};
