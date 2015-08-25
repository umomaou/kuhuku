import KYScene = require("KYScene");
import IScene = require("iScene");
import Game = require("game");

var anime: number[] = [0, 1, 2, 3, 4, 3, 2, 1];

class HowTo extends KYScene implements IScene {
    private count: number;
    private scroll: number;
    private whiteDepth: number;
    private currentTime: number;

    constructor(game: Game) {
        super(game);
    }

    public init = (): void => {
        this.count = 0;
        this.scroll = 0;
        this.whiteDepth = 1;
        this.currentTime = -1;
    };

    public calc = (): void => {
        if (this.count == 0) this.music.play("bgm1");
        if (this.count <= 30) {
            this.whiteDepth -= 1 / 30;
            this.music.changeVolume("bgm1", this.count / 30);
        }
        if (this.keyControl.getKey("X").getCount() == 1) {
            this.currentTime = this.count;
        }
        if (this.currentTime != -1) {
            this.whiteDepth = (this.count - this.currentTime) / 30;
            this.music.changeVolume("bgm1", 1 - (this.count - this.currentTime) / 30);
            if ((this.count - this.currentTime) == 30) {
                this.changeScene("title");
                this.music.stop("bgm1");
            }
        }

        if (this.keyControl.getKey("Up").getCount() > 0 && this.scroll > 0 && this.currentTime == -1) {
            this.scroll -= 3;
        }
        if (this.keyControl.getKey("Down").getCount() > 0 && this.scroll < 768 && this.currentTime == -1) {
            this.scroll += 3;
        }
    };

    public graph = (): void => {
        this.ctx.fillStyle = "rgb(0,55,1)";
        this.ctx.fillRect(0, 0, 480, 432);

        this.ctx.drawImage(this.image.get("howto"), 0, this.scroll, 432, 336, 24, 48, 432, 336);
        this.image.drawDiv(this.ctx, "rumia", anime[Math.floor(this.count % 48 / 6)], 24, 192 - this.scroll);
        this.image.drawDiv(this.ctx, "rumia_faith", 0, 24, 192 - this.scroll);
        this.image.drawDiv(this.ctx, "rumia", anime[Math.floor(this.count % 48 / 6)], 363, 480 - this.scroll);
        this.image.drawDiv(this.ctx, "rumia_faith", 0, 363, 480 - this.scroll);
        this.image.drawDiv(this.ctx, "rumia", anime[Math.floor(this.count % 48 / 6)], 72, 666 - this.scroll);
        this.image.drawDiv(this.ctx, "rumia_faith", 0, 72, 666 - this.scroll);
        this.image.drawDiv(this.ctx, "hoshi_24r", Math.floor((this.count % 16) / 4), 38, 490 - this.scroll); 
        this.image.drawDiv(this.ctx, "hoshi_48b", Math.floor((this.count % 16) / 4), 102, 476 - this.scroll); 

        this.ctx.fillRect(0, 0, 432, 48);
        this.ctx.fillRect(0, 384, 432, 48);
        this.image.draw(this.ctx, "waku", 0, 24);
        this.image.draw(this.ctx, "kannbann", 144, 0);

        if (this.scroll != 0) this.image.draw(this.ctx, "triforce", 426, 12 + 2 * Math.floor(this.count % 20 / 10));
        if (this.scroll != 768) {
            this.ctx.translate(450, 408 - 2 * Math.floor(this.count % 20 / 10));
            this.ctx.rotate(Math.PI);
            this.ctx.drawImage(this.image.get("triforce"), -24, -12);
            this.ctx.rotate(-Math.PI);
            this.ctx.translate(-450, -(408 - 2 * Math.floor(this.count % 20 / 10)));
        }

        if (this.whiteDepth > 0) {
            this.ctx.globalAlpha = this.whiteDepth;
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillRect(0, 0, 640, 480);
            this.ctx.globalAlpha = 1;
        }
    };

    public countUp = (): void=> {
        this.count++;
    };

}
export = HowTo;