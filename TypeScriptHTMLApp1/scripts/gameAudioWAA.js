define(["require", "exports"], function (require, exports) {
    var GameAudioWAA = (function () {
        function GameAudioWAA(path) {
            var _this = this;
            this.isLoading = function () {
                if (_this.decoding == 0)
                    return true;
                else
                    return false;
            };
            this.load = function (name, loop) {
                _this.decoding++;
                var xhr = new XMLHttpRequest();
                var url = _this.path + "/" + name + _this.extension;
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        var arrayBuffer = xhr.response;
                        var successCallback = function (audioBuffer) {
                            _this.audioMap[name] = new AudioDataWAA(_this.ac, audioBuffer, loop);
                            _this.decoding--;
                        };
                        var errorCallback = function () {
                            alert("Audio読み込みエラー");
                        };
                        _this.ac.decodeAudioData(arrayBuffer, successCallback, errorCallback);
                    }
                };
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
            };
            this.play = function (name) {
                _this.audioMap[name].sorce = _this.ac.createBufferSource();
                _this.audioMap[name].gainNode = _this.ac.createGain();
                _this.audioMap[name].gainNode.gain.value = _this.audioMap[name].volume;
                _this.audioMap[name].gainNode.connect(_this.ac.destination);
                var audioBuffer = _this.audioMap[name].data;
                var sorce = _this.audioMap[name].sorce;
                sorce.buffer = audioBuffer;
                sorce.loop = _this.audioMap[name].loop;
                sorce.loopStart = 0;
                sorce.loopEnd = audioBuffer.duration;
                sorce.connect(_this.audioMap[name].gainNode);
                sorce.start();
            };
            this.stop = function (name) {
                _this.audioMap[name].sorce.stop();
                _this.audioMap[name].sorce = null;
            };
            this.changeVolume = function (name, volume) {
                if (volume < 0 && volume >= 1)
                    return;
                if (_this.audioMap[name].sorce) {
                    _this.audioMap[name].gainNode.gain.value = volume;
                }
                else {
                    _this.audioMap[name].volume = volume;
                }
            };
            this.path = path;
            var audio = new Audio();
            if (audio.canPlayType("audio/ogg") == "maybe")
                this.extension = ".ogg";
            else if (audio.canPlayType("audio/m4a") == "maybe")
                this.extension = ".m4a";
            this.audioMap = {};
            this.ac = new AudioContext();
            this.decoding = 0;
        }
        return GameAudioWAA;
    })();
    var AudioDataWAA = (function () {
        function AudioDataWAA(ac, data, loop) {
            this.data = data;
            this.loop = loop;
            this.volume = 1;
        }
        return AudioDataWAA;
    })();
    return GameAudioWAA;
});
