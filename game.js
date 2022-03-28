let game;
let gameOptions = {}
let wordy;
let bonusTotalCount = 0;
let arrayWords = [];
const shuffle = str => [...str].sort(() => Math.random() - .5).join('');




window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, home, selectLevel, playGame, endLevel]
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

    this.guess = '';
    this.scoreList = [];
    this.foundWords = [];
    this.puzzleFound = 0;
    this.bonusFound = 0;
    this.selected = null;
    this.revealLetter = false;
    this.revealWord = false;
    if (onLevel > 71) {
      var count = 10
    }
    var base = sourceWords[onLevel]
    //  console.log(base)
    var wordCombos = findWords(base);
    var finalCombo = wordCombos.filter(this.filterList)
    // console.log(finalCombo)
    var finalCombo1 = this.shuffle(finalCombo)
    // console.log(finalCombo1)
    //console.log(finalCombo1)
    this.words = finalCombo1.slice(0, groups[onBook].wordMax);
    var board = Create(this.words);
    // console.log(this.words);

    if (board.length > board[0].length) {
      this.blockSize = game.config.width / board.length
    } else {
      this.blockSize = game.config.width / board[0].length
    }
    var rand = Phaser.Math.Between(0, backs.length - 1)
    var back = this.add.image(0, 0, backs[rand]).setOrigin(0)
    back.displayWidth = game.config.width;
    back.displayHeight = game.config.height;

    /* if (this.blockSize > 90) {
      this.blockSize = 90
    } */
    //console.log(this.blockSize)
    this.createBoard(board);



    this.createKeys(base.length, base)




    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
    this.graphicsLine = this.add.graphics({ lineStyle: { width: 20, color: 0x00ff00 } });
    this.graphicsCircle = this.add.graphics({ lineStyle: { width: 20, color: 0x00ff00 }, fillStyle: { color: 0x00ff00 } });
    this.line = new Phaser.Geom.Line(game.config.width / 2 - 200, 1050, game.config.width / 2 + 200, 1050);
    this.graphics.strokeLineShape(this.line);
    //graphics.strokeLineShape(line); // line: {x1, y1, x2, y2}
    //graphics.lineBetween(x1, y1, x2, y2);
    //graphics.lineTo(x, y);
    //graphics.moveTo(x, y);
    //  this.cameras.main.startFollow(this.hero, true, 0, 0.5, 0, - (game.config.height / 2 - game.config.height * gameOptions.firstPlatformPosition));
    this.input.on("gameobjectdown", this.clickDot, this);
    this.input.on("pointerup", this.upDot, this);
    this.input.on("gameobjectover", this.overDot, this);

    var tempL = onLevel + 1;
    this.levelText = this.add.bitmapText(155, 75, 'clarendon', 'Level ' + tempL, 120).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);
    this.backText = this.add.bitmapText(25, 75, 'clarendon', '[H]', 60).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700).setInteractive();
    this.backText.type = 'home'

    this.starBack = this.add.image(640, 75, 'platform').setOrigin(0, .5).setTint(0x000000).setAlpha(.7);
    this.starBack.displayWidth = 250
    this.starBack.displayHeight = 75

    this.bonusEarnedText = this.add.bitmapText(715, 75, 'clarendon', gameData.coins, 80).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);
    this.starIcon = this.add.image(640, 75, 'star').setScale(.25)

    this.star = this.add.image(100, 1550, 'star').setScale(.3)
    this.guessText = this.add.bitmapText(450, 990, 'clarendon', '', 130).setOrigin(.5).setTint(0xffffff).setMaxWidth(700);
    this.guessFakeText = this.add.bitmapText(450, 990, 'clarendon', '', 130).setOrigin(.5).setTint(0xffffff).setMaxWidth(700);

    this.bonusText = this.add.bitmapText(100, 1555, 'clarendon', 0, 60).setOrigin(.5).setTint(0x000000).setMaxWidth(700);
    this.shuffleButton = this.add.image(75, 1125, 'tile-icons', 0).setInteractive()
    this.shuffleButton.type = 'shuffle'
    this.letterButton = this.add.image(825, 1125, 'tile-icons', 1).setInteractive()
    this.letterButton.type = 'letterClue'
    this.wordButton = this.add.image(825, 1230, 'tile-icons', 2).setInteractive()
    this.wordButton.type = 'wordClue'

  }

  update() {

  }
  clickDot(pointer, tile) {
    //console.log(tile)
    if (tile.type == 'shuffle') {
      this.shuffleKeys()
      return
    }
    if (tile.type == 'home') {
      this.scene.stop();
      this.scene.start('home');
      return
    }
    if (tile.type == 'letterClue') {
      tile.setScale(1.5).setTint(0x00ff00)
      this.revealLetter = true;
      return
    }
    if (tile.type == 'wordClue') {
      tile.setScale(1.5).setTint(0x00ff00)
      this.revealWord = true;
      return
    }
    if (tile.type == 'answer') {
      if (this.revealLetter) {
        tile.setFrame(tile.index)
        this.revealLetter = false;
        this.letterButton.setScale(1).clearTint()
      } else if (this.revealWord) {
        this.revealAnswer(tile.word)
        this.puzzleFound++;
        this.foundWords.push(tile.word)
        this.revealWord = false;
        this.wordButton.setScale(1).clearTint()
        if (this.puzzleFound == this.words.length) {
          this.levelEnd()
        }
      } else {
        return
      }
    }
    if (tile.type == 'key') {
      

      this.guess += tile.letter
      tile.setAlpha(.5)
      //console.log(this.guess)
      this.guessText.setText(this.guess);
      this.selected = tile;
      this.scoreList.push(tile);
      this.graphicsCircle.fillCircle(tile.x, tile.y, 20)
    }
  }
  overDot(pointer, tile) {
    if (this.selected === null || tile.type != 'key') { return; }
    if (tile.type == 'key') {
      if (this.scoreList[this.scoreList.length - 2] === tile) {
        // If you move your mouse back to you're previous match, deselect you're last match
        // This is so the player can choose a different path 
        this.scoreList.pop();
        this.selected.setAlpha(1);
        this.guess -= tile.letter;
        //this.guess = this.guess.slice(0, -1);
        this.guessText.setText(this.guess);

        tile.setAlpha(1);
        this.selected = tile;

      } else if (this.scoreList.indexOf(tile) > -1 && this.scoreList.length > 3) {
        // If the Item is in the list (but isn't the previous item) then you've made a loop
        //this.looped = true;
      } else {
        //console.log('sel ' + this.selected.frameNum);
        // console.log('dot ' + dot.frameNum);

        this.selected = tile;

        if (this.scoreList.indexOf(tile) === -1) {
          tile.setAlpha(0.5);
          this.guess += tile.letter;

          this.guessText.setText(this.guess);
          this.scoreList.push(tile);
          var line1 = new Phaser.Geom.Line(this.scoreList[this.scoreList.length - 2].x, this.scoreList[this.scoreList.length - 2].y, tile.x, tile.y);
          this.graphicsLine.strokeLineShape(line1);
          this.graphicsCircle.fillCircle(tile.x, tile.y, 20)
        }
      }

    }
  }
  upDot(pointer, tile) {
    if (this.selected == null) { return }
    //console.log(this.guess)
    this.selected = null
    this.graphicsLine.clear()
    this.graphicsCircle.clear()
    this.checkAnswer(this.guess)

    for (var i = 0; i < this.scoreList.length; i++) {
      this.scoreList[i].setAlpha(1)
    }
    //this.guess = '';
    //this.guessText.setText(this.guess);

    this.scoreList = []
  }
  checkAnswer(answer) {
    this.guessFakeText.setPosition(450, 990);
    this.guessFakeText.setAlpha(1);
    if (groups[onBook].allow3) {
      var min = 3
    } else {
      var min = 4
    }
    if (answer.length < min) {
      // not long enough
      this.cameras.main.shake(200, 0.02);
      this.guess = '';
      this.guessText.setText(this.guess);
    } else if (this.foundWords.indexOf(answer) > -1) {
      //all ready found
      //this.cameras.main.shake(200, 0.02);
      var tween = this.tweens.add({
        targets: this.star,
        scale: .5,
        yoyo: true,
        duration: 300
      })
      this.guess = '';
      this.guessText.setText(this.guess);
    } else if (this.words.indexOf(answer) > -1) {
      //found puzzle word
      // console.log('found it!')
      this.puzzleFound++;

      this.revealAnswer(answer)
      this.foundWords.push(answer)
      this.guessFakeText.setText(this.guess)
      this.guess = '';
      this.guessText.setText('');
      //animate guess word
      this.tweens.add({
        targets: this.guessFakeText,
        y: 0,
        x: game.config.width / 2,
        alpha: { from: 1, to: .1 },
        //scale: 1.3,
        ease: "Linear",
        duration: 1000,
        callbackScope: this,
        onComplete: function () {

          this.guessFakeText.setText('');
          /* if (this.puzzleFound == this.words.length) {
            alert('completed!')
          } */
          if (this.puzzleFound == this.words.length) {
            this.levelEnd()

          }
        }
      });


    } else if (ScrabbleWordList.indexOf(answer) > -1) {
      //found bonus
      this.foundWords.push(answer)
      this.bonusFound++;
      
      this.guessFakeText.setText(this.guess)
      this.guess = '';
      this.bonusText.setText(this.bonusFound)
      this.guessText.setText('');
      //animate guess word
      this.tweens.add({
        targets: this.guessFakeText,
        y: 1600,
        x: 25,
        alpha: { from: 1, to: .1 },
        //scale: 1.3,
        ease: "Linear",
        duration: 1000,
        callbackScope: this,
        onComplete: function () {

          this.guessFakeText.setText('');
        }
      });
    } else {
      //not a word
      this.cameras.main.shake(200, 0.02);
      this.guess = '';
      this.guessText.setText(this.guess);
    }
  }
  levelEnd() {
    var tween = this.tweens.add({
      targets: [this.shuffleButton, this.letterButton, this.wordButton],
      alpha: 0,
      duration: 200,
      delay: 200,
      callbackScope: this,
      onComplete: function () {
        this.graphics.clear()
        bonusEarned += this.bonusFound
        gameData.coins = bonusEarned
        onLevel++;
        var tempG = (onLevel + 1) % 12
        if (tempG == 1) {
          onBook++;
        }

        gameData.level = onLevel;
        gameData.book = onBook;
        localStorage.setItem('WSdata', JSON.stringify(gameData));
        this.scene.pause()
        this.scene.launch("endLevel");
      }
    })
    var tween = this.tweens.add({
      targets: this.keys,
      alpha: 0,
      duration: 200,
      delay: 200,
    });

  }
  revealAnswer(answer) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] != null) {
          if (board[i][j].tile.word == answer) {
            board[i][j].tile.setFrame(board[i][j].tile.index)
          }
        }
      }
    }
  }
  filterList(item) {
    if (groups[onBook].allow3) {
      return item.length > 2;
    } else {
      return item.length > 3;
    }

  }
  createKeys(totalPoints, base) {
    this.keyCoordinates = []
    this.keys = []
    var base1 = shuffle(base);
    for (var i = 1; i <= totalPoints; i++) {
      var p = this.drawPoint(200, i, totalPoints);
      this.keyCoordinates.push(p)
      var ind = this.tileLetters.indexOf(base1[i - 1])
      var tile = this.add.image(p.x, p.y, 'tiles', ind).setScale(1.5).setInteractive()
      tile.inedex = ind
      tile.letter = base1[i - 1]
      tile.type = 'key'
      this.keys.push(tile)
    }
    // console.log(this.keys)

  }
  shuffleKeys() {
    this.shuffle(this.keyCoordinates)
    // console.log('shuffle keys')
    for (var i = 0; i < this.keys.length; i++) {
      // this.keys[i].setPosition(this.keyCoordinates[i].x, this.keyCoordinates[i].y)
      var tween = this.tweens.add({
        targets: this.keys[i],
        x: this.keyCoordinates[i].x,
        y: this.keyCoordinates[i].y,
        duration: 300
      })
    }

  }
  createBoard(board) {
    // console.log(board)
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] != null) {
          var xpos = 25 + j * this.blockSize
          var ypos = 150 + i * this.blockSize
          var tileAnswer = this.answerTiles.get();
          tileAnswer.displayWidth = this.blockSize
          tileAnswer.displayHeight = this.blockSize
          tileAnswer.setPosition(xpos, ypos)
          tileAnswer.word = board[i][j].word
          var ind = this.tileLetters.indexOf(board[i][j].letter)
          tileAnswer.index = ind
          tileAnswer.setInteractive()
          tileAnswer.type = 'answer'
          board[i][j].tile = tileAnswer
          // tileAnswer.setFrame(ind)
          //console.log(tileAnswer.word)
        }


      }
    }
    //  console.log(board)
  }
  drawPoint(r, currentPoint, totalPoints) {
    var point = {}
    var theta = ((Math.PI * 2) / totalPoints);
    var angle = (theta * currentPoint);

    point.x = (r * Math.cos(angle - (90 * (Math.PI / 180))) + 450);
    point.y = (r * Math.sin(angle - (90 * (Math.PI / 180))) + 1350);

    return point
  }
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

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
