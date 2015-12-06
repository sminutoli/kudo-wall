var expect = require('expect.js')
  , utils = require('./utils')
  , Kudo = require('../models/Kudo');

describe('Kudos: model', function(){
    it('should create and remember a saved Kudo when passed as a hash', function(done){
        Kudo.create({ autor: 'yo' }, function(err, kudoCreado){
            //Se creo sin errores
            expect(err).to.not.exist;

            expect(kudoCreado.autor).to.equal('yo');
            done();
        });
    })
});
