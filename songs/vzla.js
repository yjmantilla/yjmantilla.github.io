// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var sax;
var bass;
var sliderRate;
var sliderPan;
var button;
var volhistory_sax = [];
var vol_sax;


function preload(){
  sax = loadSound("/audio/venezuela-sax.mp3", loaded);
  bass =  loadSound("/audio/venezuela-noSax.mp3", loaded2);

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  sax.setVolume(1);
  bass.setVolume(1);
  //sliderRate = createSlider(0, 1.5, 1, 0.01);
  //sliderPan = createSlider(-1, 1, 0, 0.01);
  amp_sax = new p5.Amplitude();
  amp_sax.setInput(sax);
  amp_bass = new p5.Amplitude();
  amp_bass.setInput(bass);
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  counter = 0;
}


function loaded() {
  console.log("loaded");
  button = createButton("play");
  button.mousePressed(togglePlaying);

}

function loaded2() {
  console.log("loaded");
}


function draw() {
  
  //background(random(255));
  //sax.pan(sliderPan.value());
  //sax.rate(sliderRate.value());

  //background(51);

  //var vol = amp_sax.getLevel();
  //var diam = map(vol, 0, 0.3, 10, 200);

  //fill(255, 0, 255);
  //ellipse(width / 2, height / 2, diam, diam);

  background(255,255,0)
  //var vol_sax = amp_sax.getLevel();
  var vol_bass = amp_bass.getLevel();
  
  var diam_bass = 2*(map(vol_bass,0,0.5,1,height));
  //var diam_sax = 5*(map(vol_sax,0,0.5,1,height));
  fill(0, 0, 255);
  ellipse(width / 2, height / 2, diam_bass, diam_bass);

  
  stroke(255,0,0);

  noFill();
  //code for linear graph
  // push();
  // var currentY = map(vol_sax, 0, 1, height, 0);
  // translate(0, height / 2 - currentY);
  // beginShape();
  // for (var i = 0; i < volhistory_sax.length; i++) {
  //   var y = map(volhistory_sax[i], 0, 1, height, 0);
  //   vertex(i, y);
  // }
  // endShape();
  // pop();
  // if (volhistory_sax.length > width ) {//- 50
  //   volhistory_sax.splice(0, 1);
  // }

  // stroke(255, 0, 0);
  // line(volhistory_sax.length, 0, volhistory_sax.length, height);


  //code for radial graph


  translate(width / 2, height / 2);
  step = 2;

  vol_sax = amp_sax.getLevel();
  volhistory_sax.push(vol_sax);
  // for step = 2 this stabilizes the radial line
  for (var i = 0; i<step-1;i++){
    push()
    pop()
  }



  beginShape();
  for (var i = 0; i < 360; i=i+step) {
    var r = 2*map(volhistory_sax[i], 0, 1, 10, height);

    //r = height/2 - r;
    r = height /8 + r;
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory_sax.length > 360) {
    volhistory_sax.splice(0, 1);
  }

}

function mouseClicked(){
  if (getAudioContext().state !== 'running') {
   getAudioContext().resume();
 }
}


function togglePlaying() {
  if (!sax.isPlaying() ) {
    sax.play();
    
    // sax.setVolume(0.3);
    button.html("pause");
  }

  else {
    sax.pause();
    
    button.html("play");
  }

  if(!bass.isPlaying())
  {
    bass.play();
  }
  else{
    bass.pause();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}