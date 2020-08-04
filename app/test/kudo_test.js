var expect = require('expect.js')
  , utils = require('./utils')
  , Kudo = require('../models/Kudo');

function expectKudo(unKudo){
  return {
    to: {
      kudo: function(autor, por, para){
        expect(unKudo).to.have.property('autor', autor);
        expect(unKudo).to.have.property('por', por);
        expect(unKudo).to.have.property('para', para);
      }
    }
  }
};

describe('Kudo', function(){
    it('should create and remember a saved Kudo when passed as a hash', function(done){
        Kudo.create({ autor: 'yo' }, function(err, kudoCreado){
            //Se creo sin errores
            expect(err).to.not.exist;

            expect(kudoCreado.autor).to.equal('yo');
            done();
        });
    })
    describe('creación', function(){
      it('debería poder armar un kudo', function(done){
          Kudo.armar('para mi por tantas cosas', 'yo', function(kudoCreado){
            expectKudo(kudoCreado).to.kudo('yo', 'por tantas cosas', 'mi');
            done();
          });
      })
      it('debería poder armar un kudo sanitizado', function(done){
          Kudo.armar('para <b>mi</b> por <img scr="feo" />tantas **cosas**', 'yo', function(kudoCreado){
            expectKudo(kudoCreado).to.kudo('yo', 'por tantas **cosas**', 'mi');
            done();
          });
      })
      it('no debería poder armar si el texto no tiene sentido', function(done){
        expect(function(){
            Kudo.armar('Yo soy el **mejor**', 'yo');
        }).to.throwError(/formato/i);
          done();
      })
      it('crear dos kudos repetidos, y que solo aparezca uno', function(done){
          Kudo.armar('para mi por tantas cosas', 'yo', function(kudoCreado){
            Kudo.armar('para mi por tantas cosas', 'yo', function(kudoDuplicado){
              Kudo.encontrarKudos(1, "", function(err, kudos){
                expect(kudos).to.have.length(1);
                done();
              });
            });
          });
      })
      it('reemplazar emoticones de slack por su equivalente emoticon unified', function (done) {
        Kudo.armar('para mi por tantas cosas :laughing:', 'yo', function (kudoCreado) {
          expectKudo(kudoCreado).to.kudo('yo', 'por tantas cosas 😆', 'mi');
          done();
        }
        )
      })
    })
});
