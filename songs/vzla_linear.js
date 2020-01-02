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
var volhistory_bass = [];
var volhistory_piano = [];
var vol_sax;


function preload(){
  sax = loadSound("/audio/venezuela_sax.mp3");
  bass =  loadSound("/audio/venezuela_bass.mp3");
  piano = loadSound("/audio/venezuela_piano.mp3");
  tambora = loadSound("/audio/venezuela_percussion_cuatro.mp3");
  console.log("loaded");
}
function setup() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
  createCanvas(windowWidth, windowHeight);
  
  volhistory_sax = new Array(360).fill(0);
  volhistory_bass = new Array(360).fill(0);
  volhistory_piano = new Array(360).fill(0); //windowWidth for linearGraph
  volhistory_tambora = new Array(360).fill(0);
  angleMode(DEGREES);
  
  sax.setVolume(1);
  bass.setVolume(1);
  piano.setVolume(1);
  tambora.setVolume(1);
  
  //sliderRate = createSlider(0, 1.5, 1, 0.01);
  //sliderPan = createSlider(-1, 1, 0, 0.01);
  
  amp_sax = new p5.Amplitude();
  amp_bass = new p5.Amplitude();
  amp_piano = new p5.Amplitude();
  amp_tambora = new p5.Amplitude();
  
  amp_sax.setInput(sax);
  amp_bass.setInput(bass);
  amp_piano.setInput(piano);
  amp_tambora.setInput(tambora);
  
  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
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

  background(0,0,0);
  //var vol_sax = amp_sax.getLevel();
  var vol_bass = amp_bass.getLevel();
  bass_cfg = {center : [width / 2,height / 2],scale : 2, c : color(0, 255, 0),mapArray : [0,0.5,1,height]};
  
  //ellipseDrum(vol_bass,bass_cfg);

  vol_sax = amp_sax.getLevel();
  volhistory_sax.push(vol_sax);
  cfg_sax={c : color(255,0,0),center : [width/2,height/2],step:2,scale:2,offset:height/8,mapArray:[0,1,10,height]}
  radialGraph(volhistory_sax,cfg_sax);
  
  volhistory_bass.push(vol_bass);
  cfg_bass2={c : color(0,0,255),center : [width/2,height/2],step:2,scale:2,offset:height/8,mapArray:[0,1,1,height/2]}
  radialGraph(volhistory_bass,cfg_bass2);
  
  var vol_piano = amp_piano.getLevel();
  volhistory_piano.push(vol_piano);
  cfg_piano={offset:height/3,c:color('yellow')}
  cfg_piano2={c : color('yellow'),center : [width/2,height/2],step:2,scale:2,offset:height/16,mapArray:[0,1,1,height/4]}
  //linearGraph(volhistory_piano,cfg_piano); //map(vol_piano, 0, 1, height, 0)
  radialGraph(volhistory_piano,cfg_piano2);
  
  vol_tambora = amp_tambora.getLevel();
  volhistory_tambora.push(vol_tambora);
  cfg_tambora={c : color('white'),center : [width/2,height/2],step:2,scale:2,offset:height/12,mapArray:[0,1,1,height/3]}
  //radialGraph(volhistory_tambora,cfg_tambora);
  
  tambora_cfg = {center : [width / 2,height / 2],scale : 2, c : color("white"),mapArray : [0,0.5,1,height]};
  cfg_tambora_linear = {offset:4.5*height/5,c:color('white')}
  linearGraph(volhistory_tambora,cfg_tambora_linear); //map(vol_piano, 0, 1, height, 0)
  
  //ellipseDrum(vol_tambora,tambora_cfg);
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
  
  if(!tambora.isPlaying())
  {
    tambora.play();
  }
  else{
    tambora.pause();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

function radialGraph(signal,cfg={c : color(255,0,0),center : [width/2,height/2],step:2,scale:2,offset:height/8,mapArray:[0,1,10,height]}){
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