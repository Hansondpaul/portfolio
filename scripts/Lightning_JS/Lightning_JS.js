'use strict'
class Bar{
 
  
 constructor(x){
   this.xPos = x;
   this.num = 0;
 }
 
 getNum(){
  return this.num; 
 }
 
 setNum(newNum){
   this.num = newNum;
 }
 
 inc(){
  this.num++;
 }
 
 drawBar(){
     fill(255);
     rect(this.xPos, 500-this.num, 10, this.num);     
 }
}


var leg; //the distance traveled left or right each time the lightning draws a segment
var travel; //the distance traveled virticaly every time the lightning draws a segment
var startPoint; //the point at the top of the screen started at for each bolt
var currentPoint; //the point that the program is drawing from curently
var left; //true if bolt's next segment draws to the left
var bars; //the graph at the botom of the screen


function setup() {
  
  createCanvas(500, 500);
  background(0);
  startPoint = createVector(255, 0);
  currentPoint = createVector(startPoint.x, startPoint.y);

  leg = 10;
  travel = 15;
  left = true;
  bars = new Bar(50);
    
  bars = new Array(50);
  for (let i = 0; i < 50; i++)
  {
    bars[i] = new Bar(i*10);
  }
}


function draw() {
  stroke("#FFFF00");
  strokeWeight(1);
  line(currentPoint.x, currentPoint.y, currentPoint.x+leg, currentPoint.y+travel);
    
    
  for (let i = 0; i < 50; i++) {
    bars[i].drawBar();
    if (bars[i].getNum() > 255) { 
      reset();
    }

    resolveStrike();
    drawCloud();
    setNextSegment();
  }
}

function setNextSegment() {
  currentPoint.x += leg;    //update the point to draw 
  currentPoint.y += travel; //from the end of the last segment drawn

  if (Math.random()>0.5){ // there is a 50% chanse left is set to true
    left = false; 
  }
  else {
  left = true;
  }
  if (left){ // if left is set to true, reverse the direction of the lightning bolt
    leg = leg * -1;
  }
}

function reset() {
  bars = new Array (50);
  for (let i = 0; i < 50; i++)
  {
    bars[i] = new Bar(i*10);
  }
  console.log("Time to Reset the graph!");
}

function drawCloud() {
  noStroke();
  fill("#A0A0A0");
  ellipse(300, 10, 350, 40);
  fill("#808080");
  ellipse(200, 0, 300, 40);
  fill("#909090");
  ellipse(300, 0, 300, 20);
}

function resolveStrike()
{ console.log("called");
  if (currentPoint.y>=500) {  //when lightning strikes the bottom of the screen,
    bars[(int)((currentPoint.x)/10)].inc();                  //increment the bar that was struck to increase it's size,
    currentPoint = createVector(startPoint.x,startPoint.y); //and start the striking process again.
    background(0);
  }
}
