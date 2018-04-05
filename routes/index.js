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

//Importando esquemas de BD
const Estructura = require('../models/user.js');
const userSchema = Estructura.User;

const User = mongoose.model("User", userSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/registro_error', function(req, res, next) {

     var error = { status: 405, stack : "" };
     res.render('error.ejs',{message:  'Error al registrar el usuario, usuario ya existe' ,  error })
});

router.get('/login_error', function(req, res, next) {

     var error = { status: 406, stack : "" };
     res.render('error.ejs',{message:  'Error al loguearse, usuario o contraseña erronera' ,  error })
});

router.get('/home', isLoggedIn, function(req, res) {
 // console.log(req.user.usuario.tipo);
  if(req.user.usuario.tipo == "profesor"){
    res.render('home_profesor.ejs', { user: req.user, expressFlash: '' });
  }else{
     res.render('home.ejs', { user: req.user, expressFlash: '' });
  }
});

router.get('/home_profesor', isLoggedIn, function(req, res) {
   if(req.user.usuario.tipo == "profesor"){
      res.render('home_profesor.ejs', { user: req.user, expressFlash: '' });
   }else{
     
   }
   
});

router.get('/form_clase', isLoggedIn, function(req, res) {
console.log("E pedido console lod form claseeeeeeeeeeeeeeeeeeeeeee");
if(req.user.usuario.tipo == "profesor"){
  res.render('form_clase.ejs', { user: req.user, expressFlash: '' });
}else{
  
}
});

router.get('/form_reto', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
  res.render('form_reto.ejs', { user: req.user, expressFlash: '' });
  }else{
    
  }
});

router.get('/clases', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
  res.render('clases.ejs', { user: req.user, expressFlash: '' });
  }else{
    
  }
});

router.get('/retos', isLoggedIn, function(req, res) {
  if(req.user.usuario.tipo == "profesor"){
  res.render('retos.ejs', { user: req.user, expressFlash: '' });
  }else{
    
  }
});


router.get('/logout', function(req, res) {
 req.logout();
 res.redirect("/");
});

router.get('/games', isLoggedIn, function(req, res) {
  res.render('games.ejs', { user: req.user,title: "Juegos" });
});

router.get('/rankings', isLoggedIn, function(req, res) {
  res.render('rankings.ejs', { user: req.user,title: "Rankings" });
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

router.get('/r_tresenraya', isLoggedIn, function(req, res) {
  User.find().sort('-usuario.ganadas_3enraya').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_tresenraya.ejs', { user: req.user, users: data, title: "3 en raya" })
     })
});

router.get('/r_ajedrez', isLoggedIn, function(req, res) {
  User.find().sort('-usuario.ganadas_ajedrez').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_ajedrez.ejs', { user: req.user, users: data,title: "Ajedrez" })
     })
});

router.get('/r_buscaminas', isLoggedIn, function(req, res) {
  User.find().sort('-usuario.ganadas_buscaminas').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_buscaminas.ejs', { user: req.user, users: data,title: "Buscamnias" })
     })
});

router.get('/r_damas', isLoggedIn, function(req, res) {
  User.find().sort('-usuario.ganadas_damas').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_damas.ejs', { user: req.user, users: data,title: "Damas" })
     })
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

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login_error',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/home',
  failureRedirect: '/login_error',
}));

router.get('/login/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

router.get('/login/github/return', passport.authenticate('github', {
  successRedirect: '/home',
  failureRedirect: '/login_error',
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
	})

})
//////////////////////TERMINADO SUBIR IMAGEN

module.exports = router;

function isLoggedIn(req, res, next) {
 console.log("Me cago en la putaaaaaaaaaaaaaaaaaaa");
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
