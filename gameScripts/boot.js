/*global game*/

var bootState = {
    preload: function() {
        game.load.image('preloadBar', 'assets/preloadBar.png');
        game.canvas.id = 'canvasID';
    },
    create: function() {
        if (!game.device.desktop) { 
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //var canvasElement = document.getElementById("canvasID");
            //canvasElement.style.margin = '0';
            //game.scale.pageAlignHorizontally = true;
            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.input.onDown.add(this.gofull, this);
        }
        game.state.start('preload');
    }
};