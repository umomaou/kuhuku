import Item = require("item");
import C = require("const");
import IGameImage = require("iGameImage");
import Rumia = require("rumia");

enum Fruit { GRAPE, APPLE, BANANA }

class ItemControl {
    private ctx: CanvasRenderingContext2D;
    private image: IGameImage;
    private itemList: Array<Item>;
    private rumia: Rumia;

    private itemInterval: number;
    private itemNextInterval: number;
    private nextItem: Fruit;

    constructor(ctx: CanvasRenderingContext2D, image: IGameImage) {
        this.ctx = ctx;
        this.image = image;
        this.itemList = new Array(C.ITEM_MAX);
    }

    public init = (rumia: Rumia): void => {
        this.rumia = rumia;
        this.itemInterval = Math.round(Math.random() * C.BASE_ITEM_INTERVAL);
        this.itemNextInterval = C.BASE_ITEM_INTERVAL - this.itemInterval;
        var rnd: number = Math.random() * 3;
        if (rnd > 2) this.nextItem = Fruit.GRAPE;
        else if (rnd > 1) this.nextItem = Fruit.APPLE;
        else this.nextItem = Fruit.BANANA;
        for (var i: number = 0; i < C.ITEM_MAX; i++) {
            this.itemList[i] = new Item(this.ctx, this.image);
        }
    };

    public calc = (): void => {
        if (this.rumia.isFlag()) this.createItem();
        for (var i = 0; i < C.ITEM_MAX; i++) {
            this.itemList[i].calc();
        }
    };

    public graph = (): void => {
        for (var i: number = 0; i < C.ITEM_MAX; i++) {
            this.itemList[i].graph();
        }
    };

    public interferenceRumia = (rumia: Rumia): void => {
        for (var i: number = 0; i < C.ITEM_MAX; i++) {
            if (rumia.isHittingItem(this.itemList[i])) {
                this.itemList[i].onHit(rumia);
            }
            rumia.jadgeExpectationItem(this.itemList[i]);
        }
    };

    private createItem = (): void => {
        if (this.itemInterval == 0) {
            for (var i: number = 0; i < C.ITEM_MAX; i++) {
                if (!this.itemList[i].isFlag()) {
                    var rnd: number = Math.random() * 100;
                    switch (this.nextItem) {
                        case Fruit.BANANA:
                            this.itemList[i].init(504, this.rumia.getY(), "f2_48", C.BANANA_GAIN);
                            if (rnd > 90) this.nextItem = Fruit.BANANA;
                            else if (rnd > 60) this.nextItem = Fruit.APPLE;
                            else this.nextItem = Fruit.GRAPE;
                            break;
                        case Fruit.APPLE:
                            this.itemList[i].init(504, this.rumia.getY(), "f1_48", C.APPLE_GAIN);
                            if (rnd > 60) this.nextItem = Fruit.BANANA;
                            else if (rnd > 20) this.nextItem = Fruit.APPLE;
                            else this.nextItem = Fruit.GRAPE;
                            break;
                        case Fruit.GRAPE:
                            this.itemList[i].init(504, this.rumia.getY(), "f3_48", C.GRAPE_GAIN);
                            if (rnd > 90) this.nextItem = Fruit.GRAPE;
                            else if (rnd > 60) this.nextItem = Fruit.APPLE;
                            else this.nextItem = Fruit.BANANA;
                            break;
                    }
                    break;
                }
            }
            if (this.itemNextInterval == 0) {
                this.itemInterval = Math.round(Math.random() * C.BASE_ITEM_INTERVAL);
                this.itemNextInterval = C.BASE_ITEM_INTERVAL - this.itemInterval;
            }
            else {
                this.itemInterval = this.itemNextInterval;
                this.itemNextInterval = 0;
            }
        }
        if (this.itemInterval > 0) this.itemInterval--;
    };
}
export = ItemControl;