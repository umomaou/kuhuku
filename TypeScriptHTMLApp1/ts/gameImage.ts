import IGameImage = require("iGameImage");

class GameImage implements IGameImage {
    protected imageMap: { [index: string]: ImageData };
    protected path: string;
    protected extension: string;

    constructor(path: string, extension: string) {
        this.path = path;
        this.extension = extension;
        this.imageMap = {};
    }

    public load = (name: string): void => {
        var image: HTMLImageElement = new Image();
        image.src = this.path + "/" + name + "." + this.extension;
        var imageData: ImageData = new ImageData();
        imageData.data = image;
        imageData.division = false;
        this.imageMap[name] = imageData;
    };

    public loadDiv = (name: string, allNum: number, xNum: number, yNum: number, divW: number, divH: number): void => {
        var image = new Image();
        image.src = this.path + "/" + name + "." + this.extension;
        var imageData: ImageData = new ImageData();
        imageData.data = image;
        imageData.division = true;
        imageData.allNum = allNum;
        imageData.xNum = xNum;
        imageData.yNum = yNum;
        imageData.divW = divW;
        imageData.divH = divH;
        this.imageMap[name] = imageData;
    };

    public draw = (ctx: CanvasRenderingContext2D, name: string, x: number, y: number, w: number = this.imageMap[name].data.naturalWidth, h: number = this.imageMap[name].data.naturalHeight): void => {
        if (!this.imageMap.hasOwnProperty(name)) alert(name + "なんて画像は無いよ");
        ctx.drawImage(this.imageMap[name].data, Math.round(x), Math.round(y), w, h);
    };

    public drawDiv = (ctx: CanvasRenderingContext2D, name: string, imageNumber: number, x: number, y: number, w: number = this.imageMap[name].divW, h: number = this.imageMap[name].divH): void => {
        var imageData: ImageData = this.imageMap[name];
        if (imageData.division == false || imageNumber < 0 || imageNumber > imageData.allNum - 1) return;
        ctx.drawImage(imageData.data, imageNumber % imageData.xNum * imageData.divW, imageNumber % imageData.yNum * imageData.divH, imageData.divW, imageData.divH, Math.round(x), Math.round(y), w, h);
    };

    public get = (name: string): HTMLImageElement => {
        if (!this.imageMap.hasOwnProperty(name)) alert(name + "なんて画像は無いよ");
        return this.imageMap[name].data;
    };
}
export = GameImage;

class ImageData {
    public data: HTMLImageElement;
    public division: boolean;
    public allNum: number;
    public xNum: number;
    public yNum: number;
    public divW: number;
    public divH: number;
}