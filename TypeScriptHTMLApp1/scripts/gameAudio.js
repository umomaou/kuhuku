define(["require", "exports"], function (require, exports) {
    var GameAudio = (function () {
        function GameAudio(path) {
            var _this = this;
            this.isLoading = function () {
                var data;
                for (data in _this.audioMap) {
                    if (_this.audioMap.hasOwnProperty(data)) {
                        if (_this.audioMap[data].readyState != 4) {
                            return false;
                        }
                    }
                }
                return true;
            };
            this.load = function (name, loop) {
                var audio = document.createElement("audio");
                audio.loop = loop;
                var source1 = document.createElement("source");
                source1.src = _this.path + "/" + name + ".m4a";
                var source2 = document.createElement("source");
                source2.src = _this.path + "/" + name + ".ogg";
                audio.appendChild(source1);
                audio.appendChild(source2);
                _this.audioMap[name] = audio;
            };
            this.play = function (name) {
                if (!_this.audioMap.hasOwnProperty(name))
                    alert("名前間違ってるよ");
                _this.audioMap[name].pause();
                _this.audioMap[name].currentTime = 0;
                _this.audioMap[name].play();
            };
            this.stop = function (name) {
                _this.audioMap[name].pause();
            };
            this.changeVolume = function (name, volume) {
                if (volume >= 0 && volume <= 1)
                    _this.audioMap[name].volume = volume;
                else
                    alert("error : changeVolume");
            };
            this.path = path;
            var audio = new Audio();
            this.audioMap = {};
        }
        return GameAudio;
    })();
    return GameAudio;
});
