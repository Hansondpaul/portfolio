//House//
class House{
  
  constructor(hx, hy){
    this.x = hx;
    this.y = hy;
    ellipseMode(CORNER);
  }

  show(){
    stroke(0, 0, 0);
      fill(100, 0, 0);
      rect(this.x, this.y, 200, 200);
    
      fill("#FFFF0D");
      rect(this.x+20, this.y+20, 50, 50);
      rect(this.x+20, this.y+20, 50, 25);
      line(this.x+45, this.y+20, this.x+45, this.y+70);
    
      fill(150,110, 110);
      rect(this.x+80, this.y+100, 50, 100);
      fill(0);
      ellipse(this.x+90, this.y+150, 5, 5);
      fill(0);
      triangle(this.x-25, this.y, this.x+100, this.y-100, this.x+225, this.y);
  }
}

//Light//
class Light{
  
  constructor(x, y){
   this.location = createVector(x,y);
   this.shine = (255);
   this.counter = 0;
  }
  
  switchColor(){
    let c = (int)(random(0,6));
   switch (c){
    case 0: this.shine = ("#FF0000");
    break;
    case 1: this.shine = ("#00FF00");
    break;
    case 2: this.shine = ("#0000FF");
    break;
    case 3: this.shine = ("#00FFFF");
    break;
    case 4: this.shine = ("#FFFF00");
    break;
    case 5: this.shine = ("#FF00FF");
    break;
   }
  }
  
  show(){
   stroke(0);
   fill(this.shine);
   ellipse(this.location.x,this.location.y,5,10);
   this.counter++;
   if(this.counter == 60){
     this.switchColor();
     this.counter = 0;
   }
  }
}

//SnowMan//
class SnowMan{
  
  constructor(nx, ny){
    this.x = nx;
    this.y = ny;
  }
  
  show(){
    stroke(0, 0, 0);
    fill(255, 255, 255);
    ellipse(this.x-50, this.y-100, 100, 100);
    ellipse(this.x-40, this.y-175, 80, 80);
    ellipse(this.x-30, this.y-225, 60, 60);
    
    noStroke();
    fill("#000000");
    rect(this.x-30, this.y-225, 60, 10);
    rect(this.x-18, this.y-251, 36, 36);
    fill(0, 0, 0);
    ellipse(this.x-14, this.y-200, 8, 8);
    ellipse(this.x+6, this.y-200, 8, 8);
    
    for(let i = 0; i < 4; i++){
      ellipse(this.x-4,this.y-(160-(i*40)),8,8);
    }
  }
}

//SnowStorm//

class SnowStorm{
 
 constructor(count, startingSize, maxSize){
   
   this.flakes = new Array(count); 
   this.vel = createVector(0,1);
   this.white = (255);
   this.size = new Array(count);
   this.buildup = 0;
   
   for(let i = 0; i < count; i++){
    this.flakes[i] = createVector(random(0,400), random(-600,0));
    this.size[i] = (int)(random(startingSize,maxSize));
   }
 }
  
  move(){
    for(let i = 0; i < this.flakes.length; i++){
       this.flakes[i].x += this.vel.x;
       this.flakes[i].y += this.vel.y;
       if(this.flakes[i].y >= 400){
         this.flakes[i].y = 25;
         if(this.buildup <= 640){
           this.buildup++;
         }
       }
    }
  }
  show(){
    fill(this.white);
    noStroke();
    for(let i = 0; i < this.flakes.length; i++){
      ellipse(this.flakes[i].x,this.flakes[i].y,this.size[i],this.size[i]);
    }
    rect(0,500-this.buildup/16,500,this.buildup/16);
  }
  
}

var snow;
var man;
var home;
var homeLights;
var font;

function preload(){
 font = loadFont("Aspire-DemiBold.ttf");
}
function setup(){
  man = new SnowMan(200,397);
  home = new House(300,198);
  snow = new SnowStorm(100,4,7);
  homeLights = new Array(10);
  for(let i = 0; i < homeLights.length; i++){
    homeLights[i] = new Light(305+(10*i), 200);
  }
  
  createCanvas(400,400);
  background("#082957");
  
  ellipseMode("CORNER");
  rectMode("CORNER");
}

function draw(){
  background("#082957");
  fill("#00FF00");
  rect(0,395,400,395);
  man.show();
  home.show();
  for(let i = 0; i < homeLights.length; i++){
    homeLights[i].show();
  }
  snow.move();
  snow.show();
  drawCloud();
  fill("#00FFFF");
  textFont(font, 32);
  text("Happy Hollidays!",120, 30);
}

function drawCloud(){
  noStroke();
  fill(100);
  ellipse(0,0,280,50); 
  fill(140);
  ellipse(100,0,310,50);
}
