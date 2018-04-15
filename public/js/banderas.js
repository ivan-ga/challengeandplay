
//////GENERAR PAIS ALEATORIO

var paises = ["Argentina", "Australia", "Brasil", "China", "Italia", "Israel", "Noruega", "Suecia", "Bulgaria", "Finlandia", "Cuba", "Dinamarca", 
"Alemania", "Francia", "Colombia", "Ucrania", "Albania", "Grecia", "Kenia", "Marruecos", "Gales", "Inglaterra", "Irlanda", "Tailandia", 
"Ghana", "India", "Rusia", "Venezuela", "Jamaica"];


function pais_aleatorio(){
  var getRandomWord = function () {
      return paises[Math.floor(Math.random() * paises.length)];
  };
  
  var word = getRandomWord();
  
  document.getElementById("pais").textContent = word;
}

///////////////////////

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeImage_bien(identificador) {
    
    document.getElementById(String(identificador)).innerHTML = '<img class="flag" src=\'check.png\'>';
    
    var index = paises.indexOf(String(identificador));
    if (index > -1) {
      paises.splice(index, 1);
    }
    document.getElementById(String(identificador)).style.pointerEvents = "none";
    pais_aleatorio();
}
   


async function changeImage_mal(identificador) {
    
    document.getElementById(String(identificador)).innerHTML = '<img class="flag" src=\'mal.png\'>';
    await sleep(1000);
    document.getElementById(String(identificador)).innerHTML = '<img class="flag" src=\'img'+'\/'+String(identificador)+'.png\'>';
   
}

function comprueba(nombre){
  if(document.getElementById('pais').innerHTML == nombre){
    changeImage_bien(nombre);
    modify_qty(1,1);
  }
  else{
    changeImage_mal(nombre);
    modify_qty(1,0);
  }
}

//Contador de aciertos y errores
function modify_qty(val, tipo) {
    if(tipo){ //es un acierto
      var qty = document.getElementById('qty').value;
      var new_qty = parseInt(qty,10) + val;
      
      if (new_qty < 0) {
          new_qty = 0;
      }
    
      document.getElementById('qty').value = new_qty;
      return new_qty;
    }
    else{ //es un error
      var qty = document.getElementById('qty_fallo').value;
      var new_qty = parseInt(qty,10) + val;
      
      if (new_qty < 0) {
          new_qty = 0;
      }
    
      document.getElementById('qty_fallo').value = new_qty;
      return new_qty;
    }
}

