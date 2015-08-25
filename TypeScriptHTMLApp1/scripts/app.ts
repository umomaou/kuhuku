import Game = require("game");
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas1");
setInterval(new Game(canvas.getContext('2d')).run, 1000 / 60);