class Ranking extends Phaser.Scene {
    constructor() {
        super('ranking');
    }

    preload() {
        this.load.html('topList', 'assets/form/toplist.php');
        this.gameOver = sessionStorage.getItem('mvGame_gameOver');
    }

    create() {
        this.add.image(250 , 400, 'grass');
        this.add.image(250, 400, 'toplist_background');
        this.add.text(150  , 10, 'TOP LISTA', { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);

        this.add.sprite(480 , 40, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', () => {
                const sceneName = this.gameOver !== '{}' && this.gameOver !== null ? 'gameOver' : 'mainMenu';
                this.restartScene(sceneName)
            })
            .setScale(0.3)
        ;

        const element = this.add.dom(250, 300).createFromCache('topList');
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

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById('toplistContainer').innerHTML = this.responseText;
            }
        }
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }
}
