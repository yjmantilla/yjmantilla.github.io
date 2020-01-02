// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/h_aTgOl9J5I

var song;
var amp;
var button;

var volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound("/audio/venezuela_sax.mp3");
}

function setup() {
  createCanvas(200, 200);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
  i=0;
  background(0);
}

function draw() {
  //background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();

  translate(width / 2, height / 2);
  //beginShape();
  //for (var i = 0; i < 360; i++) {
    var r = map(vol, 0, 1, 10, height);
    var x = r * cos(i);
    var y = r * sin(i);
    //vertex(x, y)
    point(x,y);
  //}
  //endShape();

  if (i > 360) {
    i=0;
    background(0)
  }
  i++;
  //ellipse(100, 100, 200, vol * 200);
}