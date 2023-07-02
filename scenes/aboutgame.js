class AboutGame extends Phaser.Scene {
    constructor() {
        super('aboutGame');
    }

    create() {
        const self = this;
        self.isFirstTimePlayer = Number(sessionStorage.getItem('firsTimePlayer'));

        this.add.image(250 , 400, 'grass');
        const background = this.add.image(250 , 400, 'about_background');
        background.displayWidth = 500;
        background.displayHeight = 800;

        const spriteName = this.isFirstTimePlayer ? 'start' : 'back';

        this.add.sprite(250 , 730, spriteName)
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                if (self.isFirstTimePlayer) {
                    self.playGame();
                    sessionStorage.setItem('firsTimePlayer', '0');
                } else {
                    self.goToMainMenu()
                }

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

    playGame() {
        const self = this;
        this.playSfx('click_sfx');
        setTimeout(function() {
            self.scene.start('playGame')
        }, 100);
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
