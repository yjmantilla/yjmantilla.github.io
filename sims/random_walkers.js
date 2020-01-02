var numberOfWalkers = 1000;
var walkers = new Array();
function setup() {
  createCanvas(windowWidth, windowHeight);
for (var i=0;i < numberOfWalkers;i++){
  walkers.push( new Walker(random(width),random(height),randomColor()));
}
background(color('black'));
strokeWeight(5);

}


function draw() {
for (var i = 0; i < numberOfWalkers;i++){
  walkers[i].step();
  walkers[i].display();
}

  }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Walker {
  constructor(xPos,yPos,trailColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.trailColor = trailColor;
  }
  
  step(){
    var choices = [-1,0,1];
    this.xPos += (random(choices));//upper limit is not included
    this.yPos += (random(choices));//playing with theses limits gives bias
  }
  
  display(){
    stroke(this.trailColor);
    point(this.xPos,this.yPos);
  }
}

function randomColor(){
  return color(random(255),random(255),random(255))
}
//mycar = new Car("Ford");