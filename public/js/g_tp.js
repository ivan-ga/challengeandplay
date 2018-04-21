var cuenta = 0;
//////GENERAR ELEMENTO ALEATORIO

var elementos = ["Estaño", "Oro", "Plata", "Hierro", "Plutonio", "Mercurio", "Teneso", "Xenón", "Helio", "Oxigeno", "Hidrógeno", "Carbón", 
"Einstenio", "Francio", "Manganeso", "Magnesio", "Sodio", "Potasio", "Níquel", "Paladio", "Litio", "Rubidio", "Vanadio", "Aluminio", 
"Nitrógeno", "Indio", "Flúor", "Fósforo", "Germanio", "Radón", "Berilio", "Iridio", "Zinc", "Azufre", "Neón", "Dubnio", "Platino", "Titanio", "Itrio", "Yodo", "Bario"
,"Argón", "Cadmio", "Tecnecio"];


function elemento_aleatorio(){
  cuenta++;
  if(cuenta <= 10){
    var getRandomWord = function () {
        return elementos[Math.floor(Math.random() * elementos.length)];
    };
    
    var word = getRandomWord();
    
    document.getElementById("elemento").textContent = word;
  }
  else{
    document.getElementById("elemento").textContent = "¡RETO TERMINADO!";
  }
}


///////////////////////

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeImage_bien(identificador) {
    
    document.getElementById(String(identificador)).style.backgroundColor="green";
    
    var index = elementos.indexOf(String(identificador));
    if (index > -1) {
      elementos.splice(index, 1);
    }
    document.getElementById(String(identificador)).style.pointerEvents = "none";
    elemento_aleatorio();
}
   


async function changeImage_mal(identificador) {
    
    document.getElementById(String(identificador)).style.backgroundColor= "red";
    await sleep(1000);
    document.getElementById(String(identificador)).style.backgroundColor= "#d6d2e1";
   
}

function comprueba(nombre){
  if(document.getElementById('elemento').innerHTML == nombre){
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

