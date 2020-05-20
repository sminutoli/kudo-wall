//Preparar los fonts y artes
var f = new FontFace('OpenDyslexic', 'url(\'/font/OpenDyslexic-Regular.otf\')').load();
var r = load('/imagenes/renglongris.png');
for(var i,l=[i=0];i<10;l[i++]=i);

var ls = Promise.all(
    l.map(function(i){
        return load('/imagenes/art/' + i + '.png')
    })
);

//Valores comunes
var maxLogoWidth = 180;
var lineHeight = 36;
var padding = 15;

Promise.all([f, r, ls]).then(function(values){
    var font = values[0];
    var renglones = values[1];
    var logos = values[2];

    document.fonts.add(font);

    kudos.forEach(function(kudo){
        var canvas = document.getElementById(kudo.id);
        var ctx = canvas.getContext("2d");

        //Configurar font
        ctx.font = '24px ' + font.family;

        //Calcular altura de header
        var kudoPara = "Kudos para " + kudo.para;
        var headerHeight = calculateHeaderHeight(ctx, kudoPara, padding, 20, canvas.width-padding, lineHeight);

        //Elejir color y logo
        var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        var logo = logos[Math.floor(Math.random() * logos.length)];

        //Dibujar header
        ctx.fillStyle=color;
        ctx.fillRect(0, 0, canvas.width, headerHeight);

        //Dibujar renglones
        var ptrn = ctx.createPattern(renglones, 'repeat');
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

        //Linita del header
        ctx.setLineDash([20, 25]);
        ctx.lineWidth=3;
        ctx.strokeRect(0, headerHeight, canvas.width, 0);

        //Dibujar logo
        var ratio = maxLogoWidth / logo.width;
        ctx.drawImage(logo,
                        canvas.width - maxLogoWidth - padding/3, headerHeight+padding,
                        logo.width*ratio, logo.height*ratio);

        //Configurar font
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';

        //Dibujar el texto al rededor
        var kudoText = kudo.texto;
        var wrapHeight = wrapText(ctx, kudoText, padding, headerHeight+lineHeight, logo.width*ratio, logo.height*ratio+headerHeight, canvas.width-padding, lineHeight);

        //Texto header
        ctx.strokeStyle = "white";
        wrapHeader(ctx, kudoPara, padding, 20, canvas.width-padding, lineHeight);

        //Autor dejando un reglón vacío
        ctx.font= '24px ' + font.family;
        ctx.fillStyle = 'black';
        ctx.fillText(" --" + kudo.autor, padding, wrapHeight+ 2*lineHeight);

        //Borde al rededor
        ctx.strokeStyle = "black";
        ctx.setLineDash([]);
        ctx.lineWidth=4;
        ctx.fillStyle=color;
        ctx.strokeRect(0,0,canvas.width,canvas.height);
    });
});

function calculateHeaderHeight(ctx, texto, x, y, maxWidth, lineHeight) {
    return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight).lines*lineHeight
}

function wrapHeader(ctx, texto, x, y, maxWidth, lineHeight) {
    return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, true, true).y
}

function wrapText(ctx, texto, x, y, bbx, bby, maxWidth, lineHeight) {
    return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, true, false, bbx, bby).y
}

function procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, fillText=false, strokeTest=false, bbx=0, bby=0) {
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    var words = texto.split(' ');
    var line = '';
    var lines = 1;

    for (var n = 0; n < words.length; n++) {
        var maxLineWidth = y > bby ? maxWidth : maxWidth - bbx;
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxLineWidth) {
            if (strokeTest) ctx.strokeText(line, x, y);
            if (fillText) ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
            maxLineWidth = y > bby ? maxWidth : maxWidth - bbx;
            lines+=1;
        } else {
            line = testLine;
        }
    }
    if (strokeTest) ctx.strokeText(line, x, y);
    if (fillText) ctx.fillText(line, x, y);
    lines+=1

    return { lines: lines, y: y }
}

function load(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.src = url;

        img.onload = function() {
            resolve(img);
        };
        img.onerror = function(e) {
            reject(e);
        };
    });
}
