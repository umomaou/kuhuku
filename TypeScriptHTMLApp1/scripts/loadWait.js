var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "KYScene"], function (require, exports, KYScene) {
    var LoadWait = (function (_super) {
        __extends(LoadWait, _super);
        function LoadWait(game) {
            var _this = this;
            _super.call(this, game);
            this.init = function () {
                _this.count = 0;
            };
            this.calc = function () {
                if (!_this.music.isLoading())
                    return;
                if (!_this.se.isLoading())
                    return;
                _this.volumeChange();
                _this.changeScene("title");
            };
            this.graph = function () { };
            this.countUp = function () {
                _this.count++;
            };
            this.volumeChange = function () {
                _this.se.changeVolume("pause", 0.5);
                _this.se.changeVolume("get_item", 0.5);
                _this.se.changeVolume("death", 180 / 255);
                _this.se.changeVolume("death2", 96 / 255);
                _this.se.changeVolume("jump", 72 / 255);
                _this.se.changeVolume("select", 140 / 255);
                _this.se.changeVolume("ok", 140 / 155);
                _this.se.changeVolume("gameover", 140 / 255);
            };
        }
        return LoadWait;
    })(KYScene);
    return LoadWait;
});
