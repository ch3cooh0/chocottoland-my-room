import { describe, it } from 'vitest';
import { Scale, TestTags, createTitle } from './tags';
import { writeEquipmentSimpleToJSON } from '../electron/modules/writer';
import { EquipmentSimple } from '../types/types';

describe('writer:writeEquipmentSimpleToJSON', () => {
    it(createTitle('writeEquipmentSimpleToJSON:single', Scale.medium, TestTags.unit), () => {
        const equipments: EquipmentSimple[] = [
            {
                id: "7da9fdcf-befa-4f68-a26c-c4225a5f325d",
                name: "銅の剣",
                reinforceLevel: 11,
                core: {
                    1: { pow: 1 },
                    2: { int: 2 },
                    3: { luk: 3 },
                }
            }
        ];
        writeEquipmentSimpleToJSON('./test/data/writeEquipmentSimpleToJSON.single.json', equipments);
    });
    it(createTitle('writeEquipmentSimpleToJSON:multiple', Scale.medium, TestTags.unit), () => {
        const equipments: EquipmentSimple[] = [
            {
                id: "7da9fdcf-befa-4f68-a26c-c4225a5f325d",
                name: "銅の剣",
                reinforceLevel: 11,
                core: {
                    1: { pow: 1 },
                    2: { int: 2 },
                    3: { luk: 3 },
                }
            },
            {
                id: "7da9fdcf-befa-4f68-a26c-c4225a5f325z",
                name: "銅の盾",
                reinforceLevel: 0,
                core: {
                    1: { pow: 1 },
                    2: { int: 2 },
                    3: { },
                }
            }
        ];
        writeEquipmentSimpleToJSON('./test/data/writeEquipmentSimpleToJSON.multiple.json', equipments);
    });
});
