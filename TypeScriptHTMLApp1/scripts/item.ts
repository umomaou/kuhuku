import IGameImage = require("iGameImage");
import Rumia = require("rumia");

class Item {
    private image: IGameImage;
    private ctx: CanvasRenderingContext2D;

    private flag: boolean;
    private count: number;
    private x: number;
    private y: number;
    private gain: number;
    private imageName: string;

    constructor(ctx: CanvasRenderingContext2D, image: IGameImage) {
        this.ctx = ctx;
        this.image = image;
        this.flag = false;
    }

    public init = (x: number, y: number, imageName: string, gain: number): void=> {
        if (this.flag) return;
        this.flag = true;
        this.count = 0;
        this.x = x;
        this.y = y;
        this.gain = gain;
        this.imageName = imageName;
    };

    public calc = (): void=> {
        if (!this.flag) return;
        this.x -= 2.4;
        if (this.x < -24) this.flag = false;
    };

    public graph = (): void => {
        if (!this.flag) return;
        this.image.draw(this.ctx, this.imageName, this.x - 24, this.y - 24);
    };

    public onHit = (target: Rumia): void => {
        target.gainOnaka(this.gain);
        target.setHappy();
        this.flag = false;
    };

    public isFlag = (): boolean=> {
        return this.flag;
    };

    public getX = (): number => {
        return this.x;
    }

    public getY = (): number => {
        return this.y;
    }
}
export = Item;