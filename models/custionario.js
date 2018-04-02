var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
//db.cuestionario.update({ profesor:"pepe",asignatura:"Mates",titulo:"T"},{$push:{preguntas:{pones todo 
//la pregunta y se intorducira como siguetne}})incrementar una arrray 
var cuestionarioSchema = mongoose.Schema({
    cuestionario: {
        profesor: String,
        asignatura: String,
        titulo: String,
        preguntas:[
                    {
                     texto: String,
                     opciones:[
                                   {
                                     vedadero: Boolean,
                                     texto: String,
                                   },
                               ],
                    },
                  ],
    },
});
    
module.exports = mongoose.model('Cuestionario',cuestionarioSchema);