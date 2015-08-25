define(["require", "exports"], function (require, exports) {
    var Const;
    (function (Const) {
        Const.ONAMA_MAX = 2700;
        Const.ITEM_MAX = 5;
        Const.STAR_MAX = 150;
        Const.BASE_ITEM_INTERVAL = 1500;
        Const.BANANA_GAIN = Const.ONAMA_MAX * 0.5;
        Const.APPLE_GAIN = Const.ONAMA_MAX * 0.4;
        Const.GRAPE_GAIN = Const.ONAMA_MAX * 0.3;
        Const.CRANGE = 12;
        Const.SHOOTING_STAR_VX = Math.cos(Math.PI * 3 / 5) * 2.0;
        Const.SHOOTING_STAR_VY = Math.sin(Math.PI * 3 / 5) * 2.0;
    })(Const || (Const = {}));
    return Const;
});
