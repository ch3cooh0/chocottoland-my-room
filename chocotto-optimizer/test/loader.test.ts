import { describe, it, expect } from 'vitest';
import { Scale, TestTags, createTitle } from './tags';
import { loadEquipmentFromCSV ,loadEquipmentSimpleFromJSON} from '../electron/modules/loader';


describe('loader:loadEquipmentFromCSV', () => {
    it(createTitle('loadEquipmentFromCSV:single', Scale.medium, TestTags.unit), async () => {
        const equipments = await loadEquipmentFromCSV('./test/data/loadEquipmentFromCSV.single.csv');
        expect(equipments).toBeDefined();
        expect(equipments.length).toEqual(1);
        expect(equipments[0].id).toEqual("7da9fdcf-befa-4f68-a26c-c4225a5f325d");
        expect(equipments[0].name).toEqual("銅の剣");
        expect(equipments[0].name_kn).toEqual("ドウノツルギ");
        expect(equipments[0].category).toEqual("武器");
        expect(equipments[0].lv).toEqual(11);
        expect(equipments[0].pow).toEqual(1);
        expect(equipments[0].int).toEqual(2);
        expect(equipments[0].vit).toEqual(3);
        expect(equipments[0].spd).toEqual(4);
        expect(equipments[0].luk).toEqual(5);
        expect(equipments[0].hp).toEqual(6);
        expect(equipments[0].sp).toEqual(7);
        expect(equipments[0].atk).toEqual(8);
        expect(equipments[0].def).toEqual(9);
        expect(equipments[0].mat).toEqual(10);
        expect(equipments[0].mdf).toEqual(11);
        expect(equipments[0].hpr).toEqual(12);
        expect(equipments[0].spr).toEqual(13);
        expect(equipments[0].exp).toEqual(14);
        expect(equipments[0].pet).toEqual(15);
        expect(equipments[0].mov).toEqual(16);
        expect(equipments[0].drn).toEqual(17);
        expect(equipments[0].iconid).toEqual("どうのつるぎ");
    });
});

describe('loader:loadEquipmentSimpleFromJSON', () => {
    it(createTitle('loadEquipmentSimpleFromJSON:single', Scale.medium, TestTags.unit), async () => {
        const equipments = await loadEquipmentSimpleFromJSON('./test/data/loadEquipmentSimpleFromJSON.single.json');
        expect(equipments).toBeDefined();
        expect(equipments.length).toEqual(1);
        expect(equipments[0].id).toEqual("7da9fdcf-befa-4f68-a26c-c4225a5f325d");
        expect(equipments[0].name).toEqual("銅の剣");
        expect(equipments[0].iconid).toEqual("どうのつるぎ");
        expect(equipments[0].reinforceLevel).toEqual(11);
        expect(equipments[0].core).toEqual({ pow: 1, int: 2 });
    });
});
