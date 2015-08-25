define(["require", "exports"], function (require, exports) {
    var Item = (function () {
        function Item(ctx, image) {
            var _this = this;
            this.init = function (x, y, imageName, gain) {
                if (_this.flag)
                    return;
                _this.flag = true;
                _this.count = 0;
                _this.x = x;
                _this.y = y;
                _this.gain = gain;
                _this.imageName = imageName;
            };
            this.calc = function () {
                if (!_this.flag)
                    return;
                _this.x -= 2.4;
                if (_this.x < -24)
                    _this.flag = false;
            };
            this.graph = function () {
                if (!_this.flag)
                    return;
                _this.image.draw(_this.ctx, _this.imageName, _this.x - 24, _this.y - 24);
            };
            this.onHit = function (target) {
                target.gainOnaka(_this.gain);
                target.setHappy();
                _this.flag = false;
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
            this.ctx = ctx;
            this.image = image;
            this.flag = false;
        }
        return Item;
    })();
    return Item;
});
