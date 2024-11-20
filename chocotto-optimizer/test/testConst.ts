import { Equipment } from "../types/types";

const defaultEquipment: Equipment = {
    id: "",
    name: "",
    category: "武器",
    lv: 0,
    pow: 0,
    int: 0,
    vit: 0,
    spd: 0,
    luk: 0,
    hp: 0,
    sp: 0,
    atk: 0,
    def: 0,
    mat: 0,
    mdf: 0,
    hpr: 0,
    spr: 0,
    exp: 0,
    pet: 0,
    mov: 0,
    drn: 0,
    iconid: "",
}

export const 武器 = {
    銅の剣: {
        ...defaultEquipment,
        id: "7da9fdcf-befa-4f68-a26c-c4225a5f325d",
        name: "銅の剣",
        lv: 11,
        atk:24,
    },
    神撃剣: {
        ...defaultEquipment,
        id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
        name: "神撃剣",
        lv: 80,
        pow:20,
        int:15,
        atk:444,
    },
}
export const 手 = {
    ドラゴライズリング: {
        ...defaultEquipment,
        id: "0bceb552-9579-4e65-96bd-ff3d17d12fed",
        name: "ドラゴライズリング",
        category: "手",
        lv: 10,
        pow:0,
        int:2,
        def:4,
    },
    ＰＯＷアバティアＳ: {
        ...defaultEquipment,
        id: "97e278c2-4a07-4891-b892-b5f46678a5a5",
        name: "ＰＯＷアバティアＳ",
        category: "手",
        lv: 1,
        hp: 2000,
        sp: 1000,
        def: 3,
    },
    ＩＮＴアバティアＳ: {
        ...defaultEquipment,
        id: "cf2893e6-8b88-4128-92c0-64220af66c68",
        name: "ＩＮＴアバティアＳ",
        category: "手",
        lv: 1,
        hp: 2000,
        sp: 1000,
        def: 3,
    },
}

export const 服 = {
    男用インナー: {
        ...defaultEquipment,
        id: "f760569e-3344-4936-b1cc-6e429b6339cb",
        name: "男用インナー",
        category: "服",
        lv: 1,
        def: 1,
    },
    グロリアフェヒター: {
        ...defaultEquipment,
        id: "07221f64-1731-4685-8800-465f5692c8f7",
        name: "グロリアフェヒター",
        category: "服",
        lv: 50,
        pow: 50,
        hp: 1000,
        atk: 250,
        def: 25,
    },
}

export const 盾 = {
    赤薔薇のミュルグレス: {
        ...defaultEquipment,
        id: "cf989dff-fff5-4d12-afd5-2b86be5b25ec",
        name: "赤薔薇のミュルグレス",
        category: "盾",
        lv: 50,
        pow: 43,
        luk: 10,
        hp: 4000,
        def: 100,
    },
}

export const 背 = {
    緋撃剣・スティレッド: {
        ...defaultEquipment,
        id: "95504868-10c2-4393-b358-444ffa973230",
        name: "緋撃剣・スティレッド",
        category: "背",
        lv: 50,
        pow: 40,
        spd: 10,
        hp: 3000,
        atk: 300,
        def: 27,
    },
}

export const 靴 = {
    シュバリエ・ハイロウ: {
        ...defaultEquipment,
        id: "4ef9d32b-4612-47aa-b739-9fe2932c4160",
        name: "シュバリエ・ハイロウ",
        category: "靴",
        lv: 50,
        pow: 47,
        hp: 2000,
        atk:50,
        mov: 100,
    },
    グラス・ラリマー: {
        ...defaultEquipment,
        id: "1347048c-2b60-4a06-8016-3caafb78948c",
        name: "グラス・ラリマー",
        category: "靴",
        lv: 50,
        pow: 35,
        luk: 12,
        hp: 3000,
        atk:120,
        def: 25,
        mov: 50,
    },

}

export const 頭={
    ヌル・レムクローネ: {
        ...defaultEquipment,
        id: "c7732b0f-3fb6-4119-a623-ba951d18275c",
        name: "ヌル・レムクローネ",
        category: "頭",
        lv: 50,
        pow: 40,
        luk: 10,
        hp: 3500,
        atk: 300,
        def: 30,
    },
}

export const 首 = {
    天藍玉フォルティス: {
        ...defaultEquipment,
        id: "9d34e974-c7fc-4cd1-abdd-cbd8a665731a",
        name: "天藍玉フォルティス",
        category: "首",
        lv: 50,
        pow: 37,
        spd: 13,
        hp: 5000,
        sp: 1000,
        atk: 200,
    },
    "16thフォースネック・兵": {
        ...defaultEquipment,
        id: "dfac25a3-f7b7-4a65-bb8c-04c692626032",
        name: "16thフォースネック・兵",
        category: "首",
        lv: 50,
        pow: 27,
        atk: 120,
        def: 25,
        exp: 6,
    },
}
