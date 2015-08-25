define(["require", "exports"], function (require, exports) {
    var GameImage = (function () {
        function GameImage(path, extension) {
            var _this = this;
            this.load = function (name) {
                var image = new Image();
                image.src = _this.path + "/" + name + "." + _this.extension;
                var imageData = new ImageData();
                imageData.data = image;
                imageData.division = false;
                _this.imageMap[name] = imageData;
            };
            this.loadDiv = function (name, allNum, xNum, yNum, divW, divH) {
                var image = new Image();
                image.src = _this.path + "/" + name + "." + _this.extension;
                var imageData = new ImageData();
                imageData.data = image;
                imageData.division = true;
                imageData.allNum = allNum;
                imageData.xNum = xNum;
                imageData.yNum = yNum;
                imageData.divW = divW;
                imageData.divH = divH;
                _this.imageMap[name] = imageData;
            };
            this.draw = function (ctx, name, x, y, w, h) {
                if (w === void 0) { w = _this.imageMap[name].data.naturalWidth; }
                if (h === void 0) { h = _this.imageMap[name].data.naturalHeight; }
                if (!_this.imageMap.hasOwnProperty(name))
                    alert(name + "なんて画像は無いよ");
                ctx.drawImage(_this.imageMap[name].data, Math.round(x), Math.round(y), w, h);
            };
            this.drawDiv = function (ctx, name, imageNumber, x, y, w, h) {
                if (w === void 0) { w = _this.imageMap[name].divW; }
                if (h === void 0) { h = _this.imageMap[name].divH; }
                var imageData = _this.imageMap[name];
                if (imageData.division == false || imageNumber < 0 || imageNumber > imageData.allNum - 1)
                    return;
                ctx.drawImage(imageData.data, imageNumber % imageData.xNum * imageData.divW, imageNumber % imageData.yNum * imageData.divH, imageData.divW, imageData.divH, Math.round(x), Math.round(y), w, h);
            };
            this.get = function (name) {
                if (!_this.imageMap.hasOwnProperty(name))
                    alert(name + "なんて画像は無いよ");
                return _this.imageMap[name].data;
            };
            this.path = path;
            this.extension = extension;
            this.imageMap = {};
        }
        return GameImage;
    })();
    var ImageData = (function () {
        function ImageData() {
        }
        return ImageData;
    })();
    return GameImage;
});
