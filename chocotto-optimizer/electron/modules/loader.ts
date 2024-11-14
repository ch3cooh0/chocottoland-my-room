import fs from 'fs';
import csv from 'csv-parser';
import { Equipment, Category, EquipmentSimple, CharacterStatus, AvatarStatus } from '../../types/types';

export function loadEquipmentFromCSV(filePath: string): Promise<Equipment[]> {
    return new Promise((resolve, reject) => {
        const equipments: Equipment[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('data', (row: any) => {
                const equipment: Equipment = {
                    id: row.id,
                    name: row.name,
                    category: row.category as Category,
                    lv: parseInt(row.lv, 10),
                    pow: parseInt(row.pow, 10),
                    int: parseInt(row.int, 10),
                    vit: parseInt(row.vit, 10),
                    spd: parseInt(row.spd, 10),
                    luk: parseInt(row.luk, 10),
                    hp: parseInt(row.hp, 10),
                    sp: parseInt(row.sp, 10),
                    atk: parseInt(row.atk, 10),
                    def: parseInt(row.def, 10),
                    mat: parseInt(row.mat, 10),
                    mdf: parseInt(row.mdf, 10),
                    hpr: parseInt(row.hpr, 10),
                    spr: parseInt(row.spr, 10),
                    exp: parseInt(row.exp, 10),
                    pet: parseInt(row.pet, 10),
                    mov: parseInt(row.mov, 10),
                    drn: parseInt(row.drn, 10),
                    iconid: row.iconid
                };
                equipments.push(equipment);
            })
            .on('end', () => {
                resolve(equipments);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('error', (error: any) => {
                reject(error);
            });
    });
}

export function loadEquipmentSimpleFromJSON(filePath: string): Promise<EquipmentSimple[]> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}

export function loadCharacterStatusFromJSON(filePath: string): Promise<CharacterStatus> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}

export function loadAvatarStatusFromJSON(filePath: string): Promise<AvatarStatus> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}
