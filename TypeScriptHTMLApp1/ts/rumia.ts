import Play = require("play");
import KeyControl = require("keyControl");
import IGameAudio = require("iGameAudio");
import IGameImage = require("iGameImage");
import Item = require("item");
import C = require("const");
import Star = require("star");

var anime: number[] = [0, 1, 2, 3, 4, 3, 2, 1];
enum State { Alive, CrashUp, CrashDown, Dead, Ressurection }
enum Faith { Normal = 0, Expectation = 1, Happy = 2, Smile = 3 }


class Rumia {
    private keyControl: KeyControl;
    private se: IGameAudio;
    private ctx: CanvasRenderingContext2D;
    private image: IGameImage;
    private scoreUp: Function;
    private life: number;

    private flag: boolean;
    private state: State;
    private imageNumber: number;
    private count: number;
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private invincible: number;
    private jampCool: number;
    private jampCount: number;
    private happyCount: number;
    private faith: Faith;
    private onaka: number;
    private currentTime: number;
    private setGameOver: Function;

    constructor(keyControl: KeyControl, se: IGameAudio, ctx: CanvasRenderingContext2D, image: IGameImage, scoreUp: Function, setGameOver: Function) {
        this.flag = false;
        this.keyControl = keyControl;
        this.se = se;
        this.ctx = ctx;
        this.image = image;
        this.scoreUp = scoreUp;
        this.life = 2;
        this.setGameOver = setGameOver;
    }

    public init = (): void=> {
        this.flag = true;
        this.imageNumber = 0
        this.count = 0;
        this.x = 0;
        this.y = 240;
        this.vx = 0;
        this.vy = 0;
        this.invincible = 0;
        this.jampCount = 0;
        this.jampCool = 0;
        this.happyCount = 0;
        this.faith = Faith.Normal;
        this.state = State.Alive;
        this.onaka = C.ONAMA_MAX;
    };

    public calc = (): void => {
        if (!this.flag) return;
        switch (this.state) {
            case State.Alive:
                this.moveControl();
                this.faithControl();
                if (this.onaka == 0) {
                    this.state = State.CrashDown;
                    this.currentTime = this.count;
                    this.se.play("death2");
                }
                break;
            case State.CrashUp:
                this.x += this.vx / 4;
                this.y -= (30 - (this.count - this.currentTime)) / 3;
                if ((this.count - this.currentTime) == 30) {
                    this.state = State.CrashDown;
                    this.currentTime = this.count;
                }
                break;
            case State.CrashDown:
                this.x += this.vx / 5;
                this.y += (this.count - this.currentTime) / 5;
                if (this.y > 436) {
                    this.state = State.Dead;
                }
                break;
            case State.Dead:
                if (this.life > 0) {
                    this.life--;
                    if (this.onaka == 0 && this.life >= 1) this.life--;
                    this.init();
                    this.invincible = 210;
                    this.state = State.Ressurection;
                }
                else {
                    this.flag = false;
                    this.setGameOver();
                }
                break;
            case State.Ressurection:
                this.x += 1.5;
                if (this.count == 75) this.state = State.Alive;
                break;
        }
        if (this.happyCount > 0) this.happyCount--;
        if (this.invincible > 0) this.invincible--;
        if (this.onaka > 0 && (this.state == State.Alive || this.state == State.Ressurection)) this.onaka--;
        if (this.state == State.Alive || this.state == State.Ressurection) this.scoreUp();
        this.count++;
    };

    private moveControl = (): void => {
        if (this.keyControl.getKey("Left").getCount() > 0) {
            this.vx = -3.8;
        }
        if (this.keyControl.getKey("Right").getCount() > 0) {
            this.vx = 3.8;
        }
        if ((this.keyControl.getKey("Z").getCount() == 1 || this.keyControl.getKey("Up").getCount() == 1) && this.jampCool == 0) {
            this.jampCount = 0;
            this.jampCool = 6;
            this.se.play("jump");
        }
        if (this.jampCount == 0 && this.vy > -2.7) {
            this.vy -= 1.5;
        }
        if (this.vy > 0.5 && this.vy <= 1.1) this.vy *= 1.015;
        else if (this.vy > 1.1 && this.vy < 4) this.vy *= 1.025;
        else if (this.vy <= 1.1) this.vy += 0.05;

        if (this.vx > 0) this.vx--;
        else if (this.vx < 0) this.vx++;
        if (this.vx * this.vx < 1) this.vx = 0;

        if (this.vx > 5) this.vx = 5;
        else if (this.vx < -5) this.vx = -5;

        var x: number = this.x + this.vx;
        var y: number = this.y + this.vy;

        if (x > 24 && x < 456) this.x = x;
        else if (x < 24) {
            this.x = 24;
            this.vx = 0;
        }
        else if (x > 456) {
            this.x = 456;
            this.vx = 0;
        }

        if (y > 96 && y < 384) this.y = y;
        else if (y < 96) {
            this.y = 96;
            this.vy = 0;
        }
        else if (y > 384) {
            this.y = 384;
            this.vy = 0;
        }

        if (this.jampCount < 48) this.imageNumber = anime[Math.floor((this.count % 24) / 3)];
        else this.imageNumber = anime[Math.floor((this.count % 48) / 6)];

        if (this.jampCool > 0) this.jampCool--;
        this.jampCount++;
    };

    private faithControl = (): void => {
        if (this.happyCount > 0) {
            if (this.happyCount >= 90) {
                this.faith = Faith.Happy;
            }
            else if (Math.round(this.happyCount / 15) % 2 == 1) {
                this.faith = Faith.Smile;
            }
            else {
                this.faith = Faith.Normal;
            }

        }
        else {
            this.faith = Faith.Normal;
        }
    };

    public graph = (): void => {
        if (!this.flag) return;
        switch (this.state) {
            case State.Ressurection:
            case State.Alive:
                if (this.invincible == 0 || (this.invincible > 0 && this.count % 12 < 6)) {
                    this.image.drawDiv(this.ctx, "rumia", this.imageNumber, this.x - 24, this.y - 24);
                    this.image.drawDiv(this.ctx, "rumia_faith", this.faith, this.x - 24, this.y - 24);
                }
                break;
            case State.CrashUp:
                this.image.draw(this.ctx, "rumia_up", this.x - 24, this.y - 24);
                break;
            case State.CrashDown:
                this.image.draw(this.ctx, "rumia_down", this.x - 24, this.y - 24);
                break;
        }
    };

    public gainOnaka = (gain: number): void => {
        this.se.play("get_item");
        if (this.onaka + gain < C.ONAMA_MAX)
            this.onaka += gain;
        else
            this.onaka = C.ONAMA_MAX;
    };

    public setHappy = (): void=> {
        this.happyCount = 110;
    };

    public isFlag = (): boolean => {
        return this.flag;
    };

    public isHittingItem = (target: Item): boolean => {
        if (!this.flag || this.state != State.Alive || !target.isFlag()) return false;
        var x: number = this.x - target.getX();
        var y: number = this.y - target.getY();
        if (x * x + y * y < 2304)
            return true;
        else
            return false;
    };

    public jadgeExpectationItem = (target: Item): void => {
        if (!this.flag || !target.isFlag() || this.happyCount > 0 || this.state != State.Alive) return;
        var y: number = this.y - target.getY();
        if (this.x < target.getX() && (target.getX() - this.x) < 160 && (y * y < 2304)) this.faith = Faith.Expectation;
    }

    public getY = (): number => {
        return this.y;
    };

    public getOnaka = (): number => {
        return this.onaka;
    }

    public getLife = (): number => {
        return this.life;
    };

    public isHittingStar = (target: Star): boolean => {
        if (!this.flag || this.state != State.Alive || !target.isFlag() || this.invincible > 0) return false;
        var x: number = this.x - target.getX();
        var y: number = this.y - target.getY();
        var r: number = (target.isLarge() ? 12 : 6) + C.CRANGE;
        if (x * x + y * y < r*r)
            return true;
        else
            return false;
    };

    public crash = (): void => {
        this.se.play("death");
        this.currentTime = this.count;
        this.state = State.CrashUp;
    };

}
export = Rumia;