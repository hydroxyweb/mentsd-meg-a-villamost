class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenu');
    }

    create() {
        const self = this;

        this.game.sound.stopAll();

        this.add.image(250 , 400, 'grass');
        this.add.image(250 , 400, 'mainMenuBg');

        this.add.image(250  , 150, 'tram').setScale(0.5);

        this.add.text(25, 200, 'Védd meg a miskolci \n villamost az autósoktól!',
            { fontFamily: 'CustomFont', fontSize: '45px', align:'center'})
            .setShadow(1,1,'#000000',2);

        const startButton = this.add.sprite(250  , 400, 'start')
        .setInteractive( { useHandCursor: true  })
        .on('pointerdown', function() {
            self.startGame()
        },this);
        startButton.displayWidth = 200;
        startButton.displayHeight = 55;

        this.add.sprite(480  , 40, 'about').setScale(0.3)
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function() {
                self.aboutGame()
            }, this);

        this.add.sprite(250, 470, 'toplist').setScale(0.3)
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function(event) {
                self.showRanking()
            }, this);
    }

    startGame() {
        this.playSfx('click_sfx');
        this.scene.start('playGame');
    }

    aboutGame() {
        this.playSfx('click_sfx');
        this.scene.start('aboutGame');
    }

    testFailedGame() {
        this.scene.start('gameOver', { score: 100, status: 'failed', remainingHP: 0 });
    }

    testSuccessGame() {
        this.scene.start('gameOver', { score: Math.floor(Math.random() * (5000 - 2000) + 2000), status: 'success', remainingHP: 100 });
    }

    showRanking() {
        this.playSfx('click_sfx');
        this.scene.start('ranking');
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
