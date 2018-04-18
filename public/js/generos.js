var cuenta;
var aciertos = 0;
var errores;
localStorage.setItem("aciertos", null);
console.log(localStorage.getItem("aciertos"));
function contador(c){
    return c=c+1;
}

function setWord() {
  
    // Return random int between min (included) and max (excluded)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    const wordList = [
      ["acción", "acidez", "actitud", "actividad", "actriz", "admisión", "afinidad", "agilidad", "agresión", "alarma", "alerta", "alimentación", "altitud", "amabilidad", "ambición", "amenaza", "amistad", "antítesis", "aparición", "apendicitis", "apuesta", "arpa", "arruga", "aula", "autoestima", "autoridad", "aviación", "avispa", "barbarie", "base", "beca", "bendición", "bota", "broma", "bronquitis", "cadera", "calle", "calma", "calvicie", "cama", "canción", "capacidad", "capacitación", "carne", "carta", "causa", "célula", "cerveza", "chusma", "cicatriz", "cifra", "cirugía", "ciudad", "ciudadanía", "clase", "clave", "coliflor", "colisión", "columna", "comezón", "comisión", "compasión", "compostura", "comprensión", "conclusión", "confesión", "copa", "corbata", "cordialidad", "cordillera", "corriente", "costumbre", "creencia", "crema", "crisis", "cruz", "cumbre", "cuota", "dama", "decisión", "derrota", "descarga", "desnudez", "desnutrición", "dieta", "difusión", "dirección", "directriz", "discusión", "división", "donación", "ductilidad", "ecuación", "edad", "efigie", "emisión", "emoción", "emperatriz", "emulsión", "encuesta", "entidad", "erosión", "erudición", "escama", "esclavitud", "esgrima", "especie", "esponja", "espuma", "equidad", "exactitud", "excursión", "explosión", "exposición", "extensión", "extorsión", "fábrica", "facción", "facultad", "fama", "faz", "fe", "felicidad", "fiebre", "firma", "flauta", "flema", "flor", "forma", "foto", "frase", "fuente", "fuerza", "fuga", "función", "fusión", "gallardía", "galleta", "gama", "garganta", "gastritis", "gaviota", "gente", "gestión", "goma", "grama", "gratitud", "guitarra", "habitación", "herramienta", "hipoteca", "huelga", "idea", "idiotez", "igualdad", "ilusión", "imagen", "implosión", "incertidumbre", "índole", "ineptitud", "información", "ingratitud", "inquietud", "invasión", "inyección", "isla", "jerga", "jubilación", "junta", "juventud", "latitud", "leche", "legión", "legumbre", "letra", "ley", "libertad", "liebre", "liquidez", "llama", "llave", "lombriz", "longitud", "lucidez", "lumbre", "luz", "lágrima", "lástima", "madre", "madurez", "magnitud", "malcriadez", "mano", "mansión", "maqueta", "materia", "medianoche", "mente", "merced", "mesa", "meta", "miel", "misión", "mortandad", "moto", "motocicleta", "mucama", "muchedumbre", "muerte", "mujer", "multitud", "nación", "nariz", "natalidad", "nieve", "nitidez", "niñez", "nobleza", "noche", "normalidad", "novedad", "nube", "nuez", "nutrición", "obsesión", "ocasión", "omisión", "oración", "orquesta", "oscuridad", "palidez", "palma", "paloma", "pared", "partícula", "pascua", "pasión", "pauta", "paz", "pensión", "percusión", "peregrinación", "pesadez", "piel", "piñata", "placidez", "plenitud", "pluma", "pobreza", "precisión", "presión", "prisión", "privación", "procesión", "propuesta", "protección", "prótesis", "pubertad", "radioactividad ", "rama", "rapidez", "razón", "raíz", "receta", "red", "redacción", "región", "reglamentación", "reina", "religión", "remuneración", "represión", "revisión", "revista", "revulsión", "ridiculez", "rigidez", "rima", "rodaja", "ropa", "sabiduría", "sal", "salud", "sangre", "sazón", "sección", "sed", "seda", "sede", "semana", "senectud", "sensatez", "serie", "serpiente", "sesión", "siesta", "similitud", "situación", "soberanía", "solicitud", "solidez", "solución", "soprano", "subvención", "suerte", "superficie", "supervivencia", "supresión", "tarde", "tarima", "tecnología", "tele", "televisión", "tensión", "tesis", "tez", "torre", "torta", "tradición", "tradición cultural", "traición", "trama", "transfusión", "transgresión", "transmisión", "tribu", "trompeta", "universidad", "unión", "utilidad", "validez", "vanidad", "vejez", "venta", "verdad", "versión", "vez", "vida", "viola", "virtud", "visión", "vitrina", "voz", "víctima", "yema"],

      ["abridor", "aceite", "agitador", "agresor", "agua", "aire", "ajedrez", "ají", "alcance", "alfil", "algodón", "amanecer", "amor", "análisis", "anfitrión", "ángel", "animal", "antifaz", "aporte", "aprendizaje", "arancel", "aroma", "arrabal", "arroz", "arte", "asentamiento", "asesor", "asueto", "atajo", "atardecer", "ataúd", "aterrizaje", "auge", "aumento", "automóvil", "autor", "avance", "avestruz", "avión", "azar", "balompié", "barniz", "barril", "blog", "botiquín", "brindis", "buey", "cachivache", "café", "callejón", "calor", "camión", "candor", "capricho", "carruaje", "caudal", "cazador", "certamen", "chantaje", "cheque", "chisme", "chiste", "chocolate", "choque", "cine", "cisne", "clamor", "clarinete", "clavel", "clima", "coche", "cohete", "color", "contrabajo", "convenio", "coraje", "corazón", "cromosoma", "cronograma", "crucigrama", "cuarto", "cubrecama", "cuero", "cursor", "cáliz", "césped", "colorete", "componente", "cóndor", "cutis", "cuy", "dátil", "desagüe", "desarrollo", "desdén", "desfile", "deslave", "detalle", "deudor", "desván", "diafragma", "diamante", "diente", "dilema", "diploma", "disfraz", "dólar", "dolor", "domingo", "donaire", "drama", "día", "ecosistema", "editor", "efecto", "elefante", "emblema", "engaño", "enigma", "enlace", "envejecimiento", "epigrama", "equipaje", "error", "esfuerzo", "esguince", "esquema", "estallido", "estigma", "estoma", "euro", "factor", "fantasma", "favor", "fax", "fervor", "festival", "fósil", "fracaso", "fraile", "furor", "fusil", "garaje", "garbo", "gen", "genoma", "gestor", "gorila", "hambre", "hematoma", "hogar", "holograma", "hombre", "honor", "horror", "hospital", "humor", "idioma", "imán", "inspector", "interés", "jardín", "juego", "jueves", "kilometraje", "laúd", "lector", "lema", "lenguaje", "libertinaje", "licor", "linaje", "lunar", "lunes", "lápiz", "mal", "maní", "mapa", "maquillaje", "martes", "masaje", "material", "matiz", "maíz", "medio ambiente", "mediodía", "melisma", "mensaje", "mentor", "mes", "miércoles", "monograma", "montaje", "muelle", "nombre", "oboe", "octanaje", "ordenador", "órgano", "oro", "padre", "país", "paisaje", "pan", "panorama", "papel", "paradigma", "paraje", "pasaje", "pastel", "patriarca", "patrimonio", "peaje", "pensamiento", "perdón", "peregrinaje", "perfil", "personaje", "pez", "piano", "pie", "pincel", "planeta", "plumaje", "poema", "porcentaje", "porvenir", "precio", "problema", "programa", "pulgar", "pulmón", "puma", "pájaro", "queso", "quirófano", "recorte", "reloj", "reportaje", "reproductor", "rescate", "restaurante", "rey", "riesgo", "rímel", "rodaje", "ron", "rumbo", "sacerdote", "semáforo", "ser", "sillón", "síndrome", "síntoma", "sistema", "sitio", "sobre", "sofá", "sol", "soporte", "sábado", "tamal", "tambor", "tatuaje", "telegrama", "televisor", "tema", "temblor", "teorema", "timbal", "total", "trabajador", "traje", "tranvía", "trauma", "trébol", "té", "ultraje", "vals", "vendaje", "viaje", "viernes", "violín", "violonchelo", "virrey", "xilófono", "yoga"]
    ];
  
    const articles = ['la', 'el'];
    
    var $buttons = $('.btn');
    var elOrLa = Math.round(Math.random());
    var article = articles[elOrLa];
    var $goodBtn = $('#' + article + '-btn');
    
    var $word = $('#test-word');
    var word = wordList[elOrLa][getRandomInt(0, wordList[elOrLa].length)];
    $word.text(word);
    
    $buttons.click(function() {
        if (this.id == $goodBtn[0].id && cuenta!=10) {
            modify_qty(1,1);
            cuenta=cuenta+1;
            location.reload(true);
        } else {
            modify_qty(1,0);
            alert('TOMA NOTA: ' + article + ' ' + word);
            // $buttons.not($goodBtn).fadeOut();
            // $goodBtn.addClass('btn-success').removeClass('btn-primary');
            // $word.addClass('bg-danger').removeClass('bg-warning');
            location.reload(true);
        }
    });
}

setWord();

function check_marcador(){
    
    if(localStorage.getItem("aciertos") == null){
        document.getElementById("qty").value = 0;
        localStorage.setItem("aciertos", 0);
        console.log(localStorage.getItem("aciertos"));
    }
    else{
        document.getElementById("qty").value = localStorage.getItem("aciertos");
    }   
    if(localStorage.getItem("errores") == null)
        document.getElementById("qty_fallo").value = 0;
    else
        document.getElementById("qty_fallo").value = localStorage.getItem("errores");
}

function modify_qty(val, tipo) {
    if(tipo){ //es un acierto
      var qty = document.getElementById('qty').value;
      var new_qty = parseInt(qty,10) + val;
      
      if (new_qty < 0) {
          new_qty = 0;
      }
      //document.getElementById('qty').value = new_qty;
      //aciertos=new_qty;
      localStorage.setItem("aciertos", aciertos+new_qty);
      return new_qty;
    }
    else{ //es un error
      var qty = document.getElementById('qty_fallo').value;
      var new_qty = parseInt(qty,10) + val;
      
      if (new_qty < 0) {
          new_qty = 0;
      }
      //errores=new_qty;
      localStorage.setItem("errores", errores+new_qty);
      //document.getElementById('qty_fallo').value = new_qty;
      return new_qty;
    }
}