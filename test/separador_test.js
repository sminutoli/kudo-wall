var expect = require('expect.js')
  , interpretar = require('../helpers/interpretar.js');

describe('Interpretador', function(){
    it('debería separar un mensaje correcto bien', function(done){
        var iterpretado = interpretar('para mi por ser tan groso');

        expect( iterpretado  ).to.have.property('para', 'mi');
        expect( iterpretado  ).to.have.property('por', 'ser tan groso');

        done();
    })
    it('debería tirar un error si el mensaje no tiene nada de sentido', function(done){
        expect(function(){
            interpretar('Interpretame. I dare you!');
        }).to.throwError(/formato/i);
        
        done();
    })
    it('debería tirar un error si el mensaje no tiene todo el sentido', function(done){
        expect(function(){
            interpretar('para Interpretame');
        }).to.throwError(/formato/i);
        
        done();
    })
    it('debería aceptar tambien el formato con la "a" en vez del "para"', function(done){
        var iterpretado = interpretar('a mi por ser tan groso');

        expect( iterpretado  ).to.have.property('para', 'mi');
        expect( iterpretado  ).to.have.property('por', 'ser tan groso');

        done();
    })
});
