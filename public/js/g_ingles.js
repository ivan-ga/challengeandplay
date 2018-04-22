var score = 0;

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

$(document).ready(function () {


//databases
  
  var defaultDatabase = {'reunión' : 'meeting',
  'beneficio' : 'profit',
  'ahorros' : 'savings',
  'deuda' : 'debt',
  'informe' : 'report',
  'compañero' : 'colleague',
  'descargar' : 'download',
  'archivo' : 'file',
  'teclado' : 'keyboard',
  'contraseña' : 'password', 'hueso' : 'bone',
  'esqueleto' : 'skeleton',
  'cráneo' : 'skull',
  'costilla' : 'rib',
  'riñón' : 'kidney',
  'cerebro' : 'brain',
  'sangre' : 'blood',
  'hígado' : 'liver',
  'pulmón' : 'lung',
  'piel' : 'skin',
  'muñeca' : 'wrist',
  'cadera' : 'hip',
  'varicela' : 'chicken-pox',
  'cuello' : 'neck',
  'apoplejía' : 'stroke',
  'sarampión' : 'measles', 'caldero' : 'cauldron',
   'lechuza' : 'barn-owl',
   'magia' : 'magic',
   'capa' : 'cloak',
   'varita' : 'wand',
   'escoba' : 'broom',
   'cáliz' : 'chalice',
   'calcetín' : 'sock',
   'hechizos' : 'spells',
   'mago' : 'wizard',
   'bruja' : 'witch',
   'dragón' : 'dragon',
   'pluma' : 'feather',
   'paraguas' : 'umbrella',
   'duende' : 'goblin',
   'espada' : 'sword',
   'hechicería' : 'witchcraft',
   'mazmorras' : 'dungeons', 'lagarto' : 'alligator',
    'mariposa' : 'butterfly',
    'abeja' : 'bee',
    'hurón' : 'ferret',
    'pez' : 'fish',
    'cerdo' : 'pig',
    'águila' : 'eagle',
    'hormiga' : 'ant',
    'oveja' : 'sheep',
    'conejo' : 'rabbit',
    'gata' : 'cat',
    'rana' : 'frog',
    'erizo' : 'hedgehog',
    'libélula' : 'dragonfly',
    'cisne' : 'swan',
    'cabra' : 'goat',
    'zorro' : 'fox',
    'ardilla' : 'squirrel',
    'nutria' : 'otter',
    'ciervo' : 'deer',
    'liebre' : 'hare',
    'mariquita' : 'ladybird',
    'comadreja' : 'weasel',
    'búho' : 'owl',
    'gavilán' : 'hawk',
    'golondrina' : 'swallow',
    'gorrión' : 'sparrow',
    'halcón' : 'falcon',
    'lobo' : 'wolf',
    'murciélago' : 'bat',
    'musaraña' : 'shrew',
    'petirrojo' : 'robin',
    'ratón' : 'mouse',
    'rata' : 'rat',
    'serpiente de cascabel' : 'rattlesnake',
    'tejón' : 'badger',
    'topo' : 'mole',
    'tiburón' : 'shark',
    'urraca' : 'magpie',
    'foca' : 'seal',
    'salamanquesa' : 'gecko',
    'cuervo' : 'raven',
    'araña' : 'spider',
    'sapo' : 'toad', 'acebo' : 'holly',
   'sicomoro' : 'sycamore',
   'sauce' : 'willow',
   'roble' : 'oak',
   'bosque' : 'forest',
   'cascada' : 'waterfall',
   'árbol' : 'tree',
   'arbusto' : 'bush',
    'flor' : 'flower',
    'hoja' : 'leaf',
    'espina' : 'thorn',
    'margarita' : 'daisy',
    'girasol' : 'sunflower',
    'narciso' : 'daffodil',
    'amapola' : 'poppy',
    'lluvia' : 'rain',
    'nieve' : 'snow',
    'tormenta' : 'storm',
    'playa' : 'beach',
    'montaña' : 'mountain',
    'mar' : 'sea',
    'cordero' : 'lamb',
    'berenjena' : 'aubergine',
    'ternera' : 'veal',
    'plátano' : 'banana',
    'tocino' : 'bacon',
    'mora' : 'blackberry',
    'mantequilla' : 'butter',
    'zanahoria' : 'carrot',
    'coliflor' : 'cauliflower',
    'canela' : 'cinnamon',
    'calabacín' : 'courgette',
    'pepino' : 'cucumber',
    'ajo' : 'garlic',
    'miel' : 'honey',
    'puerro' : 'leek',
    'lentejas' : 'lentils',
    'piñones' : 'pine nuts',
    'ciruela' : 'plum',
    'uva' : 'grape',
    'melocotón' : 'peach',
    'fresa' : 'strawberry',
    'salchica' : 'sausage',
    'calabaza' : 'pumpkin',
    'damasco' : 'apricot',
    'aguacate' : 'avocado',
    'arándano' : 'blueberry',
    'higo' : 'fig',
    'granada' : 'pomegranate',
    'remolacha' : 'beetroot',
    'jengibre' : 'ginger',
    'chirivía' : 'parsnip'};

//choose your database
  $('#empezar').on('click', function() {
    selectedDatabase = defaultDatabase;
    //console.log('eeeee');
    //$('.figures').fadeToggle(400);
    //$('.compShow').text('animals');
    //$('#generateQuestionButton').show();
    $('#buttonA, #buttonB, #buttonC').text('').removeClass('selected');
    $('.conclusion').text('');
  });
 
//working on language swap
  var selectedDatabase = defaultDatabase;
  var langToggle = true; 

  $('#empezar').on('click', function() { 
  //clean slate
  $('.buttonStyle').removeClass('selected');
  $('.conclusion').text('');
  $('#empezar').text('Siguiente');


  var keyNames = Object.keys(selectedDatabase);
  var valueNames = Object.values(selectedDatabase);
  var userChoice = 0;
  var computerChoice = keyNames[Math.floor(Math.random()*keyNames.length)];
  var correctAnswer = selectedDatabase[computerChoice];
  var randomWrongAnswerOne = valueNames[Math.floor(Math.random()*valueNames.length)];
  var randomWrongAnswerTwo = valueNames[Math.floor(Math.random()*valueNames.length)];

  //check for duplicates

  do {
    var randomWrongAnswerOne = valueNames[Math.floor(Math.random()*valueNames.length)]; 
  }
  while (randomWrongAnswerOne===randomWrongAnswerTwo || randomWrongAnswerOne===correctAnswer);
  do {
    var randomWrongAnswerTwo = valueNames[Math.floor(Math.random()*valueNames.length)];
  }
  while (randomWrongAnswerOne===randomWrongAnswerTwo || randomWrongAnswerTwo===correctAnswer);

  $('.compShow').text(computerChoice);
  
//randomise location of correct answer
   
getButtonLocation();   
function getButtonLocation() {
var randomNum = Math.random();
  if (randomNum < 0.34) {
  $('#buttonA').html(correctAnswer);
  $('#buttonB').html(randomWrongAnswerOne);
  $('#buttonC').html(randomWrongAnswerTwo);
  } else if(randomNum <= 0.67) {
    $('#buttonB').html(correctAnswer);
    $('#buttonA').html(randomWrongAnswerOne);
    $('#buttonC').html(randomWrongAnswerTwo);
  } else {
    $('#buttonC').html(correctAnswer);
    $('#buttonA').html(randomWrongAnswerOne);
    $('#buttonB').html(randomWrongAnswerTwo);
  }
}

 //and let's click  
$('#buttonA').one('click', function() {
  userChoice = $('#buttonA').html();
  $('#buttonA').addClass('selected').siblings().removeClass('selected');
  compare(userChoice, correctAnswer);
});
$('#buttonB').one('click', function() {
  userChoice = $('#buttonB').html();
  $('#buttonB').addClass('selected').siblings().removeClass('selected');
  compare(userChoice, correctAnswer);
});
$('#buttonC').one('click', function() {
  userChoice = $('#buttonC').html();
  $('#buttonC').addClass('selected').siblings().removeClass('selected');
  compare(userChoice, correctAnswer);
});

   function compare(userChoice, correctAnswer) {

     if (userChoice===correctAnswer) {
      
       $('.conclusion').text('¡Correcto!');
       modify_qty(1,1);
        
     } else if(userChoice!=correctAnswer) {
       //console.log('maaaal');
       $('.conclusion').text('Inténtalo otra vez');
       modify_qty(1,0);
       
       $('#buttonA, #buttonB, #buttonC').removeClass('selected');
   }
}
 
});
});

