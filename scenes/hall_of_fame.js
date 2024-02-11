// TODO lehet, hogy törölni kell
class HallOfFame extends Phaser.Scene {
    constructor() {
        super('hallOfFame');
    }

    preload() {
        this.gameOver = sessionStorage.getItem('mvGame_gameOver');
    }

    create() {
        this.add.image(250 , 400, 'grass');
        this.add.image(250, 400, 'toplist_background');
        this.add.text(150  , 10, 'Örökranglista', { fontFamily: 'CustomFont', fontSize: '50px', align: 'center' }).setShadow(1,1,'#000000',2);

        this.add.sprite(480 , 40, 'end')
            .setInteractive({ useHandCursor: true  })
            .on('pointerdown', () => {
                const sceneName = this.gameOver !== '{}' && this.gameOver !== null ? 'gameOver' : 'mainMenu';
                this.restartScene(sceneName)
            })
            .setScale(0.3)
        ;
    }
}