import fs from 'fs';
import { AvatarStatus, CharacterStatus, EquipmentSimple } from '../../types/types';

export function writeEquipmentSimpleToJSON(filePath: string, equipments: EquipmentSimple[]): void {
    const json = JSON.stringify(equipments, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
}

export function writeCharacterStatusToJSON(filePath: string, characterStatus: CharacterStatus): void {
    const json = JSON.stringify(characterStatus, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
}

export function writeAvatarStatusToJSON(filePath: string, avatarStatus: AvatarStatus): void {
    const json = JSON.stringify(avatarStatus, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
}
