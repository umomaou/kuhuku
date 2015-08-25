import IScene = require("iScene");
import KYScene = require("KYScene");
import Game = require("game");

class Title extends KYScene implements IScene {
    private count: number;
    private menuSelect: number;
    private menuCool: number;
    private flashCount: number;
    private currentTime: number;
    private nextScene: string;
    private whiteDepth: number;
    private hiScore: number;
    private getHiScore: Function;

    constructor(game: Game) {
        super(game);
        this.getHiScore = game.getHiScore;
    }

    public init = (): void => {
        this.count = 0;
        this.menuSelect = 0;
        this.menuCool = 0;
        this.currentTime = -1;
        this.nextScene = "";
        this.whiteDepth = 1;
        this.hiScore = this.getHiScore();
        document.getElementById("tweetbutton")["href"] = "https://twitter.com/intent/tweet?button_hashtag=空腹夜行&text=ルーミアは果物漂う夜空をSCORE:" + this.hiScore + "まで飛行しました。 http://umo.webcrow.jp/games/kuhukuyako/game.html";
    };

    public calc = (): void => {
        if (this.count == 0) this.music.play("bgm0");
        if (this.count <= 30) {
            this.whiteDepth -= 1 / 30;
            this.music.changeVolume("bgm0", this.count / 30);
        }
        if (this.count >= 60 && this.currentTime == -1) {
            if (this.keyControl.getKey("Left").getCount() == 1 && this.menuCool == 0) {
                this.menuSelect++;
                this.menuCool = 6;
                this.se.play("select");
            }
            if (this.keyControl.getKey("Right").getCount() == 1 && this.menuCool == 0) {
                this.menuSelect++;
                this.menuCool = 6;
                this.se.play("select");
            }
            if (this.keyControl.getKey("Z").getCount() == 1) {
                this.se.play("ok");
                if (this.menuSelect % 2 == 0) {
                    this.currentTime = this.count;
                    this.nextScene = "play";
                }
                if (this.menuSelect % 2 == 1) {
                    this.currentTime = this.count;
                    this.nextScene = "howTo";
                }
            }
        }
        if (this.menuCool > 0) this.menuCool--;
        if (this.currentTime != -1) {
            this.whiteDepth = (this.count - this.currentTime) / 30;
            this.music.changeVolume("bgm0", 1 - (this.count - this.currentTime) / 30);
            if ((this.count - this.currentTime) == 30) {
                this.changeScene(this.nextScene);
                this.music.stop("bgm0");
            }
        }
    };

    public graph = (): void => {
        if (this.count < 60) {
            for (var i: number = 0; i < 4; i++) {
                this.image.draw(this.ctx, "bg", (i * 144), 72 - (this.count / 2));
            }
            this.image.draw(this.ctx, "title00", 90, -28 + (this.count * 5 / 2));
        }
        else {
            for (var i: number = 0; i < 4; i++) {
                this.image.draw(this.ctx, "bg", (i * 144), 42);
            }
            this.image.draw(this.ctx, "title00", 90, 122);
            if (this.menuSelect % 2 == 0)
                this.image.draw(this.ctx, (this.currentTime == -1 || ((this.count - this.currentTime) % 8) >= 4) ? "title01_b" : "title01_by", 86, 266);
            else
                this.image.draw(this.ctx, "title01_s", 102, 274);
            if (this.menuSelect % 2 == 1)
                this.image.draw(this.ctx, (this.currentTime == -1 || ((this.count - this.currentTime) % 8) >= 4) ? "title02_b" : "title02_by", 266, 266);
            else
                this.image.draw(this.ctx, "title02_s", 282, 274);

        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(0, 0, 480, 72);
        this.ctx.fillRect(0, 408, 480, 24);

        this.ctx.font = "bold 20px 'Gulim'"
        this.ctx.fillStyle = "rgb(255,255,255)";
        var num: number;
        this.image.draw(this.ctx, "HI-", 136, 6);
        this.image.draw(this.ctx, "SCORE", 166, 6);
        if (this.hiScore < 100000) {
            num = this.hiScore;
            for (var i: number = 0; i < 5; i++) {
                this.ctx.fillText(String(num % 10), 275 - (14 * i), 25);
                num = Math.floor(num / 10);
            }
        }
        else {
            this.ctx.fillText(this.hiScore.toString(), 220, 25);
        }

        if (this.whiteDepth > 0) {
            this.ctx.globalAlpha = this.whiteDepth;
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillRect(0, 0, 640, 480);
            this.ctx.globalAlpha = 1;
        }
    };

    public countUp = (): void => {
        this.count++;
    }
}
export = Title;