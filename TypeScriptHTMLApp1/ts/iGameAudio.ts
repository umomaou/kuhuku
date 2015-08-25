interface IGameAudio {
    isLoading(): boolean;//データの読み込みが完了していればtrueを返す
    load(name: string, loop: boolean): void;//データを読み込む。引数は[ファイルの名前][ループするか]
    play(name: string): void;//データを再生する。引数は[ファイルの名前]
    stop(name: string): void;//データの再生を停止する。引数は[ファイルの名前]
    changeVolume(name: string, volume: number): void;//再生音量を変更する。引数は[ファイルの名前][音量(0.0~1.0)]
}
export = IGameAudio;