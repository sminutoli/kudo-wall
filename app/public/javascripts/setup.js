var kudos = [];

function dibujarKudo(id, texto, para, autor){
    kudos.push({
        id: id,
        texto: decodeEntities(texto),
        autor: autor,
        para: decodeEntities(para)
    });
}

var decodeEntities = (function() {
    var element = document.createElement('div');
    function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
    }
    return decodeHTMLEntities;
})();
