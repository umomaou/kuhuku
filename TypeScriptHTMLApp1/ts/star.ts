import IGameImage = require("iGameImage");
import Rumia = require("rumia");
import C = require("const");

enum Color{ Red, Blue, Green, Yellow }

class Star {
    protected ctx: CanvasRenderingContext2D;
    protected image: IGameImage;

    protected flag: boolean;
    protected count: number;
    protected imageName: string;
    protected large: boolean;
    protected ofset: number;
    protected x: number;
    protected y: number;

    constructor(ctx: CanvasRenderingContext2D, image: IGameImage) {
        this.ctx = ctx;
        this.image = image;
        this.flag = false;
    }

    public init = (large: boolean, x: number, y: number, shooting:boolean = false): void => {
        this.flag = true;
        this.count = 0;
        this.large = large;
        if (shooting) {
            this.calc = this.calcShooting;
            if (!large) {
                this.imageName = "hoshi_24y";
            }
            else {
                this.imageName = "hoshi_48b";
            }
        }
        else {
            this.calc = this.calcNormal;
            if (!large) {
                var rnd: number = Math.random() * 3;
                if (rnd > 2) this.imageName = "hoshi_24r";
                else if (rnd > 1) this.imageName = "hoshi_24g";
                else this.imageName = "hoshi_24b";
            }
            else {
                this.imageName = "hoshi_48b";
            }
        }
        this.ofset = Math.floor(Math.random() * 16);
        this.x = x;
        this.y = y;
    };

    public calc = (): void => {

    };

    private calcNormal = (): void => {
        if (!this.flag) return;
        this.x -= 1.2;
        if (this.x < -24)this.flag = false;
        this.count++;
    };

    private calcShooting = (): void => {
        if (!this.flag) return;
        this.x += C.SHOOTING_STAR_VX;
        this.y += C.SHOOTING_STAR_VY;
        if (this.x < -24) this.flag = false;
        this.count++;
    };

    public graph = (): void => {
        if (!this.flag) return;
        this.image.drawDiv(this.ctx, this.imageName, Math.floor(((this.count + this.ofset) % 16) / 4), this.x - (this.large ? 24 : 12), this.y - (this.large ? 24 : 12));
    };

    public isFlag = (): boolean=> {
        return this.flag;
    };

    public getX = (): number => {
        return this.x;
    };

    public getY = (): number => {
        return this.y;
    };

    public isLarge = (): boolean => {
        return this.large;
    };

    public onHit = (rumia: Rumia): void => {
        rumia.crash();
    };

}
export = Star;