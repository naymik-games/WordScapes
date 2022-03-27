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
    onLevel = gameData.level;
    var tempL = onLevel + 1;

    var back = this.add.image(0, 0, 'home').setOrigin(0)

    this.starBack = this.add.image(640, 75, 'platform').setOrigin(0, .5).setTint(0x000000).setAlpha(.7);
    this.starBack.displayWidth = 250
    this.starBack.displayHeight = 75

    this.bonusEarnedText = this.add.bitmapText(715, 75, 'clarendon', gameData.coins, 80).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);
    this.starIcon = this.add.image(640, 75, 'star').setScale(.25)

    this.title = this.add.bitmapText(game.config.width / 2, 300, 'clarendon', 'WordScapes', 140).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);


    var graphics = this.add.graphics();
    graphics.fillStyle(0x474747, 1);
    //  32px radius on the corners
    graphics.fillRoundedRect(200, 1130, 500, 120, 64);

    ///this.levelText = this.add.bitmapText(200, 75, 'clarendon', 'Level ' + tempL, 120).setOrigin(0, .5).setTint(0xffffff).setMaxWidth(700);

    this.start = this.add.bitmapText(game.config.width / 2, 1190, 'clarendon', 'Level ' + tempL, 100).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);


    this.start.setInteractive();
    this.start.on('pointerup', function () {
      this.scene.start("PlayGame");
    }, this);
    this.select = this.add.bitmapText(game.config.width / 2, 1390, 'clarendon', 'Select Level', 80).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);
    this.select.setInteractive();
    this.select.on('pointerup', function () {
      this.scene.start("selectLevel");
    }, this);

  }
}
