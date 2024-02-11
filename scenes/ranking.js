/**
 * Top lista scene
 */
class Ranking extends Phaser.Scene {
    constructor() {
        super('ranking');
    }

    preload() {
        this.load.html('topList', 'assets/form/toplist.php');
        this.gameOver = sessionStorage.getItem('mvGame_gameOver');
    }

    create(data) {
        this.sceneType = typeof data.sceneType !== 'undefined' ? data.sceneType : 'TOPLIST';
        this.add.image(250 , 400, 'grass');
        this.add.image(250, 400, 'toplist_background');
        const sceneTitle = this.isTopListScene() ? 'TOP LISTA' : 'Örökranglista';
        const titlePosX = this.isTopListScene() ? 150 : 120;
        this.add.text(titlePosX  , 10, sceneTitle, { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);

        this.add.sprite(480 , 40, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', () => {
                const sceneName = this.gameOver !== '{}' && this.gameOver !== null ? 'gameOver' : 'mainMenu';
                this.restartScene(sceneName)
            })
            .setScale(0.3)
        ;

        const element = this.add.dom(250, 317).createFromCache('topList');
        this.refreshTopList();

        if (this.isTopListScene()) {
            this.add.sprite(250, 600, 'hall_of_fame_button')
            .setInteractive( { useHandCursor: true  })
            .on('pointerdown', function() {
                this.scene.restart({sceneType: 'HALLOFFAME'});
            },this)
            .setScale(0.3);
        }
        
    }

    restartScene(sceneName) {
        this.playSfx('click_sfx');
        setTimeout(() => {
            this.scene.restart({sceneType: 'TOPLIST'});
            const theOtherScene = this.scene.get(sceneName);
            theOtherScene.scene.restart();
            this.scene.start(sceneName);
        }, 100);

    }

    refreshTopList() {
        const topListContainer = document.getElementById('toplistContainer');
        const topListInfoText = document.getElementById('topListInfoText');
        const hallOfFameInfoText = document.getElementById('hallOfFameInfoText');
        if (topListContainer === null || topListInfoText === null) {
            return;
        }
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "save_score.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        let sendParameter = 'get=true';
        if (this.isHallOfFameScene()) {
            sendParameter+='&halloffame=true';
        }
        xhttp.send(sendParameter);

        const self = this;
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                topListContainer.innerHTML = this.responseText;
                topListInfoText.style.display = self.isHallOfFameScene() ? 'none' : 'block';
                hallOfFameInfoText.style.display = self.isTopListScene() ? 'none' : 'block';
            }
        }
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }

    isTopListScene() {
        return this.sceneType === 'TOPLIST';
    }

    isHallOfFameScene() {
        return this.sceneType === 'HALLOFFAME';
    }
}
