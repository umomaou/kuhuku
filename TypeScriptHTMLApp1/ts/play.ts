import Game = require("game");
import IScene = require("iScene");
import KYScene = require("KYScene");
import Rumia = require("rumia");
import Item = require("item");
import C = require("const");
import StarControl = require("starControl");
import ItemControl = require("itemControl");

class Play extends KYScene implements IScene {
    private count: number;
    private score: number;
    private hiScore: number;
    private rumia: Rumia;
    private gameOverPoint: number;
    private nextScene: string;
    private whiteDepth: number;

    private setHiScore: Function;
    private getHiScore: Function;
    private gameOver: boolean;
    private gameOverY: number;
    private gameOverVY: number;
    private pause: boolean;
    private starControl: StarControl;
    private itemControl: ItemControl;

    constructor(game: Game) {
        super(game);
        this.setHiScore = game.setHiScore;
        this.getHiScore = game.getHiScore;
        this.starControl = new StarControl(this.ctx, this.image);
        this.itemControl = new ItemControl(this.ctx, this.image);
    }

    public init = (): void => {
        this.count = 0;
        this.score = 0;
        this.hiScore = this.getHiScore();
        this.gameOverPoint = -1;
        this.nextScene = "";
        this.whiteDepth = 1;
        this.rumia = new Rumia(this.keyControl, this.se, this.ctx, this.image, this.scoreUp, this.setGameOver);
        this.rumia.init();
        this.gameOver = false;
        this.pause = false;
        this.starControl.init();
        this.itemControl.init(this.rumia);
    };

    public calc = (): void => {
        if (this.pause) {
            if (this.keyControl.getKey("P").getCount() == 1) {
                this.se.play("pause");
                this.pause = false;
            }
            return;
        }
        if (this.keyControl.getKey("P").getCount() == 1) {
            this.se.play("pause");
            this.pause = true;
        }
        if (this.count == 0) this.music.play("bgm2");
        if (this.count <= 30) {
            this.whiteDepth -= 1 / 30;
            this.music.changeVolume("bgm2", this.count / 30);
        }

        this.starControl.calc();
        this.itemControl.calc();
        this.rumia.calc();

        this.itemControl.interferenceRumia(this.rumia);
        this.starControl.interferenceRumia(this.rumia);

        if (this.score > this.hiScore) this.hiScore = this.score;
        if (this.gameOver) {
            if (this.gameOverPoint == -1) {
                this.gameOverPoint = this.count;
                this.gameOverY = 180;
                this.gameOverVY = 0;
                this.music.stop("bgm2");
            }
            if ((this.count - this.gameOverPoint) % 70 == 0 && (this.count - this.gameOverPoint) < 210) {
                this.se.play("gameover");
            }
            if ((this.count - this.gameOverPoint) < 120) {
                this.gameOverVY += 0.2;
                if (this.gameOverY >= 408) {
                    this.gameOverVY = -9.5;
                }
                this.gameOverY += this.gameOverVY;
            }
            if ((this.count - this.gameOverPoint) > 300) {
                this.whiteDepth = (this.count - this.gameOverPoint - 300) / 30;
            }
            if ((this.count - this.gameOverPoint - 300) == 30) {
                this.changeScene("title");
                this.setHiScore(this.hiScore);
            }
        }
    };

    public graph = (): void => {
        for (var i: number = 0; i < 5; i++) {
            this.image.draw(this.ctx, "bg", (i * 144) - (this.count % 288) / 2, 42);
        }

        this.itemControl.graph();
        this.rumia.graph();
        this.starControl.graph();

        if (this.gameOver) {
            this.ctx.font = "bold 32px 'Gulim'"
            this.ctx.fillStyle = "rgb(255,0,0)";
            this.ctx.fillText("GAME OVER", 140, this.gameOverY);
        }
        this.graphBar();

        if (this.whiteDepth > 0) {
            this.ctx.globalAlpha = this.whiteDepth;
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillRect(0, 0, 640, 480);
            this.ctx.globalAlpha = 1;
        }
    };

    private graphBar = (): void => {
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
        this.image.draw(this.ctx, "SCORE", 6, 42);
        if (this.score < 100000) {
            num = this.score;
            for (var i: number = 0; i < 5; i++) {
                this.ctx.fillText(String(num % 10), 115 - (14 * i), 61);
                num = Math.floor(num / 10);
            }
        }
        else {
            this.ctx.fillText(this.score.toString(), 60, 61);
        }

        this.image.draw(this.ctx, "heart", 291, 41);
        this.ctx.fillRect(325, 43, 132, 20);
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(327, 45, 128, 16);
        if (this.rumia.getOnaka() > 0) this.ctx.drawImage(this.image.get("onaka"), 128 - (this.count % 256) / 2, 0, 128 * this.rumia.getOnaka() / C.ONAMA_MAX, 16, 327, 45, 128 * this.rumia.getOnaka() / C.ONAMA_MAX, 16);

        if (this.rumia.getLife() > 0) {
            for (var i: number = 0; i < this.rumia.getLife(); i++) {
                this.image.draw(this.ctx, "zanki", 25 * i + 1, 408);
            }
        }

    };

    public countUp = (): void => {
        if (this.pause) return;
        this.count++;
    };

    public scoreUp = (): void => {
        this.score++;
    };

    public setGameOver = (): void => {
        this.gameOver = true;
    };
}
export = Play;