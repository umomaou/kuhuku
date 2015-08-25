import IGameAudio = require("iGameAudio");

class GameAudio implements IGameAudio {
    private path: string;
    private audioMap: { [index: string]: HTMLAudioElement };

    constructor(path: string) {
        this.path = path;
        var audio: HTMLAudioElement = new Audio();
        this.audioMap = {};
    }

    public isLoading = (): boolean => {
        var data;
        for (data in this.audioMap) {
            if (this.audioMap.hasOwnProperty(data)) {
                if (this.audioMap[data].readyState != 4) {
                    return false;
                }
            }
        }
        return true;
    };

    public load = (name: string, loop: boolean): void => {
        var audio: HTMLAudioElement = document.createElement("audio");
        audio.loop = loop;
        var source1 = document.createElement("source");
        source1.src = this.path + "/" + name + ".m4a";
        var source2 = document.createElement("source");
        source2.src = this.path + "/" + name + ".ogg";
        audio.appendChild(source1);
        audio.appendChild(source2);
        this.audioMap[name] = audio;
    };

    public play = (name: string): void => {
        if (!this.audioMap.hasOwnProperty(name)) alert("名前間違ってるよ");
        this.audioMap[name].pause();
        this.audioMap[name].currentTime = 0;
        this.audioMap[name].play();
    };

    public stop = (name: string): void => {
        this.audioMap[name].pause();
    };

    public changeVolume = (name: string, volume: number): void => {
        if (volume >= 0 && volume <= 1) this.audioMap[name].volume = volume;
        else alert("error : changeVolume");
    };
}
export = GameAudio;
