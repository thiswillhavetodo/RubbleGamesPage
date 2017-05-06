/* global game*/
var backgroundMenu;
var menuTheme;

var menuState = {
    create: function() {
        menuTheme = game.add.audio('menuTheme');
        menuTheme.play();
        backgroundMenu = game.add.sprite(0, 0, 'menuBack');
        backgroundMenu.scale.setTo(0.5, 0.5);
        game.add.bitmapText(5, 380, 'mindPlay', 'Version 0.3', 20);
        game.add.button(200, 300, 'blankButton', this.playGame, this);
        game.add.bitmapText(215, 305, 'mindPlay', 'New Game', 28);
        game.add.button(378, 300, 'blankButton', this.loadGame, this);
        game.add.bitmapText(390, 305, 'mindPlay', 'Load Save', 28);
        game.add.button(550, 5, 'blankButton', this.credits, this);
        game.add.bitmapText(575, 10, 'mindPlay', 'Credits', 28);
    },
    playGame: function() {
        menuTheme.stop();
        game.state.start('main');
    },
    loadGame: function() {
        /*var i;
        console.log("local storage");
        for (i = 0; i < localStorage.length; i++)   {
            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }*/
        var save = localStorage.getItem("save");
        saveObject = JSON.parse(save);
        power = saveObject.power;
        infectSlow = saveObject.infectSlow;
        bounceSlow = saveObject.bounceSlow;
        bounciness = saveObject.bounciness;
        health = saveObject.health;
        points = saveObject.points;
        hordeSpeed = saveObject.hordeSpeed;
        infectBoost = saveObject.infectBoost;
        detectZone = saveObject.detectZone;
        healthDeplete = saveObject.healthDeplete;
        rampageTrigger = saveObject.rampageTrigger;
        rampageTime = saveObject.rampageTime;
        //brainInView = saveObject.brainInView;
        brainPowerUpAvailable = saveObject.brainPowerUpAvailable;
        cannonDistance = saveObject.cannonDistance;
        maxHordeSize = saveObject.maxHordeSize;
        highestDistance = saveObject.highestDistance;
        totalDistance = saveObject.totalDistance;
        highestInfected = saveObject.highestInfected;
        totalInfected = saveObject.totalInfected;
        tutorialCounter = saveObject.tutorialCounter;
        nextPower = saveObject.nextPower;
        nextHealth = saveObject.nextHealth;
        nextSpeed = saveObject.nextSpeed;
        nextAgility = saveObject.nextAgility;
        agilityScore = saveObject.agilityScore;
        nextStealth = saveObject.nextStealth;
        nextInfect = saveObject.nextInfect;
        cannonDistanceThreshold = saveObject.cannonDistanceThreshold;
        maxHordeSizeThreshold = saveObject.maxHordeSizeThreshold;
        highestDistanceThreshold = saveObject.highestDistanceThreshold;
        totalDistanceThreshold = saveObject.totalDistanceThreshold;
        highestInfectedThreshold = saveObject.highestInfectedThreshold;
        totalInfectedThreshold = saveObject.totalInfectedThreshold;
        //madScientist.alive = false;
        menuTheme.stop();
        game.state.start('main');
    },
    credits: function() {
        game.state.start('credits');
    },
}