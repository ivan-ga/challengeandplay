
var reset=0;
var cuenta = 0;
//hides a certain element
function hide(id){
    document.getElementById(id).style.display = 'none';
}

//show a certian element
function show(id){
    document.getElementById(id).style.display = 'block';
}

function stopgame() {
    //game = false;
    document.querySelector(".main_one").textContent = 0;
    document.querySelector(".main_two").textContent = 0;
    //document.querySelector(".correct>span").textContent = 0;
    //document.querySelector(".wrong>span").textContent = 0;
    document.querySelector(".block_" + 0).textContent = 0;
    document.querySelector(".block_" + 1).textContent = 0;
    document.querySelector(".block_" + 2).textContent = 0;
    document.querySelector(".block_" + 3).textContent = 0;
    riddle = {
      field1: 0,
      field2: 0,
      result: 0,
      questions: [0, 0, 0, 0]
    };
    s_1 = 0;
    s_2 = 0;
    
  ;} 
  
function resetgame() {
    reset=1;
    document.querySelector(".main_one").textContent = 0;
    document.querySelector(".main_two").textContent = 0;
    document.querySelector(".correct>span").textContent = 0;
    document.querySelector(".wrong>span").textContent = 0;
    document.querySelector(".block_" + 0).textContent = 0;
    document.querySelector(".block_" + 1).textContent = 0;
    document.querySelector(".block_" + 2).textContent = 0;
    document.querySelector(".block_" + 3).textContent = 0;
    //document.getElementById('timeremaining').textContent = 0;
    document.getElementById("btn").disabled = false;
    document.getElementById("btn").style.cursor = "pointer";
    riddle = {
      field1: 0,
      field2: 0,
      result: 0,
      questions: [0, 0, 0, 0]
    };
    s_1 = 0;
    s_2 = 0;
  ;} //reset game finnish here 

// function timer(parar){
//     //var reset = document.getElementById('btn1');
//     var sec = 10;
//     var timer = setInterval(function(){
//         document.getElementById('timeremaining').innerHTML='00:'+sec;
//         sec--;
//         if (sec == 0){
//             clearInterval(timer);
//             stopgame();
//         }
//     }, 1000);
// }

(function() {
  var riddle, s_1, s_2, game;
  s_1 = 0;
  s_2 = 0;
  riddle = {
    field1: 0,
    field2: 0,
    result: 0,
    questions: [0, 0, 0, 0]
  };

  function playgame() {
    document.getElementById("btn").setAttribute('disabled','disabled');
    document.getElementById("btn").style.cursor = "not-allowed";
    cuenta++;
    var boton_empezar = document.getElementById('btn');
    boton_empezar.disabled = "disabled";
    if(cuenta < 12){ //Es 12 por la colocacion del incremento de cuenta, se hacen 10 sumas.
      var dice, a, b, c, d;
      game = true;
      dice = Math.floor(Math.random() * 4);
  
      function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      riddle = {
        field1: randomNumber(5, 40),
        field2: randomNumber(51, 70),
        result: 0,
        questions: [
          randomNumber(10, 20),
          randomNumber(21, 40),
          randomNumber(41, 60),
        ]
      };
      if (dice == 0) {
        a = 0;
        b = 1;
        c = 2;
        d = 3;
      } else if (dice == 1) {
        a = 1;
        b = 0;
        c = 3;
        d = 2;
      } else if (dice == 2) {
        a = 2;
        b = 3;
        c = 0;
        d = 1;
      } else if (dice == 3) {
        a = 3;
        b = 2;
        c = 1;
        d = 0;
      }
      riddle.result = riddle.field1 + riddle.field2;
      riddle.questions.push(riddle.result);
      document.querySelector(".main_one").textContent = riddle.field1;
      document.querySelector(".main_two").textContent = riddle.field2;
      document.querySelector(".correct>span").textContent = s_1;
      document.querySelector(".wrong>span").textContent = s_2;
  
      document.querySelector(".block_" + 0).textContent = riddle.questions[a];
      document.querySelector(".block_" + 1).textContent = riddle.questions[b];
      document.querySelector(".block_" + 2).textContent = riddle.questions[c];
      document.querySelector(".block_" + 3).textContent = riddle.questions[d];
    }
    else{
      document.getElementById("fin").innerHTML = "¡FIN DEL RETO!";
    }
     
  } //game here

  function clickgame(e) {
    var data = e;
    if (data.target.id == "block") {
      if (game == true) {
        if (data.target.textContent == riddle.result) {
          s_1 = s_1 + 1;
        } else {
          s_2 = s_2 + 1;
        } //if else finnish here
        playgame();
        
      };
    };
  };

  

  document.getElementById("btn").addEventListener("click", playgame); //btn finnish here
  document.querySelector(".main").addEventListener("click", clickgame); //click function finnish here
})();