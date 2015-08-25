interface IGameImage {
    load(name: string): void;//データの読み込み。引数は[ファイル名]
    loadDiv(name: string, allNum: number, xNum: number, yNum: number, divW: number, divH: number): void;//データの分割読み込み。引数は[ファイル名][画像の分割総数][横分割数][縦分割数][分割する幅][分割する高さ]
    draw(ctx: CanvasRenderingContext2D, name: string, x: number, y: number, w?: number, h?: number): void;//データを描画する。引数は[GraphicsContext][ファイル名][x座標][y座標][幅][高さ]
    drawDiv(ctx: CanvasRenderingContext2D, name: string, imageNumber: number, x: number, y: number, w?: number, h?: number): void;//データを部分描画する。引数は[GraphicsContext][ファイル名][画像番号][x座標][y座標][幅][高さ]
    get(name: string): HTMLImageElement;//データを返す。引数は[ファイル名]。
}
export = IGameImage;