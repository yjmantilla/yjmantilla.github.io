var walkers = new Array();


walkerSystem = {numberOfWalkers : 1000,
  walkerSize : 1,
  walkerSpeed : 1,
  restart: function(){background(this.background);},
  background : [0,0,0]
}


function setup() {
  createCanvas(windowWidth, windowHeight);
for (var i=0;i < walkerSystem.numberOfWalkers;i++){
  //walkers.push( new Walker(random(width),random(height),randomColor(),random(1,20)));
  walkers.push( new Walker(random(width),random(height),randomColor(),walkerSystem.walkerSize));
}
background(walkerSystem.background);
strokeWeight(5);
let gui = new dat.GUI({ autoPlace: true, width: 450 });
//gui.add(text, 'growthSpeed', -5, 5); // Min and max
//var obj = { add:function(){ console.log("clicked") }};
//gui.add(obj, 'add').name('Custom Label');
//gui.add(walkerSystem,'numberOfWalkers',0,10000).step(1);
gui.add(walkerSystem,'walkerSize',1,50).step(1).name('Size (also left/right arrow)');
gui.add(walkerSystem,'walkerSpeed',0,50).step(1).name('Speed (also up/down arrow)');
gui.add(walkerSystem,'restart').name('restart background');
var back = gui.addColor(walkerSystem,'background');

back.onChange(function(){background(walkerSystem.background);})


}


function draw() {
  strokeWeight(walkerSystem.walkerSize);
for (var i = 0; i < walkerSystem.numberOfWalkers;i++){
  walkers[i].step();
  walkers[i].display();
}

  }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(walkerSystem.background); // for some reason it restarts everything on window resize
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
    choices = choices.map(x => x * walkerSystem.walkerSpeed);
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
    walkerSystem.walkerSize -=1;
  } else if (keyCode === RIGHT_ARROW) {
    walkerSystem.walkerSize+=1;
  }
  else if (keyCode === UP_ARROW){
      walkerSystem.walkerSpeed+=1;
  }
  else if (keyCode === DOWN_ARROW){
      walkerSystem.walkerSpeed-=1;
  }
  
//   strokeWeight(walkerSystem.walkerSize);
//   //console.log(walkerSystem.walkerSpeed);
}
//mycar = new Car("Ford");