define(["require", "exports", "const"], function (require, exports, C) {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Yellow"] = 3] = "Yellow";
    })(Color || (Color = {}));
    var Star = (function () {
        function Star(ctx, image) {
            var _this = this;
            this.init = function (large, x, y, shooting) {
                if (shooting === void 0) { shooting = false; }
                _this.flag = true;
                _this.count = 0;
                _this.large = large;
                if (shooting) {
                    _this.calc = _this.calcShooting;
                    if (!large) {
                        _this.imageName = "hoshi_24y";
                    }
                    else {
                        _this.imageName = "hoshi_48b";
                    }
                }
                else {
                    _this.calc = _this.calcNormal;
                    if (!large) {
                        var rnd = Math.random() * 3;
                        if (rnd > 2)
                            _this.imageName = "hoshi_24r";
                        else if (rnd > 1)
                            _this.imageName = "hoshi_24g";
                        else
                            _this.imageName = "hoshi_24b";
                    }
                    else {
                        _this.imageName = "hoshi_48b";
                    }
                }
                _this.ofset = Math.floor(Math.random() * 16);
                _this.x = x;
                _this.y = y;
            };
            this.calc = function () {
            };
            this.calcNormal = function () {
                if (!_this.flag)
                    return;
                _this.x -= 1.2;
                if (_this.x < -24)
                    _this.flag = false;
                _this.count++;
            };
            this.calcShooting = function () {
                if (!_this.flag)
                    return;
                _this.x += C.SHOOTING_STAR_VX;
                _this.y += C.SHOOTING_STAR_VY;
                if (_this.x < -24)
                    _this.flag = false;
                _this.count++;
            };
            this.graph = function () {
                if (!_this.flag)
                    return;
                _this.image.drawDiv(_this.ctx, _this.imageName, Math.floor(((_this.count + _this.ofset) % 16) / 4), _this.x - (_this.large ? 24 : 12), _this.y - (_this.large ? 24 : 12));
            };
            this.isFlag = function () {
                return _this.flag;
            };
            this.getX = function () {
                return _this.x;
            };
            this.getY = function () {
                return _this.y;
            };
            this.isLarge = function () {
                return _this.large;
            };
            this.onHit = function (rumia) {
                rumia.crash();
            };
            this.ctx = ctx;
            this.image = image;
            this.flag = false;
        }
        return Star;
    })();
    return Star;
});
