var capitals = [
		  {
		    "preg": "Descrubridor de América (Nombre completo)",
		    "respuesta": "Cristóbal Colón"
		  },
		  {
		    "preg": "Rey de los Hunos",
		    "respuesta": "atila"
		  },
		  {
		    "preg": "Primer presidente de EEUU",
		    "respuesta": "George Washington"
		  },
		   {
		    "preg": "Nombres de los Reyes Católicos",
		    "respuesta": "isabel fernando"
		  },
		   {
		    "preg": "Primer hombre en llegar a la Luna",
		    "respuesta": "Neil Armstrong"
		  },
		   {
		    "preg": "Emperador romano más famoso",
		    "respuesta": "Julio César"
		  },
		   {
		    "preg": "Líder alemán durante la segunda Guerra Mundial",
		    "respuesta": "Adolf Hitler"
		  },
		   {
		    "preg": "General republicano durante la revolución francesa",
		    "respuesta": "Napoleón"
		  },
		   {
		    "preg": "Descifró la máquina enigma",
		    "respuesta": "Alan Turing"
		  },
		  
		]
		
		var p;
		var r;
		
		function generar_pregunta(){
			if (capitals && capitals.length) { //Si el array no está vació. Si quedan preguntas.
    			document.getElementById('pregunta').innerHTML = capitals[0].preg;
    			p = capitals[0].preg;
    			r = capitals[0].respuesta.toLowerCase();
    			capitals.splice(0, 1);
    			console.log('r: '+r);
			}
			else{
			   document.getElementById('pregunta').innerHTML = '¡RETO TERMINADO!'; 
			   document.getElementById('comprueba').style.visibility = 'hidden';
			}
		}
		
		function comprobar(){
			if(document.getElementById('respuesta').value.toLowerCase() == r){
				console.log('bieeeen');
				modify_qty(1,1);
				//document.getElementById('comprobacion').innerHTML = '¡Correcto!';
				generar_pregunta();
				//document.getElementById('comprobacion').innerHTML = '';
				document.getElementById('respuesta').value = ''; //Limpiar el input
			}
			else{
			    modify_qty(1,0);
				console.log('maaaaal');
				//document.getElementById('comprobacion').innerHTML = '¡Incorrecto!';
				generar_pregunta();
				document.getElementById('respuesta').value = ''; //Limpiar el input
			}
		}
		
		var input = document.getElementById("comprueba");
		input.addEventListener("keyup", function(event) {
		  // Cancel the default action, if needed
		  event.preventDefault();
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		  	console.log('enteeeeerrrrrr');
		    // Trigger the button element with a click
		    //document.getElementById("comprueba").click();
		    comprobar();
		  }
		});
		
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