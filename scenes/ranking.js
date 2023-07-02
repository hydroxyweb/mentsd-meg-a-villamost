class Ranking extends Phaser.Scene {
    constructor() {
        super('ranking');
        this.container = '';
        this.gameOver = localStorage.getItem('gameOver');
    }

    preload() {
        this.load.html('topList', 'assets/form/toplist.php');
    }

    create() {
        this.add.image(250 , 400, 'grass');
        this.add.image(250, 400, 'toplist_background');
        this.add.text(150  , 10, 'TOP LISTA', { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);

        this.add.sprite(480 , 40, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', () => {
                const sceneName = this.gameOver !== '{}' ? 'gameOver' : 'mainMenu'
                this.restartScene(sceneName, this.gameOver)
            })
            .setScale(0.3)
        ;

        const element = this.add.dom(250, 300).createFromCache('topList');
        this.container = element.getChildByID('toplistContainer');
        this.refreshTopList();
    }

    restartScene(sceneName) {
        this.playSfx('click_sfx');
        setTimeout(() => {
            const theOtherScene = this.scene.get(sceneName);
            theOtherScene.scene.restart();
            this.scene.start(sceneName);
        }, 100);

    }

    refreshTopList() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "save_score.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("get=true");

        const self = this;
        xhttp.onreadystatechange = function() {//Call a function when the state changes.
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                self.container.innerHTML = this.responseText;
            }
        }
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
