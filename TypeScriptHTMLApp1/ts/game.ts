import IScene = require("iScene");
import IGameAudio = require("iGameAudio");
import IGameImage = require("iGameImage");
import KeyControl = require("keyControl");
import GameAudio = require("gameAudio");
import GameAudioWAA = require("gameAudioWAA");
import GameImage = require("gameImage");
//以下空腹夜行独自
import LoadWait = require("loadWait");
import Title = require("title");
import Play = require("play");
import HowTo = require("howTo");


class Game {
    private ctx: CanvasRenderingContext2D;
    private keyControl: KeyControl;
    private count: number;
    private sceneMap: { [index: string]: IScene };
    private scene: IScene;
    private nextScene: string;
    //以下空腹夜行独自
    private hiScore: number;
    private se: IGameAudio;
    private music: IGameAudio;
    private image: IGameImage;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.keyControl = new KeyControl();
        this.count = 0;
        this.hiScore = 0;
        //
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

    public run = (): void => {
        this.keyControl.calc();
        this.scene.calc();
        this.ctx.clearRect(0, 0, 480, 432);
        this.scene.graph();
        this.scene.countUp();
        this.changeScene();
        this.count++;
    };

    private load = (): void => {
        this.image.load("bg");
        this.image.load("f1_48");
        this.image.load("f2_48");
        this.image.load("f3_48");
        this.image.load("heart");
        this.image.load("HI-");
        this.image.loadDiv("hoshi_24b", 4, 4, 1, 24, 24);
        this.image.loadDiv("hoshi_24g", 4, 4, 1, 24, 24);
        this.image.loadDiv("hoshi_24r", 4, 4, 1, 24, 24);
        this.image.loadDiv("hoshi_24y", 4, 4, 1, 24, 24);
        this.image.loadDiv("hoshi_48b", 4, 4, 1, 48, 48);
        this.image.load("kannbann");
        this.image.load("onaka");
        this.image.loadDiv("rumia", 5, 5, 1, 48, 48);
        this.image.load("rumia_down");
        this.image.loadDiv("rumia_faith", 4, 4, 1, 48, 48);
        this.image.load("rumia_up");
        this.image.load("SCORE");
        this.image.load("title00");
        this.image.load("title01_b");
        this.image.load("title01_by");
        this.image.load("title01_s");
        this.image.load("title02_b");
        this.image.load("title02_by");
        this.image.load("title02_s");
        this.image.load("triforce");
        this.image.load("waku");
        this.image.load("zanki");
        this.image.load("howto");

        this.music.load("bgm0", true);
        this.music.load("bgm1", true);
        this.music.load("bgm2", true);

        this.se.load("death", false);
        this.se.load("death2", false);
        this.se.load("gameover", false);
        this.se.load("get_item", false);
        this.se.load("jump", false);
        this.se.load("ok", false);
        this.se.load("pause", false);
        this.se.load("select", false);
    };

    protected changeScene = (): void => {
        if (this.nextScene == "") return;
        this.scene = this.sceneMap[this.nextScene];
        this.scene.init();
        this.nextScene = "";
    };

    public changeSceneLater = (name: string): void => {
        this.nextScene = name;
    }

    //以下ゲッター

    public getCtx = (): CanvasRenderingContext2D => {
        return this.ctx;
    };

    public getKeyControl = (): KeyControl => {
        return this.keyControl;
    };

    public getImage = (): IGameImage => {
        return this.image;
    };

    public getMusic = (): IGameAudio => {
        return this.music;
    };

    public getSe = (): IGameAudio => {
        return this.se;
    };

    public getHiScore = (): number => {
        return this.hiScore;
    };

    //以下セッター

    public setHiScore = (hiScore: number): void => {
        this.hiScore = hiScore;
    };
}
export = Game;