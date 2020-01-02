/* Basic Processing(.js) script */ 
  var t=0;
  var numberOfParticles=15;
  var frac=2*numberOfParticles;
  var f0=51;
  var fStep = 1;
  var leastDim;
  var y;
  var walker;
  var step=0.0001;
function setup(){
  createCanvas(windowWidth, windowHeight);
  //ellipseMode(CENTER);
  leastDim=width; //width not defined until setup
  angleMode(RADIANS); 
}

function draw(){
  background(0,0,0);
  y=0;
  for(var i =0; i <=numberOfParticles;i++)
  {
  ellipse(cos(t*TWO_PI*(f0+i*fStep))*width/2 + width/2, y,leastDim/frac,leastDim/frac);
  y=y+height/(numberOfParticles);
 fill(color('blue'));
  }
  //one could actually superimpose two different of this for to see the difference

  t+=step;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  leastDim = width;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    numberOfParticles-=1;
  } else if (keyCode === RIGHT_ARROW) {
    numberOfParticles+=1;
  }
  else if (keyCode === UP_ARROW){
      fStep+=1;
  }
  else if (keyCode === DOWN_ARROW){
      fStep-=1;
  }
  else if (keyCode === 107){
      step=step*2;
  }
  else if (keyCode === 109){
      step=step/2;
  }
}

function randomColor(){
  return color(random(255),random(255),random(255))
}