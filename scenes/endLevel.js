class endLevel extends Phaser.Scene {
  constructor() {
    super("endLevel");
  }
  preload() {

  }
  create() {
    var graphics = this.add.graphics();
    graphics.fillStyle(0x474747, 1);
    //  32px radius on the corners
    graphics.fillRoundedRect(200, 1140, 500, 120, 64);

    var tempL = onLevel - 1;
    this.levelDoneText = this.add.bitmapText(450, 1000, 'clarendon', 'Completed!', 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700);
    this.nextLevelText = this.add.bitmapText(450, 1200, 'clarendon', 'Level ' + onLevel, 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive();
    this.nextLevelText.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('PlayGame')
    }, this)
    this.selectLevelText = this.add.bitmapText(450, 1400, 'clarendon', 'Select Level', 80).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive();
    this.selectLevelText.on('pointerup', function () {
      this.scene.stop()
      this.scene.stop('PlayGame')
      this.scene.start('selectLevel')
    }, this)
  }
}
