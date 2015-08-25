import Game = require("game");
import IGameAudio = require("iGameAudio");
import IGameImage = require("iGameImage");
import KeyControl = require("keyControl");

class KYScene {
    protected ctx: CanvasRenderingContext2D;
    protected image: IGameImage;
    protected music: IGameAudio;
    protected se: IGameAudio;
    protected keyControl: KeyControl;
    protected changeScene(string) { };

    constructor(game: Game) {
        this.ctx = game.getCtx();
        this.image = game.getImage();
        this.music = game.getMusic();
        this.se = game.getSe();
        this.keyControl = game.getKeyControl();
        this.changeScene = game.changeSceneLater;
    }
}
export = KYScene;