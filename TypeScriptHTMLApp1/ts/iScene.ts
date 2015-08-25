interface IScene {
    init(): void;//状態の初期化
    calc(): void;//状態の操作
    graph(): void;//描画
    countUp(): void;//カウンタを増やす
}
export = IScene;