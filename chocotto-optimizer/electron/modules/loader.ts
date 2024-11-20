import fs from 'fs';
import csv from 'csv-parser';
import { Equipment, Category, EquipmentSimple, CharacterStatus, AvatarStatus, EquippedEffect, ComboEquipment, ComboStatus, Mannequin } from '../../types/types';

/**
 * CSVファイルを読み込んで、Equipmentの配列を返す
 * @param filePath 
 * @returns 
 */
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

/**
 * CSVファイルを読み込んで、EquippedEffectの配列を返す
 * @param filePath 
 * @returns 
 */
export function loadEquippedEffectFromCSV(filePath: string): Promise<EquippedEffect[]> {
    return new Promise((resolve, reject) => {
        const equippedEffects: EquippedEffect[] = [];
        fs.createReadStream(filePath)
        .pipe(csv())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('data', (row: any) => {
            const equippedEffect: EquippedEffect = {
                ability_id: row.ability_id,
                ability_type: row.ability_type,
                equipment_id: row.equipment_id,
                source_status: row.source_status,
                target_status: row.target_status,
                effect: row.effect,
                text: row.text,
            };
            equippedEffects.push(equippedEffect);
        })
        .on('end', () => {
                resolve(equippedEffects);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('error', (error: any) => {
                reject(error);
            });
    });
}

/**
 * CSVファイルを読み込んで、ComboEquipmentの配列を返す
 * @param filePath 
 * @returns 
 */
export function loadComboEquipmentFromCSV(filePath: string): Promise<ComboEquipment[]> {
    return new Promise((resolve, reject) => {
        const comboEquipments: ComboEquipment[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('data', (row: any) => {
                const comboEquipment: ComboEquipment = {
                    combo_id: row.combo_id,
                    part: row.part,
                    equipment_id: row.equipment_id,
                    count: row.count,
                    need: row.need,
                };
                comboEquipments.push(comboEquipment);
            })
            .on('end', () => {
                resolve(comboEquipments);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('error', (error: any) => {
                reject(error);
            });
    });
}

/**
 * CSVファイルを読み込んで、ComboStatusの配列を返す
 * @param filePath 
 * @returns 
 */
export function loadComboStatusFromCSV(filePath: string): Promise<ComboStatus[]> {
    return new Promise((resolve, reject) => {
        const comboStatuses: ComboStatus[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('data', (row: any) => {
                const comboStatus: ComboStatus = {
                    combo_id: row.combo_id,
                    pow: parseInt(row.pow, 10),
                    int: parseInt(row.int, 10),
                    spd: parseInt(row.spd, 10),
                    vit: parseInt(row.vit, 10),
                    luk: parseInt(row.luk, 10),
                    atk: parseInt(row.atk, 10),
                    def: parseInt(row.def, 10),
                    mat: parseInt(row.mat, 10),
                    mdf: parseInt(row.mdf, 10),
                    hp: parseInt(row.hp, 10),
                    sp: parseInt(row.sp, 10),
                    hpr: parseInt(row.hpr, 10),
                    spr: parseInt(row.spr, 10),
                    drn: parseInt(row.drn, 10),
                    mov: parseInt(row.mov, 10),
                    pet: parseInt(row.pet, 10),
                    exp: parseInt(row.exp, 10),
                    group_id: row.group_id,
                    text: row.text,
                };
                comboStatuses.push(comboStatus);
            })
            .on('end', () => {
                resolve(comboStatuses);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('error', (error: any) => {
                reject(error);
            });
    });
}

/**
 * JSONファイルを読み込んで、EquipmentSimpleの配列を返す
 * @param filePath 
 * @returns 
 */
export function loadEquipmentSimpleFromJSON(filePath: string): Promise<EquipmentSimple[]> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}

/**
 * JSONファイルを読み込んで、CharacterStatusを返す
 * @param filePath 
 * @returns 
 */
export function loadCharacterStatusFromJSON(filePath: string): Promise<CharacterStatus> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}

/**
 * JSONファイルを読み込んで、AvatarStatusを返す
 * @param filePath 
 * @returns 
 */
export function loadAvatarStatusFromJSON(filePath: string): Promise<AvatarStatus> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}

/**
 * JSONファイルを読み込んで、Mannequinを返す
 * @param filePath 
 * @returns 
 */
export function loadMannequinFromJSON(filePath: string): Promise<Mannequin> {
    const json = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(json);
    return data;
}
