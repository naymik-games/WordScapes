class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("pixel", "assets/sprites/particle.png");
    this.load.image("star", "assets/yellow-star.png");

    this.load.image("hero", "assets/hero.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("particle", "assets/sprites/particle.png");
    this.load.text('dictionary', 'assets/dictionary-plural1.txt');
    this.load.spritesheet("tiles", "assets/letter-1.png", {

      frameWidth: 80,

      frameHeight: 80
    });
  }
  create() {
    this.scene.start("home");
  }
}