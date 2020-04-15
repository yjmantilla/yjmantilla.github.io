// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var sax;
var bass;
var sliderRate;
var sliderPan;
var button;
var volHistory_sax = [];
var volHistory_bass = [];
var volHistory_piano = [];
var vol_sax;
var mode_sax = true;
var mode_bass = true;
var mode_piano = true;
var mode_others = true;
var mode_visuals = true;
var radial_step = 1;

var s = 'Try pressing M,Y,B,R,W!\nSounds weird? Try pausing (may desync)\nBetter experienced in chrome\nMay be too slow in some devices (ie mobile)';

cfg_radial_sax={};
cfg_linear_sax = {};
cfg_radial_bass={};
cfg_linear_bass = {};
cfg_ellipseDrum_bass = {};
cfg_linear_piano={};
cfg_radial_piano={};
cfg_radial_others={};
cfg_ellipseDrum_others = {};
cfg_linear_others = {};


function preload(){
  sax = loadSound("/audio/venezuela_sax.mp3");
  bass =  loadSound("/audio/venezuela_bass.mp3");
  piano = loadSound("/audio/venezuela_piano.mp3");
  others = loadSound("/audio/venezuela_percussion_cuatro.mp3");
  console.log("loaded");
}
function setup() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
  createCanvas(windowWidth, windowHeight);
  
  volHistory_sax = new Array(360).fill(0);
  volHistory_bass = new Array(360).fill(0);
  volHistory_piano = new Array(360).fill(0); //windowWidth for linearGraph
  volHistory_others = new Array(360).fill(0);
  angleMode(DEGREES);
  
  sax.setVolume(1);
  bass.setVolume(1);
  piano.setVolume(1);
  others.setVolume(1);
  
  //sliderRate = createSlider(0, 1.5, 1, 0.01);
  //sliderPan = createSlider(-1, 1, 0, 0.01);
  
  amp_sax = new p5.Amplitude();
  amp_bass = new p5.Amplitude();
  amp_piano = new p5.Amplitude();
  amp_others = new p5.Amplitude();
  
  amp_sax.setInput(sax);
  amp_bass.setInput(bass);
  amp_piano.setInput(piano);
  amp_others.setInput(others);
  
  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  
  set_cfgs();

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
  background(0,0,0);
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
  var vol_bass = amp_bass.getLevel();
  
  //ellipseDrum(vol_bass,cfg_ellipseDrum_bass);  
  volHistory_bass.push(vol_bass);
  
    

  if (mode_bass){
  if (mode_visuals){
  radialGraph(volHistory_bass,cfg_radial_bass);
  }else{
  linearGraph(volHistory_bass,cfg_linear_bass);
  }
  }
  var vol_piano = amp_piano.getLevel();
  volHistory_piano.push(vol_piano);
  
  if (mode_piano){
  if (mode_visuals){
  radialGraph(volHistory_piano,cfg_radial_piano);
  }
  else{
  linearGraph(volHistory_piano,cfg_linear_piano);
  }  //map(vol_piano, 0, 1, height, 0)
  //
  }
  vol_others = amp_others.getLevel();
  volHistory_others.push(vol_others);
  
  if (mode_others){
  if (mode_visuals){
	  radialGraph(volHistory_others,cfg_radial_others);
  }
  else{
	  linearGraph(volHistory_others,cfg_linear_others);
  }
  }
   //map(vol_piano, 0, 1, height, 0)
  
  //ellipseDrum(vol_others,cfg_ellipseDrum_others);
  
  if (mode_visuals){
	buffer = 360;
  } else{
	  buffer = width;
  }
  
  cleanSignal(volHistory_sax,buffer);
  cleanSignal(volHistory_bass,buffer);
  cleanSignal(volHistory_piano,buffer);
  cleanSignal(volHistory_others,buffer);
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

  if(!bass.isPlaying())
  {
    bass.play();
  }
  else{
    bass.pause();
  }
  
  if(!piano.isPlaying())
  {
    piano.play();
  }
  else{
    piano.pause();
  }
  
  if(!others.isPlaying())
  {
    others.play();
  }
  else{
    others.pause();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  set_cfgs();
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
    mode_bass = !mode_bass;
    if (mode_bass){bass.setVolume(1);}
    else {bass.setVolume(0)}
  }
  else if (keyCode == 82){
  mode_piano = !mode_piano;
  if (mode_piano){piano.setVolume(1);}
  else {piano.setVolume(0);}
  }
  else if (keyCode == 87)
  {
  mode_others = !mode_others;
  if (mode_others){others.setVolume(1);}
  else {others.setVolume(0);}
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

function set_cfgs(){
cfg_radial_sax={c : color('yellow'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,10,height]}
cfg_linear_sax = {offset:height/3,c:color('yellow')}
cfg_radial_bass={c : color('blue'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/8,mapArray:[0,1,1,height/2]}
cfg_linear_bass = {offset:2*height/3,c:color('blue')}
cfg_ellipseDrum_bass = {center : [width / 2,height / 2],scale : 2, c : color(0, 255, 0),mapArray : [0,0.5,1,height]};
cfg_linear_piano={offset:2.7*height/3,c:color('red')}
cfg_radial_piano={c : color('red'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/16,mapArray:[0,1,1,height/4]}
cfg_radial_others={c : color('white'),center : [width/2,height/2],step:radial_step,scale:2,offset:height/12,mapArray:[0,1,1,height/3]}
cfg_ellipseDrum_others = {center : [width / 2,height / 2],scale : 2, c : color("white"),mapArray : [0,0.5,1,height]};
cfg_linear_others = {offset:1.7*height/3,c:color('white')}

}