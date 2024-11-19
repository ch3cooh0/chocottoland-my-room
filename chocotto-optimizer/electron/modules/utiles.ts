import { TotalStatus, AvatarStatus, CharacterStatus, Equipped, EquipmentInstance, Category } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';

export const ZeroStatus = {
    zeroTotalStatus: (): TotalStatus => {
      return {
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
      };
    },
    zeroCharacterStatus: (): CharacterStatus => {
      return {
        lv: 0,
        hp: 0,
        sp: 0,
        pow: 0,
        int: 0,
        vit: 0,
        spd: 0,
        luk: 0,
      };
    },
    zeroAvatarStatus: (): AvatarStatus => {
      return {
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
      };
    },
    noneEquipmentInstance: (category: Category, uuid: string): EquipmentInstance => {
      return {
        id: '',
        name: '',
        category: category,
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
        iconid: '',
        uuid: uuid,
        reinforceLevel: 0,
        core: { '1': {}, '2': {}, '3': {} }
      };
    },
    zeroEquipped: (): Equipped => {
        return {
          "武器": ZeroStatus.noneEquipmentInstance("武器", uuidv4()),
          "頭": ZeroStatus.noneEquipmentInstance("頭", uuidv4()),
          "服": ZeroStatus.noneEquipmentInstance("服", uuidv4()),
          "首": ZeroStatus.noneEquipmentInstance("首", uuidv4()),
          "手": ZeroStatus.noneEquipmentInstance("手", uuidv4()),
          "盾": ZeroStatus.noneEquipmentInstance("盾", uuidv4()),
          "背": ZeroStatus.noneEquipmentInstance("背", uuidv4()),
          "靴": ZeroStatus.noneEquipmentInstance("靴", uuidv4()),
      };
    },
  };