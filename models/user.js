var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// tipo es par decir si es probere o alumno.una estrategi apara profesor y otra para alumno.
/*
  var Person = new Schema({
      title   : { type: String, required: true }
    , age     : { type: Number, min: 5, max: 20 }
    , meta    : {
          likes : [String]
        , birth : { type: Date, default: Date.now }
      }
  });
  retos es un vector de documento que tendar la calse.
    ganadas_3enraya: Number,
    perdidas_3enraya: Number,
    totales_3enraya:Number,
    empatadas_3enraya:Number,
    ganadas_ajedrez: Number,
    perdidas_ajedrez: Number,
    totales_ajedrez:Number,
    empatadas_ajedrez:Number,
    ganadas_damas: Number,
    perdidas_damas: Number,
    totales_damas:Number,
    empatadas_damas:Number,
    ganadas_buscaminas: Number,
    perdidas_buscaminas: Number,
    totales_buscaminas:Number,
    empatadas_buscaminas:Number,
  -desaparece todoa las ganadas y perdidas del usuario de la tabla se mira en clase
  -
  Cada vez que yo inserto un reto en la clase el profesor puede seleccionar a que usuarios van a ir
  me mandara tod los alumnnos que quier k le ponga el reto y inicializare los valore a 0 de mi reto por alumno.
  likes_r: si le gusata los el reto a los usuario. para valorar el juego.
  crear imagen y poner la direccion qeu tein por defecto
*/
var userSchema = mongoose.Schema({
  usuario: {
    id: String,
    username: String,
    name: String,
    apellidos: String,
    tipo: String,
    email: String,
    password: String,
  },
});


userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.usuario.password);
};

module.exports = mongoose.model('User', userSchema);
