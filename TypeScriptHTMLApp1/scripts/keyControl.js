define(["require", "exports"], function (require, exports) {
    var KeyControl = (function () {
        function KeyControl() {
            var _this = this;
            this.calc = function () {
                var key;
                for (key in _this.keyMap) {
                    if (_this.keyMap.hasOwnProperty(key)) {
                        _this.keyMap[key].calc();
                    }
                }
            };
            this.getKey = function (name) {
                if (_this.keyMap.hasOwnProperty(name)) {
                    return _this.keyMap[name];
                }
                else {
                    alert(name + "は存在しません");
                    return null;
                }
            };
            this.addKey = function (name, code) {
                var key;
                for (key in _this.keyMap) {
                    if (_this.keyMap.hasOwnProperty(key) && (key == name || _this.keyMap[key].getCode() == code)) {
                        alert(name + "またはコード:" + code + "は既に存在しています");
                        return;
                    }
                }
                _this.keyMap[name] = new Key(code);
            };
            this.setKeyState = function (code, pressed) {
                var key;
                for (key in _this.keyMap) {
                    if (_this.keyMap.hasOwnProperty(key) && _this.keyMap[key].getCode() == code) {
                        _this.keyMap[key].setPressed(pressed);
                        return;
                    }
                }
            };
            this.keyMap = {};
            window.addEventListener("keydown", function (event) {
                var code = event.keyCode;
                if (40 >= code && code >= 37) {
                    event.preventDefault();
                }
                ;
                _this.setKeyState(code, true);
            });
            window.addEventListener("keyup", function (event) {
                _this.setKeyState(event.keyCode, false);
            });
        }
        return KeyControl;
    })();
    var Key = (function () {
        function Key(code) {
            var _this = this;
            this.calc = function () {
                if (_this.pressed)
                    _this.count++;
                else
                    _this.count = 0;
            };
            this.getCode = function () {
                return _this.code;
            };
            this.isPressed = function () {
                return _this.pressed;
            };
            this.getCount = function () {
                return _this.count;
            };
            this.setPressed = function (pressed) {
                _this.pressed = pressed;
            };
            this.code = code;
            this.pressed = false;
            this.count = 0;
        }
        return Key;
    })();
    return KeyControl;
});
