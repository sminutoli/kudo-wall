module.exports =  function(body){
    var mensaje = body.match(/a (.*?) por (.*)/i);
    if(mensaje === null || mensaje.length != 3){
        throw new Error('El formato del Kudo debe ser: `/kudo para [alguien] por [algo]`.');
    } 

    return {
        para: mensaje[1],
        por: mensaje[2]
    };
};

