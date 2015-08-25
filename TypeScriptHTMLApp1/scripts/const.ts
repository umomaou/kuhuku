module Const {
    export const ONAMA_MAX = 2700;
    export const ITEM_MAX = 5;
    export const STAR_MAX = 150;
    export const BASE_ITEM_INTERVAL = 1500;
    export const BANANA_GAIN = ONAMA_MAX * 0.5;
    export const APPLE_GAIN = ONAMA_MAX * 0.4;
    export const GRAPE_GAIN = ONAMA_MAX * 0.3;
    export const CRANGE = 12;
    export const SHOOTING_STAR_VX = Math.cos(Math.PI * 3 / 5) * 2.0;
    export const SHOOTING_STAR_VY = Math.sin(Math.PI * 3 / 5) * 2.0;
}
export = Const;