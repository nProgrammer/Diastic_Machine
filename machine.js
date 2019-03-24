
// DIASTIC MACHINE

var tekstTab;
var tekst = '';
var tabela = {};
var generated = '';
var current = '';
var LPREV = 10;
var LNEXT = 1;

function preload() {
  //url = "https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/EZTkShBX";
  //url = "https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/wvt1Aaf9";
  //url = "https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/D1EYr6uy";
  url = "https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/d9vghKuj";
  tekstTab = loadStrings(url);
}

function setup() {
  noCanvas();
  for (var i = 0; i<tekstTab.length; i++) {
    tekst = tekst.concat(tekstTab[i],' ');
  }
  
  for (var i = 0; i < tekst.length - LPREV - LNEXT; i++) {
    var prev = tekst.substr(i,LPREV);
    var next = tekst.substr(i+LPREV,LNEXT);
    if (!(prev in tabela)) {
      tabela[prev] = {
        nexts: {},
        count: 0,
      };
    }
    
    if (next in tabela[prev].nexts) {
      tabela[prev].nexts[next]++;
    } else {
      tabela[prev].nexts[next] = 1;
    }
    tabela[prev].count++;
    
   // console.log(prev + next);
  }
  var indeks = floor(random(tekst.length - LPREV - LNEXT));
  current = tekst.substr(indeks,LPREV);
  generated = current;
  console.log('ready');
}

function pickNext(prev) {
  var count = tabela[prev].count;
  var nexts = [];
  for (var next in tabela[prev].nexts) {
    nexts.push(next);
  }
  do {
    var next = random(nexts);
  } while (random() > tabela[prev].nexts[next] / count);
  return next;
}

function draw() {
  var next = pickNext(current);
  current = current.concat(next);
  current = current.substr(LNEXT,LPREV);
  generated = generated.concat(next);
  
  document.body.textContent = generated;
  if (frameCount > 10000){
    
    noLoop();
    
  }
}
