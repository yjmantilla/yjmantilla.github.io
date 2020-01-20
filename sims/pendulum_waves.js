var pendulumWave = {
    numberOfParticles : 15,
    frac : 30,
    period : 60,
    f0 : 51,
    fStep : 1,//frequency step (increase) for succesive particles
    step : 0.001,
    time : 0,
    xOffset : 640, //offset, where the center line of the pendulum is
    yOffset : 0, //offset, where the first particle is
    x : 640,
    y :0,
    leastDim : 480,
    width : 640,
    height : 480,
    particleColor: [0,255,0],
    background : [0,0,0],
    play : true,
    updateFrac :function(){this.frac=2*this.numberOfParticles;},
    addParticle:function(){this.numberOfParticles+=1;this.updateFrac()},
    deleteParticle:function(){this.numberOfParticles-=1;this.updateFrac()},
    increasefStep:function(){this.fStep+=1;},
    decreasefStep:function(){this.fStep-=1;},
    faster:function(){this.step*=2;},
    slower:function(){this.step/=2;},
    display:function(){
      this.y=this.yOffset;
      //this.updateFrac();
      for(var i =0; i <=this.numberOfParticles;i++)
      {
      ellipse(cos(this.time*TWO_PI*(this.f0+i*this.fStep)/this.period)*this.width/2 + this.xOffset, this.y,this.leastDim/this.frac,this.leastDim/this.frac);
      this.y=this.y+this.height/(this.numberOfParticles);
      //console.log(this.y);
      fill(color(this.particleColor));//color(this.color)
      }
      //one could actually superimpose two different of this for to see the difference
      if (this.play){
      if (this.time <= this.period){
      this.time+=this.step;
      }
      else {this.time = 0;}
      }
      //console.log(this.time)
    }
  }
function setup(){
  createCanvas(windowWidth, windowHeight);
  //ellipseMode(CENTER);
  pendulumWave.leastDim=Math.min(width,height); //width not defined until setup
  pendulumWave.width = width;
  pendulumWave.height = height;
  pendulumWave.yOffset = 0;
  pendulumWave.xOffset = width/2;
  angleMode(RADIANS); 
  let gui = new dat.GUI({ autoPlace: true, width: 450 });
  //gui.add(text, 'growthSpeed', -5, 5); // Min and max
  //var obj = { add:function(){ console.log("clicked") }};
  //gui.add(obj, 'add').name('Custom Label');
  var timeFolder = gui.addFolder('Time (also +/- keys)');
  timeFolder.add(pendulumWave,'faster');
  timeFolder.add(pendulumWave,'slower');
  timeFolder.add(pendulumWave,'play');
  var pendulumFolder = gui.addFolder('Pendulum');
  const max = 1000;
  pendulumFolder.add(pendulumWave, 'numberOfParticles', 1, max).name('# of particles (also left/right arrow)').step(1);
  pendulumFolder.add(pendulumWave, 'fStep', -100, 100).step(1).name('freq step (also up/down arrow)');
  pendulumFolder.add(pendulumWave, 'f0', -100, 100).step(1).name('1st particle oscillations in 1 period');
  pendulumFolder.add(pendulumWave, 'period', 0, 100).step(1).name('period');
  pendulumFolder.addColor(pendulumWave,'particleColor');
  pendulumFolder.add(pendulumWave,'frac',1,max/2).name('particleSize');
  var positionFolder = gui.addFolder('Position');
  positionFolder.add(pendulumWave,'xOffset',-1*width,width);
  positionFolder.add(pendulumWave,'yOffset',-1*height,height);
  gui.addColor(pendulumWave,'background');
}

function draw(){
  background(pendulumWave.background);
  pendulumWave.display();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pendulumWave.leastDim = Math.min(width,height);
  pendulumWave.xOffset = width/2;
  pendulumWave.width = width;
  pendulumWave.height = height;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    pendulumWave.numberOfParticles-=1;
  } else if (keyCode === RIGHT_ARROW) {
    pendulumWave.numberOfParticles+=1;
  }
  else if (keyCode === UP_ARROW){
      pendulumWave.fStep+=1;
  }
  else if (keyCode === DOWN_ARROW){
      pendulumWave.fStep-=1;
  }
  else if (keyCode === 107){
      pendulumWave.step=pendulumWave.step*2;
  }
  else if (keyCode === 109){
      pendulumWave.step=pendulumWave.step/2;
  }
}

function randomColor(){
  return color(random(255),random(255),random(255))
}