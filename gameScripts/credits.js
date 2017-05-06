var creditSequence = 0;
var creditHeader;
var creditText;

var creditState = {
    create: function() {
        game.stage.backgroundColor = '#e3e3e3';
        game.add.button(5, 5, 'blankButton', this.menuReturn, this);
        game.add.bitmapText(40, 10, 'mindPlay', 'Menu', 30);
        creditHeader = game.add.bitmapText(240, 100, 'mindPlay', '', 34);
        creditText = game.add.bitmapText(280, 200, 'mindPlay', '', 30);
        this.creditsUpdate();
        var that = this;
        if (creditSequence<9) {
            game.time.events.add(Phaser.Timer.SECOND * 2.3, function () { creditSequence++; creditHeader.text = ""; creditText.text = ""; that.create(); });
        }
    },
    creditsUpdate: function() {
        switch(creditSequence) {
            case 0: 
                creditHeader.text = "   Game Design";
                creditText.text = "Paul McGarry";
                break;
            case 1: 
                creditHeader.text = "Lead Programmer";
                creditText.text = "Paul McGarry";
                break;
            case 2: 
                creditHeader.text = "      Artwork";
                creditText.text = "Paul McGarry";
                break;
            case 3: 
                creditHeader.text = "      Music";
                creditText.text = '"Happy Happy Game Show" Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License\n     http://creativecommons.org/licenses/by/3.0/';
                creditText.x = 10;
                break;
            case 4: 
                creditHeader.text = "      Music";
                creditText.text = '      "Rock on Chicago" Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License\n     http://creativecommons.org/licenses/by/3.0/';
                creditText.x = 10;
                break;
            case 5: 
                creditHeader.text = "      Music";
                creditText.text = '"Local Forecast - Elevator" Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License\n     http://creativecommons.org/licenses/by/3.0/';
                creditText.x = 10;
                break;
            case 6: 
                creditHeader.text = "Sound Effects";
                creditText.text = "                 Freesound.org\n\nqueen_westeros           juliabosque       Xenonn\nDeathstardude           bigmonmulgrew    missozzy\nlittlerobotsoundfactory    Quaker540      Srehpog";
                creditText.x = 80;
                break;
            case 7: 
                creditHeader.text = "Sound Effects";
                creditText.text = "Opengameart.org\n\n   artisticdude";
                creditText.x = 220;
                break;
            case 8: 
                creditHeader.text = "     Testing";
                creditText.text = "Paul McGarry\nCorreen Robinson";
                creditText.x = 270;
                break;
            case 9: 
                creditHeader.text = "";
                creditText.text = "Thanks for playing.";
                break;
        }
    },
    menuReturn: function() {
        creditSequence = 0;
        menuTheme.stop();
        game.state.start('menu');
    }
}