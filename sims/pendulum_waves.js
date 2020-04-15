var weird = 'weird display?';
var pendulumWave = {
    message:'switch between landscape and portrait',
    numberOfParticles : 12,
    frac : 25,
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
    type:'cos',
    xMod:0,
    updateFrac :function(){this.frac=2*this.numberOfParticles+1;},
    addParticle:function(){this.numberOfParticles+=1;this.updateFrac()},
    deleteParticle:function(){this.numberOfParticles-=1;this.updateFrac()},
    increasefStep:function(){this.fStep+=1;},
    decreasefStep:function(){this.fStep-=1;},
    faster:function(){this.step*=2;},
    slower:function(){this.step/=2;},
    display:function(){
      this.y=this.yOffset;
      //this.updateFrac();
      for(var i =0; i <this.numberOfParticles;i++)
      {
        phase = this.time*TWO_PI*(this.f0+i*this.fStep)/this.period;
        // maybe use https://github.com/scijs/periodic-function
        switch(this.type) {
          case 'sin':
            this.xMod = sin(phase);
          break;
          case 'cos':
            this.xMod = cos(phase);
          break;
          case 'tan':
            this.xMod = tan(phase);
            break;
          case 'random':
            this.xMod = Math.random()*2;
            this.xOffset = 0; // to restart xOffset just resize the window
            break;
          case 'fourier':
            this.xMod = sin(phase) + cos(phase);
            break;
          case 'add':
            //this.xMod = sin(phase) + sin(2*phase);
            this.xMod = sin(phase) + cos(3*phase);
            break;
          default:
            this.xMod = cos(phase);// code block
        }
        // idea : instead of it being a switch case that it is a boolean or integer for each type and xMod sums the value by running along the chain of functions
        ellipse(this.xMod*(-this.yOffset+ this.width/2) + this.xOffset, this.y,this.leastDim/this.frac,this.leastDim/this.frac);
        this.y=this.y+this.height/(this.numberOfParticles + 1);
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
  pendulumWave.yOffset = 2*pendulumWave.leastDim/pendulumWave.frac;
  pendulumWave.xOffset = width/2;
  angleMode(RADIANS); 
  let gui = new dat.GUI({ autoPlace: true, width: 450 });
  //gui.add(text, 'growthSpeed', -5, 5); // Min and max
  //var obj = { add:function(){ console.log("clicked") }};
  //gui.add(obj, 'add')name('Custom Label');
  //gui.add(pendulumWave, 'message').name( weird );
  var timeFolder = gui.addFolder('Time (also +/- keys)');
  timeFolder.add(pendulumWave,'faster');
  timeFolder.add(pendulumWave,'slower');
  timeFolder.add(pendulumWave,'play');
  const maxPeriod = 100;
  timeFolder.add(pendulumWave,'time',-2*maxPeriod,2*maxPeriod);
  var pendulumFolder = gui.addFolder('Pendulum');
  const maxNumberOfParticles = 1000;
  pendulumFolder.add(pendulumWave, 'type', [ 'sin', 'cos','tan','random','fourier','add'] );
  pendulumFolder.add(pendulumWave, 'numberOfParticles', 1, maxNumberOfParticles).name('# of particles (also left/right arrow)').step(1);
  pendulumFolder.add(pendulumWave, 'fStep', -100, 100).step(1).name('freq step (also up/down arrow)');
  pendulumFolder.add(pendulumWave, 'f0', -100, 100).step(1).name('1st particle oscillations in 1 period');
  pendulumFolder.add(pendulumWave, 'period', 0, maxPeriod).step(1).name('period');
  pendulumFolder.addColor(pendulumWave,'particleColor');
  // idea : boolean for random color for each ball, or for all balls?
  pendulumFolder.add(pendulumWave,'frac',1,maxNumberOfParticles/2).name('particleSize');
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
  pendulumWave.yOffset = 2*pendulumWave.leastDim/pendulumWave.frac;
  pendulumWave.width = width;
  pendulumWave.height = height;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    //pendulumWave.numberOfParticles-=1;
    pendulumWave.time-=pendulumWave.step*50 //pendulumWave.period/100
  } else if (keyCode === RIGHT_ARROW) {
    //pendulumWave.numberOfParticles+=1;
    pendulumWave.time+=pendulumWave.step*50//pendulumWave.period/100
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