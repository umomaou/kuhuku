import IScene = require("iScene");
import KYScene = require("KYScene");
import Game = require("game");

class LoadWait extends KYScene implements IScene {
    private count: number;

    constructor(game: Game) {
        super(game);
    }

    public init = (): void => {
        this.count = 0;
    };

    public calc = (): void => {
        if (!this.music.isLoading()) return;
        if (!this.se.isLoading()) return;
        this.volumeChange();    
        this.changeScene("title");
    };

    public graph = (): void => { };

    public countUp = (): void => {
        this.count++;
    };

    private volumeChange = (): void=> {
        this.se.changeVolume("pause", 0.5);
        this.se.changeVolume("get_item", 0.5);
        this.se.changeVolume("death", 180/255);
        this.se.changeVolume("death2", 96/255);
        this.se.changeVolume("jump", 72/255);
        this.se.changeVolume("select", 140/255);
        this.se.changeVolume("ok", 140/155);
        this.se.changeVolume("gameover", 140/255);
    };
}
export = LoadWait;