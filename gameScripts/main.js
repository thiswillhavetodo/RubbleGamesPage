/*global game*/
/*global Phaser*/

var zombie;
//var rubble;
var flyingZombie;
var cannonBase;
var cannonBarrel;
var distanceText;
var altitudeText;
var speedText;
var infectedText;

//var map;
//var blockedLayer;
//var layer1;
var mapEnd = 4800;
var floor;
//var background1;
//var background2;
var ground;
var stars;
var star;

var people;
//var latePeople;
var man;
//var lateMan;
var turningMan;
var fighters;
var fighter;
var shooters;
var armyShooters;
var police;
var army;
var bullets;
var projectiles;

var power = 1500;
var infected = 0;
var turnEnded = false;
var score;
var scoreText;
var resetButton;
var resetText;
var infectSlow = 250;
var bounceSlow = 100;
var bounciness = 0.3;
var zombieHorde;
var zombieHorder;
var health = 250;
var distance = 0;
var hordeSizeText;
var hordeSize = 1;
var points = 1000;
var pointsText;
var shopButton;
var shopButtonText;
var hordeSpeed = 250;
var infectBoost = 50;
var detectZone = 300;
var healthDeplete = 1;
var rampageTrigger = 0;
var rampageTime = 3;
var rampageCrop;
var rampageBar;
var rampageBarHolder;
var rampageButton;
var house;
var hider;
var cottage;
var sign;
var clouds;
var cloud;
var hill;
var hill2;
var crates;
var crate;

var brain;
var brainInView = false;
var brainPowerUp;
var brainPowerUpAvailable = false;
//sfx variables
var infectSFX;
var zombieDeathSFX;
var maleScreamSFX;
var femaleScreamSFX;
var crateSmashSFX;
var scream3;
var scream4;
var gunShotSFX;
var themeMusic;
var trumpet;
var voice;
//medal variables
var cannonDistance = 0;
var maxHordeSize = 1;
var highestDistance = 0;
var totalDistance = 0;
var highestInfected = 0;
var totalInfected = 0;
var medalAwardsShowing = 0;
//tutorial variables
var madScientist;
var madScientistAnim;
var speechBubble;
var tutorialClickSign
var tutorialCounter = 0;
var tutorialText;
//var cannonCurve;

var mainState = {
    create: function() {
        game.stage.backgroundColor = '#8d92f3';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 4800, 1000);
        game.time.advancedTiming = true; //needed for fps display in debug
        /*
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('tilesetTest', 'tiles');
        
        layer1 = map.createLayer('sky');
        //layer1.scrollFactorX = 0.9;
        //layer3 = map.createLayer('clouds');
        blockedLayer = map.createLayer('ground');
        layer1.resizeWorld();
        map.setCollision(1, true, blockedLayer);
        */
        //background1 = game.add.sprite(0, 0, 'map1');
        //background2 = game.add.sprite(2000, 0, 'map2');
        //game.add.plugin(Phaser.Plugin.Debug);
        stars = game.add.group();
        for (var i=1; i<=16; i++) {
            star = stars.create((i-1)*96, Math.round(game.world.height-(128+Math.random()*game.world.height/3)), 'tiles');
            if (i%2==0) {
                if (i%4==0) {
                    star.frame = 6;
                }
                else {
                    star.frame = 1;
                }
            }
            else {
                if (i%3==0) {
                    star.frame = 7;
                }
                else {
                    star.frame = 2;
                }
            }
        }
        
        clouds = game.add.group();
        clouds.enableBody = true;
        for (var i=1; i<=10; i++) {
            var cloudY = Math.round(game.world.height-(128+Math.random()*game.world.height/3));
            var cloudSpeed = 80 + Math.random()*80;
            cloud = clouds.create((i-1)*256, cloudY, 'tiles');
            cloud.frame = 8;
            cloud.speed = cloudSpeed;
            cloud = clouds.create((i-1)*256 + 32, cloudY, 'tiles');
            cloud.frame = 9;
            cloud.speed = cloudSpeed;
        }
        
        hill = game.add.sprite(100, game.world.height-220, 'hill');
        hill2 = game.add.sprite(2000, game.world.height-220, 'hill');
        //hill.scale.setTo(2, 2);
        
        ground = game.add.group();
        ground.enableBody = true;
        if (tutorialCounter==0) {
            var groundAmount = 120;
        }
        else {
            groundAmount = 150;
        }
        for (var i=1; i<=groundAmount; i++) {
            floor = ground.create((i-1)*32, game.world.height-32, 'tiles');
            if (Math.random()>0.1) {
                floor.frame = 0;
            }
            else {
                floor.frame = Math.floor(3+Math.random()*2.6);
            }
            floor.body.immovable = true;
        }
        
        house = game.add.sprite(2900, game.world.height-387, 'pixelHouse1');
        house.scale.setTo(0.9, 0.9);
        hider = game.add.sprite(3000, game.world.height-223, 'hider');
        hider.animations.add('hide', [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0], 10, true);
        hider.animations.play('hide');
        if (tutorialCounter>5) {
            cottage = game.add.sprite(5000, game.world.height-387, 'pixelHouse');
            cottage.scale.setTo(0.9, 0.9);
        }
        sign = game.add.sprite(2000, game.world.height-158, 'popSign');
        
        cannonBase = game.add.sprite(0, 2000, 'cannonBase'); //260
        cannonBase.y = game.world.height-cannonBase.height-30;
        zombie = game.add.sprite(220, -20, 'zombieTop');
        //zombie.pivot.setTo(0.95, 0.5);
        zombie.rotation = 1.57;
        zombie.flying = false;
        cannonBarrel = game.add.sprite(20, 2000, 'cannonBarrel');
        cannonBarrel.y = (game.world.height-cannonBase.height);
        cannonBarrel.anchor.set(0.1, 0.5);
        cannonBarrel.pivot.x = -10;//setTo(0.05, 0.5);
        cannonBarrel.rotation = -0.17;
        cannonBarrel.active = false;
        cannonBarrel.timer = 0;
        cannonBarrel.fired = false;
        cannonBarrel.addChild(zombie);
        game.camera.follow(zombie);
        game.input.activePointer.capture = true;
        
        people = game.add.group();
        people.enableBody = true;
        //people.createMultiple(10, 'man');
        
        zombieHorde = game.add.group();
        zombieHorde.enableBody = true;
        zombieHorde.previousRight = 0;
        zombieHorde.Timer = 0;
        zombieHorde.first = true;
        zombieHorde.infectTimer = 0;
        //zombieHorde.createMultiple(30, 'zombie');
        
        fighters = game.add.group();
        fighters.enableBody = true;
        //fighters.createMultiple(10, 'fighters');
        
        shooters = game.add.group();
        shooters.enableBody = true;
        //shooters.createMultiple(10, 'shooters');
        
        armyShooters = game.add.group();
        armyShooters.enableBody = true;
        //armyShooters.createMultiple(10, 'shooters');
        
        crates = game.add.group();
        crates.enableBody = true;
        this.crateCreate(2500, game.world.height-96);
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.createMultiple(70, 'bullet');
        
        projectiles = game.add.group();
        projectiles.enableBody = true;
        projectiles.createMultiple(60, 'projectiles');
        
        rampageBarHolder = game.add.sprite(250, 10, 'rampageBarHolder');
        rampageBar = game.add.sprite(6, 0, 'rampageBar');
        rampageBarHolder.addChild(rampageBar);
        rampageCrop = new Phaser.Rectangle(0, 0, 200, 30);
        rampageBar.crop(rampageCrop);
        this.rampageCropUpdater();
        rampageBar.updateCrop();
        rampageButton = game.add.button(278, 60, 'rampageButton', this.rampage, this);
        if (rampageTrigger==50) {
            rampageButton.frame = 1;
        }
        else {
            rampageButton.frame = 0;
        }
        rampageButton.fixedToCamera = true;
        rampageBarHolder.fixedToCamera = true;
        //rampageBar.fixedToCamera = true;
        rampageCrop.fixedToCamera = true;
        if (tutorialCounter>5) {
            var peopleNumber = 5;
        }
        else {
            peopleNumber = 1;
        }
        
        for (var i=1; i<=peopleNumber; i++) {
            this.peopleCreate(2600+(i*475));
        }
        
        pointsText = game.add.bitmapText(5, 5, 'mindPlay', 'Data: ' + points, 30);
        pointsText.fixedToCamera = true;
        
        if (brainPowerUpAvailable) {
            brainPowerUp = game.add.button(5, 50, 'brain', this.brainUse, this);
            brainPowerUp.scale.setTo(0.8, 0.8);
            brainPowerUp.frame = 2;
            brainPowerUp.fixedToCamera = true;
        }
        
        infectSFX = game.add.audio('zombieSpawn');
        infectSFX.allowMultiple = true;
        zombieDeathSFX = game.add.audio('zombieDeath');
        zombieDeathSFX.allowMultiple = true;
        maleScreamSFX = game.add.audio('maleScream');
        maleScreamSFX.allowMultiple = true;
        maleScreamSFX.volume = 0.4;
        femaleScreamSFX = game.add.audio('femaleScream');
        femaleScreamSFX.allowMultiple = true;
        femaleScreamSFX.volume = 0.4;
        crateSmashSFX = game.add.audio('crateSmash');
        crateSmashSFX.allowMultiple = true;
        scream3 = game.add.audio('scream3');
        scream3.allowMultiple = false;
        scream4 = game.add.audio('scream4');
        scream4.allowMultiple = false;
        gunShotSFX = game.add.audio('gunshot');
        gunShotSFX.allowMultiple = false;
        gunShotSFX.volume = 0.45;
        trumpet = game.add.audio('trumpetCall');
        trumpet.volume = 2;
        voice = game.add.audio('voiceRampage');
        voice.volume = 4;
        themeMusic = game.add.audio('theme');
        themeMusic.play();
        
        if (tutorialCounter==0) {
            this.tutorial(265);
        }
    },
    update: function() {
        /*zombie.x = cannonBarrel.x + 220;
        zombie.y = cannonBarrel.y - 20;
        zombie.rotation = cannonBarrel.rotation + 1.57;*/
        game.physics.arcade.collide(flyingZombie, ground/*blockedLayer*/, this.bounce, null, this);
        game.physics.arcade.collide(zombieHorde, crates);
        //game.physics.arcade.collide(ground, crates);
        game.physics.arcade.overlap(brain, crates, this.brainMove, null, this);
        game.physics.arcade.overlap(flyingZombie, people, this.infect, null, this);
        game.physics.arcade.overlap(zombieHorde, people, this.hordeInfect, null, this);
        game.physics.arcade.overlap(zombieHorde, fighters, this.hordeInfect, null, this);
        game.physics.arcade.overlap(zombieHorde, shooters, this.hordeInfect, null, this);
        game.physics.arcade.overlap(zombieHorde, armyShooters, this.hordeInfect, null, this);
        game.physics.arcade.collide(people, people);
        game.physics.arcade.collide(bullets, zombieHorde, this.hordeShot, null, this);
        game.physics.arcade.collide(projectiles, zombieHorde, this.hordeProjectile, null, this);
        if (cannonBarrel.fired==false && cannonBarrel.active==false && (game.input.activePointer.leftButton.isDown||game.input.pointer1.isDown) && turnEnded==false && tutorialCounter>1) {
            cannonBarrel.active = true;
            //cannonBarrel.timer = game.time.now+500;
        }
        if (cannonBarrel.active==true) {
            if (game.physics.arcade.angleToPointer(cannonBarrel)<-1) {
                cannonBarrel.rotation = -1;
            }
            else {
                cannonBarrel.rotation = game.physics.arcade.angleToPointer(cannonBarrel);
            }
            //console.log(cannonBarrel.rotation);
        }
        if (!game.device.desktop) { 
            if (cannonBarrel.active==true && (game.input.pointer1.isDown==false)/* && cannonBarrel.timer<game.time.now*/) {
                //console.log(cannonBarrel.active);
                this.fire();
                cannonBarrel.fired = true;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function () { cannonBarrel.active = false; });
            }
        }
        else {
            if (cannonBarrel.active==true && (game.input.activePointer.leftButton.isDown==false)/* && cannonBarrel.timer<game.time.now*/) {
                //console.log(cannonBarrel.active);
                this.fire();
                cannonBarrel.fired = true;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function () { cannonBarrel.active = false; });
            }
        }
        
        if (zombie.flying==true) {
            this.zombieUpdate();
        }
        if (zombie.flying==true || zombieHorde.length!=0) {
            this.statTextUpdate();
        }
        if (zombieHorde.length==0 && cannonBarrel.fired==true && turnEnded==false && zombie.flying==false) { /*(cannonBarrel.active==false && zombieHorde.length==0 && zombie.flying==false && flyingZombie!=null && cannonBarrel.fired==true && turnEnded==false)*/
            turnEnded = true;
            var that = this;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () { if(zombieHorde.length==0) { that.endTurn();} else { turnEnded = false;}});
        }
        this.zombieHordeUpdate();
        this.peopleUpdate();
        this.fightersUpdate();
        this.shootersUpdate();
        this.armyShootersUpdate();
        this.cloudUpdate();        
        
        if (brainInView==true) {
            this.brainUpdate();
        }
        if (madScientist!=null && madScientist.alive && ((tutorialCounter>=3 && tutorialCounter<=5) || (tutorialCounter>=8 && tutorialCounter<=10))) {
            this.madScientistUpdate();
        }
    },
    render: function() {
    	game.debug.text(game.time.fps, 650, 18, "#00ff00");
    },
    fire: function() {
        if (zombie.flying==false) {
            zombie.destroy();
            this.zombieCreate();
            if (flyingZombie.rotation>1.57) {
                flyingZombie.body.velocity.x = power;
            }
            else {
                flyingZombie.body.velocity.x = (flyingZombie.rotation/1.57)*power;
            }
            //console.log(flyingZombie.body.velocity.x);
            if (cannonBarrel.rotation<-0.9) {
                flyingZombie.body.velocity.y = -(power - flyingZombie.body.velocity.x*1.2);
            }
            else {
                flyingZombie.body.velocity.y = -(power - flyingZombie.body.velocity.x*1);
            }
            flyingZombie.body.velocity.y = -(power - flyingZombie.body.velocity.x*1.1);
            //console.log(flyingZombie.body.velocity.y);
            game.camera.follow(flyingZombie);
            var style = { font:'18px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
            distanceText = game.add.bitmapText(560, 20, 'mindPlay', 'Distance: ' + (Math.floor(flyingZombie.body.x)/50) + 'm', 18);
            //distanceText.tint = 000000;
            altitudeText = game.add.bitmapText(560, 60, 'mindPlay', 'Altitude: ' + (Math.floor(3488-flyingZombie.body.y-128)/50) + 'm', 18);
            //altitudeText.tint = 000000;
            speedText = game.add.bitmapText(560, 40, 'mindPlay', 'Speed: ' + (Math.floor(flyingZombie.body.velocity.x)/50) + 'm/s', 18);
            //speedText.tint = 000000;
            infectedText = game.add.bitmapText(560, 80, 'mindPlay', '', 18);
            //infectedText.tint = 000000;
            //hordeSizeText = game.add.text(560, 100, 'Horde Size: 1', style);
            distanceText.fixedToCamera = true;
            altitudeText.fixedToCamera = true;
            speedText.fixedToCamera = true;
            infectedText.fixedToCamera = true;
            //hordeSizeText.fixedToCamera = true;
            var cannonSFX = game.add.audio('boom');
            cannonSFX.volume = 1.5;
            cannonSFX.play();
            if (tutorialCounter==2) {
                this.tutorialAdvance();
            }
        }
    },
    statTextUpdate: function() {
        if (zombie.flying) {
            distance = (Math.floor(flyingZombie.body.x)/50);
            speedText.text = 'Speed: ' + (Math.floor(flyingZombie.body.velocity.x)/50) + 'm/s';
            altitudeText.text = 'Altitude: ' + (Math.floor(3488-flyingZombie.body.y-128)/50) + 'm';
            infectedText.text = '';
        }
        else {
            distance = (Math.floor(zombieHorde.right)/50);
            if (zombieHorde.previousRight==0 || zombieHorde.previousRight>(distance*50)) {
                zombieHorde.previousRight = (distance*50)-50;
            }
            if (game.time.time>zombieHorde.Timer) {
                speedText.text = 'Speed: ' + Math.round((distance*50)-zombieHorde.previousRight)/50 + 'm/s';
                zombieHorde.previousRight = distance*50;
                zombieHorde.Timer = game.time.time+1000;
            }
        }
        distanceText.text = 'Distance: ' + distance + 'm';
        //hordeSizeText.text = 'Horde Size: ' + hordeSize;
        //pointsText.text = 'Data: ' + points;
    },
    zombieCreate: function() {
        if (cannonBarrel.rotation>0) {
            flyingZombie = game.add.sprite(cannonBarrel.x+160, cannonBarrel.y-20, 'zombie');
        }
        else if (cannonBarrel.rotation<-1) {
            flyingZombie = game.add.sprite(cannonBarrel.x+60, cannonBarrel.y-120, 'zombie');
        }
        else {
            flyingZombie = game.add.sprite(cannonBarrel.x+160, cannonBarrel.y-100, 'zombie');
        }
        flyingZombie.rotation = cannonBarrel.rotation + 1.57
        var explosion = game.add.sprite(160, -65, 'explosion');
        explosion.animations.add('boom', [0, 1, 2, 2, 1, 0], 12, true); 
        cannonBarrel.addChild(explosion);
        explosion.animations.play('boom');
        game.physics.arcade.enable(flyingZombie);
        flyingZombie.body.collideWorldBounds = true;
        flyingZombie.body.bounce.y = bounciness;
        zombie.flying = true;
        flyingZombie.body.gravity.y = 300;
        flyingZombie.anchor.set(0.1, 0.5);
        flyingZombie.pivot.x = -10;
        flyingZombie.corrected = false;
        flyingZombie.animations.add('flying', [0, 1], 1, true);
        flyingZombie.animations.play('flying');
    },
    zombieUpdate: function() {
        if (flyingZombie.body.velocity.x>0) {
            flyingZombie.body.velocity.x-=3;    
        }
        else if(flyingZombie.body.y>=game.world.height-132) {
           zombie.flying = false; 
           hordeSize --;
           this.zombieHordeCreate(flyingZombie.x, game.world.height-128);
           if (tutorialCounter==3) { 
               this.tutorialAdvance(); 
           }
           if (distance>cannonDistance) {
               cannonDistance = distance;
               while (cannonDistanceThreshold!='max' && cannonDistance>=cannonDistanceThreshold) {
                   this.medalUnlock("cannonDistance");
               }
           }
           //console.log(zombieHorde.right + '/' + zombieHorde.length);
           //game.camera.follow(zombieHorde.right);
           flyingZombie.body.velocity.x = 0;
           flyingZombie.kill();
           altitudeText.text = 'Horde Size: ' + hordeSize;
           infectedText.text = 'Total Infected: ' + infected;
        }
        if (flyingZombie.body.velocity.y<0) {
            flyingZombie.body.velocity.y+=8;
        }
        else if (flyingZombie.rotation<2.1) {
            flyingZombie.rotation += 0.005;
        }
        /*if (flyingZombie.body.velocity.y<=0) {
            flyingZombie.body.gravity.y = 300;
        }*/
        if (flyingZombie.body.y>=game.world.height-128 && flyingZombie.body.velocity.x>0) {
            //console.log('slowing');
            flyingZombie.body.velocity.x -= 5;
        }
        /*if (game.time.now%15==0) {
            console.log(flyingZombie.body.y);
        }*/
    },
    bounce: function() {
        if (flyingZombie.body.velocity.x>150) {
            flyingZombie.rotation += 1;
            flyingZombie.body.velocity.x -= bounceSlow;
        }
        else if (flyingZombie.body.velocity.x>65) {
            if (flyingZombie.rotation<0) {
                flyingZombie.rotation += 0.4;
            }
            else {
                flyingZombie.rotation += 0.1;
            }
        }
        else if (flyingZombie.rotation>0 && flyingZombie.rotation!=1.57 && flyingZombie.corrected==false) {
            flyingZombie.rotation = 1.57;
            flyingZombie.body.y = game.world.height-122;
            flyingZombie.corrected = true;
        }
        else if (flyingZombie.rotation<=0 && flyingZombie.corrected==false) {
            flyingZombie.rotation += 0.3;
            /*flyingZombie.rotation = -1.57;
            flyingZombie.body.y = 5120;
            flyingZombie.corrected = true;*/
        }
        else if (flyingZombie.rotation!=1.57 && flyingZombie.corrected==true) {
            flyingZombie.rotation = 1.57;
        }
        this.worldUpdate();
        this.floorClear();
        //console.log('rotation: ' + flyingZombie.rotation + '/Y: ' + flyingZombie.body.y)
    },
    infect: function(flyingZombie, man) {
        //console.log('before: ' + flyingZombie.body.velocity.x);
        flyingZombie.body.velocity.x -= infectSlow;
        if (flyingZombie.body.velocity.x<0) {
            flyingZombie.body.velocity.x = 0;
        }
        //console.log('after: ' + flyingZombie.body.velocity.x);
        turningMan = game.add.sprite(man.x, man.y, 'man');
        turningMan.animations.add('whiteTurn', [0, 4, 5], 6, false);
        turningMan.animations.add('blackTurn', [6, 10, 5], 6, false);
        if (man.colour=="white") {
            turningMan.animations.play('whiteTurn');
        }
        else {
            turningMan.animations.play('blackTurn');
        }
        maleScreamSFX.play();
        man.destroy();
        man.isAlive = false;
        if (rampageTrigger<50) {
            rampageTrigger++;
            if (rampageTrigger>=50) {
                if (tutorialCounter==10) {
                    this.tutorial((distance*50)-330);
                    rampageButton.frame = 1;
                }
                else {
                    rampageButton.frame = 1;
                }
            }
        }
        this.rampageCropUpdater();
        rampageBar.updateCrop();
        this.spriteGenerate();
        var that = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () { turningMan.destroy(); that.zombieHordeCreate(man.x, man.y); });
        //console.log(infected);
    },
    hordeInfect: function(zombieHorder, man) {
        if (game.time.time>zombieHorde.infectTimer) {
        zombieHorde.infectTimer = game.time.time + 100;
        zombieHorder.health += infectBoost;
        zombieHorder.speedBoost += infectBoost*0.03;
        //console.log('colour'+man.colour);
        zombieHorder.slowed = true;
        if (man.colour=="white" || man.colour=="black") {
            turningMan = game.add.sprite(man.x, man.y, 'man');
            turningMan.animations.add('whiteTurn', [0, 4, 5], 6, false);
            turningMan.animations.add('blackTurn', [6, 10, 5], 6, false);
        }
        else if (man.colour=="blackDenim" || man.colour=="paleBlue") {
            turningMan = game.add.sprite(man.x, man.y, 'fighters');
            turningMan.animations.add('blackDenimTurn', [4, 5, 6], 6, false);
            turningMan.animations.add('femaleTurn', [11, 12, 6], 6, false);
        }
        else {
            turningMan = game.add.sprite(man.x, man.y, 'shooters');
            turningMan.animations.add('policeTurn', [0, 5, 8, 7], 8, false);
            turningMan.animations.add('armyTurn', [2, 6, 8, 7], 8, false);
        }
        turningMan.lifespan = 500;
        if (man.colour=="white") {
            turningMan.animations.play('whiteTurn');
            maleScreamSFX.play();
        }
        else if (man.colour=="blue") {
            turningMan.animations.play('policeTurn');
            maleScreamSFX.play();
        }
        else if (man.colour=="green") {
            turningMan.animations.play('armyTurn');
            maleScreamSFX.play();
        }
        else if (man.colour=="blackDenim") {
            turningMan.animations.play('blackDenimTurn');
            maleScreamSFX.play();
        }
        else if (man.colour=="paleBlue") {
            turningMan.animations.play('femaleTurn');
            femaleScreamSFX.play();
        }
        else {
            turningMan.animations.play('blackTurn');
            maleScreamSFX.play();
        }
        man.destroy();
        man.isAlive = false;
        if (rampageTrigger<50) {
            rampageTrigger++;
            if (rampageTrigger>50) {
                rampageTrigger = 50;
            }
            if (rampageTrigger>=50) {
                if (tutorialCounter==10) {
                    this.tutorial((distance*50)-330);
                    rampageButton.frame = 1;
                }
                else {
                    rampageButton.frame = 1;
                }
            }
        }
        this.rampageCropUpdater();
        rampageBar.updateCrop();
        this.spriteGenerate();
        var that = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () { zombieHorder.slowed = false; turningMan.destroy(); that.zombieHordeCreate(man.x, man.y); });
        }
    },
    endTurn: function() {
        if (tutorialCounter<=5) {
            tutorialCounter = 5;
            this.tutorialAdvance();
        }
        var infectedPoints = infected*10;
        cannonBarrel.active = false;
        if (distance>300) {
            score = 755 + (distance-300)*2.7 + infectedPoints;
        }
        else if (distance>200) {
            score = 515 + (distance-200)*2.3 + infectedPoints;
        }
        else if (distance>100) {
            score = 300 + (distance-100)*2.15 + infectedPoints;
        }
        else {
            score = 100 + distance*2 + infectedPoints;
        }
        if (distance>highestDistance) {
            highestDistance = distance;
            if (highestDistanceThreshold!='max' && highestDistance>=highestDistanceThreshold) {
               this.medalUnlock("highestDistance");
            }
        }
        totalDistance += distance;
        if (totalDistanceThreshold!='max' && totalDistance>=totalDistanceThreshold) {
            this.medalUnlock("totalDistance");
        }
        points += Math.round(score);
        pointsText.text = 'Data: ' + points;
        resultBackground = game.add.sprite(260, 12, 'resultsBack');
        resultBackground.fixedToCamera = true;
        resetButton = game.add.button(534, 289, 'blankButton', this.restart, this);
        //resetButton.scale.setTo(0.7, 0.7);
        resetButton.fixedToCamera = true;
        resetText = game.add.bitmapText(538, 291, 'mindPlay', 'Try Again?', 30);
        resetText.fixedToCamera = true;
        scoreText = game.add.bitmapText(513, 35, 'mindPlay', '', 28);
        scoreText.text = 'Distance: ' + Math.round(distance*10)/10 + 'm\n  +' + (Math.round(score)-infectedPoints) + ' data\nInfected: ' + infected + '\n  +' + infectedPoints + ' data\nTotal: ' + Math.round(score) + ' data\n\n   Grand Total:\n     ' + points + ' data';
        scoreText.fixedToCamera = true;
        shopButton = game.add.button(534, 332, 'blankButton', this.shop, this);
        //shopButton.scale.setTo(0.7, 0.7);
        shopButton.fixedToCamera = true;
        shopButtonText = game.add.bitmapText(538, 336, 'mindPlay', 'Go to Shop', 30);
        shopButtonText.fixedToCamera = true;
    },
    restart: function() {
        themeMusic.stop();
        if (tutorialCounter==6) {
            madScientist.destroy();
        }
        game.world.removeAll();
        //resetButton.kill();
        //shopButton.kill();
        flyingZombie.x = 0;
        medalAwardsShowing = 0;
        zombieHorde.first = true;
        infected = 0;
        distance = 0;
        turnEnded = false;
        hordeSize = 1;
        cannonBarrel.fired = false;
        mapEnd = 4800;
        this.save();
        this.create();
    },
    shop: function() {
        themeMusic.stop();
        if (tutorialCounter==6) {
            madScientist.destroy();
        }
        game.world.removeAll();
        resetButton.kill();
        flyingZombie.x = 0;
        medalAwardsShowing = 0;
        zombieHorde.first = true;
        infected = 0;
        distance = 0;
        turnEnded = false;
        hordeSize = 1;
        cannonBarrel.fired = false;
        mapEnd = 4800;
        this.save();
        game.state.start('shop');
    },
    zombieHordeCreate: function(x, y) {
        zombieHorder = zombieHorde.create(x, game.world.height-128, 'zombie');//zombieHorde.getFirstExists(false); 
        //console.log('zombieX' + x);
        //zombieHorder.reset(x, game.world.height-128);
        if (zombieHorde.first==true) {
            if (x>3000) {
                zombieHorder.health = health + infectBoost;
                zombieHorde.first = false;
            }
            else {
                zombieHorder.health = health;
                zombieHorde.first = false;
            }
        }
        else {
            zombieHorder.health = health;
            infectSFX.play();
        }
        zombieHorder.health = health;
        zombieHorder.speedBoost = 0;
        infected++;
        totalInfected++;
        if (infected>highestInfected) {
            highestInfected = infected;
            if (highestInfectedThreshold!='max' && highestInfected>=highestInfectedThreshold) {
               this.medalUnlock("highestInfected");
            }
        }
        if (totalInfectedThreshold!='max' && totalInfected>=totalInfectedThreshold) {
            this.medalUnlock("totalInfected");
        }
        zombieHorder.animations.add('move', [3, 4, 5], 10, true);
        hordeSize ++;
        if (hordeSize>maxHordeSize) {
            maxHordeSize = hordeSize;
            if (maxHordeSizeThreshold!='max' && maxHordeSize>=maxHordeSizeThreshold) {
               this.medalUnlock("maxHordeSize");
            }
        }
        altitudeText.text = 'Horde Size: ' + hordeSize;
        infectedText.text = 'Total Infected: ' + infected;
    },
    zombieHordeUpdate: function() {
        var that = this;
        zombieHorde.forEach(function(zombieHorder) {
            if (zombieHorder.slowed) {
                zombieHorder.body.velocity.x = hordeSpeed - infectSlow + zombieHorder.speedBoost;
            }
            else {
                zombieHorder.body.velocity.x = hordeSpeed + zombieHorder.speedBoost;
            }
            zombieHorder.animations.play('move');
            if (zombieHorder.health>healthDeplete && turnEnded==false) {
                zombieHorder.health -= healthDeplete;
            }
            else {
                zombieHorder.destroy();
                zombieDeathSFX.play();
                hordeSize --;
                altitudeText.text = 'Horde Size: ' + hordeSize;
                if (Math.random()>=0.9 && brainInView==false) {
                    that.brainCreate(zombieHorder.x, zombieHorder.y);
                }
                if (rampageTrigger<50) {
                    rampageTrigger++;
                    if (rampageTrigger>50) {
                        rampageTrigger = 50;
                    }
                    if (rampageTrigger>=50) {
                        if (tutorialCounter==10) {
                            that.tutorial((distance*50)-330);
                            rampageButton.frame = 1;
                        }
                        else {
                            rampageButton.frame = 1;
                        }
                    }
                }
                that.rampageCropUpdater();
                rampageBar.updateCrop();
                var deadZombie = game.add.sprite(zombieHorder.x, game.world.height-128, 'zombieDeath');
                deadZombie.animations.add('death', [0, 1, 1, 2, 2, 2, 3], 4, false);
                deadZombie.animations.play('death');
                deadZombie.lifespan = 3200;
                //game.time.events.add(Phaser.Timer.SECOND * 2, function () { deadZombie.destroy(); });
            }
            //if (hordeSize==0){
            game.camera.focusOnXY((distance*50), game.world.height-200);
            //}
            //else {
            //    game.camera.focusOnXY(zombieHorde.right, game.world.height-200)
            //}
            //console.log(zombieHorde.right + '/' + zombieHorde.length);
        });
    },
    peopleUpdate: function()  {
        people.forEach(function(man) {
            if (man.x<(distance*50)+detectZone || (flyingZombie!=null && man.x<flyingZombie.x+detectZone)) {
                game.physics.arcade.collide(man, people, this.slow, null, this);
                if (man.slowed) {
                    man.body.velocity.x = -10;
                }
                else {
                    man.body.velocity.x = 200;    
                }
                if (man.frame==0) {
                    man.animations.play('whiteMove');
                }
                else if (man.frame==6) {
                    man.animations.play('blackMove');
                }
                if (!man.screaming) {
                    if (Math.random()>0.5) {
                        scream3.play();
                        man.screaming = true;
                    }
                    else {
                        scream4.play();
                        man.screaming = true;
                    }
                }
            }
        });
    },
    fightersUpdate: function() {
        fighters.forEach(function(fighter) {
            if (turnEnded==false) {
                if (fighter.x<(distance*50)+detectZone*1.35 && zombieHorde.length!=0) {
                    if (game.time.time>fighter.fireTimer && fighter.isAlive==true) {
                        var projectile = projectiles.getFirstExists(false);
                        projectile.animations.add('can', [0, 1, 2, 3], 10, true);
                        projectile.animations.add('bottle', [4, 5, 6, 7], 10, true);
                        projectile.reset(fighter.x-3, fighter.y + 24);
                        if (Math.random()>0.5) {
                            projectile.animations.play('can');
                        }
                        else {
                            projectile.animations.play('bottle');
                        }
                        projectile.body.velocity.x = -300;
                        projectile.lifespan = 3500;
                        if (fighter.type=='male') {
                            fighter.animations.play('male');
                        }
                        else {
                            fighter.animations.play('female');
                        }
                        fighter.fireTimer = game.time.time + 800;
                    }
                }
            }
            else if (turnEnded) {
                if (fighter.type=='male') {
                    fighter.animations.play('maleBlink');
                }
                else {
                    fighter.animations.play('femaleBlink');
                }
            }
        });
    },
    shootersUpdate: function() {
        shooters.forEach(function(police) {
            if (police.x<(distance*50)+detectZone*1.65 && zombieHorde.length!=0) {
                if (game.time.time>police.fireTimer && police.isAlive==true) {
                    var bullet = bullets.getFirstExists(false);
                    bullet.reset(police.x-3, police.y + 37);
                    bullet.body.velocity.x = -500;
                    bullet.lifespan = 2500;
                    gunShotSFX.play();
                    police.fireTimer = game.time.time + 630;
                    police.frame = 1;
                    game.time.events.add(Phaser.Timer.SECOND * 0.3, function () { police.frame = 0; });
                }
            }
            else {
                police.animations.play('blink');
            }
        });
    },
    armyShootersUpdate: function() {
        armyShooters.forEach(function(army) {
            if (army.x<(distance*50)+detectZone*2.2 && zombieHorde.length!=0) {
                if (game.time.time>army.fireTimer && army.isAlive==true) {
                    var bullet = bullets.getFirstExists(false);
                    bullet.reset(army.x-3, army.y + 37);
                    bullet.body.velocity.x = -500;
                    bullet.lifespan = 2500;
                    gunShotSFX.play();
                    army.fireTimer = game.time.time + 315;
                    army.frame = 3;
                    game.time.events.add(Phaser.Timer.SECOND * 0.3, function () { army.frame = 2; });
                }
            }
            else {
                army.animations.play('blink');
            }
    });
    },
    hordeShot: function(projectile, zombieHorder) {
        projectile.kill();
        zombieHorder.health -= 100;
    },
    hordeProjectile: function(bullet, zombieHorder) {
        bullet.kill();
        zombieHorder.health -= 150;
    },
    slow: function(man) {
        man.slowed = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () { man.slowed = false; });
    },
    rampage: function() {
        if (rampageTrigger>=50 && turnEnded==false) {
            var rampageSprite = game.add.sprite(141, 141, 'rampage');
            rampageSprite.animations.add('display', [0, 1, 2, 3, 4, 5, 6, 7], 16, false);
            rampageSprite.animations.play('display');
            rampageSprite.fixedToCamera = true;
            trumpet.play();
            game.time.events.add(Phaser.Timer.SECOND * 0.6, function () { voice.play(); });
            game.time.events.add(Phaser.Timer.SECOND * 1, function () { rampageSprite.destroy(); });
            rampageButton.frame = 0;
            rampageTrigger-=50;
            hordeSpeed += 300;
            infectBoost += 10;
            healthDeplete = 0.5;
            game.time.events.add(Phaser.Timer.SECOND * rampageTime, function () { hordeSpeed -= 300; infectBoost -= 10; healthDeplete = 1; });
        }
    },
    rampageCropUpdater: function() {
        rampageCrop.x = 200-((rampageTrigger/50)*200);
        if (rampageTrigger==49) {
            rampageBar.x = 3;
        }
        else if (rampageTrigger==50) {
            rampageBar.x = 0;
        }
        else {
            rampageBar.x = 6;
        }
    },
    brainCreate: function(x, y) {
        brain = game.add.button(x, y, 'brain', this.brainCollect, this);
        brain.animations.add('flash', [5, 4, 3, 2, 1, 0], 10 , true);
        //brain.scale.setTo(1.5, 1.5);
        brainInView = true;
        if (tutorialCounter==7) {
            this.tutorial((distance*50)-330);
            //this.tutorialAdvance();
        }
    },
    brainMove: function(brain) {
        brain.x -= 35;
    },
    brainUpdate: function() {
        brain.animations.play('flash');
        if (brainInView==true && brain.x<(distance*50)-450) {
            brain.kill();
            brainInView = false;
        }
    },
    brainCollect: function() {
        if (brainPowerUpAvailable==false) {
            brain.destroy();
            brainPowerUp = game.add.button(5, 50, 'brain', this.brainUse, this);
            brainPowerUp.scale.setTo(0.8, 0.8);
            brainPowerUp.frame = 2;
            brainPowerUp.fixedToCamera = true;
            brainPowerUpAvailable = true;
        }
    },
    brainUse: function() {
        if (turnEnded==false) {
            brainInView = false;
            brainPowerUp.destroy();
            brainPowerUpAvailable = false;
            this.zombieHordeCreate(distance*50, game.world.height-128);
        }
    },
    spriteGenerate: function() {
        var distanceMultiplier = (distance/500)*0.45;
        var chance = Math.random()*0.5;
        var spawnChance = chance + distanceMultiplier;
        if (Math.random()>0.8) {
            var spawnType = 'civilian';
        }
        else {
            spawnType = 'defender';
        }
        if (spawnType=='civilian') {
            this.peopleCreate((distance*50)+600);
            if (chance>0.9) {
                this.fighterCreate((distance*50)+700);
            }
        }
        else {
            if (spawnChance>0.75) {
                this.armyCreate((distance*50)+600);
                if (chance>0.9) {
                    this.policeCreate((distance*50)+700);
                }
            }
            else if (spawnChance>0.45) {
                this.policeCreate((distance*50)+600);
                if (chance>0.9) {
                    this.fighterCreate((distance*50)+700);
                }
            }
            else {
                this.fighterCreate((distance*50)+600);
                if (chance>0.9) {
                    this.fighterCreate((distance*50)+700);
                }
            }
        }
        this.floorClear();
        this.worldUpdate();
    },
    peopleCreate: function(x) {
        man = people.create(x, game.world.height-128, 'man');
        man.animations.add('whiteMove', [1, 2, 3], 10, true);
        man.animations.add('blackMove', [7, 8, 9], 10, true);
        man.screaming = false;
        if (Math.random()>0.5) {
            man.colour = 'white';
            man.frame = 0;
        }
        else {
            man.colour = 'black';
            man.frame = 6;
        }
    },
    fighterCreate: function(x) {
        fighter = fighters.create(x, game.world.height-128, 'fighters');
        fighter.animations.add('male', [0, 0, 1, 2, 3, 3, 2, 1], 10, false);
        fighter.animations.add('female', [7, 7, 8, 9, 10, 10, 9, 8], 10, false);
        fighter.animations.add('maleBlink', [4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 4, 4, 4, 4, 4, 4], 10, false);
        fighter.animations.add('femaleBlink', [11, 14, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], 10, false);
        if (Math.random()>0.5) {
            fighter.type = 'male';
            fighter.colour = 'blackDenim';
        }
        else {
            fighter.type = 'female';
            fighter.colour = 'paleBlue';
        }
        fighter.fireTimer = 0;
        fighter.isAlive = true;
        //fighter.x = x;
        //fighter.y = game.world.height-128;
    },
    policeCreate: function(x) {
        police = shooters.create(x, game.world.height-128, 'shooters');
        police.frame = 0;
        police.type = 'police';
        police.colour = 'blue';
        police.fireTimer = 0;
        police.isAlive = true;
        police.animations.add('blink', [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10, false);
    },
    armyCreate: function(x) {
        army = armyShooters.create(x, game.world.height-128, 'shooters');
        army.frame = 2;
        army.type = 'army';
        army.colour = 'green';
        army.fireTimer = 0;
        army.isAlive = true;
        army.animations.add('blink', [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2], 10, false);
    },
    floorClear: function() {
        //console.log('Ground before: ' + ground.length);
        ground.forEach(function(floor) {
            if (floor.x<(distance*50)-400) {
                floor.destroy();
                //console.log('floor gone?');
            }
        });
        //console.log('Ground after: ' + ground.length);
    },
    worldUpdate: function() {
        if (house.x<(distance*50)-1200) {
            house.x += 4000;
            hider.x += 4000;
        }
        if (tutorialCounter>5 && cottage.x<(distance*50)-1200) {
            cottage.x += 4000;
        }
        if (hill.x<(distance*50)-3200) {
            hill.x += 4000;
        }
        if (hill2.x<(distance*50)-3200) {
            hill2.x += 4000;
        }
        if (crate.x<(distance*50)-1000) {
            crate.x += 2200;
        }
        stars.forEach(function(star) {
            if (star.x<(distance*50)-1200) {
                star.x += 3000;
            }
            if (star.x>2000 && star.y<(game.world.height-405)) {
                star.y += 100;
            }
        });
        game.world.setBounds((distance*50)-500, 0/*-3083*/, 4000, 1000);
        while (mapEnd/50<distance+18) {
            floor = ground.create(mapEnd, game.world.height-32, 'tiles');
            if (Math.random()>0.1) {
                floor.frame = 0;
            }
            else {
                floor.frame = Math.floor(3+Math.random()*2.6);
            }
            floor.body.immovable = true;
            mapEnd+=32;
        }
    },
    cloudUpdate: function() {
        clouds.forEach(function(cloud) {
            cloud.body.velocity.x = -cloud.speed;
            if (cloud.x>2000 && cloud.y<(game.world.height-405)) {
                cloud.destroy();
            }
            if (cloud.x<(distance*50)-1200) {
                cloud.x += 3000;
            }
        });
    },
    medalUnlock: function(medal) {
        medalAwardsShowing++;
        switch(medal) {
            case "cannonDistance":
                var awardSpriteCannon = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteCannon.fixedToCamera = true;
                //awardSpriteCannon.scale.setTo(2, 3);
                var awardTextCannon = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteCannon.addChild(awardTextCannon);
                switch(cannonDistanceThreshold) {
                    case 50:
                        awardTextCannon.text = '  Medal Unlocked\n  Is it a bird? \n  +100 points';
                        points+=100;
                        cannonDistanceThreshold = 60;
                        break;
                    case 60:
                        awardTextCannon.text = '  Medal Unlocked\n  Is it a bird? \n  +200 points';
                        points+=200;
                        cannonDistanceThreshold = 70;
                        break;
                    case 70:
                        awardTextCannon.text = '  Medal Unlocked\n  Is it a bird? \n  +300 points';
                        points+=300;
                        cannonDistanceThreshold = 85;
                        break;
                    case 85:
                        awardTextCannon.text = '  Medal Unlocked\n  Is it a bird? \n  +400 points';
                        points+=400;
                        cannonDistanceThreshold = 100;
                        break;
                    case 100:
                        awardTextCannon.text = '  Medal Unlocked\n  Is it a bird? \n  +500 points';
                        points+=500;
                        cannonDistanceThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteCannon.destroy(); medalAwardsShowing--; });
                break;
            case "maxHordeSize":
                var awardSpriteHorde = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteHorde.fixedToCamera = true;
                //awardSpriteHorde.scale.setTo(2, 3);
                var awardTextHorde = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteHorde.addChild(awardTextHorde);
                switch(maxHordeSizeThreshold) {
                    case 5:
                        awardTextHorde.text = '  Medal Unlocked\n  Such a Horder \n  +100 points';
                        points+=100;
                        maxHordeSizeThreshold = 10;
                        break;
                    case 10:
                        awardTextHorde.text = '  Medal Unlocked\n  Such a Horder \n  +200 points';
                        points+=200;
                        maxHordeSizeThreshold = 15;
                        break;
                    case 15:
                        awardTextHorde.text = '  Medal Unlocked\n  Such a Horder \n  +300 points';
                        points+=300;
                        maxHordeSizeThreshold = 20;
                        break;
                    case 20:
                        awardTextHorde.text = '  Medal Unlocked\n  Such a Horder \n  +400 points';
                        points+=400;
                        maxHordeSizeThreshold = 25;
                        break;
                    case 25:
                        awardTextHorde.text = '  Medal Unlocked\n  Such a Horder \n  +500 points';
                        points+=500;
                        maxHordeSizeThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteHorde.destroy(); medalAwardsShowing--; });
                break;
            case "highestDistance":
                var awardSpriteHighDistance = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteHighDistance.fixedToCamera = true;
                //awardSpriteHighDistance.scale.setTo(2, 3);
                var awardTextHighDistance = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteHighDistance.addChild(awardTextHighDistance);
                switch(highestDistanceThreshold) {
                    case 100:
                        awardTextHighDistance.text = '  Medal Unlocked\n  Rot & RoLL \n  +100 points';
                        points+=100;
                        highestDistanceThreshold = 200;
                        break;
                    case 200:
                        awardTextHighDistance.text = '  Medal Unlocked\n  Rot & RoLL \n  +200 points';
                        points+=200;
                        highestDistanceThreshold = 300;
                        break;
                    case 300:
                        awardTextHighDistance.text = '  Medal Unlocked\n  Rot & RoLL \n  +300 points';
                        points+=300;
                        highestDistanceThreshold = 500;
                        break;
                    case 500:
                        awardTextHighDistance.text = '  Medal Unlocked\n  Rot & RoLL \n  +400 points';
                        points+=400;
                        highestDistanceThreshold = 1000;
                        break;
                    case 1000:
                        awardTextHighDistance.text = '  Medal Unlocked\n  Rot & RoLL \n  +500 points';
                        points+=500;
                        highestDistanceThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteHighDistance.destroy(); medalAwardsShowing--; });
                break;
            case "totalDistance":
                var awardSpriteTotalDistance = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteTotalDistance.fixedToCamera = true;
                //awardSpriteTotalDistance.scale.setTo(2, 3);
                var awardTextTotalDistance = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteTotalDistance.addChild(awardTextTotalDistance);
                switch(totalDistanceThreshold) {
                    case 250:
                        awardTextTotalDistance.text = '  Medal Unlocked\n  Travel Sick \n  +100 points';
                        points+=100;
                        totalDistanceThreshold = 500;
                        if (totalDistanceThreshold!='max' && totalDistance>=totalDistanceThreshold) {
                            this.medalUnlock("totalDistance");
                        }
                        break;
                    case 500:
                        awardTextTotalDistance.text = '  Medal Unlocked\n  Travel Sick \n  +200 points';
                        points+=200;
                        totalDistanceThreshold = 1000;
                        if (totalDistanceThreshold!='max' && totalDistance>=totalDistanceThreshold) {
                            this.medalUnlock("totalDistance");
                        }
                        break;
                    case 1000:
                        awardTextTotalDistance.text = '  Medal Unlocked\n  Travel Sick \n  +300 points';
                        points+=300;
                        totalDistanceThreshold = 2000;
                        if (totalDistanceThreshold!='max' && totalDistance>=totalDistanceThreshold) {
                            this.medalUnlock("totalDistance");
                        }
                        break;
                    case 2000:
                        awardTextTotalDistance.text = '  Medal Unlocked\n  Travel Sick \n  +400 points';
                        points+=400;
                        totalDistanceThreshold = 5000;
                        if (totalDistanceThreshold!='max' && totalDistance>=totalDistanceThreshold) {
                            this.medalUnlock("totalDistance");
                        }
                        break;
                    case 5000:
                        awardTextTotalDistance.text = '  Medal Unlocked\n  Travel Sick \n  +500 points';
                        points+=500;
                        totalDistanceThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteTotalDistance.destroy(); medalAwardsShowing--; });
                break;
            case "highestInfected":
                var awardSpriteHighInfected = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteHighInfected.fixedToCamera = true;
                //awardSpriteHighInfected.scale.setTo(2, 3);
                var awardTextHighInfected = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteHighInfected.addChild(awardTextHighInfected);
                switch(highestInfectedThreshold) {
                    case 2:
                        awardTextHighInfected.text = '  Medal Unlocked\n  Going Green \n  +100 points';
                        points+=100;
                        highestInfectedThreshold = 10;
                        break;
                    case 10:
                        awardTextHighInfected.text = '  Medal Unlocked\n  Going Green \n  +200 points';
                        points+=200;
                        highestInfectedThreshold = 50;
                        break;
                    case 50:
                        awardTextHighInfected.text = '  Medal Unlocked\n  Going Green \n  +300 points';
                        points+=300;
                        highestInfectedThreshold = 100;
                        break;
                    case 100:
                        awardTextHighInfected.text = '  Medal Unlocked\n  Going Green \n  +400 points';
                        points+=400;
                        highestInfectedThreshold = 250;
                        break;
                    case 250:
                        awardTextHighInfected.text = '  Medal Unlocked\n  Going Green \n  +500 points';
                        points+=500;
                        highestInfectedThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteHighInfected.destroy(); medalAwardsShowing--; });
                break;
            case "totalInfected":
                var awardSpriteTotalInfected = game.add.sprite(10, 100*medalAwardsShowing, 'blankAward');
                awardSpriteTotalInfected.fixedToCamera = true;
                //awardSpriteTotalInfected.scale.setTo(2, 3);
                var awardTextTotalInfected = game.add.bitmapText(5, 5, 'mindPlay', '', 24);
                awardSpriteTotalInfected.addChild(awardTextTotalInfected);
                switch(totalInfectedThreshold) {
                    case 10:
                        awardTextTotalInfected.text = '  Medal Unlocked\n  Zee Spree \n  +100 points';
                        points+=100;
                        totalInfectedThreshold = 100;
                        break;
                    case 100:
                        awardTextTotalInfected.text = '  Medal Unlocked\n  Zee Spree \n  +200 points';
                        points+=200;
                        totalInfectedThreshold = 250;
                        break;
                    case 250:
                        awardTextTotalInfected.text = '  Medal Unlocked\n  Zee Spree \n  +300 points';
                        points+=300;
                        totalInfectedThreshold = 500;
                        break;
                    case 500:
                        awardTextTotalInfected.text = '  Medal Unlocked\n  Zee Spree \n  +400 points';
                        points+=400;
                        totalInfectedThreshold = 1000;
                        break;
                    case 1000:
                        awardTextTotalInfected.text = '  Medal Unlocked\n  Zee Spree \n  +500 points';
                        points+=500;
                        totalInfectedThreshold = 'max';
                        break;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, function () { awardSpriteTotalInfected.destroy(); medalAwardsShowing--; });
                break;
        }
        pointsText.text = 'Data: ' + points;
    },
    crateCreate: function(x, y) {
        crate = crates.create(x, y, 'crates');
        //crate.scale.setTo(2, 2);
        crate.frame = 0;
        crate.inputEnabled = true;
        crate.body.immovable = true;
        crate.events.onInputDown.add(this.crateSmash, this);
        var clickSign = game.add.sprite(-32, -32, 'click');
        clickSign.visible = false;
        crate.addChild(clickSign);
        game.time.events.add(Phaser.Timer.SECOND * 3.8-(hordeSpeed/1000), function () { clickSign.visible = true; });
    },
    crateSmash: function() {
        if (tutorialCounter==4) {
            this.tutorialAdvance();
        }
        crate.destroy();
        crateSmashSFX.play();
        var smashedCrate = game.add.sprite(crate.x, crate.y, 'crates');
        //smashedCrate.scale.setTo(2, 2);
        smashedCrate.frame = 1;
        smashedCrate.lifespan = 2000;
        this.crateCreate(crate.x+1100, game.world.height-96);
    },
    tutorial: function(x) {
        madScientist = game.add.sprite(x, game.world.height-128, 'madScientist');
        madScientist.animations.add('bubble', [0, 2, 1, 0, 2, 0, 1, 0, 2, 0, 2, 3], 8, true);
        madScientistAnim = madScientist.animations.add('run', [4, 0, 5], 10, true);
        madScientist.animations.play('bubble');
        //madScientist.fixedToCamera = true;
        speechBubble = game.add.button(48, -115, 'speechBubble', this.tutorialAdvance, this);
        madScientist.addChild(speechBubble);
        tutorialText = game.add.bitmapText(8, 5, 'mindPlay', '', 20);
        speechBubble.addChild(tutorialText); 
        tutorialClickSign = game.add.sprite(32, 100, 'click');
        tutorialClickSign.visible = false;
        speechBubble.addChild(tutorialClickSign);
        game.time.events.add(Phaser.Timer.SECOND * 1, function () { tutorialClickSign.visible = true; });
        speechBubble.timer = -1;
        this.tutorialAdvance();
    },
    madScientistUpdate: function() {
        madScientist.x = (distance*50)-350;
        if (!madScientistAnim.isPlaying) {
            madScientistAnim.play('run');//madScientist.animations.play('run');
        }
    },
    tutorialAdvance: function() {
        if (game.time.now>speechBubble.timer) {
            speechBubble.timer = game.time.now + 100;
            tutorialClickSign.visible = false;
            switch(tutorialCounter) {
                case 0:
                    tutorialText.text = "          Ah, You're \n finally here.This specimen\nis getting a little ripe but it\n   will suit our purpose.";
                    tutorialCounter++;
                    break;
                case 1:
                    tutorialText.text = "        Tap and hold\n the screen then drag the \ncannon to aim, and release \n   to fire my zombie.";
                    tutorialCounter++;
                    /*cannonCurve = game.add.sprite(42, game.world.height-350, 'tutorialCurve');
                    cannonCurve.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0], 20, true);
                    cannonCurve.animations.play('move');*/
                    break;
                case 2:
                    //cannonCurve.destroy();
                    tutorialText.text = "        My zombies \n will survive the landing \nbut immediately begin to \n      decompose.";
                    tutorialCounter++;
                    break;
                case 3:
                    tutorialText.text = "        It is very \n important that you clear \nany obstacles in the path\n    of my zombies.";
                    tutorialCounter++;
                    break;
                case 4:
                    tutorialText.text = "        My zombies\n will infect all they touch.\n A large enough horde is\n    almost unstoppable.";
                    tutorialCounter++;
                    break;
                case 5:
                    madScientist.animations.play('bubble');
                    tutorialText.text = "        Hmm, I was\n hoping for better. Still,\nwith the data we gained\n   I'll improve next time.";
                    tutorialCounter++;
                    break;
                case 7:
                    tutorialText.text = "        Ooh, pick \n up that brain. It has \n special properties and can\n   spawn a fresh zombie.";
                    tutorialCounter++;
                    var that = this;
                    game.time.events.add(Phaser.Timer.SECOND * 3.5, function () { that.tutorialAdvance(); });
                    //game.time.events.add(Phaser.Timer.SECOND * 4.5, function () { madScientist.destroy(); });
                    break;
                case 8:
                    tutorialText.text = "          Click the \n   brain icon to spawn a \n   zombie. Time it well to\n      extend your run.";
                    tutorialCounter++;
                    game.time.events.add(Phaser.Timer.SECOND * 3.5, function () { tutorialCounter++; });
                    game.time.events.add(Phaser.Timer.SECOND * 4.5, function () { madScientist.destroy(); });
                    break;
                case 10:
                    tutorialText.text = "         Time for a\n   Rampage! Click the \n button. Quick, the one\n    marked Rampage!";
                    game.time.events.add(Phaser.Timer.SECOND * 4.5, function () { tutorialCounter++; });
                    game.time.events.add(Phaser.Timer.SECOND * 6, function () { madScientist.destroy(); });
                    break;
            }
        }
    },
    save: function() {
        var saveObject = {};
        saveObject.power = power;
        saveObject.infectSlow = infectSlow;
        saveObject.bounceSlow = bounceSlow;
        saveObject.bounciness = bounciness;
        saveObject.health = health;
        saveObject.points = points;
        saveObject.hordeSpeed = hordeSpeed;
        saveObject.infectBoost = infectBoost;
        saveObject.detectZone = detectZone;
        saveObject.healthDeplete = healthDeplete;
        saveObject.rampageTrigger = rampageTrigger;
        saveObject.rampageTime = rampageTime;
        //saveObject.brainInView = brainInView;
        saveObject.brainPowerUpAvailable = brainPowerUpAvailable;
        saveObject.cannonDistance = cannonDistance;
        saveObject.maxHordeSize = maxHordeSize;
        saveObject.highestDistance = highestDistance;
        saveObject.totalDistance = totalDistance;
        saveObject.highestInfected = highestInfected;
        saveObject.totalInfected = totalInfected;
        saveObject.tutorialCounter = tutorialCounter;
        saveObject.nextPower = nextPower;
        saveObject.nextHealth = nextHealth;
        saveObject.nextSpeed = nextSpeed;
        saveObject.nextAgility = nextAgility;
        saveObject.agilityScore = agilityScore;
        saveObject.nextStealth = nextStealth;
        saveObject.nextInfect = nextInfect;
        saveObject.cannonDistanceThreshold = cannonDistanceThreshold;
        saveObject.maxHordeSizeThreshold = maxHordeSizeThreshold;
        saveObject.highestDistanceThreshold = highestDistanceThreshold;
        saveObject.totalDistanceThreshold = totalDistanceThreshold;
        saveObject.highestInfectedThreshold = highestInfectedThreshold;
        saveObject.totalInfectedThreshold = totalInfectedThreshold;
        //saveObject.madScientist.alive = false;
        localStorage.setItem("save", JSON.stringify(saveObject));
    },
};