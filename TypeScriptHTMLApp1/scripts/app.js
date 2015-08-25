define(["require", "exports", "game"], function (require, exports, Game) {
    var canvas = document.getElementById("canvas1");
    setInterval(new Game(canvas.getContext('2d')).run, 1000 / 60);
});
