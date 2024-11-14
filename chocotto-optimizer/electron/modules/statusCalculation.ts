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
} from "../../types/types";
import {
  loadComboEquipmentFromCSV,
  loadComboStatusFromCSV,
  loadEquippedEffectFromCSV,
} from "./loader";
import { EquipmentDTO } from "./dto";
import { ZeroStatus } from "./utiles";

let cache = {
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
    let rowSubStatus: TotalStatus = ZeroStatus.zeroTotalStatus();
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
    let rowMainStatus: TotalStatus = ZeroStatus.zeroTotalStatus();
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
   * EquipmentInstance[]から有効なセット効果（コンボ効果）を取得する。
   * @param equippements
   * @returns
   */
  getComboInfo: (equippements: EquipmentInstance[]): ComboInfo[] => {
    const ids: string[] = equippements.map((equipment) => equipment.id);
    // 装備に関連するセット効果一覧
    const relatedComboEquipments = cache.comboEquipments.filter((combo) =>
      ids.includes(combo.equipment_id)
    );
    // セット効果発動候補
    const combos: ComboEquipment[] = relatedComboEquipments.filter((combo) => comboEffectUtils.validateCombo(combo, ids));
    const comboInfos = combos.map((combo) => {
        const status = cache.comboStatuses.find(
          (status) => status.combo_id === combo.combo_id
        );
        if (status) {
          return { comboEquipment: combo, comboStatus: status };
        }
        return null;
      })
      .filter((info) => info !== null);

    const groupedComboInfos = comboInfos.reduce((acc: { [key: string]: ComboInfo }, info: ComboInfo) => {
      const groupId = info.comboStatus.group_id;
      if (!acc[groupId] || acc[groupId].comboEquipment.count < info.comboEquipment.count) {
        acc[groupId] = info;
      }
      return acc;
    }, {});

    return Object.values(groupedComboInfos);
  },
  /**
   * セット効果が有効か判定する
   * @param relatedComboEquipment
   * @param equipmentIds
   * @returns
   */
  validateCombo: (
    relatedComboEquipment: ComboEquipment,
    equipmentIds: string[]
  ): boolean => {
    // セット効果IDに紐づくセット装備情報を取得
    const comboEquipments = cache.comboEquipments.filter(
      (combo) => relatedComboEquipment.combo_id === combo.combo_id
    );
    if (comboEquipments.length === 0) {
      return false;
    }
    // 発動に必須の装備Idを取得
    const needEquipmentIds = comboEquipments
      .filter((combo) => combo.need === "○")
      .map((combo) => combo.equipment_id);
    // 発動に必要な装備数
    const needEquipmentCount = Number(comboEquipments[0].count);
    // セット効果に該当する装備の数
    const comboEquipmentCount = comboEquipments.filter((combo) =>
      equipmentIds.includes(combo.equipment_id)
    ).length;
    if (needEquipmentIds.length === 0) {
      // 必須装備なしの場合
      return comboEquipmentCount >= needEquipmentCount;
    }
    // 必須装備がある場合
    return (
      needEquipmentIds.every((id) => equipmentIds.includes(id)) &&
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
    const ids: string[] = equippements.map((equipment) => equipment.id);
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
    let tolalStatus = ZeroStatus.zeroTotalStatus();
    instances.map((instance) => {
      Object.values(instance.core).forEach((core) => {
        Object.entries(core).forEach(([key, value]) => {
          tolalStatus[key as keyof TotalStatus] += value;
        });
      });
    });
    return tolalStatus;
  }
}
