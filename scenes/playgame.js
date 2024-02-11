class PlayGame extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    init() {
        this.playerHP = 100;
        this.playerScore = 0;
        this.scoreText = null;
        this.level = 1;
        this.carCount = 0;
        this.velocity = 130;
        this.repairPackGroup = null;
        this.enemyGroup = null;
        this.text  = null;
        this.enemyTimer = null;
        this.repairTimer = null;
        this.gameStatus = null;
        this.timedEvent = null;
        this.combo = 1;
        this.comboLimit = 3;

        if (sessionStorage.getItem('mvGame_gameMode') === null) {
            sessionStorage.setItem('mvGame_gameMode', 'normal');
        }

        this.gameMode = sessionStorage.getItem('mvGame_gameMode');
    }

    handleClickOnEnemy(enemy, extraScore) {
        let scoreCombo = 1;
        if (this.combo > this.comboLimit) {
            scoreCombo = this.combo;
        }
        this.combo++;
        const bonusAmplifier = this.calculateBonus(this.input.activePointer.y);
        const totalScore = Math.floor(extraScore*bonusAmplifier*scoreCombo);
        const targetObj = this.add.text(this.input.activePointer.x,this.input.activePointer.y,'+' + totalScore, { fontFamily: 'CustomFont', fontSize: '18px' });
        targetObj.setShadow(1,1,'#000000',2);
        enemy.destroy();
        this.playerScore+=totalScore;
        this.scoreText.setText('Pontjaid: ' + this.playerScore);
        this.carCount++;
        if (this.carCount%20 === 0) {
            this.level++;
        }

        this.tweens.add({
          targets: targetObj,
          alpha: 0,
          duration: 2000,
          ease: 'Power2'
        }, this);

        this.playSfx('click_sfx');
    }

    handleClickOnRepair(repair) {
        this.playerHP+=10;
        if (this.playerHP > 100) {
            this.playerHP = 100;
        }
        this.setValue(this.healthBar, this.playerHP);
        repair.destroy();
        this.playSfx('pickup_sfx');
    }

    handleClickOnRoad() {
        this.combo = 1;
    }

    spawnEnemies(enemies) {
        let enemy;

        if (this.gameStatus !== null) {
            return;
        }

        let enemiesToSpawn = Phaser.Math.Between(1, 4);
        for(let lane = 0; lane < enemiesToSpawn; lane++){
            let yCoord = Phaser.Math.Between(-200, -100);
            const laneWidth = [
              90,
              95,
              105,
              105
            ];
            let xCoord = (lane + 1) * Math.round(laneWidth[lane] );

            const gen_Enemy = this.generateEnemies();

            enemy = this.add.sprite(xCoord, yCoord, gen_Enemy.color + '_car');
            enemy.width = 75;
            enemy.height = 160;
            enemy.displayWidth = 65;
            enemy.displayHeight = 155;

            enemy = this.physics.add.existing(enemy);
            enemy.setInteractive()
            .on('pointerdown', this.handleClickOnEnemy.bind(this, enemy, gen_Enemy.extraScore));
            enemies.add(enemy);
        }

        let velocityGameModeMultiplier = 30;
        let minSpawnTime = this.level < 7 ? 2900 - (this.level * 300) : 1100;
        let maxSpawnTime = this.level < 7 ? 3100 - (this.level * 300) : 1300;

        switch (this.gameMode) {
            case 'easy':
                minSpawnTime = this.level < 7 ? 3000 - (this.level * 200) : 2000;
                maxSpawnTime = this.level < 7 ? 3500 - (this.level * 200) : 2500;
                velocityGameModeMultiplier = 15;
                break;

            case 'hard':
                minSpawnTime = this.level < 7 ? 2300 - (this.level * 300) : 700;
                maxSpawnTime = this.level < 7 ? 2500 - (this.level * 300) : 900;
                velocityGameModeMultiplier = 40;
                break;
        }

        let calculatedVelocity = this.velocity + (this.level * velocityGameModeMultiplier);
        enemies.setVelocityY(calculatedVelocity);

        const self = this;
        this.enemyTimer = setTimeout(function() {
            self.spawnEnemies(enemies)
        }, Phaser.Math.Between(minSpawnTime, maxSpawnTime));
    }

    spawnRepair(repairs) {
        let repairPack;

        if (this.gameStatus !== null) {
            return;
        }

        let yCoord = Phaser.Math.Between(-120, 0);
        let xCoord = Phaser.Math.Between(50, window.gameConfig.maxWidth - 50);

        repairPack = this.add.sprite(xCoord, yCoord, 'wrench');
        repairPack.width = 80;
        repairPack.height = 80;
        repairPack.displayWidth = 64;
        repairPack.displayHeight = 64;

        repairPack = this.physics.add?.existing(repairPack);
        repairPack.setInteractive()
        .on('pointerdown', this.handleClickOnRepair.bind(this, repairPack));
        repairs.add(repairPack);
        repairs.setVelocityY(150);

        const self = this;
        this.repairTimer = setTimeout(function() {
            self.spawnRepair(repairs)
        }, Phaser.Math.Between(12000, 22000));
    }

    detectHit(player, enemy) {
        enemy.destroy();
        this.playerHP-=10;
        this.combo = 1;
         this.setValue(this.healthBar, this.playerHP);
         if (this.playerHP <= 0) {
             this.gameOver();
         }
         this.playSfx('crash_sfx', 0.15);
    }

    makeBar(x, y,color) {
        let bar = this.add.graphics();
        bar.fillStyle(color, 1);
        bar.fillRect(0, 0, window.gameConfig.maxWidth, 20);

        bar.x = x;
        bar.y = y;

        return bar;
    }

    setValue(bar,percentage) {
        bar.scaleX = percentage/100;
    }

    formatTime(seconds){
        const minutes = Math.floor(seconds/60);
        let partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        return `${minutes}:${partInSeconds}`;
    }

    clockEvent () {
        this.initialTime -= 1;
        this.text.setText(this.formatTime(this.initialTime));

        if (this.initialTime <= 0 ){
            this.gameOver();
        }
    }

    playSfx(sfxName, userVolume = 0.2) {
        const sfx = this.sound.add(sfxName, {volume : userVolume});
        sfx.play();
    }

    generateEnemies() {
        let enemyType = Phaser.Math.Between(0, 6);
        let color = 'red';
        let extraScore = 10;

        switch(enemyType){
            case 0:
                color='orange';
                extraScore = 10;
                break;
            case 1:
                color='blue';
                extraScore = 15;
                break;
            case 2:
                color='black';
                extraScore = 15;
                break;
            case 3:
                color='yellow';
                extraScore = 20;
                break;
            case 4:
                color='green';
                extraScore = 20;
                break;
            case 5:
                color='police';
                extraScore = 50;
                break;
            default:
                color = 'red';
                extraScore = 10;
                break;
        }

        return {
            color,
            extraScore
        }
    }

    createBar() {
        this.add.rectangle(0, window.gameConfig.maxHeight - 10, window.gameConfig.maxWidth * 2, 40, '0x024fb1');

        //HP Bar
        this.healthBar=this.makeBar(0,window.gameConfig.maxHeight - 50,0x2ecc71);
        this.setValue(this.healthBar, this.playerHP);
        this.HPBarText = this.add.text( window.gameConfig.maxWidth/2 - 20,window.gameConfig.maxHeight - 50, 'Állapot',  { fontFamily: 'CustomFont', fontSize: '20px' });
        this.HPBarText.setShadow(1,1,'#000000',2);

        this.scoreText = this.add.text(10,window.gameConfig.maxHeight - 26, 'Pontjaid: ' + this.playerScore,  { fontFamily: 'CustomFont', fontSize: '20px' });
        this.scoreText.setShadow(1,1,'#000000',2);

        // 2:30 in seconds
        this.initialTime = 150;
        this.text = this.add.text(window.gameConfig.maxWidth - 50, window.gameConfig.maxHeight - 26, this.formatTime(this.initialTime), { fontFamily: 'CustomFont', fontSize: '20px' }).setShadow(1,1,'#000000',2);
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.clockEvent, callbackScope: this, loop: true });
    }

    gameOver() {
        this.gameStatus = 'success';
        if (this.playerHP <= 0) {
            this.playerHP = 0;
            this.gameStatus = 'failed';
        }
        clearTimeout(this.enemyTimer);
        clearTimeout(this.repairTimer);
        this.enemyGroup.destroy();
        this.repairPackGroup.destroy();
        this.scene.start('gameOver', { score: this.playerScore, status: this.gameStatus, remainingHP: this.playerHP });
    }

    create() {
        const self = this;
        this.add.image(250 , 400, 'grass');
        const road = this.add.image(250 , 400, 'road');
        road.setInteractive()
        .on('pointerdown', this.handleClickOnRoad.bind(this));

        const tramPositionX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const tramPositionY = this.cameras.main.worldView.y + this.cameras.main.height - 120;
        this.add.sprite(tramPositionX,tramPositionY,'tram').setScale(0.5);
        this.playerHitBox = this.add.rectangle(0, window.gameConfig.maxHeight - 120, window.gameConfig.maxWidth, 50);

        this.physics.add?.existing(this.playerHitBox);
        this.physics.world.setBounds(0, 0, window.gameConfig.maxWidth,window.gameConfig.maxHeight);
        this.playerHitBox.body.setCollideWorldBounds(true);
        this.playerHitBox.body.setImmovable(true);

        this.enemyGroup = this.physics.add.group({immovable: true, allowGravity: false});
        this.spawnEnemies(this.enemyGroup);

        this.repairPackGroup = this.physics.add.group({immovable: true, allowGravity: false});
        setTimeout(function() {
            self.spawnRepair(self.repairPackGroup)
        }, Phaser.Math.Between(12000, 22000));

        this.physics.add.collider(this.playerHitBox, this.enemyGroup,
          function(player, enemy) {
              self.detectHit(player, enemy);
        });

        this.createBar();
    }

    calculateBonus(enemyPosY) {
        //212 525
        if (enemyPosY <= 212) {
            return 2;
        }

        if (enemyPosY >= 400) {
            return 0.5;
        }

        return 1;
    }
}
