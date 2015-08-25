define(["require", "exports"], function (require, exports) {
    var KYScene = (function () {
        function KYScene(game) {
            this.ctx = game.getCtx();
            this.image = game.getImage();
            this.music = game.getMusic();
            this.se = game.getSe();
            this.keyControl = game.getKeyControl();
            this.changeScene = game.changeSceneLater;
        }
        KYScene.prototype.changeScene = function (string) { };
        ;
        return KYScene;
    })();
    return KYScene;
});
