var palette = [[251,70,62],
[0,0,102],
[25,187,188],
[4,68,171],
[243,243,235]];
var walkers = new Array();
walkerSystem = {numberOfWalkers : 100,
  walkerSize : 3,
  walkerSpeed : 1,
  restart: function(){background(this.background);},
  background : [0,0,0]
}

function setup() {
  createCanvas(400, 400);
for (var i=0;i < walkerSystem.numberOfWalkers;i++){
  //walkers.push( new Walker(random(width),random(height),randomColor(),random(1,20)));
  walkers.push( new Walker(random(width),random(height*0.1),randomColor(palette),walkerSystem.walkerSize));
}
background(walkerSystem.background);
strokeWeight(5);
}

function draw() {
  strokeWeight(walkerSystem.walkerSize);
for (var i = 0; i < walkerSystem.numberOfWalkers;i++){
  walkers[i].step();
  walkers[i].display();
}
}

class Walker {
  constructor(xPos,yPos,trailColor,trailWeight) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.trailColor = trailColor;
    this.trailWeight = trailWeight;
  }
  
  step(){
    var choicesx = [-1,0,1];
    var choicesy = [0,1];
    choicesx = choicesx.map(x => x * walkerSystem.walkerSpeed);
    choicesy = choicesy.map(x => x * walkerSystem.walkerSpeed);

    //this.xPos += (random(choicesx));//upper limit is not included
    this.yPos += (random(choicesy));//playing with theses limits gives bias
  }
  
  display(){
    push()
    //strokeWeight(this.trailWeight);
    stroke(this.trailColor);
    point(this.xPos,this.yPos);
    pop()
  }
}

function randomColor(palettes){
  chosen= random(palettes)
  return color(chosen[0],chosen[1],chosen[2])
}