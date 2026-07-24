/**
Pen forked from Marina Najdoska
https://codepen.io/mladen___/details/JYqQpz/
**/
// Adjust the difficulty
level = 2;
//TODO: Bounce off wall
//TODO: Add nifty animation to removed symbols (!BOOM?)
fly_rate = .095;
spin_rate = .001;
// Number of letters to stabalize at (changes)
min_letters = 3;
// Absolute minimum number of letters
TRUE_MIN = 3;
// Number to 'fire' initialially
FIRST_COUNT=5;
// How fast the min number of letters increases.
challenge_rate = 10;
slowmos = 3;
streak = 0;
levels = [];
pathConf = {
  minX: 20,
  maxX: 20
};

/** kheremos@gmail.com
 * Dec 11, 2015
 * This library gives maps for looking up the romaji pronunciation of
 * Hiragana and Katakana.  This library may be extended to provide further 
 * functionality in the future.
 * Notes:
 * Hiragana and Katakana complete.
*/
var languageToolJapanese = (function () {
  hiraToRoma = {
    'あ': 'a',
    'い': 'i',
    'う': 'u',
    'え': 'e',
    'お': 'o',
    'ん': 'n',
    'か': 'ka',
    'が': 'ga',
    'き': 'ki',
    'ぎ': 'gi',
    'く': 'ku',
    'ぐ': 'gu',
    'け': 'ke',
    'げ': 'ge',
    'こ': 'ko',
    'ご': 'go',
    'さ': 'sa',
    'ざ': 'za',
    'し': 'shi',
    'じ': 'ji',
    'す': 'su',
    'ず': 'zu',
    'せ': 'se',
    'ぜ': 'ze',
    'そ': 'so',
    'ぞ': 'zo',
    'た': 'ta',
    'だ': 'da',
    'ち': 'chi',
    'ぢ': 'dzi',
    'つ': 'tsu',
    'づ': 'dzu',
    'て': 'te',
    'で': 'de',
    'と': 'to',
    'ど': 'do',
    'な': 'na',
    'に': 'ni',
    'ぬ': 'nu',
    'ね': 'ne',
    'の': 'no',
    'は': 'ha',
    'ば': 'ba',
    'ぱ': 'pa',
    'ひ': 'hi',
    'び': 'bi',
    'ぴ': 'pi',
    'ふ': 'fu',
    'ぶ': 'bu',
    'ぷ': 'pu',
    'へ': 'he',
    'べ': 'be',
    'ぺ': 'pe',
    'ほ': 'ho',
    'ぼ': 'bo',
    'ぽ': 'po',
    'ま': 'ma',
    'み': 'mi',
    'む': 'mu',
    'め': 'me',
    'も': 'mo',
    'ら': 'ra',
    'り': 'ri',
    'る': 'ru',
    'れ': 're',
    'ろ': 'ro',
    'や': 'ya',
    'ゆ': 'yu',
    'よ': 'yo',
    'わ': 'wa',
    'を': 'wo',
    'きゃ': 'kya',
    'きゅ': 'kyu',
    'きょ': 'kyo',
    'しゃ': 'sha',
    'しゅ': 'shu',
    'しょ': 'sho',
    'ちゃ': 'cha',
    'ちゅ': 'chu',
    'ちょ': 'cho',
    'にゃ': 'nya',
    'にゅ': 'nyu',
    'にょ': 'nyo',
    'ひゃ': 'hya',
    'ひゅ': 'hyu',
    'ひょ': 'hyo',
    'みゃ': 'mya',
    'みゅ': 'myu',
    'みょ': 'myo',
    'りゃ': 'rya',
    'りゅ': 'ryu',
    'りょ': 'ryo',
    'ぎゃ': 'gya',
    'ぎゅ': 'gyu',
    'ぎょ': 'gyo',
    'じゃ':'ja',
    'じゅ':'ju',
    'じょ':'jo',
    'ぢゃ':'dza',
    'じゅぅ':'jyu',
    'ぢょ':'dzo',
    'びゃ': 'bya',
    'びゅ': 'byu',
    'びょ': 'byo',
    'ぴゃ': 'pya',
    'ぴゅ': 'pyu',
    'ぴょ': 'pyo'
 };

 // Populate reverse map Romaji keys to Hiragana values
 romaToHira = {};
 for (var key in hiraToRoma) {
   romaToHira[hiraToRoma[key]] = key;
 }

 kataToRoma = {
    'ア': 'a',
    'イ': 'i',
    'ウ': 'u',
    'エ': 'e',
    'オ': 'o',	
    'カ': 'ka',
    'キ': 'ki',	
    'ク': 'ku',
    'ケ': 'ke',
    'コ': 'ko',
    'サ': 'sa',
    'シ': 'shi',
    'ス': 'su',
    'セ': 'se',
    'ソ': 'so',
    'タ': 'ta',
    'チ': 'chi',
    'ツ': 'tsu',
    'テ': 'te',
    'ト': 'to',	
    'ナ': 'na',
    'ニ': 'ni',
    'ヌ': 'nu',
    'ネ': 'ne',
    'ノ': 'no',
    'ハ': 'ha',
    'ヒ': 'hi',
    'フ': 'fu',
    'ヘ': 'he',
    'ホ': 'ho',	
    'マ': 'ma',
    'ミ': 'mi',
    'ム': 'mu',
    'メ': 'me',
    'モ': 'mo',
    'ヤ': 'ya',
    'ユ': 'yu',
    'ヨ': 'yo',
    'ラ': 'ra',
    'リ': 'ri',
    'ル': 'ru',
    'レ': 're',
    'ロ': 'ro',
    'ワ': 'wa',
    'ヰ': 'wi',
    'ヱ': 'we',
    'ヲ': 'wo',
    'キャ': 'kya',
    'キュ': 'kyu',
    'キョ': 'kyo',
    'シャ': 'sha',
    'シュ': 'shu',
    'ショ': 'sho',
    'チャ': 'cha',
    'チュ': 'chu',
    'チョ': 'cho',
    'ニャ': 'nya',
    'ニュ': 'nyu',
    'ニョ': 'nyo',
    'ヒャ': 'hya',
    'ヒュ': 'hyu',
    'ヒョ': 'hyo',
    'ミャ': 'mya',
    'ミュ': 'myu',
    'ミョ': 'myo',
    'リャ': 'rya',
    'リュ': 'ryu',
    'リョ': 'ryo' 
 }
 // Reverse lookup
 romaToKata = {};
 for (var key in kataToRoma) {
   romaToKata[kataToRoma[key]] = key;
 }
 
 kataArray = function (){
   retArray = [];
   for (var key in kataToRoma) {
     retArray.push(key);
   }  
   return retArray;
  }();

 // Outputs provided objects for investigation.
  toolHelp = function (){
     console.log("Exposing innards:");
     console.log("hiraToRoma:");
     console.log(hiraToRoma);
     console.log("romaToHira:");
     console.log(romaToHira);
     console.log("kataToRoma:");
     console.log(kataToRoma);
     console.log("romaToKata:");
     console.log(romaToKata);
  };
  console.log("Loaded, returning...");
  return {
    hiraToRoma: hiraToRoma,
    romaToHira: romaToHira,
    kataToRoma: kataToRoma,
    romaToKata: romaToKata,
    kataArray: kataArray,
    toolHelp: toolHelp
  };
 }()); 

function initializeValues() {
  total = [0, 0];
  levels[0] = '';
  levels[1] = 'いくこさしすたとのへんう';
  levels[2] = levels[1] + 'きちてよかつあ';
  levels[3] = levels[2] + 'おえけせそなにぬね';
  levels[4] = levels[3] + 'はひふほまみむめもやゆ';
  levels[5] = levels[4] + 'らりるれろをわがだぐぎば';
  levels[6] = levels[5].substr(12) + 'ぱびぴぶぷぼぽげじぺべご';
  levels[6] = levels[5] + 'ぱびぴぶぷぼぽげじぺべご';
};

var counter = 0;
// jToolHelp();// var start_keys = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80];
var start_keys = [65];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
initializeValues();
var grd,
  keys_down = [],
  letters = [];

var symbols = [
  {
  k: 81,
  s: "q",
  x: 15
}, {
  k: 87,
  s: "w",
  x: 15
}, {
  k: 69,
  s: "e",
  x: 25
}, {
  k: 82,
  s: "r",
  x: 35
}, {
  k: 84,
  s: "t",
  x: 45
}, {
  k: 89,
  s: "y",
  x: 55
}, {
  k: 85,
  s: "u",
  x: 65
}, {
  k: 73,
  s: "i",
  x: 75
}, {
  k: 79,
  s: "o",
  x: 85
}, {
  k: 80,
  s: "p",
  x: 95
}, {
  k: 65,
  s: "a",
  x: 10
}, {
  k: 83,
  s: "s",
  x: 20
}, {
  k: 68,
  s: "d",
  x: 30
}, {
  k: 70,
  s: "f",
  x: 40
}, {
  k: 71,
  s: "g",
  x: 50
}, {
  k: 72,
  s: "h",
  x: 60
}, {
  k: 74,
  s: "j",
  x: 70
}, {
  k: 75,
  s: "k",
  x: 80
}, {
  k: 76,
  s: "l",
  x: 90
}, {
  k: 90,
  s: "z",
  x: 25
}, {
  k: 88,
  s: "x",
  x: 30
}, {
  k: 67,
  s: "c",
  x: 40
}, {
  k: 86,
  s: "v",
  x: 50
}, {
  k: 66,
  s: "b",
  x: 60
}, {
  k: 78,
  s: "n",
  x: 70
}, {
  k: 77,
  s: "m",
  x: 80
}, {
  k: 48,
  s: "0",
  x: 90
}, {
  k: 49,
  s: "1",
  x: 20
}, {
  k: 50,
  s: "2",
  x: 30
}, {
  k: 51,
  s: "3",
  x: 40
}, {
  k: 52,
  s: "4",
  x: 50
}, {
  k: 53,
  s: "5",
  x: 60
}, {
  k: 54,
  s: "6",
  x: 70
}, {
  k: 55,
  s: "7",
  x: 75
}, {
  k: 56,
  s: "8",
  x: 80
}, {
  k: 57,
  s: "9",
  x: 85
}];

function getRandomLetter() {
  var randNumKey = 48 + Math.floor(Math.random() * 9);
  return new Letter(randNumKey);
}

function Letter(key) {
  this.x = findX(key);
  this.speedMult = 1;
  this.symbol = findS(key);
  this.sound = hiraToRoma[this.symbol];
  this.color = "rgba(255, 255, 255, " + (Math.random() + .4) + ")";
  this.size = Math.floor((Math.random() * 30) + 22);
  this.path = getRandomPath(this.x);
  // PI/4 = 45 degrees
  this.rotate = (Math.random() * Math.PI / 4) - Math.PI / 4;
  this.spin_rate = spin_rate * (Math.round(Math.random()) * 2 - 1);
  this.percent = 0;
}

Letter.prototype.draw = function() {
  var percent = this.percent / 100;
  var xy = getQuadraticBezierXYatPercent(this.path[0], this.path[1], this.path[2], percent);
  ctx.save();
  ctx.translate(xy.x, xy.y);
  ctx.rotate(this.rotate += this.spin_rate);
  ctx.font = this.size + "px Arial";
  ctx.fillStyle = this.color;
  ctx.fillText(this.symbol, -15, -15);
  ctx.restore();
};

Letter.prototype.drawPath = function() {
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(this.path[0].x, this.path[0].y);
  ctx.quadraticCurveTo(this.path[1].x, this.path[1].y, this.path[2].x, this.path[2].y);
  ctx.stroke();
}

function findX(key) {
  for (var i = 0; i < symbols.length; i++) {
    if (symbols[i].k == key) {
      return (symbols[i].x * canvas.width / 100);
    }
  };
  console.log(key + " not found.");
  return false;
}

function findS(key) {
  for (var i = 0; i < symbols.length; i++) {
    if (symbols[i].k == key) {
      var possibleSymbols = levels[level];
      var len = possibleSymbols.length;
      var choice = Math.floor(Math.random() * len);
      correctSymbol = possibleSymbols.substr(choice, 1);
      return correctSymbol;
      //      return symbols[i].s;
    }
  };
  return false;
}

function getRandomPath(x) {
  var range = [pathConf.minX, canvas.width - pathConf.maxX]
  var x_start = x;
  var x_end = Math.floor((Math.random() * (range[1] - range[0])) + range[0]);
  return [{
    x: x_start,
    y: canvas.height + 30
  }, {
    x: (x_start + x_end) / 2,
    y: Math.floor((Math.random() * canvas.height) - canvas.height)
  }, {
    x: x_end,
    y: canvas.height + 30
  }];
}

function getLineXYatPercent(startPt, endPt, percent) {
  var dx = endPt.x - startPt.x;
  var dy = endPt.y - startPt.y;
  var X = startPt.x + dx * percent;
  var Y = startPt.y + dy * percent;
  return ({
    x: X,
    y: Y
  });
}

function getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
  var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
  var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
  return ({
    x: x,
    y: y
  });
}

function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
  var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return ({
    x: x,
    y: y
  });
}

function CubicN(pct, a, b, c, d) {
  var t2 = pct * pct;
  var t3 = t2 * pct;
  return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
}

function resize() {
  var box = canvas.getBoundingClientRect();
  canvas.width = box.width;
  canvas.height = box.height;
  grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.height);
  grd.addColorStop(0, "#821e69");
  grd.addColorStop(1, "#4f2556");
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  for (var i = 0; i < letters.length; i++) {
    letters[i].percent += fly_rate * letters[i].speedMult;
    letters[i].draw();
    // letters[i].drawPath();
    // Remove letter if it's done with path
    if (letters[i].percent > 103) {
      missLetter(i);
    }
  };

  //STARTING LETTERS?
  while (FIRST_COUNT-- > 0) {      letters.push(getRandomLetter());}

  requestAnimationFrame(draw);
}

function hitLetter(num) {
  var hit = letters.splice(num, 1)[0];
  document.getElementById("streak").innerHTML = Math.floor(++streak);
  console.log("Streak: "+streak+"  min_letters * challenge_rate: "+(min_letters * challenge_rate));
  if (streak >= ((1+min_letters-TRUE_MIN) * challenge_rate)) {
    min_letters++;
    document.getElementById("letterCount").innerHTML = min_letters;
  }
  if (streak%50 == 0) {
     document.getElementById("slowmoCount").innerHTML = ++slowmos;
  }
  while (letters.length < min_letters) {
    letters.push(getRandomLetter());
  }
}

function missLetter(num) {
  var missed = letters.splice(num, 1)[0];
  if (min_letters > TRUE_MIN) {
    min_letters -= .5;
  }
  streak = 0;
  document.getElementById("streak").innerHTML = streak;
  document.getElementById("clue").innerHTML = missed.sound;
  document.getElementById("letterCount").innerHTML = Math.floor(min_letters);
  bounceLetter(missed);
  while (letters.length < min_letters) {
    letters.push(getRandomLetter());
  }
}

// Bounces a missing letter back into action
function bounceLetter(missed) {
  missed.percent = -Math.round(Math.random() * 5);
  missed.path = getRandomPath(missed.path[2].x);
  missed.size++;
  missed.rotate = -missed.rotate * 0.5;
  letters.push(missed);
}

function startAnimation() {
  setTimeout(function() {
    var key = start_keys.pop();
    keys_down[key] = true;
    setTimeout(function() {
      keys_down[key] = false;
    }, 180);
    if (start_keys.length > 0) {
      startAnimation();
    }
  }, 180);
}
resize();
draw();
startAnimation();

window.onresize = resize;

document.onkeyup = function(event) {
  if (event.keyCode == 13) { // enter
    document.getElementById("input").value = '';
  } else if (event.keyCode == 32) { // space bar
    slowMo();
    document.getElementById("input").value = '';
  } else if (event.keyCode == 191) { // ?
    debugging();
    document.getElementById("input").value = '';
  } else {
    checkForSymbol(document.getElementById("input").value.toLowerCase());
  }
  keys_down[event.keyCode] = false;
}

// Triggered when '?' is typed
function debugging() {
  console.log(letters);
}

function checkForSymbol(text) {
  for (var i = 0; i < letters.length; i++) {
    // Remove letter if it's done with path
    if (letters[i].symbol == romaToHira[text]) {
      hitLetter(i);
      document.getElementById("input").value = '';
    }
  };
}

// When space is pressed, letters slow down
function slowMo() {
  if (slowmos < 1) return;
  document.getElementById("slowmoCount").innerHTML = --slowmos;
  for (var i = 0; i < letters.length; i++) {
    letters[i].speedMult = .25;
  };
}

document.onkeydown = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 48 && event.keyCode <= 57) {
    //keys_down[event.keyCode] = true;
  }
}
document.onfocusout = function() {
  keys_down = [];
}

// document.getElementById("input").focus();

window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Boring methods.
function drawBackground() {
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
