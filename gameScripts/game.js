/*global Phaser*/
var game = new Phaser.Game(720, 405, Phaser.CANVAS, '');

game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('menu', menuState);
game.state.add('credits', creditState);
game.state.add('main', mainState);
game.state.add('shop', shopState);
game.state.add('medal', medalState);

game.state.start('boot');