
var s = 'Tips:\nweird display on mobile?\n(ie controls dont show completely)\nTry switching back and forth between landscape and portrait\nEnjoy!'
walkerSystem = {numberOfWalkers : 1000,
  walkerSize : 1,
  walkerSpeed : 1,
  restart: function(){background(this.background);},
  background : [0,0,0],
  walkers_x : [],
  walkers_y : [],
  walkers_trailColor : [],
  walkers_trailWeight :[]
}

function walkerStep(walkerSystem,i){
  var choices = [-1,0,1];
  choices = choices.map(x => x * walkerSystem['walkerSpeed']);
  walkerSystem.walkers_x[i] += (random(choices));//upper limit is not included
  walkerSystem.walkers_y[i] += (random(choices));//playing with theses limits gives bias
}

function displayWalker(walkerSystem,i){
  push()
  //strokeWeight(this.trailWeight);
  stroke(walkerSystem.walkers_trailColor[i]);
  point(walkerSystem.walkers_x[i],walkerSystem.walkers_y[i]);
  pop()
}

function dict_length(obj) {
  return Object.keys(obj).length;
}
var palette = {}
function add_color(palette,gui){
  i=dict_length(palette);palette[i]=[0,0,0];gui.addColor(palette,i).name('color-'+i.toString())
}

template_palettes = {
  'fruitsalad':{0:"#00FE4C",1:"#E307AA",2:"#15ACB8",3:"#00F69A",4:"#2C7EED"}
}

function redefine_colors(trailColors,palette){
  for (var i=0;i < trailColors.length;i++){
    trailColors[i] = randomColor(palette);
  }
  background(walkerSystem.background);
}

function randint(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
for (var i=0;i < walkerSystem.numberOfWalkers;i++){
  walkerSystem.walkers_x.push(random(width)),
  walkerSystem.walkers_y.push(random(height)),
  walkerSystem.walkers_trailColor.push(randomColor(palette)),
  walkerSystem.walkers_trailWeight.push(random(1,20))
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

var paletteFolder = gui.addFolder('Color Palette');
walkerSystem['palette-all']=function(){redefine_colors(walkerSystem.walkers_trailColor,'all')}
paletteFolder.add(walkerSystem,'palette-all')

for (const [key, value] of Object.entries(template_palettes)) {
  walkerSystem['palette-'+key]=function(){redefine_colors(walkerSystem.walkers_trailColor,value)}
  paletteFolder.add(walkerSystem,'palette-'+key)
}

walkerSystem['palette-custom']=function(){redefine_colors(walkerSystem.walkers_trailColor,palette)}
paletteFolder.add(walkerSystem,'palette-custom')
walkerSystem['add_color']=function(){add_color(palette,paletteFolder)};
palette_control = paletteFolder.add(walkerSystem,'add_color').name('add color')

window.alert(s);
}


function draw() {
  strokeWeight(walkerSystem.walkerSize);
for (var i = 0; i < walkerSystem.numberOfWalkers;i++){
  walkerStep(walkerSystem,i);
  displayWalker(walkerSystem,i);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(walkerSystem.background); // for some reason it restarts everything on window resize
  for (var i = 0; i < walkerSystem.numberOfWalkers;i++){
    walkerSystem.walkers_x[i] = random(width);
    walkerSystem.walkers_y[i] = random(height);
  }
  
}

function randomColor(palette){
  if (dict_length(palette)===0 || palette=='all'){
  return color(random(255),random(255),random(255))
  }
  else{
    return color(palette[randint(0,dict_length(palette))])
  }


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