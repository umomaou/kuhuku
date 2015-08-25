define(["require", "exports", "item", "const"], function (require, exports, Item, C) {
    var Fruit;
    (function (Fruit) {
        Fruit[Fruit["GRAPE"] = 0] = "GRAPE";
        Fruit[Fruit["APPLE"] = 1] = "APPLE";
        Fruit[Fruit["BANANA"] = 2] = "BANANA";
    })(Fruit || (Fruit = {}));
    var ItemControl = (function () {
        function ItemControl(ctx, image) {
            var _this = this;
            this.init = function (rumia) {
                _this.rumia = rumia;
                _this.itemInterval = Math.round(Math.random() * C.BASE_ITEM_INTERVAL);
                _this.itemNextInterval = C.BASE_ITEM_INTERVAL - _this.itemInterval;
                var rnd = Math.random() * 3;
                if (rnd > 2)
                    _this.nextItem = Fruit.GRAPE;
                else if (rnd > 1)
                    _this.nextItem = Fruit.APPLE;
                else
                    _this.nextItem = Fruit.BANANA;
                for (var i = 0; i < C.ITEM_MAX; i++) {
                    _this.itemList[i] = new Item(_this.ctx, _this.image);
                }
            };
            this.calc = function () {
                if (_this.rumia.isFlag())
                    _this.createItem();
                for (var i = 0; i < C.ITEM_MAX; i++) {
                    _this.itemList[i].calc();
                }
            };
            this.graph = function () {
                for (var i = 0; i < C.ITEM_MAX; i++) {
                    _this.itemList[i].graph();
                }
            };
            this.interferenceRumia = function (rumia) {
                for (var i = 0; i < C.ITEM_MAX; i++) {
                    if (rumia.isHittingItem(_this.itemList[i])) {
                        _this.itemList[i].onHit(rumia);
                    }
                    rumia.jadgeExpectationItem(_this.itemList[i]);
                }
            };
            this.createItem = function () {
                if (_this.itemInterval == 0) {
                    for (var i = 0; i < C.ITEM_MAX; i++) {
                        if (!_this.itemList[i].isFlag()) {
                            var rnd = Math.random() * 100;
                            switch (_this.nextItem) {
                                case Fruit.BANANA:
                                    _this.itemList[i].init(504, _this.rumia.getY(), "f2_48", C.BANANA_GAIN);
                                    if (rnd > 90)
                                        _this.nextItem = Fruit.BANANA;
                                    else if (rnd > 60)
                                        _this.nextItem = Fruit.APPLE;
                                    else
                                        _this.nextItem = Fruit.GRAPE;
                                    break;
                                case Fruit.APPLE:
                                    _this.itemList[i].init(504, _this.rumia.getY(), "f1_48", C.APPLE_GAIN);
                                    if (rnd > 60)
                                        _this.nextItem = Fruit.BANANA;
                                    else if (rnd > 20)
                                        _this.nextItem = Fruit.APPLE;
                                    else
                                        _this.nextItem = Fruit.GRAPE;
                                    break;
                                case Fruit.GRAPE:
                                    _this.itemList[i].init(504, _this.rumia.getY(), "f3_48", C.GRAPE_GAIN);
                                    if (rnd > 90)
                                        _this.nextItem = Fruit.GRAPE;
                                    else if (rnd > 60)
                                        _this.nextItem = Fruit.APPLE;
                                    else
                                        _this.nextItem = Fruit.BANANA;
                                    break;
                            }
                            break;
                        }
                    }
                    if (_this.itemNextInterval == 0) {
                        _this.itemInterval = Math.round(Math.random() * C.BASE_ITEM_INTERVAL);
                        _this.itemNextInterval = C.BASE_ITEM_INTERVAL - _this.itemInterval;
                    }
                    else {
                        _this.itemInterval = _this.itemNextInterval;
                        _this.itemNextInterval = 0;
                    }
                }
                if (_this.itemInterval > 0)
                    _this.itemInterval--;
            };
            this.ctx = ctx;
            this.image = image;
            this.itemList = new Array(C.ITEM_MAX);
        }
        return ItemControl;
    })();
    return ItemControl;
});
