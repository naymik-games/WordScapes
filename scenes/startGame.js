class home extends Phaser.Scene {
  constructor() {
    super("home");
  }
  create() {
    gameData = JSON.parse(localStorage.getItem('WSdata'));

    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('WSdata',
        JSON.stringify(defaultData));
      gameData = defaultData;
    }
    if (gameData.progress.length < themes.length) {
      var i = themes.length - gameData.progress.length
      var temp = [-1, -1, -1, -1, -1, -1]
      for (var j = 0; j < i; j++) {
        gameData.progress.push(temp)
      }
      this.saveData()
    }
    onLevel = gameData.level;
    onBook = gameData.book;
    onTheme = gameData.theme;
    onPuzzle = gameData.puzzle;
    bonusEarned = gameData.coins
    var tempL = onLevel + 1;

    var back = this.add.image(0, 0, 'home').setOrigin(0)

    this.starBack = this.add.image(640, 75, 'platform').setOrigin(0, .5).setTint(0x000000).setAlpha(.7);
    this.starBack.displayWidth = 250
    this.starBack.displayHeight = 75

    this.bonusEarnedText = this.add.bitmapText(715, 75, 'clarendon', bonusEarned, 80).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);
    this.starIcon = this.add.image(640, 75, 'star').setScale(3)
    this.settingsIcon = this.add.image(75, 75, 'settings_icon').setScale(2).setInteractive();
    this.settingsIcon.on('pointerdown', function () {
      this.scene.pause();
      this.scene.launch('options')
    }, this);

    if (localStorage.getItem('WSsave') !== null) {
      this.openIcon = this.add.image(825, 1105, 'open_icon').setScale(2).setInteractive();
      this.openIcon.on('pointerdown', function () {
        load = true;
        gameMode = 'book'
        this.scene.start("PlayGame");
      }, this);
    }
    if (localStorage.getItem('WSsaveT') !== null) {
      this.openIconT = this.add.image(825, 1405, 'open_icon').setScale(2).setInteractive();
      this.openIconT.on('pointerdown', function () {
        load = true;
        gameMode = 'theme'
        this.scene.start("PlayGame");
      }, this);
    }
    this.title = this.add.bitmapText(game.config.width / 2, 300, 'clarendon', 'WordScapes', 140).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);


    var graphics = this.add.graphics();
    graphics.fillStyle(0x474747, 1);
    //  32px radius on the corners
    graphics.fillRoundedRect(200, 1050, 500, 120, 64);
    graphics.fillRoundedRect(200, 1350, 500, 120, 64);
    ///this.levelText = this.add.bitmapText(200, 75, 'clarendon', 'Level ' + tempL, 120).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);

    this.start = this.add.bitmapText(game.config.width / 2, 1105, 'clarendon', 'Level ' + tempL, 100).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);


    this.start.setInteractive();
    this.start.on('pointerup', function () {
      gameMode = 'book'
      this.scene.start("PlayGame");
    }, this);
    this.select = this.add.bitmapText(game.config.width / 2, 1215, 'clarendon', 'Select Level', 70).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);
    this.select.setInteractive();
    this.select.on('pointerup', function () {
      this.scene.start("selectLevel");
    }, this);
    this.selectTheme = this.add.bitmapText(game.config.width / 2, 1405, 'clarendon', themes[onTheme].title, 70).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);
    this.selectTheme.setInteractive();
    this.selectTheme.on('pointerup', function () {
      this.scene.start("selectTheme");
    }, this);

  }
  saveData() {
    localStorage.setItem('WSdata', JSON.stringify(gameData));
  }
}
