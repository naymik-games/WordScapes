class selectTheme extends Phaser.Scene {
  constructor() {
    super("selectTheme");
  }
  preload() {

  }
  create() {
    this.cameras.main.setBackgroundColor(0xf7eac6);
    //var rand = Phaser.Math.Between(0, 11)
    //var back = this.add.image(0, 0, backs[rand]).setOrigin(0)
    var back = this.add.image(0, 0, 'home').setOrigin(0)
    back.displayWidth = game.config.width;
    back.displayHeight = game.config.height;
    this.startGroup = onTheme;
    var pageTitle = this.add.bitmapText(game.config.width / 2, 100, 'clarendon', 'WorkScapes', 120).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);


    this.showGroup(this.startGroup);
    // this.return = this.add.image(game.config.width / 2, 1550, 'pixel').setScale(1.5).setInteractive().setTint(0xc76210);
    //this.return = this.add.bitmapText(game.config.width / 2, 1550, 'clarendon', '[<]', 100).setTint(0xffffff).setOrigin(.5).setMaxWidth(500).setInteractive();
    this.return = this.add.image(game.config.width / 2, 1550, 'home_icon').setScale(2).setInteractive();
    //this.backText = this.add.bitmapText(game.config.width / 2, 1500, 'clarendon', '< back', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.return.level = -2;
    this.input.topOnly = true;
    this.input.on('gameobjectup', this.clickHandler, this);

    this.input.on('pointerup', this.endSwipe, this);

  }

  endSwipe(e, obj) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {

      if (swipeNormal.x > 0.8) {

        //this.handleMove(0, 1, );
        this.nextGroup(obj[0], 'left')
      }
      if (swipeNormal.x < -0.8) {


        this.preGroup(obj[0], 'right')
      }
      if (swipeNormal.y > 0.8) {

        //this.handleMove(1, 0);
      }
      if (swipeNormal.y < -0.8) {

        //this.handleMove(-1, 0);
      }
    } else {


      if (obj[0].level > -1) {
        onPuzzle = obj[0].level + (this.startGroup * 6);

        onTheme = this.startGroup;
        gameMode = 'theme'
        this.scene.stop()
        this.scene.start('PlayGame');
      }

    }
  }

  showGroup(groupNum, dir) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempGroup = groupNum + 1;
    var groupTitle = this.add.bitmapText(game.config.width / 2, 200, 'clarendon', themes[groupNum].title, 80).setTint(0xfafafa).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1400, 'clarendon', tempGroup + '/' + themes.length, 60).setTint(0xfafafa).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);
    //	var levelNum = groupNum + (groups[groupNum].puzzleCount -1);
    var completeText = this.add.bitmapText(game.config.width / 2, 1000, 'clarendon', '', 90).setOrigin(.5).setTint(0xffffff);
    groupBox.add(completeText);
    var levelNum = themes[groupNum].startNum;
    var count = 0;
    for (var j = 0; j < 6; j++) {
      if (gameData.progress[groupNum][j] == 1) {
        count++
      }
    }
    if (count == 6) {
      completeText.setText('Complete!')
    } else {
      completeText.setText(count + ' finished')
    }
    for (var i = 0; i < 6; i++) {
      if (i < 3) {
        var xpos = 50 + i * 275;
        var ypos = 400;
      } else if (i < 6) {
        var xpos = 50 + (i - 3) * 275;
        var ypos = 400 + 275;
      }

      var tempLevel = i + 1;
      var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'clarendon', tempLevel, 90).setOrigin(.5).setTint(0x000000);
      var levelTitle = this.add.image(xpos, ypos, 'select_icons', 1).setOrigin(0, .5).setScale(.75);
      levelTitle.level = i;



      if (gameData.progress[groupNum][i] == 1) {
        //levelTitle.setAlpha(.5)
        var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'clarendon', tempLevel, 90).setOrigin(.5).setTint(0x000000);
        var wordText = this.add.bitmapText(xpos + 112.5, ypos + 20, 'clarendon', sourceWordsTheme[levelNum], 50).setOrigin(.5).setTint(0x000000);
        //wordText.setTint(0x228f3f)
        levelTitle.setFrame(2);
        levelTitle.setInteractive();

      } else if (gameData.progress[groupNum][i] == 0) {
        var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'clarendon', tempLevel, 90).setOrigin(.5).setTint(0x000000);
        var wordText = this.add.bitmapText(xpos + 112.5, ypos + 20, 'clarendon', shuffle(sourceWordsTheme[levelNum]), 50).setOrigin(.5).setTint(0x000000);

        levelTitle.setFrame(0);
        levelTitle.setInteractive();
      } else if (gameData.progress[groupNum][i] == -1) {
        var wordText = this.add.bitmapText(xpos + 112.5, ypos + 20, 'clarendon', '', 50).setOrigin(.5).setTint(0x000000);
        levelTitle.level = -1;
      }
      levelNum++;
      groupBox.add(levelTitle);
      groupBox.add(statusText);
      groupBox.add(wordText);
    }




    groupBox.add(groupText);
    if (dir == 'left') {
      var xDir = -850
    } else if (dir == 'right') {
      var xDir = +850
    }
    groupBox.setPosition(xDir, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {

      }
    });
  }

  hideGroup(num, dir) {
    if (dir == 'left') {
      var xDir = +850
    } else if (dir == 'right') {
      var xDir = -850
    }
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: xDir,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.groupBox.destroy(true);
        this.showGroup(num, dir);
      }
    });

  }
  preGroup(block, dir) {
    if (this.startGroup < themes.length - 1) {
      this.startGroup++;
    } else {
      this.startGroup = 0
    }
    this.hideGroup(this.startGroup, dir);
  }
  nextGroup(block, dir) {
    if (this.startGroup > 0) {
      this.startGroup--;
    } else {
      this.startGroup = themes.length - 1
    }
    this.hideGroup(this.startGroup, dir);
  }
  clickHandler(e, block) {

    if (block.level == -2) {
      gameMode = 'theme'
      this.scene.start('home');
    }

  }




}
