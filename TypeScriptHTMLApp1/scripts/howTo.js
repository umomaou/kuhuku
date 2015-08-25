var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "KYScene"], function (require, exports, KYScene) {
    var anime = [0, 1, 2, 3, 4, 3, 2, 1];
    var HowTo = (function (_super) {
        __extends(HowTo, _super);
        function HowTo(game) {
            var _this = this;
            _super.call(this, game);
            this.init = function () {
                _this.count = 0;
                _this.scroll = 0;
                _this.whiteDepth = 1;
                _this.currentTime = -1;
            };
            this.calc = function () {
                if (_this.count == 0)
                    _this.music.play("bgm1");
                if (_this.count <= 30) {
                    _this.whiteDepth -= 1 / 30;
                    _this.music.changeVolume("bgm1", _this.count / 30);
                }
                if (_this.keyControl.getKey("X").getCount() == 1) {
                    _this.currentTime = _this.count;
                }
                if (_this.currentTime != -1) {
                    _this.whiteDepth = (_this.count - _this.currentTime) / 30;
                    _this.music.changeVolume("bgm1", 1 - (_this.count - _this.currentTime) / 30);
                    if ((_this.count - _this.currentTime) == 30) {
                        _this.changeScene("title");
                        _this.music.stop("bgm1");
                    }
                }
                if (_this.keyControl.getKey("Up").getCount() > 0 && _this.scroll > 0 && _this.currentTime == -1) {
                    _this.scroll -= 3;
                }
                if (_this.keyControl.getKey("Down").getCount() > 0 && _this.scroll < 768 && _this.currentTime == -1) {
                    _this.scroll += 3;
                }
            };
            this.graph = function () {
                _this.ctx.fillStyle = "rgb(0,55,1)";
                _this.ctx.fillRect(0, 0, 480, 432);
                _this.ctx.drawImage(_this.image.get("howto"), 0, _this.scroll, 432, 336, 24, 48, 432, 336);
                _this.image.drawDiv(_this.ctx, "rumia", anime[Math.floor(_this.count % 48 / 6)], 24, 192 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "rumia_faith", 0, 24, 192 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "rumia", anime[Math.floor(_this.count % 48 / 6)], 363, 480 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "rumia_faith", 0, 363, 480 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "rumia", anime[Math.floor(_this.count % 48 / 6)], 72, 666 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "rumia_faith", 0, 72, 666 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "hoshi_24r", Math.floor((_this.count % 16) / 4), 38, 490 - _this.scroll);
                _this.image.drawDiv(_this.ctx, "hoshi_48b", Math.floor((_this.count % 16) / 4), 102, 476 - _this.scroll);
                _this.ctx.fillRect(0, 0, 432, 48);
                _this.ctx.fillRect(0, 384, 432, 48);
                _this.image.draw(_this.ctx, "waku", 0, 24);
                _this.image.draw(_this.ctx, "kannbann", 144, 0);
                if (_this.scroll != 0)
                    _this.image.draw(_this.ctx, "triforce", 426, 12 + 2 * Math.floor(_this.count % 20 / 10));
                if (_this.scroll != 768) {
                    _this.ctx.translate(450, 408 - 2 * Math.floor(_this.count % 20 / 10));
                    _this.ctx.rotate(Math.PI);
                    _this.ctx.drawImage(_this.image.get("triforce"), -24, -12);
                    _this.ctx.rotate(-Math.PI);
                    _this.ctx.translate(-450, -(408 - 2 * Math.floor(_this.count % 20 / 10)));
                }
                if (_this.whiteDepth > 0) {
                    _this.ctx.globalAlpha = _this.whiteDepth;
                    _this.ctx.fillStyle = "rgb(255,255,255)";
                    _this.ctx.fillRect(0, 0, 640, 480);
                    _this.ctx.globalAlpha = 1;
                }
            };
            this.countUp = function () {
                _this.count++;
            };
        }
        return HowTo;
    })(KYScene);
    return HowTo;
});
