import { describe, it, expect } from 'vitest';
import { EquipmentDTO } from '../electron/modules/dto';
import { 武器, 盾 } from './testConst';

describe('EquipmentDTO mannequin conversions', () => {
  it('convertCharacterEquippedToMannequin and back', () => {
    const weaponInstance = EquipmentDTO.convertEquipmentToEquipmentInstance(武器.銅の剣);
    const shieldInstance = EquipmentDTO.convertEquipmentToEquipmentInstance(盾.赤薔薇のミュルグレス);
    const mainEquipped = { '武器': weaponInstance, '盾': shieldInstance };
    const subEquipped = {};

    const mannequin = EquipmentDTO.convertCharacterEquippedToMannequin(mainEquipped, subEquipped);
    const { main, sub } = EquipmentDTO.convertMannequinToCharacterEquipped(mannequin, [weaponInstance, shieldInstance]);

    expect(main).toEqual(mainEquipped);
    expect(sub).toEqual(subEquipped);
  });
});
