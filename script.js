//Canvas sizing
let canvasW = 800;
let canvasH = 600;

//variables
let lineSize = 10;
let selectedColor = "red";
let erasing = false;

let colors = ["white", "black", "red", "blue", "yellow", "green"];
let sideColor = [];

//Creates the colors on the sidebar to the right
for(i=0, x=0; i<colors.length; i++){
   sideColor[i] = new sideBarColor();
   sideColor[i].color = colors[i];
   sideColor[i].y += x;

   x += sideColor[i].size;
}

//creates the current color box
let currentBox;
currentBox = new colorSelected();

//Creates the eraser sideBox
let eraserBox;
eraserBox = new eraserDisplay();

function setup(){
  createCanvas(canvasW, canvasH);
  background(220);
}

function draw(){

  //Draws all of the colors on the sidebar
  for(i=0; i<colors.length; i++){
   sideColor[i].draw();
}
  //draws the current color box
  currentBox.draw();

  //draws the eraser box
  eraserBox.draw();

  //as long as the mouse is being pressed, the lineSize is being updated
  if(mouseIsPressed){getOutsideValues();}
}

//draws a lines when the player drags the mouse, or erases if erasing mode is on
function mouseDragged(){
  if(!erasing){
    stroke(selectedColor);
    strokeWeight(lineSize);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  else{
  fill(220);
  strokeWeight(2);
  rect(mouseX - lineSize, mouseY - lineSize, lineSize * 2, lineSize * 2);
  }
}

//the colors on the right side
function sideBarColor(){
  this.size = 50;
  this.x = canvasW - this.size;
  this.y = 0;
  this.color = "red";

  this.draw = function(){
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

function mousePressed(){
  //Changes the colors if the user presses on them & turns the state of erasing to false
  for(i=0; i<colors.length; i++){
    if(mouseX>sideColor[i].x && mouseX<sideColor[i].x + sideColor[i].size && mouseY>sideColor[i].y && mouseY<sideColor[i].y + sideColor[i].size){
      selectedColor = sideColor[i].color;
      erasing = false;
    }
  }

  //If the user presses the eraser box it sets the state of erasing to true
  if(mouseX>eraserBox.x && mouseX<eraserBox.x+eraserBox.size && mouseY>eraserBox.y && mouseY<eraserBox.y+eraserBox.size){
    erasing = true;
  }
}

//function for the current color box at the bottom right corner
function colorSelected(){
  this.size = 50;
  this.x = canvasW - this.size;
  this.y = canvasH - this.size;

  this.draw = function(){
    if(!erasing){
      fill(selectedColor)
      rect(this.x, this.y, this.size, this.size);
    }
    else{
      push();
      fill(220);
      stroke(0);
      strokeWeight(1);
      rect(this.x, this.y, this.size-1, this.size-1);
      pop();

      fill(0);
      textSize(14);
      text("Eraser", this.x+this.size/9, this.y+this.size/1.7);
    }

    fill(0);
    textSize(15);
    text("Current Color:", this.x - 110, this.y+30);
  }
}

//function for the eraser box after the colors on the sidebar
function eraserDisplay(){
  this.size = sideColor[0].size;
  this.x = canvasW - this.size -1;
  this.y = sideColor[colors.length-1].y + this.size + 20;

  this.draw = function(){
    push();
      fill(220);
      stroke(0);
      strokeWeight(1);
      rect(this.x, this.y, this.size, this.size);
    pop();

    textSize(14);
    text("Eraser", this.x+this.size/9, this.y+this.size/1.7);
  }
}

//Gets the outside values from html
function getOutsideValues(){
  let frm1 = document.getElementById("form1");
  lineSize = frm1.elements[0].value;
   document.getElementById("formP").innerHTML = lineSize;
  
}

//Erases everything in the canvas
function clearCanvas(){
  background(220);
}
