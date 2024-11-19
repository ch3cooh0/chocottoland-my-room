import {
  comboEffectUtils,
  loadCache,
} from "../electron/modules/statusCalculation";
import {
  EquipmentInstance,
  ComboInfo,
  TotalStatus,
  ComboEquipment,
} from "../types/types";
import { expect, describe, it, beforeAll } from "vitest";

beforeAll(async () => {
  await loadCache();
});

describe("comboEffectUtils", () => {
  const defaultEquipmentInstance = {
    id: "",
    uuid: "",
    name: "default",
    category: "武器",
    lv: 1,
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
    core: { 1: {}, 2: {}, 3: {} },
    reinforceLevel: 0,
    iconid: "",
  };
  describe("getComboInfo", () => {
    it("最強剣と最強盾の場合２つのセット効果が発動する。", () => {
      const equipmentInstances: EquipmentInstance[] = [
        {
          ...defaultEquipmentInstance,
          id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
          uuid: "uuid1",
          name: "equip1",
          category: "武器",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip2",
          uuid: "uuid2",
          name: "equip2",
          category: "頭",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip3",
          uuid: "uuid3",
          name: "equip3",
          category: "服",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip4",
          uuid: "uuid4",
          name: "equip4",
          category: "首",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip5",
          uuid: "uuid5",
          name: "equip5",
          category: "手",
        },
        {
          ...defaultEquipmentInstance,
          id: "e3358b47-5a60-43f7-bd0b-71a9b10ce2b1",
          uuid: "uuid6",
          name: "equip6",
          category: "盾",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip7",
          uuid: "uuid7",
          name: "equip7",
          category: "背",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip8",
          uuid: "uuid8",
          name: "equip8",
          category: "靴",
        },
      ];

      const comboInfos: ComboInfo[] =
        comboEffectUtils.getComboInfo(equipmentInstances);
      expect(comboInfos).toBeInstanceOf(Array);
      expect(comboInfos.length).toEqual(2);
    });
    it("sample", () => {
      const equipmentInstances: EquipmentInstance[] = [
        {
          ...defaultEquipmentInstance,
          id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
          uuid: "uuid1",
          name: "equip1",
          category: "武器",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip2",
          uuid: "uuid2",
          name: "equip2",
          category: "頭",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip3",
          uuid: "uuid3",
          name: "equip3",
          category: "服",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip4",
          uuid: "uuid4",
          name: "equip4",
          category: "首",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip5",
          uuid: "uuid5",
          name: "equip5",
          category: "手",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip6",
          uuid: "uuid6",
          name: "equip6",
          category: "盾",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip7",
          uuid: "uuid7",
          name: "equip7",
          category: "背",
        },
        {
          ...defaultEquipmentInstance,
          id: "equip8",
          uuid: "uuid8",
          name: "equip8",
          category: "靴",
        },
      ];

      const comboInfos: ComboInfo[] =
        comboEffectUtils.getComboInfo(equipmentInstances);
      expect(comboInfos).toBeInstanceOf(Array);
      expect(comboInfos.length).toEqual(0);
    });
  });

  describe("validateCombo", () => {
    it("発動条件を満たす場合:必要個数を満たす。", () => {
      const comboEquipments: ComboEquipment[] = [
        {
          combo_id: "10001",
          equipment_id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
          need: "",
          count: "2",
          part: "武器",
        },
        {
          combo_id: "10001",
          equipment_id: "e3358b47-5a60-43f7-bd0b-71a9b10ce2b1",
          need: "",
          count: "2",
          part: "盾",
        },
      ];
      const isValid = comboEffectUtils.validateCombo(comboEquipments);
      expect(isValid).toBe(true);
    });
    it("発動条件を満たさない場合:必要個数を満たさない。", () => {
      const comboEquipments: ComboEquipment[] = [
        {
          combo_id: "10001",
          equipment_id: "776b4c4a-7e5e-41e4-8a76-718baccd8ae3",
          need: "",
          count: "2",
          part: "武器",
        },
      ];
      const isValid = comboEffectUtils.validateCombo(comboEquipments);
      expect(isValid).toBe(false);
    });

    it("発動条件を満たす場合:必須条件を満たす。", () => {
      const comboEquipments: ComboEquipment[] = [
        {
          combo_id: "10001",
          equipment_id: "3e23a722-f4c1-4f4f-9f02-6feb98710ef8",
          need: "○",
          count: "2",
          part: "武器",
        },
        {
          combo_id: "10001",
          equipment_id: "aabb6d1b-93a4-4912-b4d0-0cc8ad4c17da",
          need: "○",
          count: "2",
          part: "首",
        },
      ];
      const isValid = comboEffectUtils.validateCombo(comboEquipments);
      expect(isValid).toBe(true);
    });
    it("発動条件を満たさない場合:必須条件を満たさない。", () => {
      const comboEquipments: ComboEquipment[] = [
        {
          combo_id: "10001",
          equipment_id: "3e23a722-f4c1-4f4f-9f02-6feb98710ef8",
          need: "○",
          count: "2",
          part: "武器",
        },
      ];
      const isValid = comboEffectUtils.validateCombo(comboEquipments);
      expect(isValid).toBe(false);
    });
  });

  describe("calcComboEffect", () => {
    it("should calculate combo effect correctly", () => {
      const comboInfos: ComboInfo[] = [
        {
          comboEquipment: [
            {
              combo_id: "combo1",
              equipment_id: "equip1",
              need: "○",
              count: "2",
              part: "",
            },
          ],
          comboStatus: {
            combo_id: "combo1",
            group_id: "group1",
            pow: 5,
            int: 3,
            vit: 2,
            spd: 1,
            luk: 1,
            hp: 50,
            sp: 25,
            atk: 10,
            def: 8,
            mat: 5,
            mdf: 4,
            hpr: 2,
            spr: 1,
            exp: 1,
            pet: 1,
            mov: 1,
            drn: 1,
            text: "",
          },
        },
      ];

      const totalStatus: TotalStatus =
        comboEffectUtils.calcComboEffect(comboInfos);
      expect(totalStatus).toEqual({
        pow: 5,
        int: 3,
        vit: 2,
        spd: 1,
        luk: 1,
        hp: 50,
        sp: 25,
        atk: 10,
        def: 8,
        mat: 5,
        mdf: 4,
        hpr: 2,
        spr: 1,
        exp: 1,
        pet: 1,
        mov: 1,
        drn: 1,
      });
    });
  });
});
