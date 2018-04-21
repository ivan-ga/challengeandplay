var express = require('express');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var router = express.Router();
router.use(flash());

//Importando esquemas de BD Para los usuario
const Estructura = require('../models/user.js');
const userSchema = Estructura.User;
const User = mongoose.model("User", userSchema);

const EstrucClase = require('../models/clase.js');
const claseSchema = EstrucClase.Clase;
const Clase = mongoose.model("Clase", claseSchema);

router.get('/', function(req, res, next) {
   var error = { status: 0, stack : "" };
     res.render('index.ejs',{message:  'No hay error' ,  error })
});

router.get('/registro_error', function(req, res, next) {
     var error = { status: 405, stack : "" };
     res.render('index.ejs',{message:  'Error al registrar el usuario, usuario ya existe' ,  error })
});

router.get('/login_error', function(req, res, next) {
     var error = { status: 406, stack : "" };
     res.render('index.ejs',{message:  'Error al loguearse, usuario o contraseña erronera' ,  error })
});

router.get('/home', isLoggedIn, function(req, res) {
 // console.log(req.user.usuario.tipo);
  if(req.user.usuario.tipo == "profesor"){
    res.render('home_profesor.ejs', { user: req.user, expressFlash: '' });
  }else{
    res.render('home.ejs', { user: req.user, expressFlash: '' });
}});

router.get('/home_profesor', isLoggedIn, function(req, res) {
   if(req.user.usuario.tipo == "profesor"){
    res.render('home_profesor.ejs', { user: req.user, expressFlash: '' });
   }else{
    res.redirect("/");
}});

router.get('/form_clase', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
     res.render('form_clase.ejs', { user: req.user, registrado: null, expressFlash: '' });
  }else{
    res.redirect("/");
}});

router.post('/registro_clase',  isLoggedIn, function(req,res){
  var newClase = Clase();
  Clase.find({"clase.nombre_clase" :req.body.nombreClase,"clase.profesor_username":req.user.usuario.username,"clase.curso" :req.body.curso},
            function(err,clas) {
                //console.log("error" + err);
                //console.log("error" + clas);
                if (err) throw err;
                //console.log(clas.length + "Datos que miroa ahioar")
                if (clas.length < 1){
                  newClase.clase.nombre_clase = req.body.nombreClase;
                  newClase.clase.curso = req.body.curso;  
                  newClase.clase.profesor_username = req.user.usuario.username; 
                  newClase.clase.password =  newClase.generateHash(req.body.password);
                  // Guardamos en la bbdd.
                  newClase.save(function(err) {
                  if (err) throw err;
                    return newClase;
                  });
                  console.log("Introducir datos nuevo en la collection clase");
                  res.render('form_clase.ejs', { user: req.user, registrado: true, expressFlash: '' });
                }else{
                  console.log("Dato nuevo esta en la bbdd. No se introduce.");
                  res.render('form_clase.ejs', { user: req.user, registrado: false, expressFlash: '' });
            }});
});

router.get('/form_reto', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
    res.render('form_reto.ejs', { user: req.user, expressFlash: '' });
  }else{
    res.redirect("/");
}});

router.get('/clases', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
      res.render('clases.ejs', { user: req.user, expressFlash: '' });
  }else{
      res.redirect("/");
}});

router.get('/retos', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
       res.render('retos.ejs', { user: req.user, expressFlash: '' });
  }else{
       res.redirect("/");
}});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get('/games', isLoggedIn, function(req, res) {
  res.render('games.ejs', { user: req.user,title: "Juegos" });
});

router.get('/g_damas', isLoggedIn, function(req, res) {
  res.render('g_damas.ejs', { user: req.user,title: "Damas" });
});

router.get('/g_tresenraya', isLoggedIn, function(req, res) {
  res.render('g_tresenraya.ejs', { user: req.user,title: "3 en raya" });
});

router.get('/g_ajedrez', isLoggedIn, function(req, res) {
  res.render('g_ajedrez.ejs', { user: req.user,title: "Ajedrez" });
});

router.get('/g_buscaminas', isLoggedIn, function(req, res) {
  res.render('g_buscaminas.ejs', { user: req.user,title: "Buscaminas" });
});

router.get('/g_banderas', isLoggedIn, function(req, res) {
  res.render('g_banderas.ejs', { user: req.user,title: "Reto de las banderas" });
});

router.get('/g_planetas', isLoggedIn, function(req, res) {
  res.render('g_planetas.ejs', { user: req.user,title: "Reto de los planetas" });
});

router.get('/g_capitales', isLoggedIn, function(req, res) {
  res.render('g_capitales.ejs', { user: req.user,title: "Reto de las capitales" });
});

router.get('/g_articulos', isLoggedIn, function(req, res) {
  res.render('g_articulos.ejs', { user: req.user,title: "Reto de los artículos" });
});

router.get('/g_multiplicacion', isLoggedIn, function(req, res) {
  res.render('g_multiplicacion.ejs', { user: req.user,title: "Reto de la multiplicación" });
});

router.get('/g_suma', isLoggedIn, function(req, res) {
  res.render('g_suma.ejs', { user: req.user,title: "Reto de la suma" });
});

router.get('/g_tp', isLoggedIn, function(req, res) {
  res.render('g_tp.ejs', { user: req.user,title: "Reto de los elementos" });
});


router.post('/registro', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/registro_error',
  failureFlash: true,
}));



router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login_error',
  failureFlash: true,
}));

// ### ACTUALIZAR ESTADÍSTICAS ###
router.get('/actualizar', isLoggedIn, (request, response) => {

    User.find({}, function(err,data)
    {
        if(err)  console.error("Error:"+err);
        else
        {
              if( request.query.ganadas_3enraya != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.ganadas_3enraya":1,"usuario.totales_3enraya":1}},function(error,dato){
                          });
                    }
              }

              }
              if( request.query.perdidas_3enraya  != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].id === request.session.passport.user){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.perdidas_3enraya":1,"usuario.totales_3enraya":1}},function(error,dato){

                          });

                        }
                     }

              }
              if( request.query.empatadas_3enraya  != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].id === request.session.passport.user){

                          User.update({"_id": data[i]._id}, {$inc: {"usuario.empatadas_3enraya":1,"usuario.totales_3enraya":1}},function(error,dato){

                          });

                        }
                     }

              }

              if( request.query.ganadas_ajedrez != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.ganadas_ajedrez":1,"usuario.totales_ajedrez":1}},function(error,dato){
                          });
                    }
              }

              }

              if( request.query.perdidas_ajedrez != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.perdidas_ajedrez":1,"usuario.totales_ajedrez":1}},function(error,dato){
                          });
                    }
              }

              }

              if( request.query.empatadas_ajedrez != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.empatadas_ajedrez":1,"usuario.totales_ajedrez":1}},function(error,dato){
                          });
                    }
              }

              }

              ///Actualizar Buscaminas
              if( request.query.ganadas_buscaminas != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.ganadas_buscaminas":1,"usuario.totales_buscaminas":1}},function(error,dato){
                          });
                    }
              }

              }

              if( request.query.perdidas_buscaminas != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"usuario.perdidas_buscaminas":1,"usuario.totales_buscaminas":1}},function(error,dato){
                          });
                    }
              }

              }

              ///Actualizar Damas
              if( request.query.ganadas_damas != undefined){
                for (var i = data.length - 1; i >= 0; i--) {
                  if( data[i].id === request.session.passport.user ){
                    User.update({"_id": data[i]._id}, {$inc: {"usuario.ganadas_damas":1,"usuario.totales_damas":1}},function(error,dato){
                      });
                  }
                }
              }

              if( request.query.perdidas_damas != undefined){
                for (var i = data.length - 1; i >= 0; i--) {
                  if( data[i].id === request.session.passport.user ){
                    User.update({"_id": data[i]._id}, {$inc: {"usuario.perdidas_damas":1,"usuario.totales_damas":1}},function(error,dato){
                      });
                  }
                }
              }
        }
    });

});



//////////////////////SUBIR IMAGEN PARA PERFIL DE USUARIO
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/img/uploads')
	},
	filename: function(req, file, callback) {
		callback(null, req.session.passport.user + path.extname(file.originalname))

	}
})

router.post('/home', isLoggedIn, function(req, res) {
	var upload = multer({
		storage: storage,
		fileFilter: function (req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext != '.jpg') {
				req.fileValidationError = true;
				return callback(new Error('formato incorrecto')); //Para que no suba y almacene la imagen si no es jpg
			}
			callback(null, true);
		}
	}).single('userFile');
	upload(req, res, function(err) {
    if(req.fileValidationError) { //Error con el formato de la imagen
      res.render('home.ejs', { user: req.user, expressFlash: 'ERROR: solo imágenes JPG!' });
    }
    else{
      res.redirect('back'); //Refresca la página después de cambiar la foto de perfil
    }
	})
})

router.post('/home_profesor', isLoggedIn, function(req, res) {
	var upload = multer({
		storage: storage,
		fileFilter: function (req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext != '.jpg') {
				req.fileValidationError = true;
				return callback(new Error('formato incorrecto')); //Para que no suba y almacene la imagen si no es jpg
			}
			callback(null, true);
		}
	}).single('userFile');
	upload(req, res, function(err) {
    if(req.fileValidationError) { //Error con el formato de la imagen
      res.render('home.ejs', { user: req.user, expressFlash: 'ERROR: solo imágenes JPG!' });
    }
    else{
      res.redirect('back'); //Refresca la página después de cambiar la foto de perfil
    }
	})})
//////////////////////TERMINADO SUBIR IMAGEN
//*Se veran las clase en la qeu estoy si soy alumno con diversos datos *//
//Se veran las clase en la que estoy condiversos datos. buscamo donde estamo los alumnos.
router.get('/rankings', isLoggedIn, function(req, res) {
  //db.clases.find({"clase.alumnos_email": "pedro3@gmail.com"},{"clase.nombre_clase":1, "clase.retos.nombre_reto": 1}).pretty();
  //    res.render('rankings.ejs', { user: req.user,title: "Rankings" });
  var newClase = Clase();
    console.log(req.user.usuario.email);
  Clase.find({"clase.alumnos_email": req.user.usuario.email},{"clase.nombre_clase":1, "clase.retos.nombre_reto": 1},
            function(err, clas) {
                if (err) throw err;
                //console.log(clas.length + "Datos que miroa ahioar")
                  console.log("Introducir datos nuevo en la collection clase");
                 // console.log(clas[0].clase.nombre_clase);
                   
                  res.render('rankings.ejs', {user: req.user, data: clas, title: "Rankings" });
          });
});
////////////////////////////////////
// de ranking se le pasaran los datos de que reto exactamente se quieres jugar.
// aki se buscara segurn ese retot
router.get('/r_reto', isLoggedIn, function(req, res) {
  //db.clases.find({"clase.retos.nombre_reto": "Test2"},{"clase.retos.$":1}).pretty();
  //console.log(req.query.selector); esta sera la seleccion de mi reto para 
  // db.clases.find({"clase.nombre_clase":"Geografía","clase.alumnos_email":"pedro3@gmail.com"},{"clase.retos.nombre_reto":1, "clase.retos.ganadas": 1, "clase.retos.perdidas": 1}).pretty();

   //var nameClase =  req.query.selector.split("=",  req.query.selector.length);
  // console.log(nameClase);
    // console.log("dddddddddddddddddddddddddd" );
   req.query.selector;
   Clase.find({"clase.nombre_clase":"Matemáticas","clase.alumnos_email":"pedro3@gmail.com", "clase.retos.nombre_reto": "JuegoBandera" },
              { "clase.retos.$": 1},
   
      function(err,data){
    if(err)  console.error("Error:"+err);
     res.render('r_reto.ejs', { user: req.user, win: data[0].clase.retos[0].ganadas, loss: data[0].clase.retos[0].perdidas , title: req.query.selector })
})});




module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
