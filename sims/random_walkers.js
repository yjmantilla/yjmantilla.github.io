var numberOfWalkers = 1000;
var walkers = new Array();
var walkerSize = 1;
var walkerSpeed = 1;
function setup() {
  createCanvas(windowWidth, windowHeight);
for (var i=0;i < numberOfWalkers;i++){
  //walkers.push( new Walker(random(width),random(height),randomColor(),random(1,20)));
  walkers.push( new Walker(random(width),random(height),randomColor(),walkerSize));
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
  constructor(xPos,yPos,trailColor,trailWeight) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.trailColor = trailColor;
    this.trailWeight = trailWeight;
  }
  
  step(){
    var choices = [-1,0,1];
    choices = choices.map(x => x * walkerSpeed);
    this.xPos += (random(choices));//upper limit is not included
    this.yPos += (random(choices));//playing with theses limits gives bias
  }
  
  display(){
    push()
    //strokeWeight(this.trailWeight);
    stroke(this.trailColor);
    point(this.xPos,this.yPos);
    pop()
  }
}

function randomColor(){
  return color(random(255),random(255),random(255))
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    walkerSize -=1;
  } else if (keyCode === RIGHT_ARROW) {
    walkerSize+=1;
  }
  else if (keyCode === UP_ARROW){
      walkerSpeed+=1;
  }
  else if (keyCode === DOWN_ARROW){
      walkerSpeed-=1;
  }
  
  strokeWeight(walkerSize);
  //console.log(walkerSpeed);
}
//mycar = new Car("Ford");