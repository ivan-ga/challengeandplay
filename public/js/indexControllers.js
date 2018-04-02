var myApp = angular.module("myApp", []);

myApp.controller("PieCtrl", function($scope) {
  $scope.footer = {name: "footer.html", url: "footer.html"};
});

myApp.controller("controladorConMetodos", function($scope){

           $scope.form=false;
           var fo = this;
           //inicializo un objeto en los datos de formulario
           //Primero aki dentro despues html coge lso dao y lo pasa.
           fo.registro = {};
           fo.login = {};
           console.log(fo.registro);
           $scope.ShowForm=function(){
                  fo.login.username = "";
                  fo.login.password = "";
                  $scope.estilos={display:"block"};
                  $scope.form=true;
           }

           $scope.ShowRetroceder=function(){
                
                  fo.registro.username = "";
                  fo.registro.password = "";
                  fo.registro.passwordh = "";
                  $scope.form=false;
            }
            
            fo.comprobar= function(){
                
                if(fo.registro.password === fo.registro.passwordh){
                   return true; 
                }else return false;
            }
           });

myApp.controller('loginCtrl', ['$http',controladorPrincipal ]);
function controladorPrincipal($http, $scope){
        var vm=this;
        var home=this;
        home.datos={};
        //inicializo un objeto en los datos de formulario
        //Primero aki dentro despues html coge lso dao y lo pasa.
        vm.fdatos = {};
        vm.enviar = function(){
                // $http.post("/login", mensaje)
                 $http.post("/login",  vm.fdatos).then(function(res){
                               vm.fdatos.username="";
                               vm.fdatos.password=""; 
                               home.datos = res.data;
                                console.log("eroro" + res.data);
                      },function (res) {
                       //  console.log("eroro" + res.data);
                     });
        }
}




myApp.controller('registroCtrl', ['$http',controladorRegistro ]);

function controladorRegistro($http){
        var rg=this;
        //inicializo un objeto en los datos de formulario
        //Primero aki dentro despues html coge lso dao y lo pasa.
        rg.registro = {};
        rg.registrar = function(){
             console.log(  rg.registro);
             $http.post("/registro",   rg.registro).then(function(res){

                                 console.log(res.data);
                                        //  rg.registro.username="";
                                         // rg.registro.password="";
                                          // rg.registro.passwordh="";
              //por supuesto podrás volcar la respuesta al modelo con algo como vm.res = res;
                    },function (res) {
                         console.log(res.data);
                     });
        }
}

///////////////Controlador de lal desplegable de selección. //////////////////////////
myApp.controller('TodoListController', function() {

    // Inicio las variables.
    var todoList = this;
    todoList.todos = [{text: "Matemáticas"},{text: "Química"},
    {text: "Física"},{text: "Geografía"}];

    var listaNSelec= this; 
    var listaSelec= this; 
    //Listado de asignaturas no seleccionadas.
    listaSelec.Nasignaturas = [{text: "Matemáticas"},{text: "Química"},
    {text: "Física"},{text: "Geografía"}];
     listaSelec.Sasignaturas = [];
     listaSelec.addTodo = function(texto) {
          // La lista de selección se me se introduce un nuevo elemeto
          listaSelec.todoText = texto;
          console.log("Estoy akii");
          listaSelec.Sasignaturas.push({text: listaSelec.todoText});
        
          // De la lista No seleccionada Borrar el elemento.
          listaSelec.removeElement(texto);
          
    }
    
    /// Borrar
    listaSelec.removeElement = function(texto) {
        var nueva = [];
        var oldTodos = listaSelec.Nasignaturas;
        var paso;
        
        for (paso = 0; paso < listaSelec.Nasignaturas.length; paso++) {
            if( listaSelec.Nasignaturas[paso].text !==  texto){
                nueva.push( listaSelec.Nasignaturas[paso] );
                console.log(listaSelec.Nasignaturas[paso]);
            }
         }   
         
         listaSelec.Nasignaturas = [];
         listaSelec.Nasignaturas = nueva;
         angular.forEach(nueva,function(todo) {
            console.log(todo); 
      });
    } 
    
     /* borra */
    listaSelec.quitarSelec = function(texto) {
        var nueva = [];
        var oldTodos = listaSelec.Sasignaturas;
        var paso;
        
        for (paso = 0; paso < listaSelec.Sasignaturas.length; paso++) {
            if( listaSelec.Sasignaturas[paso].text !==  texto){
                nueva.push( listaSelec.Sasignaturas[paso] );
                console.log(listaSelec.Sasignaturas[paso]);
            }else{
                listaNSelec.Nasignaturas.push({text: texto});
            }
         }   
         
         listaSelec.Sasignaturas = [];
         listaSelec.Sasignaturas = nueva;
         //listaSelec.asignaturas = [];
      
        console.log("Estoy akii en remove");
        
        angular.forEach(nueva,function(todo) {
            console.log(todo); 
      });
    }
    
   /*Imprimo por pantalla mi lista dond esta la varialbe 
    Cojo los dato de mi lista y los guado en  loa viejos
    hago un swqp entre listas  todo se queda con todo los datos. para eliminar*/
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });

/////////////////////////////////////////////////////////////////////////////////////



myApp.controller("verTextRS",   function($scope) {

 $scope.Github="Github";

 var nuevo = "";
 setInterval( nuevo=function otro(){

                var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
console.log("Mi tamaño es " + width)
return width




}


,1000)


if(nuevo<1200){
      console.log("soy chikitooo");

      $scope.Github = "";
}else{
    $scope.Github = "Github"
}

 console.log("estoy afuera "+$scope.Github);



}



);
