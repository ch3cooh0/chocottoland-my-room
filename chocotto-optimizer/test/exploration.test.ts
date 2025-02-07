import { 服, 盾, 背, 靴, 頭, 首, 手, 武器 } from "./testConst";
import { generateSingleCombinations, calculateStats } from "../electron/modules/exploration";
import { AvatarStatus, CharacterStatus, EquipmentInstance } from "../types/types";
import { it, describe, expect, beforeAll } from "vitest";
import { ZeroStatus } from "../electron/modules/utiles";
import { loadCache } from "../electron/modules/statusCalculation";
import path from "path";
beforeAll(async () => {
    await loadCache(path.join(process.cwd(), 'data'));
});

describe("generateCombinations", () => {

    it("pow", () => {
        const equipmentList: EquipmentInstance[] = [
            { ...武器.銅の剣, uuid: "武器1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}} },
            { ...武器.銅の剣, uuid: "武器2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "武器" },
            { ...盾.赤薔薇のミュルグレス, uuid: "盾1", reinforce: { lv: 0, type: '魔法' }, core: {1: {}, 2: {}, 3: {}}, category: "盾" },
            { ...盾.赤薔薇のミュルグレス, uuid: "盾2", reinforce: { lv: 0, type: '魔法' }, core: {1: {}, 2: {}, 3: {}}, category: "盾" },
            { ...手.ＰＯＷアバティアＳ, uuid: "手1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "手" },
            { ...手.ＰＯＷアバティアＳ, uuid: "手2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "手" },
            { ...服.グロリアフェヒター, uuid: "服1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "服" },
            { ...服.グロリアフェヒター, uuid: "服2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "服" },
            { ...頭.ヌル・レムクローネ, uuid: "頭1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "頭" },
            { ...頭.ヌル・レムクローネ, uuid: "頭2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "頭" },
            { ...首.天藍玉フォルティス, uuid: "首1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
            { ...首.天藍玉フォルティス, uuid: "首2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "首" },
            { ...背.緋撃剣・スティレッド, uuid: "背1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "背" },
            { ...背.緋撃剣・スティレッド, uuid: "背2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "背" },
            { ...靴.シュバリエ・ハイロウ, uuid: "靴1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "靴" },
            { ...靴.シュバリエ・ハイロウ, uuid: "靴2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "靴" },
        ]
        const characterStatus: CharacterStatus = ZeroStatus.zeroCharacterStatus()
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const result = generateSingleCombinations(equipmentList, characterStatus, avatarStatus,"pow", 1);
        const mainInstanceIds = Object.values(result[0].combination.main).map((eq) => eq.uuid);
        const subInstanceIds = Object.values(result[0].combination.sub).map((eq) => eq.uuid);
        expect(mainInstanceIds).toContain("武器2");
        expect(subInstanceIds).toContain("武器1");
    });

    it("pow:装備効果", () => {
        const equipmentList: EquipmentInstance[] = [
            { ...首.天藍玉フォルティス, uuid: "首1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
            { ...首["16thフォースネック・兵"], uuid: "首2", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
        ]
        const characterStatus: CharacterStatus = ZeroStatus.zeroCharacterStatus()
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const result = generateSingleCombinations(equipmentList, characterStatus, avatarStatus,"pow", 1);
        expect(result[0].totalStats.pow).toBe(37+14);
    });

    it("pow:装備効果2", () => {
        const equipmentList: EquipmentInstance[] = [
            { ...首.天藍玉フォルティス, uuid: "首1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
            { ...首["16thフォースネック・兵"], uuid: "首2", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
        ]
        const cpow = 100;
        const characterStatus: CharacterStatus = { ...ZeroStatus.zeroCharacterStatus(), pow: cpow }
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const result = generateSingleCombinations(equipmentList, characterStatus, avatarStatus,"pow", 1);
        const mainInstanceIds = Object.values(result[0].combination.main).map((eq) => eq.uuid);
        const subInstanceIds = Object.values(result[0].combination.sub).map((eq) => eq.uuid);
        expect(mainInstanceIds).toContain("首2");
        expect(subInstanceIds).toContain("首1");
        expect(result[0].totalStats.pow).toBe(cpow+27+19+60);
    });
});

describe("calculateStats", () => {
    it("メインサブともになしの場合", () => {
        const characterStatus: CharacterStatus = ZeroStatus.zeroCharacterStatus()
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const main = ZeroStatus.zeroEquipped()
        const sub = ZeroStatus.zeroEquipped()
        const result = calculateStats({main, sub}, characterStatus, avatarStatus);
        
        expect(result.pow).toBe(0);
        expect(result.int).toBe(0);
        expect(result.vit).toBe(0);
        expect(result.spd).toBe(0);
        expect(result.luk).toBe(0);
        expect(result.hp).toBe(0);
        expect(result.sp).toBe(0);
        expect(result.atk).toBe(0);
        expect(result.def).toBe(0);
        expect(result.mat).toBe(0);
        expect(result.mdf).toBe(0);
        expect(result.hpr).toBe(0);
        expect(result.spr).toBe(0);
        expect(result.exp).toBe(0);
        expect(result.pet).toBe(0);
        expect(result.mov).toBe(0);
        expect(result.drn).toBe(0);
    });
    it("メイン装備のみ（コア、セット効果なし）", () => {
        const characterStatus: CharacterStatus = ZeroStatus.zeroCharacterStatus()
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const main = { 
            "武器": { ...武器.銅の剣, uuid: "武器1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}} },
            "盾": { ...盾.赤薔薇のミュルグレス, uuid: "盾1", reinforce: { lv: 0, type: '魔法' }, core: {1: {}, 2: {}, 3: {}}, category: "盾" },
            "服": { ...服.グロリアフェヒター, uuid: "服1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "服" },
            "背":  { ...背.緋撃剣・スティレッド, uuid: "背1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "背" },
            "首":  { ...首.天藍玉フォルティス, uuid: "首1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "首" },
            "頭": { ...頭.ヌル・レムクローネ, uuid: "頭1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "頭" },
            "手": { ...手.ＰＯＷアバティアＳ, uuid: "手1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "手" },
            "靴": { ...靴.シュバリエ・ハイロウ, uuid: "靴1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}}, category: "靴" },
        }
        const sub = ZeroStatus.zeroEquipped()
        const result = calculateStats({main, sub}, characterStatus, avatarStatus);
        expect(result.pow).toBe(257);
    });
});

describe("generateCombinations", async () => {
    it("pow", async () => {
        const equipmentList: EquipmentInstance[] = [
            { ...武器.銅の剣, uuid: "武器1", reinforce: { lv: 0, type: '物理' }, core: {1: {}, 2: {}, 3: {}} },
            { ...武器.銅の剣, uuid: "武器2", reinforce: { lv: 0, type: '物理' }, core: {1: {pow: 1}, 2: {}, 3: {}}, category: "武器" },
        ]
        const characterStatus: CharacterStatus = ZeroStatus.zeroCharacterStatus()
        const avatarStatus: AvatarStatus = ZeroStatus.zeroAvatarStatus()
        const result = generateSingleCombinations(equipmentList, characterStatus, avatarStatus,"pow", 1);
        expect(result.length).toBe(1);
    });
});
