// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var sax;
var others;
var sliderRate;
var sliderPan;
var button;
var volHistory_sax = [];
var volHistory_others = [];
var vol_sax;


var cfg = {

mode_sax : true,
mode_others : true,
mode_visuals : true,
radial_step : 1,
toggle_sax: function(){
  this.mode_sax = !this.mode_sax;
  if(this.mode_sax){  sax.setVolume(1);}
  else {sax.setVolume(0);}
}
,
toggle_others:function (){
  this.mode_others = !this.mode_others;
  if(this.mode_others){others.setVolume(1);}
  else {others.setVolume(0);}
},
change_visuals:function(){
  this.mode_visuals = !this.mode_visuals;
}
}

var s = 'Try pressing M,Y,R!\nSounds weird? Try pausing (may desync)\nBetter experienced in chrome\nMay be too slow in some devices (ie mobile)';
cfg_radial_sax={};
cfg_linear_sax ={};
cfg_radial_others={};
cfg_linear_others ={};
cfg_ellipseDrum_others = {};




function preload(){
  sax = loadSound("/audio/venezuela_sax.mp3");
  others = loadSound("/audio/venezuela_no_sax.mp3");
  console.log("loaded");
}
function setup() {
  let gui = new dat.GUI({ autoPlace: true, width: 450 });
  //gui.add(text, 'growthSpeed', -5, 5); // Min and max
  //var obj = { add:function(){ console.log("clicked") }};
  //gui.add(obj, 'add').name('Custom Label');
  var cfgFolder = gui.addFolder('Play with this!');
  cfgFolder.add(cfg, 'change_visuals');
  cfgFolder.add(cfg, 'toggle_sax');
  cfgFolder.add(cfg, 'toggle_others');

  button = createButton("play");
  button.mousePressed(togglePlaying);
  createCanvas(windowWidth, windowHeight);
  
  volHistory_sax = new Array(360).fill(0);
  volHistory_others = new Array(360).fill(0);
  angleMode(DEGREES);
  
  sax.setVolume(1);
  others.setVolume(1);
  
  //sliderRate = createSlider(0, 1.5, 1, 0.01);
  //sliderPan = createSlider(-1, 1, 0, 0.01);
  
  amp_sax = new p5.Amplitude();
  amp_others = new p5.Amplitude();
  
  amp_sax.setInput(sax);
  amp_others.setInput(others);  
  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  windowResized()
  set_cfgs()

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

  if (cfg.mode_sax){
    if(cfg.mode_visuals){
    radialGraph(volHistory_sax,cfg_radial_sax);
  }
  else{
  linearGraph(volHistory_sax,cfg_linear_sax);
  }
  }
  var vol_others = amp_others.getLevel();
  
  //ellipseDrum(vol_others,cfg_ellipseDrum_others);  
  volHistory_others.push(vol_others);
  
    

  if (cfg.mode_others){
  if (cfg.mode_visuals){
  radialGraph(volHistory_others,cfg_radial_others);
  }else{
  linearGraph(volHistory_others,cfg_linear_others);
  }
  }
  
  if (cfg.mode_visuals){
	buffer = 360;
  } else{
	  buffer = width;
  }
  
  cleanSignal(volHistory_sax,buffer);
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
  set_cfgs()
}

function set_cfgs(){
  cfg_radial_sax={c : color('yellow'),center : [width/2,height/2],step:cfg.radial_step,scale:2,offset:height/8,mapArray:[0,1,10,height]}
  cfg_linear_sax = {offset:height/3,c:color('yellow')}
  cfg_radial_others={c : color('red'),center : [width/2,height/2],step:cfg.radial_step,scale:2,offset:height/8,mapArray:[0,1,1,height/2]}
  cfg_linear_others = {offset:2*height/3,c:color('red')}
  cfg_ellipseDrum_others = {center : [width / 2,height / 2],scale : 2, c : color(0, 255, 0),mapArray : [0,0.5,1,height]};
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
    cfg.toggle_sax()
  } else if (keyCode == 82) {
    cfg.toggle_others()
  }
  else if (keyCode == 77){
	cfg.mode_visuals = !cfg.mode_visuals;
  }
}

function cleanSignal(signal,buffer){
	while (signal.length > buffer) {
    signal.splice(0, 1);
  }
}
