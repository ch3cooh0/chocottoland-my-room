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
const 武器 = {
    銅の剣: {
        ...defaultEquipment,
        id: "7da9fdcf-befa-4f68-a26c-c4225a5f325d",
        lv: 11,
        atk:24,
    },
    神撃剣: {
        ...defaultEquipment,
        id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
        lv: 80,
        pow:20,
        int:15,
        atk:444,
    },
}