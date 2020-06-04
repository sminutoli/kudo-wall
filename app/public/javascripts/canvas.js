//Preparar los fonts y artes
const f = new FontFace('OpenDyslexic', 'url(\'/font/OpenDyslexic-Regular.otf\')').load();

const r = load('/imagenes/renglongris.png');
let i;
const l = [i = 0];
for (; i < 11; l[i++] = i) ;

const ls = Promise.all(
  l.map(function (i) {
    return load('/imagenes/art/' + i + '.png')
  })
);

//Valores comunes
const maxLogoWidth = 180;
const lineHeight = 36;
const padding = 15;

Promise.all([f, r, ls]).then(function (values) {
  const font = values[0];
  const renglones = values[1];
  const logos = values[2];

  document.fonts.add(font);

  kudos.forEach(function (kudo) {
    const canvas = document.getElementById(kudo.id);
    const ctx = canvas.getContext("2d");

    //Configurar font
    ctx.font = '24px ' + font.family;

    //Calcular altura de header
    const kudoPara = "Kudos para " + kudo.para.replace(/&amp;quot;/g, '"');
    const headerHeight = calculateHeaderHeight(ctx, kudoPara, padding, 20, canvas.width - padding, lineHeight);

    //Elejir color y logo
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    const logo = logos[Math.floor(Math.random() * logos.length)];

    //Dibujar header
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, headerHeight);

    //Dibujar renglones
    const ptrn = ctx.createPattern(renglones, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    //Linita del header
    ctx.setLineDash([20, 25]);
    ctx.lineWidth = 3;
    ctx.strokeRect(0, headerHeight, canvas.width, 0);

    //Dibujar logo
    const ratio = maxLogoWidth / logo.width;
    ctx.drawImage(logo,
      canvas.width - maxLogoWidth - padding / 3, headerHeight + padding,
      logo.width * ratio, logo.height * ratio);

    //Configurar font
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';

    //Dibujar el texto al rededor
    const kudoText = kudo.texto.replace(/&amp;quot;/g, '"');
    const wrapHeight = wrapText(ctx, kudoText, padding, headerHeight + lineHeight, logo.width * ratio, logo.height * ratio + headerHeight, canvas.width - padding, lineHeight);

    //Texto header
    ctx.strokeStyle = "white";
    wrapHeader(ctx, kudoPara, padding, 20, canvas.width - padding, lineHeight);

    //Autor dejando un reglón vacío
    ctx.font = '24px ' + font.family;
    ctx.fillStyle = 'black';
    ctx.fillText(" --" + kudo.autor, padding, wrapHeight + 2 * lineHeight);

    //Borde al rededor
    ctx.strokeStyle = "black";
    ctx.setLineDash([]);
    ctx.lineWidth = 4;
    ctx.fillStyle = color;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  });
});

// Calcula la altura del header
function calculateHeaderHeight(ctx, texto, x, y, maxWidth, lineHeight) {
  return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight).lines * lineHeight
}

// Diseña el header, incluyendo texto y delineado del mismo
function wrapHeader(ctx, texto, x, y, maxWidth, lineHeight) {
  return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, true, true).y
}

// Diseña el body, incluyendo el texto y emojis
function wrapText(ctx, texto, x, y, bbx, bby, maxWidth, lineHeight) {
  return procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, true, false, bbx, bby).y
}

function procesarTexto(ctx, texto, x, y, maxWidth, lineHeight, fillText = false, strokeTest = false, bbx = 0, bby = 0) {
  ctx.setLineDash([]);
  ctx.lineWidth = 3;
  const words = texto.replace(/::/g, ': :').split(' ');
  let line = '';
  let testWidth = 0
  let lines = 1;

  for (let n = 0; n < words.length; n++) {
    let maxLineWidth = y > bby ? maxWidth : maxWidth - bbx;
    const testLine = line + words[n] + ' ';
    const wordWidth = isEmoji(words[n]) ? ctx.measureText('   ').width : ctx.measureText(words[n]).width
    testWidth = testWidth + wordWidth + ctx.measureText(' ').width;
    if (testWidth > maxLineWidth) {
      writeText(strokeTest, ctx, line, x, y, fillText);
      line = words[n] + ' ';
      y += lineHeight;
      maxLineWidth = y > bby ? maxWidth : maxWidth - bbx;
      lines += 1;
      testWidth = 0;
    } else {
      line = testLine;
    }
  }
  writeText(strokeTest, ctx, line, x, y, fillText);
  lines += 1

  return {lines: lines, y: y}
}

function writeText(strokeTest, ctx, line, x, y, fillText) {
  if (strokeTest) {
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  }
  if (fillText && !strokeTest) {
    fillTextOrEmoji(ctx, line, x, y);
  }
}

async function fillTextOrEmoji(ctx, line, x, y) {
  const words = line.split(' ');
  for (let n = 0; n < words.length; n++) {
    if (isEmoji(words[n])) {
      const emojiId = words[n].replace(/:/g, '')
      await printCustomEmoji(ctx, emojiId, x, y);
      x += ctx.measureText('    ').width
    } else {
      ctx.fillStyle = 'black';
      ctx.fillText(words[n], x, y);
      x += ctx.measureText(words[n] + ' ').width
    }
  }
}

function isEmoji(word) {
  return (/^:(.*:)?$/).test(word);
}

async function printCustomEmoji(ctx, emojiId, x, y) {
  const image = new Image();
  image.onload = function () {
    ctx.drawImage(image, x, y - 5, 30, 30);
  };
  const emojisResp = await fetch('/javascripts/customEmojis.json')
  const emojis = await emojisResp.json()
  image.src = emojis[emojiId]
}

function load(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.src = url;

    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (e) {
      reject(e);
    };
  });
}
