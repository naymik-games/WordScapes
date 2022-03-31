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


    if (gameMode == 'book') {
      var tempL = onLevel + 1;
      var text = 'Level ' + tempL
    } else {
      var tempL = onPuzzle + 1;
      var text = themes[onTheme].title
    }

    this.nextLevelText = this.add.bitmapText(450, 1200, 'clarendon', text, 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive().setAlpha(0);
    this.nextLevelText.on('pointerdown', function () {
      var tween = this.tweens.add({
        targets: this.levelDoneText,
        x: 1450,
        duration: 500,
        ease: 'Back',
        callbackScope: this,
        onComplete: function () {
          graphics.clear();
          var tween2 = this.tweens.add({
            targets: [this.nextLevelText, this.selectLevelText],
            alpha: 0,
            duration: 300,
            callbackScope: this,
            onComplete: function () {
              this.scene.stop()
              if (gameMode == 'book') {
                this.scene.start('PlayGame')
              } else {
                this.scene.stop('PlayGame')
                this.scene.start('selectTheme')
              }

            }
          })
        }
      })


    }, this)


    if (gameMode == 'book') {
      this.selectLevelText = this.add.bitmapText(450, 1400, 'clarendon', 'Select Level', 80).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive().setAlpha(0);
      this.selectLevelText.on('pointerup', function () {
        this.scene.stop()
        this.scene.stop('PlayGame')
        this.scene.start('selectLevel')
      }, this)
    } else {
      /*  this.selectLevelText = this.add.bitmapText(450, 1400, 'clarendon', 'Select Puzzle', 80).setOrigin(.5).setTint(0xffffff).setMaxWidth(700).setInteractive().setAlpha(0);
       this.selectLevelText.on('pointerup', function () {
         this.scene.stop()
         this.scene.stop('PlayGame')
         this.scene.start('selectTheme')
       }, this) */
    }





    this.levelDoneText = this.add.bitmapText(1450, 1000, 'clarendon', 'Completed!', 100).setOrigin(.5).setTint(0xffffff).setMaxWidth(700);
    var tween = this.tweens.add({
      targets: this.levelDoneText,
      x: 450,
      duration: 500,
      ease: 'Back',
      callbackScope: this,
      onComplete: function () {
        graphics.fillRoundedRect(200, 1140, 500, 120, 64);
        var tween2 = this.tweens.add({
          targets: [this.nextLevelText, this.selectLevelText],
          alpha: 1,
          duration: 300
        })
      }
    })

  }
}
