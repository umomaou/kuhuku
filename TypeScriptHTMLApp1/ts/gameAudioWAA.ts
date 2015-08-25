import IGameAudio = require("iGameAudio");

class GameAudioWAA implements IGameAudio {
    private path: string;
    private extension: string; //拡張子
    private audioMap: { [index: string]: AudioDataWAA };
    private ac: AudioContext;
    private decoding: number;

    constructor(path: string) {
        this.path = path;
        var audio: HTMLAudioElement = new Audio();
        if (audio.canPlayType("audio/ogg") == "maybe") this.extension = ".ogg";
        else if (audio.canPlayType("audio/m4a") == "maybe") this.extension = ".m4a";
        this.audioMap = {};
        this.ac = new AudioContext();

        this.decoding = 0;
    }

    public isLoading = (): boolean => {
        if (this.decoding == 0) return true;
        else return false;
    };

    public load = (name: string, loop: boolean) => {
        this.decoding++;
        var xhr: XMLHttpRequest = new XMLHttpRequest();
        var url: string = this.path + "/" + name + this.extension;
        xhr.onload = () => {
            if (xhr.status == 200) {
                var arrayBuffer: ArrayBuffer = xhr.response;
                var successCallback = (audioBuffer: AudioBuffer): void => {
                    this.audioMap[name] = new AudioDataWAA(this.ac, audioBuffer, loop);
                    this.decoding--;
                };
                var errorCallback = (): void => {
                    alert("Audio読み込みエラー")
                };
                this.ac.decodeAudioData(arrayBuffer, successCallback, errorCallback);
            }
        };
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
    };

    public play = (name: string): void => {
        this.audioMap[name].sorce = this.ac.createBufferSource();
        this.audioMap[name].gainNode = this.ac.createGain();
        this.audioMap[name].gainNode.gain.value = this.audioMap[name].volume;
        this.audioMap[name].gainNode.connect(this.ac.destination);
        var audioBuffer: AudioBuffer = this.audioMap[name].data;
        var sorce: AudioBufferSourceNode = this.audioMap[name].sorce;
        sorce.buffer = audioBuffer;
        sorce.loop = this.audioMap[name].loop;
        sorce.loopStart = 0;
        sorce.loopEnd = audioBuffer.duration;
        sorce.connect(this.audioMap[name].gainNode);
        sorce.start();
    };

    public stop = (name: string): void => {
        this.audioMap[name].sorce.stop();
        this.audioMap[name].sorce = null;

    };

    public changeVolume = (name: string, volume: number): void => {
        if (volume < 0 && volume >= 1) return;
        if (this.audioMap[name].sorce) {
            this.audioMap[name].gainNode.gain.value = volume;
        }
        else {
            this.audioMap[name].volume = volume;
        }
    };
}
export = GameAudioWAA;

class AudioDataWAA {
    public data: AudioBuffer;
    public sorce: AudioBufferSourceNode;
    public loop: boolean;
    public volume: number;
    public gainNode: GainNode;

    constructor(ac: AudioContext, data: AudioBuffer, loop: boolean) {
        this.data = data;
        this.loop = loop;
        this.volume = 1;
    }
}