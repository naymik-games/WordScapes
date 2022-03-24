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
    this.solveIcon = this.add.image(game.config.width - 75, 660, 'tiles', 27).setOrigin(.5).setScale(1);
    this.solveIcon.setInteractive();
    this.solveIcon.solve = true;

    this.shuffleIcon = this.add.image(game.config.width - 75, game.config.height - 100, 'tiles', 27).setOrigin(.5).setScale(1);
    this.shuffleIcon.setInteractive();
    this.shuffleIcon.shuffle = true;

    this.add.image(75, 660, 'star').setOrigin(.5).setScale(.6);
    this.guess = this.add.text(game.config.width / 2, 660, '', { font: '88px Arial', fill: '#ffffff' }).setOrigin(.5);
    this.bonusLevelText = this.add.text(75, 660, '0', { font: '58px Arial', fill: '#000000' }).setOrigin(.5);

    this.bonusTotalText = this.add.text(game.config.width - 100, 20, bonusTotalCount, { font: '58px Arial', fill: '#A196BA' });
    var templevel = this.level + 1;
    this.levelText = this.add.text(game.config.width / 2, 30, templevel + '/' + gameLevels.length, { font: '48px Arial', fill: '#ffffff' }).setOrigin(.5);
    this.guessWord = '';
    this.bonusLevelCount = 0;
    this.board = [];
    this.answerCount = 0;
    this.correctCount = 0;
    this.solveWord = false;
    this.scoreList = [];
    this.guessed = [];
    this.wordList = [];
    this.tileLetters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'e', 'a', 'r', 's'
    ];
    this.tileLettersValues = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 1, 1, 1, 1];

    //this.words = this.cache.text.get('dictionary');
    //arrayWords = this.words.split(' ');

    this.wordCombosClean = [];
    //get the word for the level
    wordy = gameLevels[this.level].word;
    //get the word combinations for the the word
    this.wordCombos = findWords(wordy);
    //get the letters in the word 
    this.parts = wordy.split('');


    this.tiles = this.add.group({
      defaultKey: "tiles",
      // defaultFrame: 1,
      maxSize: 10,
      visible: false,
      active: false
    });

    this.answerTiles = this.add.group({
      defaultKey: "tiles",
      // defaultFrame: 1,
      maxSize: 150,
      visible: false,
      active: false
    });

    this.line = new Phaser.Geom.Line(game.config.width / 2 - 200, 720, game.config.width / 2 + 200, 720);

    var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

    graphics.strokeLineShape(this.line);
    //graphics.strokeLineShape(line); // line: {x1, y1, x2, y2}
    //graphics.lineBetween(x1, y1, x2, y2);
    //graphics.lineTo(x, y);
    //graphics.moveTo(x, y);
    //  this.cameras.main.startFollow(this.hero, true, 0, 0.5, 0, - (game.config.height / 2 - game.config.height * gameOptions.firstPlatformPosition));
    this.input.on("gameobjectdown", this.clickDot, this);
    this.input.on("gameobjectup", this.upDot, this);
    this.input.on("gameobjectover", this.overDot, this);


    this.createAnswers();
    this.initLetters();




  }

  update() {

  }
  createAnswers() {
    //exclude 2 letter words
    var wordCombosClean1 = this.wordCombos.filter(function (item) {
      return item.length > 2;
    });
    //shuffle the array for function
    // Phaser.Utils.Array.Shuffle(wordCombosClean1);
    //limit word combos based on level option
    this.wordCombosClean = wordCombosClean1.slice(0, gameLevels[this.level].answers);

    //print the words to the console to cheat/test
    console.log(this.wordCombosClean);

    this.wordCombosClean.forEach((word, index) => {

      for (var i = 0; i < word.length; i++) {
        var xpos = 60 * i + 100;
        var ypos = 60 * index + 125;
        //  this.add.image(40 * i +100,40*index + 50,'tiles', 27).setScale(.5);
        var tileAnswer = this.answerTiles.get();
        tileAnswer.setPosition(800, 0);
        tileAnswer.setActive(true);
        tileAnswer.setVisible(true);
        tileAnswer.setAlpha(.5);
        tileAnswer.setScale(.7);
        tileAnswer.setOrigin(0.5, 0.5);
        tileAnswer.setInteractive();
        tileAnswer.solved = false;
        var n = this.tileLetters.indexOf(word[i]);
        tileAnswer.letter = this.parts[i];
        tileAnswer.setFrame(27);
        tileAnswer.frameNum = n;
        tileAnswer.word = word;

        this.tweens.add({

          targets: tileAnswer,
          delay: 100 * i,
          x: xpos,
          y: ypos,
          //alpha: {from: 1, to:.5},
          //scale: 1.3,
          ease: "Linear",
          duration: 1000,
          callbackScope: this,
          onComplete: function () {

          }
        });

      }

      this.answerCount++;
    });


  }

  clickDot(ponter, dot) {
    // if word solve button is pressed, set to true so talking on word solves it
    if (dot.solve) {


      if (this.solveWord == false) {
        if (bonusTotalCount < 100) {
          return
        }
        console.log(this.solveWord);
        this.solveWord = true;
        this.cameras.main.setBackgroundColor('#0000cc');
        return
      } else {
        this.solveWord = false;
        this.cameras.main.setBackgroundColor('#05adb0');

        return
      }
    }
    if (dot.word) {

      if (bonusTotalCount >= 100) {
        dot.setAlpha(1);
        dot.setFrame(dot.frameNum);
        // reveal letter or solve word
        if (this.solveWord) {
          this.cameras.main.setBackgroundColor('#05adb0');

          this.checkAnswer(dot.word);
          this.solveWord = false;
        }
        bonusTotalCount -= 100;
        this.bonusTotalText.setText(bonusTotalCount);


      }

      return
    }

    if (dot.shuffle) {
      this.tiles.children.iterate(function (tile) {
        tile.setAlpha(.5);
        tile.setActive(false);
        tile.setVisible(false);
      });
      this.initLetters();
      return
    }
    this.selected = dot;
    dot.setAlpha(0.5);
    //reset guess text
    this.guess.setPosition(game.config.width / 2, 660);
    this.guess.setAlpha(1);

    this.guessWord += dot.letter;
    this.guess.setText(this.guessWord);

    this.scoreList.push(dot);

  }

  overDot(pointer, dot) {

    //if (this.selected === null || !this.isAdjacent(this.selected)) {return;} 
    if (this.selected === null || dot.word || dot.solve || dot.shuffle) { return; }

    if (this.scoreList[this.scoreList.length - 2] === dot) {
      // If you move your mouse back to you're previous match, deselect you're last match
      // This is so the player can choose a different path 
      this.scoreList.pop();
      this.selected.setAlpha(1);
      this.guessWord -= dot.letter;
      this.guessWord = this.guessWord.slice(0, -1);
      this.guess.setText(this.guessWord);

      dot.setAlpha(1);
      this.selected = dot;

    } else if (this.scoreList.indexOf(dot) > -1 && this.scoreList.length > 3) {
      // If the Item is in the list (but isn't the previous item) then you've made a loop
      //this.looped = true;
    } else {
      //console.log('sel ' + this.selected.frameNum);
      // console.log('dot ' + dot.frameNum);

      this.selected = dot;

      if (this.scoreList.indexOf(dot) === -1) {
        dot.setAlpha(0.5);
        this.guessWord += dot.letter;

        this.guess.setAlpha(1);
        this.guess.setText(this.guessWord);
        this.scoreList.push(dot);

      }
    }



  }
  upDot(pointer, dot) {
    if (dot.word || dot.solve || dot.shuffle) {

      return
    }
    //do nothing and reset if only one letter selected
    if (this.scoreList.length === 1) {
      this.selected.setAlpha(1);
      this.selected = null;
      this.guessWord = '';
      this.guess.setText(this.guessWord);
      this.scoreList = [];
      return
    }

    //reset selected tiles
    for (var i = 0; i < this.scoreList.length; i++) {

      this.scoreList[i].setAlpha(1);

    }
    //check the selected word
    this.checkAnswer(this.guessWord);
    this.scoreList = [];
    this.selected = null;
    // this.guess.setText('');
    // this.guessWord = '';
    //this.drawBoard();


  }

  checkAnswer(answer) {
    if (answer.length < 3) {
      // not long enough
      this.cameras.main.shake(200, 0.02);
      this.guess.setText('');
      this.guessWord = '';
    } else if (this.guessed.indexOf(answer) > -1) {
      //all ready found
      this.cameras.main.shake(200, 0.02);
      this.guess.setText('');
      this.guessWord = '';
    } else if (this.wordCombosClean.indexOf(answer) > -1) {
      //found it
      var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x00aaff } });

      graphics.strokeLineShape(this.line);

      this.answerTiles.children.iterate(function (tile) {
        //go through all the anser tiles, if it is part of a found word, reveal it
        if (tile.word == answer) {
          tile.setAlpha(1);
          tile.setFrame(tile.frameNum);
          tile.solved = true;
        }
      });
      //add word to found list
      this.guessed.push(answer);
      this.correctCount++
      //animate guess word
      this.tweens.add({
        targets: this.guess,
        y: 0,
        x: game.config.width / 2,
        alpha: { from: 1, to: .1 },
        //scale: 1.3,
        ease: "Linear",
        duration: 1000,
        callbackScope: this,
        onComplete: function () {
          this.guess.setText('');
          this.guessWord = '';
          var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

          graphics.strokeLineShape(this.line);

          //  console.log('guess l' + this.guessed.length);
          //  console.log('answers l' + gameLevels[this.level].answers);
          //advance to next level if all words found
          if (this.correctCount === this.answerCount) {
            this.bonusLevelCount = 0;
            this.level++;
            this.scene.start("PlayGame", { level: this.level });

          }
        }
      });


    } else if (this.wordCombos.indexOf(answer) > -1) {
      //bonus word
      var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x00aaff } });

      graphics.strokeLineShape(this.line);

      this.guessed.push(answer);
      this.bonusLevelCount++;
      bonusTotalCount += 100;
      this.bonusLevelText.setText(this.bonusLevelCount);
      this.bonusTotalText.setText(bonusTotalCount);


      var particles = this.add.particles("pixel")
      //.setTint(0x7d1414);
      var emitter = particles.createEmitter({
        // particle speed - particles do not move
        // speed: 1000,
        speed: {
          min: -1000,
          max: 1000
        },
        // particle scale: from 1 to zero
        scale: {
          start: 2,
          end: 0
        },
        // particle alpha: from opaque to transparent
        alpha: {
          start: 1,
          end: 0
        },
        // particle frequency: one particle every 100 milliseconds
        frequency: 25,
        // particle lifespan: 1 second
        lifespan: 500
      });
      emitter.tint.onChange(0xcccccc);
      emitter.explode(20, this.bonusLevelText.x, this.bonusLevelText.y);





      this.tweens.add({
        targets: this.guess,
        y: game.config.height,
        x: game.config.width / 2,
        alpha: { from: 1, to: .5 },
        //scale: 1.3,
        ease: "Linear",
        duration: 1000,
        callbackScope: this,
        onComplete: function () {
          var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

          graphics.strokeLineShape(this.line);

          this.guess.setText('');
          this.guessWord = '';
        }
      });

    } else {
      //not a word
      var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xf54242 } });

      graphics.strokeLineShape(this.line);


      //this.cameras.main.shake(200, 0.02);
      this.tweens.add({
        targets: this.guess,
        //y: game.config.height,
        x: { from: this.guess.x - 10, to: this.guess.x + 10 },
        //alpha: { from: 1, to: .5 },
        //scale: 1.3,
        ease: "Linear",
        yoyo: true,
        repeat: 3,
        duration: 60,
        callbackScope: this,
        onComplete: function () {
          var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

          graphics.strokeLineShape(this.line);

          this.guess.setText('');
          this.guessWord = '';
        }
      });
    }

  }
  initLetters() {
    //create a circle and find evenly spaced points based on number of letters
    if (this.parts.length > 6) {
      var rad = 200;
    } else {
      var rad = 170;
    }
    var partstemp = Phaser.Utils.Array.Shuffle(this.parts);
    var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 } });
    var circle = new Phaser.Geom.Circle(game.config.width / 2, 1000, rad);

    var points = circle.getPoints(this.parts.length);
    //place letters
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      graphics.fillRect(p.x - 25, p.y - 25, 50, 50);
      // this.add.image(p.x,p.y,'tiles', i).setOrigin(.5).setInteractive();
      var tile = this.tiles.get();
      tile.setActive(true);
      tile.setVisible(true);
      tile.setScale(1.5);
      tile.setOrigin(0.5, 0.5);
      tile.setInteractive();
      tile.setPosition(p.x, p.y);
      var n = this.tileLetters.indexOf(partstemp[i]);
      tile.letter = this.parts[i];
      tile.setFrame(n);
      tile.frameNum = n;
    }

  }


  checkWord(word) {
    if (this.arrayWords.indexOf(word) > -1) {
      return true
    }


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
