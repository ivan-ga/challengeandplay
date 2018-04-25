var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');  // si hacemos lo del passwor hacer funciones.

/*Nombre del reto es el mismo que el juego o poenmo un varial para saber cual
el tipo nos dice si es un cuestionario o si es del otro para irlo a buscar.*/
var claseSchema = mongoose.Schema({
    clase: {
            nombre_clase: String,
            nombre_juego: String,
            curso : String,
            profesor_username: String,
            password: String,
            alumnos_email: [ String ],
            retos: [{  
                       nombre_reto: String,
                       tipo: String,
                       activo: Boolean,
                       fecha_comienzo: { type: Date, default: Date.now },
                       fecha_fin: {type: Date},
                       n_veces_relizar: Number,
                       ganadas: [
                                  {
                                    alumnos_email: String,
                                    ganareto: Number,
                                    puntuacion: Number,
                                  }
                                ],
                       perdidas:[
                                  {
                                    alumnos_email: String,
                                    pierdereto: Number,
                                    puntuacion: Number,
                                  }
                                ],
                   }],
    },
});

claseSchema.methods.generateHash = function(password) {
  //return password;
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

claseSchema.methods.validPassword = function(password) {
  //return(password, this.clase.password)
  return bcrypt.compareSync(password, this.clase.password);
};


module.exports = mongoose.model('Clase', claseSchema);