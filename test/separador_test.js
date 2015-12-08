var expect = require('expect.js')
  , interpretar = require('../helpers/interpretar.js');

describe('Interpretador', function(){
    it('debería separar un mensaje correcto bien', function(done){
        var iterpretado = interpretar('para mi por ser tan groso');

        expect( iterpretado  ).to.have.property('para', 'mi');
        expect( iterpretado  ).to.have.property('por', 'ser tan groso');

        done();
    })
});
