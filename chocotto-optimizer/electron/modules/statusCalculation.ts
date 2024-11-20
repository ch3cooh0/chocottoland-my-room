import {
  Equipped,
  TotalStatus,
  EquipmentInstance,
  CharacterStatus,
  AvatarStatus,
  EquippedEffect,
  ComboEquipment,
  ComboStatus,
  ComboInfo,
  Reinforce,
  Category,
} from "../../types/types";
import {
  loadComboEquipmentFromCSV,
  loadComboStatusFromCSV,
  loadEquippedEffectFromCSV,
} from "./loader";
import { EquipmentDTO } from "./dto";
import { ZeroStatus } from "./utiles";

const cache = {
  equippedEffects: [] as EquippedEffect[],
  comboEquipments: [] as ComboEquipment[],
  comboStatuses: [] as ComboStatus[],
};

export const loadCache = async () => {
  cache.equippedEffects = await loadEquippedEffectFromCSV(
    "./data/equipped_effects.csv"
  );
  cache.comboEquipments = await loadComboEquipmentFromCSV(
    "./data/combo_equipments.csv"
  );
  cache.comboStatuses = await loadComboStatusFromCSV(
    "./data/combo_statuses.csv"
  );
};



export const calcTotalStatus = {
  /**
   * 2つのTotalStatusを加算する
   * @param s1
   * @param s2
   * @returns
   */
  addTotalStatus: (s1: TotalStatus, s2: TotalStatus): TotalStatus => {
    return {
      pow: s1.pow + s2.pow,
      int: s1.int + s2.int,
      vit: s1.vit + s2.vit,
      spd: s1.spd + s2.spd,
      luk: s1.luk + s2.luk,
      hp: s1.hp + s2.hp,
      sp: s1.sp + s2.sp,
      atk: s1.atk + s2.atk,
      def: s1.def + s2.def,
      mat: s1.mat + s2.mat,
      mdf: s1.mdf + s2.mdf,
      hpr: s1.hpr + s2.hpr,
      spr: s1.spr + s2.spr,
      exp: s1.exp + s2.exp,
      pet: s1.pet + s2.pet,
      mov: s1.mov + s2.mov,
      drn: s1.drn + s2.drn,
    };
  },
  /**
   * 複数のTotalStatusを加算する
   * @param statuses
   * @returns
   */
  addMultipleTotalStatus: (...statuses: TotalStatus[]): TotalStatus => {
    return statuses.reduce(
      (acc, status) => ({
        pow: acc.pow + status.pow,
        int: acc.int + status.int,
        vit: acc.vit + status.vit,
        spd: acc.spd + status.spd,
        luk: acc.luk + status.luk,
        hp: acc.hp + status.hp,
        sp: acc.sp + status.sp,
        atk: acc.atk + status.atk,
        def: acc.def + status.def,
        mat: acc.mat + status.mat,
        mdf: acc.mdf + status.mdf,
        hpr: acc.hpr + status.hpr,
        spr: acc.spr + status.spr,
        exp: acc.exp + status.exp,
        pet: acc.pet + status.pet,
        mov: acc.mov + status.mov,
        drn: acc.drn + status.drn,
      }),
      ZeroStatus.zeroTotalStatus()
    );
  },

};

export const calcEquippedStatus = {
  /**
   * サブ装備の純粋なステータスを計算する
   * @param subEquipped
   * @returns
   */
  calcRowSubStatus: (subEquipped: Equipped): TotalStatus => {
    const rowSubStatus: TotalStatus = ZeroStatus.zeroTotalStatus();
    for (const category in subEquipped) {
      const equippedItem: EquipmentInstance =
        subEquipped[category as keyof Equipped];
      if (equippedItem) {
        rowSubStatus.pow += Math.ceil(equippedItem.pow * 0.5);
        rowSubStatus.int += Math.ceil(equippedItem.int * 0.5);
        rowSubStatus.vit += Math.ceil(equippedItem.vit * 0.5);
        rowSubStatus.spd += Math.ceil(equippedItem.spd * 0.5);
        rowSubStatus.luk += Math.ceil(equippedItem.luk * 0.5);
        rowSubStatus.hp += Math.ceil(equippedItem.hp * 0.5);
        rowSubStatus.sp += Math.ceil(equippedItem.sp * 0.5);
        rowSubStatus.atk += Math.ceil(equippedItem.atk * 0.5);
        rowSubStatus.def += Math.ceil(equippedItem.def * 0.5);
        rowSubStatus.mat += Math.ceil(equippedItem.mat * 0.5);
        rowSubStatus.mdf += Math.ceil(equippedItem.mdf * 0.5);
      }
    }
    return rowSubStatus;
  },
  /**
   * メイン装備の純粋なステータスを計算する
   * @param mainEquipped
   * @returns
   */
  calcRowMainStatus: (mainEquipped: Equipped): TotalStatus => {
    const rowMainStatus: TotalStatus = ZeroStatus.zeroTotalStatus();
    for (const category in mainEquipped) {
      const equippedItem: EquipmentInstance =
        mainEquipped[category as keyof Equipped];
      if (equippedItem) {
        rowMainStatus.pow += equippedItem.pow;
        rowMainStatus.int += equippedItem.int;
        rowMainStatus.vit += equippedItem.vit;
        rowMainStatus.spd += equippedItem.spd;
        rowMainStatus.luk += equippedItem.luk;
        rowMainStatus.hp += equippedItem.hp;
        rowMainStatus.sp += equippedItem.sp;
        rowMainStatus.atk += equippedItem.atk;
        rowMainStatus.def += equippedItem.def;
        rowMainStatus.mat += equippedItem.mat;
        rowMainStatus.mdf += equippedItem.mdf;
        rowMainStatus.hpr += equippedItem.hpr;
        rowMainStatus.spr += equippedItem.spr;
        rowMainStatus.exp += equippedItem.exp;
        rowMainStatus.pet += equippedItem.pet;
        rowMainStatus.mov += equippedItem.mov;
        rowMainStatus.drn += equippedItem.drn;
      }
    }
    return rowMainStatus;
  },
  /**
   * 装備の純粋なステータスを計算する
   * @param subEquipped
   * @param mainEquipped
   * @returns
   */
  calcRowEquippedStatus: (
    subEquipped: Equipped,
    mainEquipped: Equipped
  ): TotalStatus => {
    const rowSubStatus: TotalStatus =
      calcEquippedStatus.calcRowSubStatus(subEquipped);
    const rowMainStatus: TotalStatus =
      calcEquippedStatus.calcRowMainStatus(mainEquipped);
    return calcTotalStatus.addTotalStatus(rowSubStatus, rowMainStatus);
  },
};

export const comboEffectUtils = {

  /**
   * EquipmentInstance[]から有効なセット効果（コンボ効果）を計算する。
   * @param equippements
   * @returns
   */
  calcComboEffectFromEquipped: (equippements: EquipmentInstance[]): TotalStatus => {
    const comboInfos = comboEffectUtils.getComboInfo(equippements);
    return comboEffectUtils.calcComboEffect(comboInfos);
  },
  /**
   * EquipmentInstance[]から有効なセット効果（コンボ効果）を取得する。
   * @param equippements
   * @returns
   */
  getComboInfo: (equippements: EquipmentInstance[]): ComboInfo[] => {
    const comboIdMap = comboEffectUtils.getComboIdMap(equippements);
    // セット効果発動候補
    const combos = Object.entries(comboIdMap).filter(([, comboEquipments]) => comboEffectUtils.validateCombo(comboEquipments));
    const comboInfos = Object.values(combos).map((combo) => {
      const status = cache.comboStatuses.find(
        (status) => status.combo_id === combo[0]
      );
      if (status) {
        return { comboEquipment: combo[1], comboStatus: status };
      }
      return null;
    }).filter((info) => info !== null) as ComboInfo[]; 

    return comboInfos;
  },
  getComboIdMap: (equippements: EquipmentInstance[]): { [key: string]: ComboEquipment[] } => {
    const ids: string[] = equippements
      .filter(equipment => equipment !== null && equipment.id !== undefined) // null チェックを追加
      .map(equipment => equipment.id);
    // 装備に関連するセット効果一覧
    const relatedComboEquipments = cache.comboEquipments.filter((combo) =>
      ids.includes(combo.equipment_id)
    );
    const comboIdMap = relatedComboEquipments.reduce((acc: { [key: string]: ComboEquipment[] }, combo) => {
      acc[combo.combo_id] = [...(acc[combo.combo_id] || []), combo];
      return acc;
    }, {});
    return comboIdMap;
  },
  /**
   * セット効果が有効か判定する
   * @param comboEquipments 同一のセット効果Idのリスト
   * @returns
   */
  validateCombo: (
    comboEquipments: ComboEquipment[]
  ): boolean => {
    
    // セット効果IDに紐づくセット装備情報を取得
    const masterComboEquipments = cache.comboEquipments.filter(
      (combo) => comboEquipments.some((comboEquipment) => comboEquipment.combo_id === combo.combo_id)
    );
    if (masterComboEquipments.length === 0) {
      return false;
    }
    // 発動に必須の装備Idを取得
    const needEquipmentIds = masterComboEquipments
      .filter((combo) => combo.need === "○")
      .map((combo) => combo.equipment_id);
    // 発動に必要な装備数
    const needEquipmentCount = Number(masterComboEquipments[0].count);
    // セット効果に該当する装備の数
    const comboEquipmentCount = comboEquipments.length;
  
    if (needEquipmentIds.length === 0) {
      // 必須装備なしの場合
      return comboEquipmentCount >= needEquipmentCount;
    }
    // 必須装備がある場合
    return (
      needEquipmentIds.length === comboEquipments.filter((combo) => combo.need === "○").length &&
      comboEquipmentCount >= needEquipmentCount
    );
  },

  calcComboEffect: (comboInfos: ComboInfo[]): TotalStatus => {
    const comboStatuses = comboInfos.map((comboInfo) => {
      return EquipmentDTO.convertComboStatusToTotalStatus(comboInfo.comboStatus);
    });
    return calcTotalStatus.addMultipleTotalStatus(...comboStatuses);
  },
};

export const equippedEffectUtils = {
  /**
   * 装備の効果を取得する
   * @param equippements
   * @returns
   */
  getEquippedEffect: (equippements: EquipmentInstance[]): EquippedEffect[] => {
    const ids: string[] = equippements
      .filter(equipment => equipment !== null && equipment.id !== undefined) // null チェックを追加
      .map(equipment => equipment.id);
    return cache.equippedEffects.filter((effect) =>
      ids.includes(effect.equipment_id)
    );
  },

  calcEquippedEffect: (
    effects: EquippedEffect[],
    mainStatus: TotalStatus,
    subStatus: TotalStatus,
    comboStatus: TotalStatus,
    characterStatus: CharacterStatus,
    avatarStatus: AvatarStatus,
    coreStatus: TotalStatus
  ): TotalStatus => {
    const statuses = effects.map((effect) => {
      switch (effect.ability_type) {
        case "pet_base_status":
          return ZeroStatus.zeroTotalStatus();
        case "player_base_status":
          return equippedEffectUtils.calcPlayerBaseStatus(
            effect,
            mainStatus,
            subStatus,
            comboStatus,
            characterStatus,
            avatarStatus,
            coreStatus
          );
        case "player_ability":
          return ZeroStatus.zeroTotalStatus();
        default:
          return ZeroStatus.zeroTotalStatus();
      }
    });

    return statuses.reduce((acc, status) => {
      return calcTotalStatus.addTotalStatus(acc, status);
    }, ZeroStatus.zeroTotalStatus());
  },

  /**
   * 装備の基本ステータスを計算する(錬成上昇量も含まれる？)
   * @param effect 
   * @param mainStatus 
   * @param subStatus 
   * @param comboStatus 
   * @param characterStatus 
   * @param avatarStatus 
   * @param coreStatus 
   * @returns 
   */
  calcPlayerBaseStatus: (
    effect: EquippedEffect,
    mainStatus: TotalStatus,
    subStatus: TotalStatus,
    comboStatus: TotalStatus,
    characterStatus: CharacterStatus,
    avatarStatus: AvatarStatus,
    coreStatus: TotalStatus
  ): TotalStatus => {
    switch (effect.source_status) {
      case "avatar":
        return equippedEffectUtils.playerBaseStatus.avatar(
          effect,
          avatarStatus
        );
      case "player":
        return equippedEffectUtils.playerBaseStatus.player(
          effect,
          characterStatus
        );
      case "equipment":
        // セット効果・特殊コア・アバターも計算に含まれる。
        return equippedEffectUtils.playerBaseStatus.equipment(
          effect,
          mainStatus,
          subStatus,
          comboStatus,
          avatarStatus,
          coreStatus
        );
      default:
        return ZeroStatus.zeroTotalStatus();
    }
  },

  playerBaseStatus: {
    avatar: (
      effect: EquippedEffect,
      avatarStatus: AvatarStatus
    ): TotalStatus => {
      const zeroStatus = ZeroStatus.zeroTotalStatus();
      switch (effect.target_status) {
        case "pow":
          return {
            ...zeroStatus,
            pow: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.pow
            ),
          };
        case "int":
          return {
            ...zeroStatus,
            int: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.int
            ),
          };
        case "vit":
          return {
            ...zeroStatus,
            vit: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.vit
            ),
          };
        case "spd":
          return {
            ...zeroStatus,
            spd: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.spd
            ),
          };
        case "luk":
          return {
            ...zeroStatus,
            luk: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.luk
            ),
          };
        case "hp":
          return {
            ...zeroStatus,
            hp: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              avatarStatus.hp
            ),
          };
        default:
          return ZeroStatus.zeroTotalStatus();
      }
    },
    player: (
      effect: EquippedEffect,
      characterStatus: CharacterStatus
    ): TotalStatus => {
      const zeroStatus = ZeroStatus.zeroTotalStatus();
      switch (effect.target_status) {
        case "pow":
          return {
            ...zeroStatus,
            pow: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.pow
            ),
          };
        case "int":
          return {
            ...zeroStatus,
            int: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.int
            ),
          };
        case "vit":
          return {
            ...zeroStatus,
            vit: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.vit
            ),
          };
        case "spd":
          return {
            ...zeroStatus,
            spd: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.spd
            ),
          };
        case "luk":
          return {
            ...zeroStatus,
            luk: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.luk
            ),
          };
        case "hp":
          return {
            ...zeroStatus,
            hp: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              characterStatus.hp
            ),
          };
        default:
          return ZeroStatus.zeroTotalStatus();
      }
    },
    equipment: (
      effect: EquippedEffect,
      mainStatus: TotalStatus,
      subStatus: TotalStatus,
      comboStatus: TotalStatus,
      avatarStatus: AvatarStatus,
      coreStatus: TotalStatus
    ): TotalStatus => {
      const zeroStatus = ZeroStatus.zeroTotalStatus();
      switch (effect.target_status) {
        case "pow":
          return {
            ...zeroStatus,
            pow: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.pow + subStatus.pow + comboStatus.pow + avatarStatus.pow + coreStatus.pow
            ),
          };
        case "int":
          return {
            ...zeroStatus,
            int: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.int + subStatus.int + comboStatus.int + avatarStatus.int + coreStatus.int
            ),
          };
        case "vit":
          return {
            ...zeroStatus,
            vit: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.vit + subStatus.vit + comboStatus.vit + avatarStatus.vit + coreStatus.vit
            ),
          };
        case "spd":
          return {
            ...zeroStatus,
            spd: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.spd + subStatus.spd + comboStatus.spd + avatarStatus.spd + coreStatus.spd
            ),
          };
        case "luk":
          return {
            ...zeroStatus,
            luk: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.luk + subStatus.luk + comboStatus.luk + avatarStatus.luk + coreStatus.luk
            ),
          };
        case "hp":
          return {
            ...zeroStatus,
            hp: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.hp + subStatus.hp + comboStatus.hp + avatarStatus.hp + coreStatus.hp
            ),
          };
        case "sp":
          return {
            ...zeroStatus,
            sp: equippedEffectUtils.calcEffectedStatus(
              effect.effect,
              mainStatus.sp + subStatus.sp + comboStatus.sp + avatarStatus.sp + coreStatus.sp
            ),
          };
        default:
          return ZeroStatus.zeroTotalStatus();
      }
    },
  },

  /**
   * アビリティによる増加ステータスを計算
   * @param effect 効果計算式(+n, -n, xn, /n)
   * @param src 計算元の数値
   * @returns アビリティによる増加ステータス
   */
  calcEffectedStatus: (effect: string, src: number): number => {
    const operator = effect.charAt(0);
    const value = Number(effect.slice(1));
    switch (operator) {
      case "+":
        return value;
      case "-":
        return value * -1;
      case "x":
        return Math.ceil(src * value);
      case "/":
        return Math.ceil(src / value);
      default:
        throw new Error(`無効な演算子: ${operator}`);
    }
  },
};

export const coreEffectUtils = {
  calcCoreEffect: (characterMainEquipment: Equipped): TotalStatus => {
    const instances: EquipmentInstance[] = EquipmentDTO.convertEquippedToEquipmentInstances(characterMainEquipment);
    const tolalStatus: TotalStatus = ZeroStatus.zeroTotalStatus();
    instances.map((instance) => {
      if (instance &&instance.core) { 
        Object.values(instance.core).forEach((core) => {
          if (core) {
            Object.entries(core).forEach(([key, value]) => {
              tolalStatus[key as keyof TotalStatus] += value;
            });
          }
        });
      }
    });
    return tolalStatus;
  }
}

/**
 * 画面表示に関するステータス計算
 */
export const calcViewStatus = {
  /**
   * 画面表示に基礎ステータスから拡張ステータスを計算する
   * @param totalStatus 
   * @returns 
   */
  applyExtendedStatus: (totalStatus: TotalStatus): TotalStatus => {
    return {
      ...totalStatus,
      atk: totalStatus.atk + totalStatus.pow * 3,
      def: totalStatus.def + totalStatus.vit * 2,
      mat: totalStatus.mat + totalStatus.int * 2,
      mdf: totalStatus.mdf + totalStatus.int * 15,
    }
  }
}

export const reinforceUtils = {
  calcReinforceEffect: (reinforce: Reinforce, category: Category): number => {
    switch(category){
      case "武器": return reinforceUtils.weapon(reinforce.lv);
      case "盾": return reinforceUtils.shield(reinforce.lv);
      default: return reinforceUtils.other(reinforce.lv);
    }
  },
  weapon: (lv: number): number => {
      switch(lv){
        case 1: return 3;
        case 2: return 7;
        case 3: return 12;
        case 4: return 18;
        case 5: return 25;
        case 6: return 33;
        case 7: return 42;
        case 8: return 52;
        case 9: return 63;
        case 10: return 75;
        case 11: return 88;
        case 12: return 101;
        case 13: return 114;
        case 14: return 127;
        case 15: return 141;
        case 16: return 155;
        case 17: return 169;
        case 18: return 184;
        case 19: return 199;
        case 20: return 214;
        default: return 0;
      }
  },
  shield: (lv: number): number => {
    switch(lv){
      case 1: return 1;
      case 2: return 3;
      case 3: return 6;
      case 4: return 10;
      case 5: return 15;
      case 6: return 21;
      case 7: return 28;
      case 8: return 36;
      case 9: return 45;
      case 10: return 55;
      case 11: return 66;
      case 12: return 77;
      case 13: return 88;
      case 14: return 99;
      case 15: return 110;
      case 16: return 122;
      case 17: return 134;
      case 18: return 146;
      case 19: return 158;
      case 20: return 170;
      default: return 0;
    }
  },
  other: (lv: number): number => {
    switch(lv){
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 5;
      case 5: return 7;
      case 6: return 9;
      case 7: return 11;
      case 8: return 13;
      case 9: return 16;
      case 10: return 20;
      case 11: return 25;
      case 12: return 30;
      case 13: return 35;
      case 14: return 40;
      case 15: return 45;
      case 16: return 50;
      case 17: return 55;
      case 18: return 60;
      case 19: return 65;
      case 20: return 70;
      default: return 0;
    }
  },
  calcReinforceStatus: (reinforce: Reinforce, category: Category): TotalStatus => {
    if(reinforce.type === "物理"){
      switch(category){
        case "武器": return {
          ...ZeroStatus.zeroTotalStatus(),
          atk: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
        case "盾": return {
          ...ZeroStatus.zeroTotalStatus(),
          def: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
        default: return {
          ...ZeroStatus.zeroTotalStatus(),
          def: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
      }
    } else if(reinforce.type === "魔法"){
      switch(category){
        case "武器": return {
          ...ZeroStatus.zeroTotalStatus(),
          mat: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
        case "盾": return {
          ...ZeroStatus.zeroTotalStatus(),
          mdf: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
        default: return {
          ...ZeroStatus.zeroTotalStatus(),
          mdf: reinforceUtils.calcReinforceEffect(reinforce, category),
        }
      }
    }else{
      return ZeroStatus.zeroTotalStatus();
    }
  },
  calcReinforceTotalStatus: (equipped: Equipped): TotalStatus => {
    const totalStatus = Object.entries(equipped).map(([category, equipment]) => {
      if(equipment){
        return reinforceUtils.calcReinforceStatus(equipment.reinforce, category as Category);
      }else{
        return ZeroStatus.zeroTotalStatus();
      }
    });
    return calcTotalStatus.addMultipleTotalStatus(...totalStatus);
  }
}

