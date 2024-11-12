import fs from 'fs';
import { EquipmentSimple } from '../../types/types';

export function writeEquipmentSimpleToJSON(filePath: string, equipments: EquipmentSimple[]): void {
    const json = JSON.stringify(equipments, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
}
