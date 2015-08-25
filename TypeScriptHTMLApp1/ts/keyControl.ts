class KeyControl {
    private keyMap: { [index: string]: Key };

    constructor() {
        this.keyMap = {};
        window.addEventListener("keydown", (event: KeyboardEvent): void => {
            var code: number = event.keyCode;
            if (40 >= code && code >= 37) {
                event.preventDefault();
            };
            this.setKeyState(code, true);
        });

        window.addEventListener("keyup", (event: KeyboardEvent): void => {
            this.setKeyState(event.keyCode, false);
        });
    }

    public calc = (): void => {
        var key;
        for (key in this.keyMap) {
            if (this.keyMap.hasOwnProperty(key)) {
                this.keyMap[key].calc();
            }
        }
    };

    public getKey = (name: string): Key => {
        if (this.keyMap.hasOwnProperty(name)) {
            return this.keyMap[name];
        }
        else {
            alert(name + "は存在しません");
            return null;
        }
    };

    public addKey = (name: string, code: number): void => {
        var key;
        for (key in this.keyMap) {
            if (this.keyMap.hasOwnProperty(key) && (key == name || this.keyMap[key].getCode() == code)) {
                alert(name + "またはコード:" + code + "は既に存在しています");
                return;
            }
        }
        this.keyMap[name] = new Key(code);
    };

    public setKeyState = (code: number, pressed: boolean): void => {
        var key;
        for (key in this.keyMap) {
            if (this.keyMap.hasOwnProperty(key) && this.keyMap[key].getCode() == code) {
                this.keyMap[key].setPressed(pressed);
                return;
            }
        }
    };
}
export = KeyControl;

class Key {
    private code: number;
    private pressed: boolean;
    private count: number;

    constructor(code: number) {
        this.code = code;
        this.pressed = false;
        this.count = 0;
    }

    public calc = (): void => {
        if (this.pressed) this.count++;
        else this.count = 0;
    };

    public getCode = (): number => {
        return this.code;
    };

    public isPressed = (): boolean => {
        return this.pressed;
    };

    public getCount = (): number => {
        return this.count;
    };

    public setPressed = (pressed: boolean): void => {
        this.pressed = pressed;
    };
}