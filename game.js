let game;
let gameOptions = {
}
let wordy;
let bonusTotalCount = 0;
let arrayWords = [];
let gameLevels = [


  {
    word: 'academy',
    answers: 7,
    threes: true,
  },
  {
    word: 'case',
    answers: 4,
    threes: true,
  },
  {
    word: 'corse',
    answers: 8,
    threes: true,
  },
  {
    word: 'corses',
    answers: 6,
    threes: true,
  },
  {
    word: 'dream',
    answers: 5,
    threes: true,
  },
  {
    word: 'barn',
    answers: 5,
    threes: true,
  },
  {
    word: 'board',
    answers: 5,
    threes: true,
  },
  {
    word: 'death',
    answers: 5,
    threes: true,
  }

];
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x05adb0,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, home, playGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}


class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  init(data) {

    this.level = data.level;

  }
  preload() {


  }
  create() {
    this.bgcolors = [0x474646, 0xba9696, 0x96baa4, 0x96bab6, 0x96adba, 0x222222];

    this.board = [];

    this.wordList = [];
    this.tileLetters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'e', 'a', 'r', 's'
    ];

    this.tileLettersValues = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 1, 1, 1, 1];


    this.tiles = this.add.group({
      defaultKey: "tiles",
      // defaultFrame: 1,
      maxSize: 10,
      visible: false,
      active: false
    });

    this.answerTiles = this.add.group({
      defaultKey: "tiles",
      defaultFrame: 27,
      maxSize: 150,
      visible: false,
      active: false
    });
    var base = 'coats'
    console.log(base)
    var wordCombos = findWords(base);
    var finalCombo = wordCombos.filter(this.filterList)
    console.log(finalCombo)
    var finalCombo1 = this.shuffle(finalCombo)
    console.log(finalCombo1)
    var words = finalCombo1.slice(0, 6);
    var board = Create(words);
    console.log(board);


    this.blockSize = game.config.width / board[0].length
    this.createBoard(board);

    this.line = new Phaser.Geom.Line(game.config.width / 2 - 200, 920, game.config.width / 2 + 200, 920);

    var totalPoints = base.length;
    var points = []
    for (var i = 1; i <= totalPoints; i++) {
      var p = this.drawPoint(175, i, totalPoints);
      var ind = this.tileLetters.indexOf(base[i - 1])
      var tile = this.add.image(p.x, p.y, 'tiles', ind).setScale(1.25)
    }

    console.log(points)

    var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

    graphics.strokeLineShape(this.line);
    //graphics.strokeLineShape(line); // line: {x1, y1, x2, y2}
    //graphics.lineBetween(x1, y1, x2, y2);
    //graphics.lineTo(x, y);
    //graphics.moveTo(x, y);
    //  this.cameras.main.startFollow(this.hero, true, 0, 0.5, 0, - (game.config.height / 2 - game.config.height * gameOptions.firstPlatformPosition));
    //this.input.on("gameobjectdown", this.clickDot, this);
    //this.input.on("gameobjectup", this.upDot, this);
    //this.input.on("gameobjectover", this.overDot, this);




  }

  update() {

  }
  filterList(item) {
    return item.length > 2 && item.length < 6;
  }
  createBoard(board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] != null) {
          var xpos = 25 + j * this.blockSize
          var ypos = 50 + i * this.blockSize
          var tileAnswer = this.answerTiles.get();
          tileAnswer.displayWidth = this.blockSize
          tileAnswer.displayHeight = this.blockSize
          tileAnswer.setPosition(xpos, ypos)
          tileAnswer.word = board[i][j].word
          var ind = this.tileLetters.indexOf(board[i][j].letter)
          tileAnswer.index = ind
          // tileAnswer.setFrame(ind)
          //console.log(tileAnswer.word)
        }


      }
    }
  }
  drawPoint(r, currentPoint, totalPoints) {
    var point = {}
    var theta = ((Math.PI * 2) / totalPoints);
    var angle = (theta * currentPoint);

    point.x = (r * Math.cos(angle - (90 * (Math.PI / 180))) + 450);
    point.y = (r * Math.sin(angle - (90 * (Math.PI / 180))) + 1400);

    return point
  }
  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
//var letterInput = wordy;
//var foundWords = document.getElementById('words');

var findWords = function (letterInput) {
  //  console.log(ScrabbleWordFinder.find(letterInput));
  return ScrabbleWordFinder.find(letterInput);

  //foundWords.innerHTML = ScrabbleWordFinder.find(letterInput.value.toLowerCase()).join('\n');
};





var ScrabbleWordFinder = (() => {
  var ScrabbleWordFinder = function () {
    //this.dict = new ScrabbleDictionary(ScrabbleWordList);
    this.dict = new ScrabbleDictionary(ScrabbleWordList);

  };

  ScrabbleWordFinder.prototype.find = function (letters) {

    //console.log(validWords(this.dict.root, letters));
    return validWords(this.dict.root, letters);
  };

  var validWords = function (node, letters, word = '', results = []) {

    if (node.isWord) {
      results.push(word);
    }
    var seen = new Set();
    for (let ch of letters) {
      if (!seen.has(ch)) {
        seen.add(ch);
        if (node.children[ch]) {
          validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
        }
      }
    }
    return results;
  };

  var ScrabbleDictionary = function (words) {
    this.root = new ScrabbleTrieNode();
    words.forEach(word => this.insert(word));
  };

  var ScrabbleTrieNode = function () {
    this.children = Object.create(null);
  };

  ScrabbleDictionary.prototype.insert = function (word) {
    var cursor = this.root;
    for (let letter of word) {
      if (!cursor.children[letter]) {
        cursor.children[letter] = new ScrabbleTrieNode();
      }
      cursor = cursor.children[letter];
    }
    cursor.isWord = true;
  };

  return new ScrabbleWordFinder();
})();
