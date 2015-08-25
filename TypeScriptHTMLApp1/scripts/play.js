var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "KYScene", "rumia", "const", "starControl", "itemControl"], function (require, exports, KYScene, Rumia, C, StarControl, ItemControl) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play(game) {
            var _this = this;
            _super.call(this, game);
            this.init = function () {
                _this.count = 0;
                _this.score = 0;
                _this.hiScore = _this.getHiScore();
                _this.gameOverPoint = -1;
                _this.nextScene = "";
                _this.whiteDepth = 1;
                _this.rumia = new Rumia(_this.keyControl, _this.se, _this.ctx, _this.image, _this.scoreUp, _this.setGameOver);
                _this.rumia.init();
                _this.gameOver = false;
                _this.pause = false;
                _this.starControl.init();
                _this.itemControl.init(_this.rumia);
            };
            this.calc = function () {
                if (_this.pause) {
                    if (_this.keyControl.getKey("P").getCount() == 1) {
                        _this.se.play("pause");
                        _this.pause = false;
                    }
                    return;
                }
                if (_this.keyControl.getKey("P").getCount() == 1) {
                    _this.se.play("pause");
                    _this.pause = true;
                }
                if (_this.count == 0)
                    _this.music.play("bgm2");
                if (_this.count <= 30) {
                    _this.whiteDepth -= 1 / 30;
                    _this.music.changeVolume("bgm2", _this.count / 30);
                }
                _this.starControl.calc();
                _this.itemControl.calc();
                _this.rumia.calc();
                _this.itemControl.interferenceRumia(_this.rumia);
                _this.starControl.interferenceRumia(_this.rumia);
                if (_this.score > _this.hiScore)
                    _this.hiScore = _this.score;
                if (_this.gameOver) {
                    if (_this.gameOverPoint == -1) {
                        _this.gameOverPoint = _this.count;
                        _this.gameOverY = 180;
                        _this.gameOverVY = 0;
                        _this.music.stop("bgm2");
                    }
                    if ((_this.count - _this.gameOverPoint) % 70 == 0 && (_this.count - _this.gameOverPoint) < 210) {
                        _this.se.play("gameover");
                    }
                    if ((_this.count - _this.gameOverPoint) < 120) {
                        _this.gameOverVY += 0.2;
                        if (_this.gameOverY >= 408) {
                            _this.gameOverVY = -9.5;
                        }
                        _this.gameOverY += _this.gameOverVY;
                    }
                    if ((_this.count - _this.gameOverPoint) > 300) {
                        _this.whiteDepth = (_this.count - _this.gameOverPoint - 300) / 30;
                    }
                    if ((_this.count - _this.gameOverPoint - 300) == 30) {
                        _this.changeScene("title");
                        _this.setHiScore(_this.hiScore);
                    }
                }
            };
            this.graph = function () {
                for (var i = 0; i < 5; i++) {
                    _this.image.draw(_this.ctx, "bg", (i * 144) - (_this.count % 288) / 2, 42);
                }
                _this.itemControl.graph();
                _this.rumia.graph();
                _this.starControl.graph();
                if (_this.gameOver) {
                    _this.ctx.font = "bold 32px 'Gulim'";
                    _this.ctx.fillStyle = "rgb(255,0,0)";
                    _this.ctx.fillText("GAME OVER", 140, _this.gameOverY);
                }
                _this.graphBar();
                if (_this.whiteDepth > 0) {
                    _this.ctx.globalAlpha = _this.whiteDepth;
                    _this.ctx.fillStyle = "rgb(255,255,255)";
                    _this.ctx.fillRect(0, 0, 640, 480);
                    _this.ctx.globalAlpha = 1;
                }
            };
            this.graphBar = function () {
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
                _this.image.draw(_this.ctx, "SCORE", 6, 42);
                if (_this.score < 100000) {
                    num = _this.score;
                    for (var i = 0; i < 5; i++) {
                        _this.ctx.fillText(String(num % 10), 115 - (14 * i), 61);
                        num = Math.floor(num / 10);
                    }
                }
                else {
                    _this.ctx.fillText(_this.score.toString(), 60, 61);
                }
                _this.image.draw(_this.ctx, "heart", 291, 41);
                _this.ctx.fillRect(325, 43, 132, 20);
                _this.ctx.fillStyle = "rgb(0,0,0)";
                _this.ctx.fillRect(327, 45, 128, 16);
                if (_this.rumia.getOnaka() > 0)
                    _this.ctx.drawImage(_this.image.get("onaka"), 128 - (_this.count % 256) / 2, 0, 128 * _this.rumia.getOnaka() / C.ONAMA_MAX, 16, 327, 45, 128 * _this.rumia.getOnaka() / C.ONAMA_MAX, 16);
                if (_this.rumia.getLife() > 0) {
                    for (var i = 0; i < _this.rumia.getLife(); i++) {
                        _this.image.draw(_this.ctx, "zanki", 25 * i + 1, 408);
                    }
                }
            };
            this.countUp = function () {
                if (_this.pause)
                    return;
                _this.count++;
            };
            this.scoreUp = function () {
                _this.score++;
            };
            this.setGameOver = function () {
                _this.gameOver = true;
            };
            this.setHiScore = game.setHiScore;
            this.getHiScore = game.getHiScore;
            this.starControl = new StarControl(this.ctx, this.image);
            this.itemControl = new ItemControl(this.ctx, this.image);
        }
        return Play;
    })(KYScene);
    return Play;
});
