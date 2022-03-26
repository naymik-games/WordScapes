class endLevel extends Phaser.Scene {
  constructor() {
    super("endLevel");
  }
  preload() {

  }
  create() {
    var tempL = onLevel - 1;
    this.levelDoneText = this.add.bitmapText(450, 800, 'clarendon', 'Level ' + tempL + 'Completed', 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700);
    this.nextLevelText = this.add.bitmapText(450, 900, 'clarendon', 'Play Level ' + onLevel, 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive();
    this.nextLevelText.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('PlayGame')
    }, this)
  }
}
