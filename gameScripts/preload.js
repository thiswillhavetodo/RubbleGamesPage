/*global game*/
/*global Phaser*/
var preloadState = {
    preload: function() {
    
        game.preloadBar = game.add.sprite(game.world.centerX-64, game.world.centerY + 128, 'preloadBar');
        game.preloadBar.anchor.setTo(0);
     
        game.load.setPreloadSprite(game.preloadBar);
        
        //game.load.tilemap('tilemap', 'assets/zombieMapTileTest.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tiles', 'assets/tilesetTest.png', 32, 32);
        game.load.spritesheet('crates', 'assets/crates.png', 64, 64);
        game.load.spritesheet('zombie', 'assets/pixelZombie.png', 48, 96);
        game.load.spritesheet('man', 'assets/pixelMan.png', 64, 96);
        game.load.spritesheet('madScientist', 'assets/pixelMadScientist.png', 64, 96);
        game.load.spritesheet('zombieDeath', 'assets/zombieDeath.png', 96, 96);
        game.load.spritesheet('shooters', 'assets/pixelShooters.png', 72, 96);
        game.load.spritesheet('rampageButton', 'assets/rampageButton.png', 144, 39);
        game.load.spritesheet('projectiles', 'assets/fighterProjectiles.png', 16, 16);
        game.load.spritesheet('fighters', 'assets/pixelFighters.png', 80, 96);
        game.load.spritesheet('brain', 'assets/pixelBrain.png', 90, 75);
        game.load.spritesheet('hider', 'assets/pixelWindowHider.png', 48, 48);
        game.load.spritesheet('explosion', 'assets/pixelCannonExplosion.png', 150, 150);
        game.load.spritesheet('rampage', 'assets/rampageSprites.png', 422, 72);
        //game.load.spritesheet('tutorialCurve', 'assets/tutorialCurve.png', 262, 190);
        //game.load.image('map1', 'assets/zombieMapImage1.png');
        //game.load.image('map2', 'assets/zombieMapImage2.png');
        game.load.image('bullet', 'assets/pixelBullet.png');
        game.load.image('zombieTop', 'assets/pixelZombieTop.png');
        game.load.image('cannonBase', 'assets/pixelCannonBase.png');
        game.load.image('cannonBarrel', 'assets/pixelCannonBarrel.png');
        game.load.image('blankButton', 'assets/pixelBlankButton.png');
        game.load.image('blankAward', 'assets/pixelBlankButton200x100.png');
        game.load.image('shopBackground', 'assets/pixelShopBackground.png');
        game.load.image('rampageBar', 'assets/rampageBar.png');
        game.load.image('hordeBack', 'assets/hordeMedalBackground.png');
        game.load.image('cannonBack', 'assets/cannonMedalBackground.png');
        game.load.image('infectBack', 'assets/infectMedalBackground.png');
        game.load.image('infectBack2', 'assets/infectMedalBackground2.png');
        game.load.image('distanceBack', 'assets/distanceMedalBackground.png');
        game.load.image('distanceBack2', 'assets/distanceMedalBackground2.png');
        game.load.image('shopInfoBlank', 'assets/pixelShopInfoButton.png');
        game.load.image('shopInfoRampage', 'assets/pixelShopRampageButton.png');
        game.load.image('rampageBarHolder', 'assets/rampageBarHolder.png');
        game.load.image('popSign', 'assets/pixelPopSign.png');
        game.load.image('pixelHouse', 'assets/pixelHouseWhite.png');
        game.load.image('pixelHouse1', 'assets/pixelHouse1.png');
        game.load.image('hill', 'assets/hill.png');
        game.load.image('click', 'assets/clickSign.png');
        game.load.image('speechBubble', 'assets/speechBubbleReverse.png');
        game.load.image('progressBar', 'assets/progressBar.png');
        game.load.image('progressBarHolder', 'assets/progressBarBorder.png');
        game.load.image('menuBack', 'assets/zombieCannonMenu.png');
        game.load.image('resultsBack', 'assets/resultsBackground.png');
        //game.load.spritesheet('bush', 'assets/bush.png', 96, 96);
        game.load.bitmapFont('bmBlock', 'assets/bmBlockBitmap.png', 'assets/bmBlockBitmap.fnt');
        game.load.bitmapFont('mindPlay', 'assets/MindPlayBitmap.png', 'assets/MindPlayBitmap.fnt');
        game.load.audio('boom', 'assets/245372_quaker540_hq-explosion.ogg');
        game.load.audio('zombieSpawn', 'assets/mnstr9.ogg');
        game.load.audio('zombieDeath', 'assets/346626_bigmonmulgrew_zombie-moan.ogg');
        game.load.audio('maleScream', 'assets/maleDeath.ogg');
        game.load.audio('femaleScream', 'assets/femaleDeath.ogg');
        game.load.audio('crateSmash', 'assets/woodSmash.ogg');
        game.load.audio('trumpetCall', 'assets/trumpetCall.ogg');
        game.load.audio('voiceRampage', 'assets/VoiceRampage.ogg');
        game.load.audio('gunshot', 'assets/128294_xenonn_layered-gunshot-2.ogg');
        game.load.audio('scream3', 'assets/222589_queen-westeros_man-scream.ogg');
        game.load.audio('scream4', 'assets/381802_juliabosque_scream3-bosque-julia.ogg');
        game.load.audio('theme', 'assets/Rock_on_Chicago.ogg');
        game.load.audio('shopTheme', 'assets/Local_Forecast_-_Elevator.ogg');
        game.load.audio('menuTheme', 'assets/Happy_Happy_Game_Show.ogg');
    },
    create: function() {
        game.state.start('menu');
    },
};