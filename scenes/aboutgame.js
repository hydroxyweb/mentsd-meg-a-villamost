class AboutGame extends Phaser.Scene {
    constructor() {
        super('aboutGame');
    }

    create() {
        const self = this;
        this.add.image(250 , 400, 'grass');
        const background = this.add.image(250 , 400, 'about_background');
        background.displayWidth = 500;
        background.displayHeight = 800;

        this.add.sprite(250 , 730, 'back')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                self.goToMainMenu()
            }, this)
            .setScale(0.3)
        ;
    }

    goToMainMenu() {
        const self = this;
        this.playSfx('click_sfx');
        setTimeout(function() {
            self.scene.start('mainMenu')
        }, 100);
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
