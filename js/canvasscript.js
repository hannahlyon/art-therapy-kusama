var toolbar = {
  width: 200
};

var lineColor = '#000000';
var numOfCircles = 10;
var obliterationMode = false;
var numPresses = 0;
var dotColors = ['#2355C6','#ED7C5C','#F4BA41','#469C48','#E8338F','#E83F47'];
var scheme2 = ['#467859','#E1FFED','#90F7B8','#7E8F85','#68B285','#444C47'];
var scheme3 = ['#EB8A5B','#B28068','#F7B290','#EB615B','#FFD5CE','#E3737D'];
var scheme4 = ['#F2CDC7','#D9FCD3','#D8C7E5','#FCEAC3','#D8F0F2','#FFDFC2'];
var colorSchemes = [dotColors, scheme2, scheme3, scheme4];
var oblScheme = -1;
var changeBG = 0;
var bgs;


function preload() {
  img = loadImage('images/canvas.jpg');
  img2 = loadImage('images/gallery.jpg');
  img3 = loadImage('images/bg3.jpg');
  bgs = [img, img2, img3];
}

function setup() {
  var cnv = createCanvas(window.innerWidth - toolbar.width, window.innerHeight);
  cnv.parent('canvas');

  // Toolbar Options
  var pinkButton = createButton('Pink Pen');
  pinkButton.id('pinkbtn',['#F591C8']);
  pinkButton.parent('toolbar');
  pinkButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#F591C8'; });

  var blueButton = createButton('Blue Pen');
  blueButton.id('bluebtn');
  blueButton.parent('toolbar');
  blueButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#5D85B0'; });

  var greenButton = createButton('Green Pen');
  greenButton.id('greenbtn');
  greenButton.parent('toolbar');
  greenButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#93BD6A'; });

  var purpleButton = createButton('Purple Pen');
  purpleButton.id('purplebtn');
  purpleButton.parent('toolbar');
  purpleButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#7456BA'; });

  var orangeButton = createButton('Orange Pen');
  orangeButton.id('orangebtn');
  orangeButton.parent('toolbar');
  orangeButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#E8855B'; });

  var yellowButton = createButton('Yellow Pen');
  yellowButton.id('yellowbtn');
  yellowButton.parent('toolbar');
  yellowButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#FFED6E'; });

  var blackButton = createButton('Black Pen');
  blackButton.id('blackbtn');
  blackButton.parent('toolbar');
  blackButton.mousePressed( function() {
    obliterationMode = false;
    lineColor = '#000000'; });

  var restartButton = createButton('Restart')
  restartButton.id('restart')
  restartButton.mousePressed(clearCanvas);
  restartButton.parent('toolbar');

  var obliterateDraw = createButton('Obliteration Stroke')
  obliterateDraw.id('obliterate-draw');
  obliterateDraw.mousePressed(function() {
    obliterationMode = true;
    oblScheme = (oblScheme + 1) % colorSchemes.length;
    // if (oblScheme == 0) {
    //   alert('Press this button again to change the dot colors!')
    // };
  });
  obliterateDraw.parent('toolbar');

  var obliterateButton = createButton('Obliterate (Auto)')
  obliterateButton.id('obliterate');
  obliterateButton.mousePressed(obliterate);
  obliterateButton.parent('toolbar');

  var newBG = createButton('Change Background');
  newBG.id('bgbtn');
  newBG.parent('toolbar');
  newBG.mousePressed(reloadBG);

  image(img, 0, 0, window.innerWidth - toolbar.width, window.innerHeight + 100);

}

function draw() {

  var distance = dist(pmouseX, pmouseY, mouseX, mouseY);
  var thickness = map(distance, 0, 100, 1, 10);
  // frameCount: 60fps - 1sec
  // millis(): 1000 - 1 sec
  var amp = 5;
  var freq = frameCount * 0.05; // time or angle
  var adj = sin(freq) * amp + 7; // -5 to 5

  strokeWeight(thickness + adj);
  stroke(lineColor);
  if(mouseIsPressed == true) {
    if (obliterationMode == false) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else {
      for (var i=0; i<distance/10; i++) {
        noStroke();
        fill(random(colorSchemes[oblScheme]));
        var dia = random(8,distance/5);
        ellipse(mouseX + random(-distance, distance), mouseY + random(-distance/2, distance/2), dia, dia);
      }
    };
  };

  if (numPresses >= 25) {
    background(255,255,255,10);
  };
}

function windowResized() {
  resizeCanvas(window.innerWidth - toolbar.width, window.innerHeight);
}

function obliterate() {
  numPresses += 1;
  for (var i=0; i<numOfCircles; i++) {
    var wh = random(50, 175) * 0.25;
    noStroke();
    fill( random(dotColors) );
    ellipse( random(window.innerWidth - toolbar.width), random(window.innerHeight), wh, wh );
  };
  numOfCircles *= 3;
  if (numOfCircles > 300) {
    numOfCircles = 300;
  };
}

function obliterateDraw() {
  obliterationMode = true;
}

function reloadBG() {
  changeBG += 1;
  newBG = changeBG % bgs.length;
  console.log(newBG);
  image(bgs[newBG], 0, 0, window.innerWidth - toolbar.width, window.innerHeight + 160);
}

function clearCanvas() {
  numPresses = 0;
  oblScheme = -1;
  numOfCircles = 10;
  changeBG = 0;
  obliterationMode = false;
  clear();
  image(img, 0, 0, window.innerWidth - toolbar.width, window.innerHeight + 100);
}
