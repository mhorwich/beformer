var fullLyrics = ""

var pingpong2 = new Tone.PingPongDelay(0.9, 0.1).toMaster();
pingpong2.wet = 0.0;
var pingpong = new Tone.PingPongDelay(0.45, 0.1).connect(pingpong2).toMaster();
pingpong.wet = 0.0;

var vox = new Tone.Player(
"https://cdn.glitch.com/fa770d9b-0f41-4e55-aa29-f5fc8e509e3e%2FhologramChorus%205-Hologram_vox.mp3?v=1599279454425")
  // .connect(pingpong)
  .toMaster();
var synth = new Tone.Player(
"https://cdn.glitch.com/fa770d9b-0f41-4e55-aa29-f5fc8e509e3e%2FhologramChorus%204-Hologram_synth.mp3?v=1599279449536")
  // .connect(pingpong)
  .toMaster();
var eGuitar = new Tone.Player(
"https://cdn.glitch.com/fa770d9b-0f41-4e55-aa29-f5fc8e509e3e%2FhologramChorus%203-Hologram_gtr.mp3?v=1599279444907")
  // .connect(pingpong)
  .toMaster();
var bass = new Tone.Player(
"https://cdn.glitch.com/fa770d9b-0f41-4e55-aa29-f5fc8e509e3e%2FhologramChorus%201-Hologram_bass_usethisone.mp3?v=1599279421492")
  // .connect(pingpong)
  .toMaster();
var drums = new Tone.Player(
"https://cdn.glitch.com/fa770d9b-0f41-4e55-aa29-f5fc8e509e3e%2FhologramChorus%202-Hologram_drums.mp3?v=1599279434249")
  // .connect(pingpong)
  .toMaster();


var started = false;
var voxPlaying = false;
var synthPlaying = false;
var eGuitarPlaying = false
var bassPlaying = false;
var drumsPlaying = false;


vox.loop = true;
synth.loop = true;
eGuitar.loop = true;
bass.loop = true;
drums.loop = true;


function hitIt() {
  if (started == false) {
    document.getElementById("pics").style.display = "flex";
    vox.start();
    voxPlaying = true;
    document.getElementById("mic").style.filter="invert(100%)";
    synth.start();
    synthPlaying = true;
    document.getElementById("synth").style.filter="invert(100%)";
    bass.start();
    bassPlaying = true;
    document.getElementById("bass").style.filter="invert(100%)";
    eGuitar.start();
    eGuitarPlaying = true;
    document.getElementById("eGuitar").style.filter="invert(100%)";
    drums.start();
    drumsPlaying = true;
    document.getElementById("drums").style.filter="invert(100%)";
    started = true;
    document.getElementById("instructions").innerHTML = "<h3>click instruments to turn on/off</h3>"
  } else {
    document.getElementById("pics").style.display = "none";
    vox.stop();
    voxPlaying = false;   
    document.getElementById("mic").style.filter="invert(0%)";
    synth.stop();
    synthPlaying = false;   
    document.getElementById("synth").style.filter="invert(0%)";
    bass.stop();
    bassPlaying = false;   
    document.getElementById("bass").style.filter="invert(0%)";
    eGuitar.stop();
    eGuitarPlaying = false;   
    document.getElementById("eGuitar").style.filter="invert(0%)";
    drums.stop();
    drumsPlaying = false;   
    document.getElementById("drums").style.filter="invert(0%)";
    document.getElementById("instructions").innerHTML = "<h3>click here to play with the stems</h3>"
    started = false;
    vox.mute = false;
    synth.mute = false;
    bass.mute = false;
    eGuitar.mute = false;
    drums.mute = false;
  }
}

function playVox(){
  if (voxPlaying == false){
    document.getElementById("mic").style.filter="invert(100%)";
    document.getElementById("mic").style.animationPlayState="running";
    vox.mute = false;
    voxPlaying = true;
  } else {
    document.getElementById("mic").style.filter="invert(0%)";
    document.getElementById("mic").style.animationPlayState="paused";
    vox.mute = true;
    voxPlaying = false;
  }
}


function playSynth(){
  if (synthPlaying == false){
    document.getElementById("synth").style.filter="invert(100%)";
    document.getElementById("synth").style.animationPlayState="running";
    synth.mute = false;
    synthPlaying = true;
  } else {
    document.getElementById("synth").style.filter="invert(0%)";
    document.getElementById("synth").style.animationPlayState="paused";
    synth.mute = true;
    synthPlaying = false;
  }
}

function playBass(){
  if (bassPlaying == false){
    document.getElementById("bass").style.filter="invert(100%)";
    document.getElementById("bass").style.animationPlayState="running";
    bass.mute = false;
    bassPlaying = true;
  } else {
    document.getElementById("bass").style.filter="invert(0%)";
    document.getElementById("bass").style.animationPlayState="paused";
    bass.mute = true;
    bassPlaying = false;
  }
}

function playEGuitar(){
  if (eGuitarPlaying == false){
    document.getElementById("eGuitar").style.filter="invert(100%)";
    document.getElementById("eGuitar").style.animationPlayState="running";
    eGuitar.mute = false;
    eGuitarPlaying = true;
  } else {
    document.getElementById("eGuitar").style.filter="invert(0%)";
    document.getElementById("eGuitar").style.animationPlayState="paused";
    eGuitar.mute = true;
    eGuitarPlaying = false;
  }
}


function playDrums(){
  if (drumsPlaying == false){
    document.getElementById("drums").style.filter="invert(100%)";
    document.getElementById("drums").style.animationPlayState="running";
    drums.mute = false;
    drumsPlaying = true;
  } else{
    document.getElementById("drums").style.filter="invert(0%)";
    document.getElementById("drums").style.animationPlayState="paused";
    drums.mute = true;
    drumsPlaying = false;
  }
}
