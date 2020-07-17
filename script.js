//Ripple Event Handler
var drawRipple = function(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  var node = document.querySelector(".ripple");
  var newNode = node.cloneNode(true);
  newNode.classList.add("animate");
  newNode.style.left = ev.clientX - 5 + "px";
  newNode.style.top = ev.clientY - 5 + "px";
  node.parentNode.replaceChild(newNode, node);
};

var drawRipple2 = function(ev) {
  var clientX = ev.touches[0].clientX;
  var clientY = ev.touches[0].clientY;
  
  var node = document.querySelector(".ripple");
  var newNode = node.cloneNode(true);
  newNode.classList.add("animate");
  newNode.style.left = clientX - 5 + "px";
  newNode.style.top = clientY - 5 + "px";
  node.parentNode.replaceChild(newNode, node);
};


//Ripple Triggers
window.addEventListener("mousedown", drawRipple);
window.addEventListener("touchstart", drawRipple2);


let words = "click anywhere to play sound";
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

var pingpong2 = new Tone.PingPongDelay(0.9, 0.4).toMaster();
pingpong2.wet = 0.5;
var pingpong = new Tone.PingPongDelay(0.45, 0.7).connect(pingpong2).toMaster();
pingpong.wet = 0.5;

var vox1 = new Tone.Player(
  "stems/vox1.mp3"
)
  .connect(pingpong)
  .toMaster();
var vox2 = new Tone.Player(
  "stems/vox2.mp3"
)
  .connect(pingpong)
  .toMaster();
var tron = new Tone.Player(
  "stems/tron.mp3"
)
  .connect(pingpong)
  .toMaster();
var wurli = new Tone.Player(
  "stems/wurli.mp3"
)
  .connect(pingpong)
  .toMaster();
var slide = new Tone.Player(
  "stems/slide.mp3"
)
  .connect(pingpong)
  .toMaster();
var delay = new Tone.Player(
  "stems/delay.mp3"
)
  .connect(pingpong)
  .toMaster();

var started = false;

vox1.loop = true;
vox2.loop = true;
tron.loop = true;
wurli.loop = true;
slide.loop = true;
delay.loop = true;


function setup() {
  let canvas = createCanvas(150, 150);
  
  canvas.parent("clock");

  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.5;

  cx = width / 2;
  cy = height / 2;
}

function draw() {  
  var amp = map(mouseX, 0, width, -60, 0);

  var vox1amp = map(sin(frameCount / 100), -1, 1, -50, -10);
  var vox2amp = map(sin(frameCount / 150), -1, 1, -50, -10);
  var tronamp = map(sin(frameCount / 250), -1, 1, -50, -10);
  var wurliamp = map(sin(frameCount / 350), -1, 1, -50, -10);
  var slideamp = map(sin(frameCount / 300), -1, 1, -50, -10);
  var delayamp = map(sin(frameCount / 450), -1, 1, -50, -10);

  vox1.volume.value = vox1amp;
  vox2.volume.value = vox2amp;
  tron.volume.value = tronamp;
  wurli.volume.value = wurliamp;
  slide.volume.value = slideamp;
  delay.volume.value = delayamp;

  
  noStroke();
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    fill(255, 20);
  } else {
    fill(37, 20);
  }
  ellipse(
    cx,
    cy,
    clockDiameter + sin(frameCount) * 10,
    clockDiameter + sin(frameCount) * 10
  );

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 60, 0, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    stroke(37);
  } else {
    stroke(255);
  }
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  var x = document.getElementById("click-sound");

  if (started == false) {
    vox1.start();
    vox2.start();
    tron.start();
    wurli.start();
    slide.start();
    delay.start();
    started = true;
    Tone.Master.mute = false;
    x.innerHTML = "<p>click anywhere to stop sound</p>";
  } else {
    vox1.stop();
    vox2.stop();
    tron.stop();
    wurli.stop();
    slide.stop();
    delay.stop();
    started = false;
    Tone.Master.mute = true;
    x.innerHTML = "<p>click anywhere to play sound</p>";
  }
}
