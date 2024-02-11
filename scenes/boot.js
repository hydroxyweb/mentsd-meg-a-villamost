class BootGame extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(120, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Betöltés folyamatban...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.image('back', 'assets/ui/back-button.png?v=295');
        this.load.image('about_background', 'assets/ui/about-game-screen.png?v=295');
        this.load.image('tram', 'assets/villamos.png?v=295');
        this.load.image('red_car', 'assets/red_car.png?v=295');
        this.load.image('black_car', 'assets/black_car.png?v=295');
        this.load.image('blue_car', 'assets/blue_car.png?v=295');
        this.load.image('green_car', 'assets/green_car.png?v=295');
        this.load.image('yellow_car', 'assets/yellow_car.png?v=295');
        this.load.image('police_car', 'assets/police_car.png?v=295');
        this.load.image('orange_car', 'assets/orange_car.png?v=295');
        this.load.image('wrench', 'assets/wrench.png?v=295');
        this.load.image('start', 'assets/ui/start-game-button.png?v=295');
        this.load.image('about', 'assets/ui/about-button-small.png?v=295');
        this.load.image('road', 'assets/ui/road-background.png?v=295');
        this.load.image('restart', 'assets/ui/restart-button.png?v=295');
        this.load.image('end', 'assets/ui/end-button.png?v=295');
        this.load.image('failed_background', 'assets/ui/failed-background.png?v=295');
        this.load.image('success_background', 'assets/ui/success-background.png?v=295');
        this.load.image('grass', 'assets/ui/grass.png?v=295');
        this.load.image('save', 'assets/ui/save-score-button.png?v=295');
        this.load.image('top10', 'assets/ui/top-list-button.png?v=295');
        this.load.html('playerForm', 'assets/form/player.html?v=295');
        this.load.image('main_menu_bg', 'assets/ui/main-menu-bg.png?v=295');
        this.load.image('toplist', 'assets/ui/top-list-button.png?v=295');
        this.load.image('toplist_short', 'assets/ui/top-list-short-button.png?v=295');
        this.load.image('toplist_background', 'assets/ui/top-list-bg.png?v=295');
        this.load.audio('pickup_sfx', ['assets/sfx/pickup.wav?v=295', 'assets/sfx/pickup.mp3?v=295', 'assets/sfx/pickup.ogg?v=295']);
        this.load.audio('click_sfx', ['assets/sfx/click.wav?v=295', 'assets/sfx/click.mp3?v=295', 'assets/sfx/click.ogg?v=295']);
        this.load.audio('crash_sfx', ['assets/sfx/crash.wav?v=295', 'assets/sfx/crash.mp3?v=295', 'assets/sfx/crash.ogg?v=295']);
        this.load.audio('win_sfx', ['assets/sfx/win.wav?v=295', 'assets/sfx/win.mp3?v=295', 'assets/sfx/win.ogg?v=295']);
        this.load.audio('defeated_sfx', ['assets/sfx/defeated.wav?v=295', 'assets/sfx/defeated.mp3?v=295', 'assets/sfx/defeated.ogg?v=295']);
        this.load.image('mode_easy', 'assets/ui/easy-mode.png?v=295');
        this.load.image('mode_normal', 'assets/ui/normal-mode.png?v=295');
        this.load.image('mode_hard', 'assets/ui/hard-mode.png?v=295');
        this.load.image('hall_of_fame_button', 'assets/ui/hall-of-fame-button.png?v=295');

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(120, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        const self = this;
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();

            self.scene.start('mainMenu');
        });
    }

    create() {

    }
}
