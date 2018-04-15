function imagenes_aleatorias(){
          var contents=new Array()
          contents[0]='<img class="" id="drag1" data-div="div1" src="https://gweb-earth.storage.googleapis.com/assets/earth_desktop.jpg" draggable="true" ondragstart="drag(event)">'
          contents[1]='<img class="" id="drag2" data-div="div2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/768px-OSIRIS_Mars_true_color.jpg" draggable="true" ondragstart="drag(event)">'
          contents[2]='<img class="" id="drag3"  data-div="div3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jupiter%27s_New_Red_Spot_from_Hubble.jpg/768px-Jupiter%27s_New_Red_Spot_from_Hubble.jpg" draggable="true" ondragstart="drag(event)">'
          contents[3]='<img class="" id="drag4"  data-div="div4" src="https://c1.staticflickr.com/8/7508/15992982205_469d68d756_b.jpg" draggable="true" ondragstart="drag(event)">'
          contents[4]='<img class="" id="drag5"  data-div="div5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Uranus_-_GPN-2000-000440.jpg/768px-Uranus_-_GPN-2000-000440.jpg" draggable="true" ondragstart="drag(event)">'
          contents[5]='<img class="" id="drag6"  data-div="div6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/768px-Neptune_Full.jpg" draggable="true" ondragstart="drag(event)">'
          contents[6]='<img class="" id="drag7"  data-div="div7" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nh-pluto-in-true-color_2x_JPEG-edit.jpg/768px-Nh-pluto-in-true-color_2x_JPEG-edit.jpg" draggable="true" ondragstart="drag(event)">'
          contents[7]='<img class="" id="drag8"  data-div="div8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/PIA18920-Ceres-DwarfPlanet-20150219.jpg/768px-PIA18920-Ceres-DwarfPlanet-20150219.jpg" draggable="true" ondragstart="drag(event)">'
          contents[8]='<img class="" id="drag9"  data-div="div9" src="https://fthmb.tqn.com/rJdKI9lI1m9xWhrBMj4TNmyEClg=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/1024px-Venus_globe-5a88ae823de423003738f750.jpg" draggable="true" ondragstart="drag(event)">'
  
          var i=0
          //variable used to contain controlled random number 
          var random
          //var spacing="<br>"
          //while all of array elements haven't been cycled thru
          while (i<contents.length){
              //generate random num between 0 and arraylength-1
              random=Math.floor(Math.random()*contents.length)
              //if element hasn't been marked as "selected"
              if (contents[random]!="selected"){
                  document.getElementById('imagenes_planetas').innerHTML+=contents[random]
                  //document.write(contents[random])
                  //mark element as selected
                  contents[random]="selected"
                  i++
              }
          }
}

function allowDrop(ev)
{
  ev.preventDefault();
}

function drag(ev)
{
  ev.dataTransfer.setData("content",ev.target.id);
}

function drop(ev)
{
  ev.preventDefault();
  var image =ev.dataTransfer.getData("content");
  if (ev.target.id == document.getElementById(image).getAttribute('data-div')){ 
    ev.target.appendChild(document.getElementById(image));
    modify_qty(1,1);
  }
  else{
    modify_qty(1,0);
  }
}

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