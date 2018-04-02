var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
// var configAuth = require('./auth');
 var Clase = require('../models/clase');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    process.nextTick(function() {
     
      User.findOne({ 'usuario.username':  username }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
            var newUser = new User();
            newUser.usuario.username = username;
            newUser.usuario.apellidos = req.body.apellidos;
            newUser.usuario.name = req.body.name;
            newUser.usuario.email = req.body.email;
            newUser.usuario.tipo = req.body.optradio;
            newUser.usuario.password = newUser.generateHash(password);
            // Se guarada en al base de datos los datos del usuario.
            newUser.save(function(err) {
              if (err)
               throw err;
              return done(null, newUser);
            });
            
            // prueba de como meter el registro de una clase.
            ingresarPruebaClase();
        
        }
      });
    });
  }));
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({ 'usuario.username':  username }, function(err, user) {
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));
};

function ingresarPruebaClase(){
       // var Clase = require('../models/clase'); hay que poner estoy en cada archivo k se kiera utilizar esa parte de la base de datos
       // o para crear un nuevo documento k sea como 
       var newClase = new Clase(); // aqui se crear una estructura apartir de la Clase(); Esta conectado a la bases de datos
                                   // Clase tendra todo los documentos de mi base de datos y ahí tendre que buscarlas.
       newClase.clase.nombre_clase = "Matematicas2"
       newClase.clase.password ="dasf";    // newClase.generateHash(password);
       
        // Metes alguno correos de los alumno que pertenecen a la clase.
       newClase.clase.alumnos_email.push("uno@nuevo");
       newClase.clase.alumnos_email.push("doso@nuevo");
        
        // Metemos un reto en la base de datos. Profesor que es de la clase
        //* 1 Buscar la clase del profe y depsu meter el reto. hacer parecido al profe.
        // newClase.clase.retos = [ {ganadas: [{ ganareto: 1 }]}];
         newClase.clase.retos.push(
            {     
                  nombre_reto: "RetoUno",
                  tipo: "juego",
                  activo: true,
                  // ya lo poen por defectofecha_comienzo: { type: Date, default: Date.now },
                   fecha_fin: "2018-04-02", // se pone asiiii 
                   n_veces_relizar: 0,//Buscarlo y actualizarlo     
                  //  "perdidas" : [ ], Esto no se pone se van actulaizando
                  // "ganadas" : [ ], Se va actualizando 
            });
            
      // ENCUETRO LO K KIERO Y ACTULIZO.
     Clase.findOne({ 'clase.nombre_clase':'Matematicas2', 
                   'clase.retos': { $elemMatch: {'nombre_reto':'RetoUno'}}},
                   {'clase.retos.$': 'RetoUno'},
                   function(err,reto) {
                        if (err)
                           throw err; // EXEPCION SI DA ERRRO 
                         
                         console.log(reto);
                         // par poner el primer dato de ganso o perida.
                          reto.clase.retos = [ {
                            ganadas: [  { alumnos_email: "alumno_que_gana", // Usuario si ganas
                                           ganareto: 1,  // sie s juego.
                                           puntuacion: 10, // si es test
                                            }]}];
                                            
                          reto.save(function(err) {
                              if (err)  // si erro es nll es k hay un erro al guardar.
                                 throw err;/// esto es una exepcio si se dispara no  sigue con return.
                                 return  reto;
                               //  return done(null,  newClase);
                          });  
                    
                   });
                       
                        //.clase.retos.push({ganadas: [{ ganareto: 300 }]});
                        
                   /// });
   
   /*
         Clase.findOne({'clase.nombre_clase':'Matematicas2', function(err, clase) {
              // La clase sera el documeto que da exito.
              console.log(clase);
              
              clase.retos.ganadas.findOne({"alumnos_email:"},
           
           ush({ 
                                                  alumnos_email: "alumno_que_gana",
                                                  ganareto: 1,  // sie s juego.
                                                  puntuacion: 10, // si es test
                                    })
             
        
           
           //  newClase.clase.retos = [ {ganadas: [{ ganareto: 1 }]}];
            // ingresar las gande un retos
        newClase.clase.retos.push(
            {     
                  nombre_reto: "RetoDos",
                  tipo: "test",
                  activo: true,
                  // ya lo poen por defectofecha_comienzo: { type: Date, default: Date.now },
                   fecha_fin: "2018-04-02", // se pone asiiii 
                   n_veces_relizar: 0,//Buscarlo y actualizarlo     
                  //  "perdidas" : [ ], Esto no se pone se van actulaizando
                  // "ganadas" : [ ], Se va actualizando 
            });
          
          
       
            
           /*newClase.clase.retos.findOne({ "nombre_reto" : "RetoUno" }).ganadas.push({ 
                                                  alumnos_email: "alumno_que_gana",
                                                  ganareto: 1,  // sie s juego.
                                                  puntuacion: 10, // si es test
                                    }); */
           
         //});
            
            
      
        /*
        .nombre_reto = "PrimerRetos";
       
        
       */
       
        newClase.save(function(err) {
                    if (err)
                     throw err;
                     return newClase;
                  //  return done(null,  newClase);
        });

}