class ModeSelector extends Phaser.Scene {
    constructor() {
        super('modeSelector');
        if (sessionStorage.getItem('mvGame_firsTimePlayer') === null) {
            sessionStorage.setItem('mvGame_firsTimePlayer', '1');
        }
    }

    create() {
        const self = this;
        self.isFirstTimePlayer = Number(sessionStorage.getItem('mvGame_firsTimePlayer'));
        this.game.sound.stopAll();

        this.add.image(250, 400, 'grass');
        this.add.image(250, 400, 'mainMenuBg');

        this.add.image(250, 150, 'tram').setScale(0.5);

        this.add.text(25, 200, 'Védd meg a miskolci \n villamost az autósoktól!',
            {fontFamily: 'CustomFont', fontSize: '45px', align: 'center'})
            .setShadow(1, 1, '#000000', 2);

        const easyModeButton =  this.add.sprite(250  , 350, 'mode_easy')
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function() {
                self.startGame('easy')
            },this);
        easyModeButton.displayWidth = 200;
        easyModeButton.displayHeight = 55;

        const normalModeButton =  this.add.sprite(250  , 420, 'mode_normal')
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function() {
                self.startGame('normal')
            },this);
        normalModeButton.displayWidth = 200;
        normalModeButton.displayHeight = 55;

        const hardModeButton =  this.add.sprite(250  , 490, 'mode_hard')
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function() {
                self.startGame('hard')
            },this);
        hardModeButton.displayWidth = 200;
        hardModeButton.displayHeight = 55;

        this.add.sprite(480 , 40, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', () => {
                this.restartScene('mainMenu');
            })
            .setScale(0.3)
        ;
    }

    startGame(mode) {
        this.playSfx('click_sfx');
        const sceneName = this.isFirstTimePlayer ? 'aboutGame' : 'playGame';
        sessionStorage.setItem('mvGame_gameMode', mode);
        this.scene.start(sceneName);
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }

    restartScene(sceneName) {
        this.playSfx('click_sfx');
        setTimeout(() => {
            const theOtherScene = this.scene.get(sceneName);
            theOtherScene.scene.restart();
            this.scene.start(sceneName);
        }, 100);

    }
}
