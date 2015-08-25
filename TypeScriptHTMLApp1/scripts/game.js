define(["require", "exports", "keyControl", "gameAudio", "gameAudioWAA", "gameImage", "loadWait", "title", "play", "howTo"], function (require, exports, KeyControl, GameAudio, GameAudioWAA, GameImage, LoadWait, Title, Play, HowTo) {
    var Game = (function () {
        function Game(ctx) {
            var _this = this;
            this.run = function () {
                _this.keyControl.calc();
                _this.scene.calc();
                _this.ctx.clearRect(0, 0, 480, 432);
                _this.scene.graph();
                _this.scene.countUp();
                _this.changeScene();
                _this.count++;
            };
            this.load = function () {
                _this.image.load("bg");
                _this.image.load("f1_48");
                _this.image.load("f2_48");
                _this.image.load("f3_48");
                _this.image.load("heart");
                _this.image.load("HI-");
                _this.image.loadDiv("hoshi_24b", 4, 4, 1, 24, 24);
                _this.image.loadDiv("hoshi_24g", 4, 4, 1, 24, 24);
                _this.image.loadDiv("hoshi_24r", 4, 4, 1, 24, 24);
                _this.image.loadDiv("hoshi_24y", 4, 4, 1, 24, 24);
                _this.image.loadDiv("hoshi_48b", 4, 4, 1, 48, 48);
                _this.image.load("kannbann");
                _this.image.load("onaka");
                _this.image.loadDiv("rumia", 5, 5, 1, 48, 48);
                _this.image.load("rumia_down");
                _this.image.loadDiv("rumia_faith", 4, 4, 1, 48, 48);
                _this.image.load("rumia_up");
                _this.image.load("SCORE");
                _this.image.load("title00");
                _this.image.load("title01_b");
                _this.image.load("title01_by");
                _this.image.load("title01_s");
                _this.image.load("title02_b");
                _this.image.load("title02_by");
                _this.image.load("title02_s");
                _this.image.load("triforce");
                _this.image.load("waku");
                _this.image.load("zanki");
                _this.image.load("howto");
                _this.music.load("bgm0", true);
                _this.music.load("bgm1", true);
                _this.music.load("bgm2", true);
                _this.se.load("death", false);
                _this.se.load("death2", false);
                _this.se.load("gameover", false);
                _this.se.load("get_item", false);
                _this.se.load("jump", false);
                _this.se.load("ok", false);
                _this.se.load("pause", false);
                _this.se.load("select", false);
            };
            this.changeScene = function () {
                if (_this.nextScene == "")
                    return;
                _this.scene = _this.sceneMap[_this.nextScene];
                _this.scene.init();
                _this.nextScene = "";
            };
            this.changeSceneLater = function (name) {
                _this.nextScene = name;
            };
            this.getCtx = function () {
                return _this.ctx;
            };
            this.getKeyControl = function () {
                return _this.keyControl;
            };
            this.getImage = function () {
                return _this.image;
            };
            this.getMusic = function () {
                return _this.music;
            };
            this.getSe = function () {
                return _this.se;
            };
            this.getHiScore = function () {
                return _this.hiScore;
            };
            this.setHiScore = function (hiScore) {
                _this.hiScore = hiScore;
            };
            this.ctx = ctx;
            this.keyControl = new KeyControl();
            this.count = 0;
            this.hiScore = 0;
            this.keyControl.addKey("P", 80);
            this.keyControl.addKey("Left", 37);
            this.keyControl.addKey("Up", 38);
            this.keyControl.addKey("Right", 39);
            this.keyControl.addKey("Down", 40);
            this.keyControl.addKey("X", 88);
            this.keyControl.addKey("Z", 90);
            this.image = new GameImage("dat/img", "png");
            window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"];
            try {
                this.music = new GameAudioWAA("dat/music");
                this.se = new GameAudioWAA("dat/se");
            }
            catch (e) {
                this.music = new GameAudio("dat/music");
                this.se = new GameAudio("dat/se");
            }
            this.load();
            this.sceneMap = {};
            this.sceneMap["loadWait"] = new LoadWait(this);
            this.sceneMap["title"] = new Title(this);
            this.sceneMap["play"] = new Play(this);
            this.sceneMap["howTo"] = new HowTo(this);
            this.changeSceneLater("loadWait");
            this.changeScene();
        }
        return Game;
    })();
    return Game;
});
