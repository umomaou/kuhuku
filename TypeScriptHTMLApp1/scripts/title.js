var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "KYScene"], function (require, exports, KYScene) {
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title(game) {
            var _this = this;
            _super.call(this, game);
            this.init = function () {
                _this.count = 0;
                _this.menuSelect = 0;
                _this.menuCool = 0;
                _this.currentTime = -1;
                _this.nextScene = "";
                _this.whiteDepth = 1;
                _this.hiScore = _this.getHiScore();
                document.getElementById("tweetbutton")["href"] = "https://twitter.com/intent/tweet?button_hashtag=空腹夜行&text=ルーミアは果物漂う夜空をSCORE:" + _this.hiScore + "まで飛行しました。 http://umo.webcrow.jp/games/kuhukuyako/game.html";
            };
            this.calc = function () {
                if (_this.count == 0)
                    _this.music.play("bgm0");
                if (_this.count <= 30) {
                    _this.whiteDepth -= 1 / 30;
                    _this.music.changeVolume("bgm0", _this.count / 30);
                }
                if (_this.count >= 60 && _this.currentTime == -1) {
                    if (_this.keyControl.getKey("Left").getCount() == 1 && _this.menuCool == 0) {
                        _this.menuSelect++;
                        _this.menuCool = 6;
                        _this.se.play("select");
                    }
                    if (_this.keyControl.getKey("Right").getCount() == 1 && _this.menuCool == 0) {
                        _this.menuSelect++;
                        _this.menuCool = 6;
                        _this.se.play("select");
                    }
                    if (_this.keyControl.getKey("Z").getCount() == 1) {
                        _this.se.play("ok");
                        if (_this.menuSelect % 2 == 0) {
                            _this.currentTime = _this.count;
                            _this.nextScene = "play";
                        }
                        if (_this.menuSelect % 2 == 1) {
                            _this.currentTime = _this.count;
                            _this.nextScene = "howTo";
                        }
                    }
                }
                if (_this.menuCool > 0)
                    _this.menuCool--;
                if (_this.currentTime != -1) {
                    _this.whiteDepth = (_this.count - _this.currentTime) / 30;
                    _this.music.changeVolume("bgm0", 1 - (_this.count - _this.currentTime) / 30);
                    if ((_this.count - _this.currentTime) == 30) {
                        _this.changeScene(_this.nextScene);
                        _this.music.stop("bgm0");
                    }
                }
            };
            this.graph = function () {
                if (_this.count < 60) {
                    for (var i = 0; i < 4; i++) {
                        _this.image.draw(_this.ctx, "bg", (i * 144), 72 - (_this.count / 2));
                    }
                    _this.image.draw(_this.ctx, "title00", 90, -28 + (_this.count * 5 / 2));
                }
                else {
                    for (var i = 0; i < 4; i++) {
                        _this.image.draw(_this.ctx, "bg", (i * 144), 42);
                    }
                    _this.image.draw(_this.ctx, "title00", 90, 122);
                    if (_this.menuSelect % 2 == 0)
                        _this.image.draw(_this.ctx, (_this.currentTime == -1 || ((_this.count - _this.currentTime) % 8) >= 4) ? "title01_b" : "title01_by", 86, 266);
                    else
                        _this.image.draw(_this.ctx, "title01_s", 102, 274);
                    if (_this.menuSelect % 2 == 1)
                        _this.image.draw(_this.ctx, (_this.currentTime == -1 || ((_this.count - _this.currentTime) % 8) >= 4) ? "title02_b" : "title02_by", 266, 266);
                    else
                        _this.image.draw(_this.ctx, "title02_s", 282, 274);
                }
                _this.ctx.fillStyle = "rgb(0,0,0)";
                _this.ctx.fillRect(0, 0, 480, 72);
                _this.ctx.fillRect(0, 408, 480, 24);
                _this.ctx.font = "bold 20px 'Gulim'";
                _this.ctx.fillStyle = "rgb(255,255,255)";
                var num;
                _this.image.draw(_this.ctx, "HI-", 136, 6);
                _this.image.draw(_this.ctx, "SCORE", 166, 6);
                if (_this.hiScore < 100000) {
                    num = _this.hiScore;
                    for (var i = 0; i < 5; i++) {
                        _this.ctx.fillText(String(num % 10), 275 - (14 * i), 25);
                        num = Math.floor(num / 10);
                    }
                }
                else {
                    _this.ctx.fillText(_this.hiScore.toString(), 220, 25);
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
            this.getHiScore = game.getHiScore;
        }
        return Title;
    })(KYScene);
    return Title;
});
