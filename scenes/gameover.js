class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    init(data)
    {
        this.remainingHP = Number(data.remainingHP * 10);
        this.finalScore = Number(data.score) + this.remainingHP;
        this.score = data.score;
        this.status = data.status;
        this.playerName = localStorage.getItem('mvGame_PlayerName') ?? 'Anonym';
        this.isSaveInProgress = false;
        this.playerNameInput = null;
        sessionStorage.setItem('mvGame_gameOver', JSON.stringify(data));
        this.gameMode = sessionStorage.getItem('mvGame_gameMode');
    }

    create() {
        const self = this;

        this.game.sound.stopAll();

        const backgroundImage = this.status === 'success' ? 'success_background' : 'failed_background';
        this.add.image(250 , 400, 'grass');
        this.add.image(250 , 400, backgroundImage);

        const windowHorizontalCenter =  window.gameConfig.maxWidth / 2;
        if (this.status === 'success') {
            this.add.text(155, 10, 'GYŐZTÉL!', { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);
            this.add.text(100, 90, 'Gratulálok! Sikeresen megvédted a villamost!',  { fontFamily: 'CustomFont', fontSize: '18px', align: 'center' }).setShadow(1,1,'#000000',2);
            this.playSfx('win_sfx');
        } else {
            this.add.text(120  , 10, 'VESZTETTÉL', { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);
            this.add.text(90, 90, 'Sajnos nem sikerült megvédened a villamost! :(',  { fontFamily: 'CustomFont', fontSize: '18px', align: 'center' }).setShadow(1,1,'#000000',2);
            this.playSfx('defeated_sfx');
        }

        const totalScoreText = this.add.text(110, 130, 'Összes elért pont', { fontFamily: 'CustomFont', fontSize: '40px', align: 'center' });
        totalScoreText.setShadow(1,1,'#000000',2);

        const totalScoreDisplay = this.add.text(225 ,180, this.finalScore, { fontFamily: 'CustomFont', fontSize: '30px', align: 'center' });
        totalScoreDisplay.setShadow(1,1,'#000000',2);

        const totalScoreDetailText = this.add.text(170 ,240, 'Gyűjtött pont: +' + this.score, { fontFamily: 'CustomFont', fontSize: '20px', align: 'center' }).setShadow(1,1,'#000000',2);
        const bonusPointText = this.add.text(170 ,270, 'Bónusz pont: +' + this.remainingHP, { fontFamily: 'CustomFont', fontSize: '20px', align: 'center' }).setShadow(1,1,'#000000',2);

        const div = this.add.dom(0,0).createElement('div');
        div.node.style = 'width:500px;height:800px;z-index:0;';
        div.removeListener('click').addListener('click');

        this.add.text(190 ,340, 'Játékos neve:', { fontFamily: 'CustomFont', fontSize: '20px', align: 'center' }).setShadow(1,1,'#000000',2);

        const element = this.add.dom(250, -410).createFromCache('playerForm');
        this.playerNameInput = element.getChildByID('playerName');
        this.playerNameInput.value = this.playerName;
        element.addListener('change');
        element.setDepth(5);

        element.off('change').on('change', function(event) {
            let value = event.target.value.replace(/[^A-Za-z0-9ÁÉŐÚŰÓÜÖÍűáéúőóüöí]/g,'');
            self.playerName = value.substring(0, 10);
            localStorage.setItem('mvGame_PlayerName', self.playerName);
        });

        this.add.sprite(250 , 480, 'restart')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                self.restartScene('playGame')
            }, this)
            .setScale(0.8)
            .setDepth(1)
        ;

        this.add.sprite(390 , 390, 'save')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                self.saveHighScore();
            }, this)
            .setScale(0.3)
            .setDepth(1)
        ;

        this.add.sprite(340 , 480, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                self.restartScene('mainMenu');
            }, this)
            .setScale(0.5)
            .setDepth(1)
        ;

        this.add.sprite(160 , 480, 'toplist_short')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', function() {
                self.restartScene('ranking')
            }, this)
            .setScale(0.5)
        ;
    }

    restartScene(sceneName) {
        const self = this;
        this.playSfx('click_sfx');
        setTimeout(function() {
            const theOtherScene = self.scene.get(sceneName);
            theOtherScene.scene.restart();
            self.scene.start(sceneName);
        }, 100);
    }

    saveHighScore() {
        this.playSfx('click_sfx');
        if (this.isSaveInProgress) {
            return;
        }

        this.isSaveInProgress = true;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "save_score.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name="+ this.playerNameInput.value +"&score=" + this.finalScore+"&save=true&mode="+ this.gameMode);

        const self = this;
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                self.isSaveInProgress = false;
                self.scene.start('ranking');
                sessionStorage.setItem('mvGame_gameOver', '{}');
            }
        }
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
