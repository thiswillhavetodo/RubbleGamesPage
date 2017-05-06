/*global game */
/*global shopSwitchButton */
/*global shopSwitchText */
/*global cannonDistance */
/*global madScientist */

var medalsText;
var medalInfoText;
var medalsBackgroundBar;

var cannonDistanceMedalButton;
var cannonDistanceMedalButtonText;
var cannonDistanceText;
var cannonDistanceThreshold = 50;
var maxHordeSizeMedalButton;
var maxHordeSizeMedalButtonText;
var maxHordeSizeText;
var maxHordeSizeThreshold = 5;
var highestDistanceMedalButton;
var highestDistanceMedalButtonText;
var highestDistanceText;
var highestDistanceThreshold = 100;
var totalDistanceMedalButton;
var totalDistanceMedalButtonText;
var totalDistanceText;
var totalDistanceThreshold = 250;
var highestInfectedMedalButton;
var highestInfectedMedalButtonText;
var highestInfectedText;
var highestInfectedThreshold = 2;
var totalInfectedMedalButton;
var totalInfectedMedalButtonText;
var totalInfectedText;
var totalInfectedThreshold = 10;

var leaveMedalButton;
var leaveMedalText;

var backgroundBar;
var cannonDistanceMedalBar;
var cannonDistanceMedalCrop;
var maxHordeSizeMedalBar;
var maxHordeSizeMedalCrop;
var highestDistanceMedalBar;
var highestDistanceMedalCrop;
var totalDistanceMedalBar;
var totalDistanceMedalCrop;
var highestInfectedMedalBar;
var highestInfectedMedalCrop;
var totalInfectedMedalBar;
var totalInfectedMedalCrop;

var cannonDistancePic;
var maxHordeSizePic;
var highestDistancePic;
var totalDistancePic;
var highestInfectedPic;
var totalInfectedPic;

var medalState = {
    create: function() {
        game.add.sprite(0, 0, 'shopBackground');
        game.world.setBounds(0, 0, 720, 405);
        medalsBackgroundBar = game.add.sprite(180, 2, 'blankButton');
        medalsBackgroundBar.scale.x = 1.5; //setTo = (2, 2);//0x6970f8;
        medalsBackgroundBar.scale.y = 1.25;
        medalsText = game.add.bitmapText(196, 3, 'bmBlock', 'Medals', 40);
        medalsText.tint = 000000;
        
        shopSwitchButton = game.add.button(565, 6, 'blankButton', this.switchShop, this); 
        shopSwitchText = game.add.bitmapText(587, 8, 'bmBlock', 'Shop', 30);
        shopSwitchText.tint = 000000;
        
        cannonDistanceMedalButton = game.add.button(23, 52, 'shopInfoBlank', this.cannonDistanceMedalInfoShow, this);
        cannonDistancePic = game.add.button(29, 59, 'cannonBack', this.cannonDistanceMedalInfoShow, this);
        cannonDistancePic.alpha = 0.4;
        cannonDistanceMedalButtonText = game.add.bitmapText(39, 70, 'bmBlock', 'Is it a\n bird? ', 30);
        cannonDistanceMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(34, 140, 'progressBarHolder');
        cannonDistanceMedalBar = game.add.sprite(38, 140, 'progressBar');
        cannonDistanceMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        cannonDistanceMedalBar.crop(cannonDistanceMedalCrop);
        cannonDistanceMedalCrop.x = 150-((cannonDistance/cannonDistanceThreshold)*150);
        cannonDistanceMedalBar.updateCrop();
        cannonDistanceText = game.add.bitmapText(70, 155, 'mindPlay', Math.floor(cannonDistance) + '/' + cannonDistanceThreshold, 20);
        cannonDistanceText.tint = 000000;
        
        maxHordeSizeMedalButton = game.add.button(201, 52, 'shopInfoBlank', this.maxHordeSizeMedalInfoShow, this);
        maxHordeSizePic = game.add.button(207, 59, 'hordeBack', this.maxHordeSizeMedalInfoShow, this);
        maxHordeSizePic.alpha = 0.4;
        maxHordeSizeMedalButtonText = game.add.bitmapText(217, 70, 'bmBlock', 'Such a\nHorder', 30);
        maxHordeSizeMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(212, 140, 'progressBarHolder');
        maxHordeSizeMedalBar = game.add.sprite(216, 140, 'progressBar');
        maxHordeSizeMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        maxHordeSizeMedalBar.crop(maxHordeSizeMedalCrop);
        maxHordeSizeMedalCrop.x = 150-((maxHordeSize/maxHordeSizeThreshold)*150);
        maxHordeSizeMedalBar.updateCrop();        
        maxHordeSizeText = game.add.bitmapText(248, 155, 'mindPlay', maxHordeSize + '/' + maxHordeSizeThreshold, 20);
        maxHordeSizeText.tint = 000000;
        
        highestDistanceMedalButton = game.add.button(379, 52, 'shopInfoBlank', this.highestDistanceMedalInfoShow, this);
        highestDistancePic = game.add.button(385, 59, 'distanceBack', this.highestDistanceMedalInfoShow, this);
        highestDistancePic.alpha = 0.4;
        highestDistanceMedalButtonText = game.add.bitmapText(400, 70, 'bmBlock', 'Rot &\n  Roll', 30);
        highestDistanceMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(390, 140, 'progressBarHolder');
        highestDistanceMedalBar = game.add.sprite(394, 140, 'progressBar');
        highestDistanceMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        highestDistanceMedalBar.crop(highestDistanceMedalCrop);
        highestDistanceMedalCrop.x = 150-((highestDistance/highestDistanceThreshold)*150);
        highestDistanceMedalBar.updateCrop();        
        highestDistanceText = game.add.bitmapText(426, 155, 'mindPlay', Math.floor(highestDistance) + '/' + highestDistanceThreshold, 20);
        highestDistanceText.tint = 000000;
        
        totalDistanceMedalButton = game.add.button(23, 207, 'shopInfoBlank', this.totalDistanceMedalInfoShow, this);
        totalDistancePic = game.add.button(29, 214, 'distanceBack2', this.totalDistanceMedalInfoShow, this);
        totalDistancePic.alpha = 0.4;
        totalDistanceMedalButtonText = game.add.bitmapText(40, 225, 'bmBlock', 'Travel\n  Sick', 30);
        totalDistanceMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(34, 295, 'progressBarHolder');
        totalDistanceMedalBar = game.add.sprite(38, 295, 'progressBar');
        totalDistanceMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        totalDistanceMedalBar.crop(totalDistanceMedalCrop);
        totalDistanceMedalCrop.x = 150-((totalDistance/totalDistanceThreshold)*150);
        totalDistanceMedalBar.updateCrop();        
        totalDistanceText = game.add.bitmapText(70, 310, 'mindPlay', Math.floor(totalDistance) + '/' + totalDistanceThreshold, 20);
        totalDistanceText.tint = 000000;
        
        highestInfectedMedalButton = game.add.button(201, 207, 'shopInfoBlank', this.highestInfectedMedalInfoShow, this);
        highestInfectedPic = game.add.button(207, 214, 'infectBack', this.highestInfectedMedalInfoShow, this);
        highestInfectedPic.alpha = 0.4;
        highestInfectedMedalButtonText = game.add.bitmapText(225, 225, 'bmBlock', 'Going\nGreen', 30);
        highestInfectedMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(212, 295, 'progressBarHolder');
        highestInfectedMedalBar = game.add.sprite(216, 295, 'progressBar');
        highestInfectedMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        highestInfectedMedalBar.crop(highestInfectedMedalCrop);
        highestInfectedMedalCrop.x = 150-((highestInfected/highestInfectedThreshold)*150);
        highestInfectedMedalBar.updateCrop();        
        highestInfectedText = game.add.bitmapText(248, 310, 'mindPlay', highestInfected + '/' + highestInfectedThreshold, 20);
        highestInfectedText.tint = 000000;
        
        madScientist = game.add.sprite(4, 295, 'madScientist');
        madScientist.scale.setTo(1.1, 1.1);
        madScientist.animations.add('bubble', [0, 2, 1, 0, 2, 0, 1, 0, 2, 0, 2, 3], 8, true);
        madScientist.animations.play('bubble');
        
        totalInfectedMedalButton = game.add.button(379, 207, 'shopInfoBlank', this.totalInfectedMedalInfoShow, this);
        totalInfectedPic = game.add.button(385, 214, 'infectBack2', this.totalInfectedMedalInfoShow, this);
        totalInfectedPic.alpha = 0.4;
        totalInfectedMedalButtonText = game.add.bitmapText(402, 225, 'bmBlock', ' Zee\nSpree', 30);
        totalInfectedMedalButtonText.tint = 000000;
        backgroundBar = game.add.sprite(390, 295, 'progressBarHolder');
        totalInfectedMedalBar = game.add.sprite(394, 295, 'progressBar');
        totalInfectedMedalCrop = new Phaser.Rectangle(0, 0, 150, 50);
        totalInfectedMedalBar.crop(totalInfectedMedalCrop);
        totalInfectedMedalCrop.x = 150-((totalInfected/totalInfectedThreshold)*150);
        totalInfectedMedalBar.updateCrop();        
        totalInfectedText = game.add.bitmapText(426, 310, 'mindPlay', totalInfected + '/' + totalInfectedThreshold, 20);
        totalInfectedText.tint = 000000;
        
        medalInfoText = game.add.bitmapText(582, 115, 'mindPlay', ' Click or tap\n each medal to\nview information\nabout their unlock\ncriteria and \nrewards.', 18);
        
        leaveMedalButton = game.add.button(565, 360, 'blankButton', this.leaveMedal, this);
        leaveMedalText = game.add.bitmapText(595, 365, 'bmBlock', 'Exit', 30);
        leaveMedalText.tint = 000000;
    },
    leaveMedal: function() {
        shopMusic.stop();
        this.save();
        game.state.start('main');
    },
    switchShop: function() {
        game.state.start('shop');
    },
    cannonDistanceMedalInfoShow: function() {
        medalInfoText.text = 'Longest cannon\nshot (includes\nbounces)\n\nNext Reward:\n 100 points\n at ' + cannonDistanceThreshold + ' metres';
    },
    maxHordeSizeMedalInfoShow: function() {
        medalInfoText.text = 'Largest zombie\n horde size \n\nNext Reward:\n 100 points\n at ' + maxHordeSizeThreshold + ' Zombies';
    },
    highestDistanceMedalInfoShow: function() {
        medalInfoText.text = 'Highest distance\n in a single game.\n\nNext Reward:\n 100 points\n at ' + highestDistanceThreshold + ' metres';
    },
    totalDistanceMedalInfoShow: function() {
        medalInfoText.text = 'Total distance\n in all games. \n\nNext Reward:\n 100 points\n at ' + totalDistanceThreshold + ' metres';
    },
    highestInfectedMedalInfoShow: function() {
        medalInfoText.text = 'Most citizens\n infected in a\n single game.\n\nNext Reward:\n 100 points\n at ' + highestInfectedThreshold + ' Zombies';
    },
    totalInfectedMedalInfoShow: function() {
        medalInfoText.text = 'Total citizens\n infected in\n all games. \n\nNext Reward:\n 100 points\n at ' + totalInfectedThreshold + ' Zombies';
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