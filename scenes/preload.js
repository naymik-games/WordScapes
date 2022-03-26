class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("pixel", "assets/sprites/particle.png");

    this.load.bitmapFont("clarendon", "assets/fonts/lato.png", "assets/fonts/lato.xml");
    this.load.image("star", "assets/sprites/star.png");
    this.load.image("back_01", "assets/sprites/backs/back_01.png");
    this.load.image("back_02", "assets/sprites/backs/back_02.png");
    this.load.image("back_03", "assets/sprites/backs/back_03.png");
    this.load.image("back_04", "assets/sprites/backs/back_04.png");
    this.load.image("back_05", "assets/sprites/backs/back_05.png");
    this.load.image("back_06", "assets/sprites/backs/back_06.png");
    this.load.image("back_07", "assets/sprites/backs/back_07.png");
    this.load.image("back_08", "assets/sprites/backs/back_08.png");
    this.load.image("back_09", "assets/sprites/backs/back_09.png");
    this.load.image("back_10", "assets/sprites/backs/back_10.png");
    this.load.image("back_12", "assets/sprites/backs/back_11.png");
    this.load.image("back_12", "assets/sprites/backs/back_12.png");
    this.load.spritesheet("select_icons", "assets/sprites/select_icons.png", {
      frameWidth: 300,
      frameHeight: 300
    });

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
