/*global game */
/*global power */
/*global points */
/*global health */
/*global pointsText */
/*global hordeSpeed */

var healthBoostButton;
var healthBoostText;
var powerBoostButton;
var powerBoostText;
var speedBoostButton;
var speedBoostText;
var agilityBoostButton;
var agilityBoostText;
var stealthBoostButton;
var stealthBoostText;
var infectRewardBoostButton;
var infectRewardBoostText;
var nextPower = 100;
var nextHealth = 100;
var nextSpeed = 100;
var nextAgility = 100;
var agilityScore = 100;
var nextStealth = 100;
var nextInfect = 100;
var leaveShopButton;
var leaveShopText;
var shopPointsText;
var shopSwitchButton;
var shopSwitchText;
var boostButtonText;
var madScientist;

var infoText;
var powerInfoButton;
var powerInfoButtonText;
var healthInfoButton;
var healthInfoButtonText;
var speedInfoButton;
var speedInfoButtonText;
var agilityInfoButton;
var agilityInfoButtonText;
var stealthInfoButton;
var stealthInfoButtonText;
var infectInfoButton;
var infectInfoButtonText;

var boostButtonTimer = 0;

var shopMusic;

var shopState = {
    create: function() {
        game.add.sprite(0, 0, 'shopBackground');
        game.world.setBounds(0, 0, 720, 405);
        shopPointsText = game.add.bitmapText(15, 5, 'bmBlock', 'Data: ' + points, 30);
        //shopPointsText.tint = 000000;
        
        shopSwitchButton = game.add.button(565, 6, 'blankButton', this.switchShop, this); 
        shopSwitchText = game.add.bitmapText(570, 8, 'bmBlock', 'Medals', 30);
        shopSwitchText.tint = 000000;
        
        powerInfoButton = game.add.button(23, 52, 'shopInfoBlank', this.cannonInfoShow, this);
        powerInfoButtonText = game.add.bitmapText(32, 57, 'bmBlock', 'Cannon\nPower', 30);
        powerInfoButtonText.tint = 000000;
        powerBoostButton = game.add.button(38, 153, 'blankButton', this.cannonPowerBoost, this);
        powerBoostText = game.add.bitmapText(36, 127, 'bmBlock', nextPower +' data', 20);
        if (nextPower>=1000) {
            powerBoostText.x = 28;
        }
        boostButtonText = game.add.bitmapText(70, 155, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        healthInfoButton = game.add.button(201, 52, 'shopInfoBlank', this.healthInfoShow, this);
        healthInfoButtonText = game.add.bitmapText(210, 57, 'bmBlock', 'Zombie\nHealth', 30);
        healthInfoButtonText.tint = 000000;
        healthBoostButton = game.add.button(216, 153, 'blankButton', this.healthBoost, this);
        healthBoostText = game.add.bitmapText(214, 127, 'bmBlock', nextHealth +' data', 20);
        if (nextHealth>=1000) {
            healthBoostText.x = 206;
        }
        boostButtonText = game.add.bitmapText(248, 155, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        speedInfoButton = game.add.button(379, 52, 'shopInfoBlank', this.speedInfoShow, this);
        speedInfoButtonText = game.add.bitmapText(388, 57, 'bmBlock', 'Zombie\nSpeed', 30);
        speedInfoButtonText.tint = 000000;
        speedBoostButton = game.add.button(394, 153, 'blankButton', this.speedBoost, this);
        speedBoostText = game.add.bitmapText(392, 127, 'bmBlock', nextSpeed +' data', 20);
        if (nextSpeed>=1000) {
            speedBoostText.x = 384;
        }
        boostButtonText = game.add.bitmapText(426, 155, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        agilityInfoButton = game.add.button(23, 207, 'shopInfoBlank', this.agilityInfoShow, this);
        agilityInfoButtonText = game.add.bitmapText(32, 212, 'bmBlock', 'Zombie\nAgility', 30);
        agilityInfoButtonText.tint = 000000;
        agilityBoostButton = game.add.button(38, 308, 'blankButton', this.agilityBoost, this);
        agilityBoostText = game.add.bitmapText(36, 282, 'bmBlock', nextAgility +' data', 20);
        if (nextAgility>=1000) {
            agilityBoostText.x = 28;
        }
        boostButtonText = game.add.bitmapText(70, 310, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        stealthInfoButton = game.add.button(201, 207, 'shopInfoBlank', this.stealthInfoShow, this);
        stealthInfoButtonText = game.add.bitmapText(210, 212, 'bmBlock', 'Zombie\nStealth', 30);
        stealthInfoButtonText.tint = 000000;
        stealthBoostButton = game.add.button(216, 308, 'blankButton', this.stealthBoost, this);
        stealthBoostText = game.add.bitmapText(214, 282, 'bmBlock', nextStealth +' data', 20);
        if (nextStealth>=1000) {
            stealthBoostText.x = 206;
        }
        boostButtonText = game.add.bitmapText(248, 310, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        madScientist = game.add.sprite(4, 295, 'madScientist');
        madScientist.scale.setTo(1.1, 1.1);
        madScientist.animations.add('bubble', [0, 2, 1, 0, 2, 0, 1, 0, 2, 0, 2, 3], 8, true);
        madScientist.animations.play('bubble');
        if (tutorialCounter==6) {
            speechBubble = game.add.sprite(48, -115, 'speechBubble');
            madScientist.addChild(speechBubble);
            tutorialText = game.add.bitmapText(10, 5, 'mindPlay', '', 20);
            speechBubble.addChild(tutorialText); 
            tutorialText.text = "        I can upgrade\n   my zombies with the\n data we have, but what\n     to work on first?";
            game.time.events.add(Phaser.Timer.SECOND * 4, function () { speechBubble.destroy(); });
            tutorialCounter++;
        }
        else if (speechBubble!=null && speechBubble.exists) {
            speechBubble.destroy();
        }
        
        infectInfoButton = game.add.button(379, 207, 'shopInfoBlank', this.infectInfoShow, this);
        infectInfoButtonText = game.add.bitmapText(388, 212, 'bmBlock', 'Infect\nBoost', 30);
        infectInfoButtonText.tint = 000000;
        infectRewardBoostButton = game.add.button(394, 308, 'blankButton', this.infectRewardBoost, this);
        infectRewardBoostText = game.add.bitmapText(392, 282, 'bmBlock', nextInfect +' data', 20);
        if (nextInfect>=1000) {
            infectRewardBoostText.x = 384;
        }
        boostButtonText = game.add.bitmapText(426, 310, 'bmBlock', 'Buy', 30);
        boostButtonText.tint = 000000;
        
        infoText = game.add.bitmapText(582, 115, 'mindPlay', 'Click or tap\neach upgrade to\nview information\nabout the boosts\n they provide.', 18);
        
        leaveShopButton = game.add.button(565, 360, 'blankButton', this.leaveShop, this);
        leaveShopText = game.add.bitmapText(595, 365, 'bmBlock', 'Exit', 30);
        leaveShopText.tint = 000000;
        
        if (shopMusic==null || shopMusic==undefined) {
            shopMusic = game.add.audio('shopTheme');
        }
        if (!shopMusic.isPlaying) {
            shopMusic.play();
        }
    },
    cannonPowerBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextPower) {
            boostButtonTimer = game.time.time + 100;
            power += 100;
            points -= nextPower;
            shopPointsText.text = 'Data: ' + points;
            nextPower += 100;
            powerBoostText.text = nextPower +' data';
            if (nextPower>=1000) {
                powerBoostText.x = 28;
            }
        }
    },
    healthBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextHealth) {
            boostButtonTimer = game.time.time + 100;
            health += 25;
            points -= nextHealth;
            shopPointsText.text = 'Data: ' + points;
            nextHealth += 100;
            healthBoostText.text = nextHealth +' data';
            if (nextHealth>=1000) {
                healthBoostText.x = 206;
            }
        }
    },
    speedBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextSpeed) {
            boostButtonTimer = game.time.time + 100;
            hordeSpeed += 10;
            points -= nextSpeed;
            shopPointsText.text = 'Data: ' + points;
            nextSpeed += 100;
            speedBoostText.text = nextSpeed +' data';
            if (nextSpeed>=1000) {
                speedBoostText.x = 384;
            }
        }
    },
    agilityBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextAgility) {
            boostButtonTimer = game.time.time + 100;
            bounceSlow -= 3;
            infectSlow -= 1;
            bounciness += 0.03;
            agilityScore += 10;
            points -= nextAgility;
            shopPointsText.text = 'Data: ' + points;
            nextAgility += 100;
            agilityBoostText.text = nextAgility +' data';
            if (nextAgility>=1000) {
                agilityBoostText.x = 28;
            }
        }
    },
    stealthBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextStealth) {
            boostButtonTimer = game.time.time + 100;
            detectZone -= 12.5;
            points -= nextStealth;
            shopPointsText.text = 'Data: ' + points;
            nextStealth += 100;
            stealthBoostText.text = nextStealth +' data';
            if (nextStealth>=1000) {
                stealthBoostText.x = 206;
            }
        }
    },
    infectRewardBoost: function() {
        if (game.time.time>boostButtonTimer && points>=nextInfect) {
            boostButtonTimer = game.time.time + 100;
            infectBoost += 5;
            points -= nextInfect;
            shopPointsText.text = 'Data: ' + points;
            nextInfect += 100;
            infectRewardBoostText.text = nextInfect +' data';
            if (nextInfect>=1000) {
                infectRewardBoostText.x = 384;
            }
        }
    },
    leaveShop: function() {
        shopMusic.stop();
        this.save();
        game.state.start('main');
    },
    switchShop: function() {
        game.state.start('medal');
    },
    cannonInfoShow: function() {
        infoText.text = 'Cannon Power:\n'+ power + '\nNext Upgrade:\n ' + (power+100) + '\n\nShoot your next\nZombie Test\nSubject closer to\n major population\n centres.';
    },
    healthInfoShow: function() {
        infoText.text = 'Zombie Health:\n'+ health + '\nNext Upgrade:\n ' + (health+25) + '\n\nRaise the health\nof Test Subjects\nand infected\n citizens.';
    },
    speedInfoShow: function() {
        infoText.text = 'Zombie Speed:\n'+ hordeSpeed + '\nNext Upgrade:\n ' + (hordeSpeed+10) + '\n\nZombies on the\nground run\nfaster.';
    },
    agilityInfoShow: function() {
        infoText.text = 'Zombie Agility:\n'+ agilityScore + '%\nNext Upgrade:\n ' + (agilityScore+10) + '%\n\nZombies in flight\nmake better\nlandings. All\n Zombies are \nslowed less when\n infecting citizens.';
    },
    stealthInfoShow: function() {
        infoText.text = 'Detect Zone:\n'+ detectZone/50 + 'm\nNext Upgrade:\n ' + (detectZone-12.5)/50 + 'm\n\nReduces the \nrange at which \ncitizens become \naware of the\nincoming Zombie\n Horde.';
    },
    infectInfoShow: function() {
        infoText.text = 'Infect Boost:\n'+ infectBoost + '\nNext Upgrade:\n ' + (infectBoost+5) + '\n\nIncreases the\nhealth boost a\nZombie receives\nwhen infecting a\n citizen.';
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
        localStorage.setItem("save", JSON.stringify(saveObject));
    },
};