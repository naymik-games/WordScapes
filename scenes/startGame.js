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

    this.start = this.add.text(game.config.width / 2, 660, 'play', { font: '88px Arial', fill: '#ffffff' }).setOrigin(.5);
    this.start.setInteractive();
    this.start.on('pointerdown', function () {
      this.scene.start("PlayGame", { level: 0 });
    }, this);

  }
}