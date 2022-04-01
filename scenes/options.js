class options extends Phaser.Scene {
  constructor() {
    super("options");
  }
  preload() {

  }

  create() {
    this.tileYOffset = 1100
    var back = this.add.image(0, 0, 'home').setOrigin(0)
    this.return = this.add.image(75, 75, 'home_icon').setScale(2).setInteractive();
    this.return.on('pointerdown', function () {
      this.scene.stop();
      this.scene.resume('home')
    }, this);

    this.title = this.add.bitmapText(game.config.width / 2, 75, 'clarendon', 'Options', 120).setTint(0xffffff).setOrigin(.5).setMaxWidth(500);



    if (gameData.music) {
      var tframe = 0
    } else {
      var tframe = 1
    }
    var music = this.add.bitmapText(100, 300, 'clarendon', 'Music', 80).setOrigin(0, .5).setTint(0xffffff);
    var toggle = this.add.image(400, 300, 'toggle', tframe).setInteractive();
    toggle.on('pointerdown', function () {
      if (gameData.music) {
        gameData.music = false;
        toggle.setFrame(1)
      } else {
        gameData.music = true;
        toggle.setFrame(0)
      }
      this.saveData()
    }, this)

    this.check = this.add.image(0, 0, 'check').setScale(1.75)
    for (var i = 0; i < tileImages.length; i++) {
      var tile1 = this.add.image(200, this.tileYOffset + i * 150, tileImages[i], 3).setScale(1)
      var tile2 = this.add.image(325, this.tileYOffset + i * 150, tileImages[i], 0).setScale(1)
      var tile3 = this.add.image(450, this.tileYOffset + i * 150, tileImages[i], 13).setScale(1)
      var temp = i + 1
      var label = this.add.bitmapText(550, this.tileYOffset + i * 150, 'clarendon', 'Tile ' + temp, 80).setOrigin(0, .5).setTint(0xffffff).setInteractive();
      label.button = i
      label.on('pointerdown', this.changeTile.bind(this, label));
      if (gameData.tileOption == i) {
        this.check.setPosition(775, this.tileYOffset + i * 150)
      }
    }
  }
  changeTile(t) {
    console.log(t.button)
    this.check.setPosition(775, this.tileYOffset + t.button * 150);
    gameData.tileOption = t.button
    this.saveData();
  }
  saveData() {
    localStorage.setItem('WSdata', JSON.stringify(gameData));
  }
}