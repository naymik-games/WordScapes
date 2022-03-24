class home extends Phaser.Scene {
  constructor() {
    super("home");
  }
  create() {
    this.start = this.add.text(game.config.width / 2, 660, 'play', { font: '88px Arial', fill: '#ffffff' }).setOrigin(.5);
    this.start.setInteractive();
    this.start.on('pointerdown', function () {
      this.scene.start("PlayGame", { level: 0 });
    }, this);

  }
}