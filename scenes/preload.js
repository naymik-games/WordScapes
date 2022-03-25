class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("pixel", "assets/sprites/particle.png");

    this.load.bitmapFont("clarendon", "assets/fonts/lato.png", "assets/fonts/lato.xml");
    this.load.image("star", "assets/sprites/star.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("particle", "assets/sprites/particle.png");
    this.load.text('dictionary', 'assets/dictionary-plural1.txt');
    this.load.spritesheet("tile-icons", "assets/sprites/tile_icons.png", {

      frameWidth: 80,

      frameHeight: 80
    });
    this.load.spritesheet("tiles", "assets/letter-alt.png", {

      frameWidth: 80,

      frameHeight: 80
    });
  }
  create() {
    this.scene.start("home");
  }
}
