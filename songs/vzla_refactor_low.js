// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var sax;
var no_sax;
var sliderRate;
var sliderPan;
var button;
var volHistory_sax = [];
var volHistory_no_sax = [];
var vol_sax;
var mode_sax = true;
var mode_no_sax = true;
var mode_visuals = true;
var radial_step = 1;

var s = 'Try pressing M,Y,B!\nSounds weird? Try pausing (may desync)\nBetter experienced in chrome\nMay be too slow in some devices (ie mobile)';



function preload(){
  sax = loadSound("/audio/venezuela_sax.mp3");
  no_sax = loadSound("/audio/venezuela_no_sax.mp3");
  console.log("loaded");
}
function setup() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
  createCanvas(windowWidth, windowHeight);
  
  volHistory_sax = new Array(360).fill(0);
  volHistory_no_sax = new Array(360).fill(0);
  angleMode(DEGREES);
  
  sax.setVolume(1);
  no_sax.setVolume(1);
  
  //sliderRate = createSlider(0, 1.5, 1, 0.01);
  //sliderPan = createSlider(-1, 1, 0, 0.01);
  
  amp_sax = new p5.Amplitude();
  amp_no_sax = new p5.Amplitude();
  
  amp_sax.setInput(sax);
  amp_no_sax.setInput(no_sax);  
  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

cfg_radial_sax={c : color('yellow'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,10,height]}
cfg_linear_sax = {offset:height/3,c:color('yellow')}
cfg_radial_no_sax={c : color('red'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,1,height/2]}
cfg_linear_no_sax = {offset:2*height/3,c:color('red')}
cfg_ellipseDrum_no_sax = {center : [width / 2,height / 2],scale : 2, c : color(0, 255, 0),mapArray : [0,0.5,1,height]};

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
  strokeWeight(2);
  background(0,0,37);
  text(s, 10, 10, 250, 250);
  fill(255, 255, 255, 255);
  

  vol_sax = amp_sax.getLevel();
  volHistory_sax.push(vol_sax);

  if (mode_sax){
    if(mode_visuals){
    radialGraph(volHistory_sax,cfg_radial_sax);
  }
  else{
  linearGraph(volHistory_sax,cfg_linear_sax);
  }
  }
  var vol_no_sax = amp_no_sax.getLevel();
  
  //ellipseDrum(vol_no_sax,cfg_ellipseDrum_no_sax);  
  volHistory_no_sax.push(vol_no_sax);
  
    

  if (mode_no_sax){
  if (mode_visuals){
  radialGraph(volHistory_no_sax,cfg_radial_no_sax);
  }else{
  linearGraph(volHistory_no_sax,cfg_linear_no_sax);
  }
  }
  
  if (mode_visuals){
	buffer = 360;
  } else{
	  buffer = width;
  }
  
  cleanSignal(volHistory_sax,buffer);
  cleanSignal(volHistory_no_sax,buffer);
}

function mouseClicked(){
  if (getAudioContext().state !== 'running') {
   getAudioContext().resume();
 }
}


function togglePlaying() {
  if (!sax.isPlaying() ) {
    sax.play();
    button.html("pause");
  }

  else {
    sax.pause();
    
    button.html("play");
  }

  if(!no_sax.isPlaying())
  {
    no_sax.play();
  }
  else{
    no_sax.pause();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cfg_radial_sax={c : color('yellow'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,10,height]}
  cfg_linear_sax = {offset:height/3,c:color('yellow')}
  cfg_radial_no_sax={c : color('blue'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,1,height/2]}
  cfg_linear_no_sax = {offset:2*height/3,c:color('blue')}
  cfg_ellipseDrum_no_sax = {center : [width / 2,height / 2],scale : 2, c : color(0, 255, 0),mapArray : [0,0.5,1,height]};
}

function ellipseDrum(signal,cfg = {center : [width / 2,height / 2],scale : 2, c : color(0, 0, 255),mapArray : [0,0.5,1,height]}){
  var diam_signal = cfg.scale*(map(signal,cfg.mapArray[0],cfg.mapArray[1],cfg.mapArray[2],cfg.mapArray[3]));
  fill(cfg.c);
  ellipse(cfg.center[0], cfg.center[1], diam_signal, diam_signal);
}

function linearGraph(signal,cfg={offset:height/2,c:color('yellow')}){
  push();
  stroke(cfg.c);
// use last value in offset for rhythmic line jumps
  noFill();
  //code for linear graph
  
  translate(0, cfg.offset - map(signal[signal.length - 1], 0, 1, height, 0))//currentY);
  beginShape();
  for (var i = 0; i < signal.length; i++) {
    var y = map(signal[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  if (signal.length > width ) {//- 50
    signal.splice(0, 1);
  }

  // vertical line
  //stroke(255, 0, 0);
  //line(signal.length, 0, signal.length, height);
  pop()
}

function radialGraph(signal,cfg={c : color(255,0,0),center : [width/2,height/2],step:6,scale:2,offset:height/8,mapArray:[0,1,10,height]}){
  push()
  stroke(cfg.c);

  noFill();
  
  //code for radial graph

  translate(cfg.center[0], cfg.center[1]);
  step = cfg.step;

  // for step = 2 this stabilizes the radial line
  // this gave problems in the online refactored version, vertex doesnt appears
  //  for (var i = 0; i<step-1;i++){
  //    push()
  //    pop()
  //  }

  beginShape();
  for (var i = 0; i < 360; i=i+step) {
    var r = cfg.scale*map(signal[i], cfg.mapArray[0], cfg.mapArray[1], cfg.mapArray[2], cfg.mapArray[3]);

    //r = height/2 - r;
    r = cfg.offset + r;
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (signal.length > 360) {
    signal.splice(0, 1);
  }
  pop()
}

function keyPressed() {
  if (keyCode == 89) {
    mode_sax = !mode_sax;
    if(mode_sax){  sax.setVolume(1);}
    else {sax.setVolume(0);}
  } else if (keyCode == 66) {
    mode_no_sax = !mode_no_sax;
    if (mode_no_sax){no_sax.setVolume(1);}
    else {no_sax.setVolume(0)}
  }
  else if (keyCode == 77){
	mode_visuals = !mode_visuals;
  }
}

function cleanSignal(signal,buffer){
	while (signal.length > buffer) {
    signal.splice(0, 1);
  }
}