
import { Equipped, EquipmentInstance, Category, TotalStatus, AvatarStatus, CharacterStatus, StatusKey } from "../../types/types";
import { EquipmentDTO } from "./dto";
import { calcEquippedStatus, calcTotalStatus, calcViewStatus, comboEffectUtils, coreEffectUtils, equippedEffectUtils } from "./statusCalculation";
import { ZeroStatus } from "./utiles";

export interface CombinationResult{
    combination: { main: Equipped; sub: Equipped };
    totalStats: TotalStatus;
}

/**
 * 指定された部位の装備を、指定されたステータスキーの降順でソートして返す
 * @param equipmentList 装備リスト
 * @param category 部位
 * @param key ステータスキー
 * @returns 指定された部位の装備を、指定されたステータスキーの降順でソートした装備リスト
 */
export function filterEquipmentListByCategoryOrderedDesc(
    equipmentList: EquipmentInstance[], 
    category: Category, 
    key: StatusKey
): EquipmentInstance[] {
    return equipmentList
        .filter((eq) => eq.category === category)
        .sort((a, b) => getTotalStat(b, key) - getTotalStat(a, key));
}

// 比較関数を定義
function compareByKeyDesc(key: StatusKey) {
    return (a: CombinationResult, b: CombinationResult) => {
        const aTotal = a.totalStats[key] || 0;
        const bTotal = b.totalStats[key] || 0;
        return bTotal - aTotal;
    };
}

function getTotalStat(equipment: EquipmentInstance, key: StatusKey): number {
    let total = equipment[key] || 0;
    if (equipment.core) {
        for (const slot of Object.values(equipment.core)) {
            if (slot && slot[key]) {
                total += slot[key];
            }
        }
    }
    return total;
}

export function generateSingleCombinations(equipmentList: EquipmentInstance[], characterStatus: CharacterStatus, avatarStatus: AvatarStatus, key: StatusKey, N: number): CombinationResult[] {
    const parts: Category[] = ["武器", "頭", "服", "首", "手", "盾", "背", "靴"];
    const mainEquipments: { [key in Category]: EquipmentInstance[] } = {
        "武器": [], "頭": [], "服": [], "首": [], "手": [], "盾": [], "背": [], "靴": []
    };
    const subEquipments: { [key in Category]: EquipmentInstance[] } = {
        "武器": [], "頭": [], "服": [], "首": [], "手": [], "盾": [], "背": [], "靴": []
    };

    parts.forEach((part) => {
        mainEquipments[part] = filterEquipmentListByCategoryOrderedDesc(equipmentList, part, key);
        subEquipments[part] = filterEquipmentListByCategoryOrderedDesc(equipmentList, part, key);
    });

    // 組み合わせの総数が膨大になる可能性があるため、上位N件のみを保持
    const combinations: CombinationResult[] = [];
    const maxResults = N;

    function combine(index: number, currentCombination: {main: Equipped, sub: Equipped}, usedEquipments: Set<string>){
        if(index >= parts.length){
            const totalStats: TotalStatus = calculateStats(currentCombination, characterStatus, avatarStatus);
            combinations.push({
                combination: currentCombination,
                totalStats,
            });
            // 上位N件のみを維持
            combinations.sort(compareByKeyDesc(key));
            if(combinations.length > maxResults){
                combinations.pop();
            }
            return;
        }

        const part = parts[index];

        if (mainEquipments[part].length === 0) {
            // mainEquipments[part]が空の場合、indexを進める
            combine(index + 1, currentCombination, usedEquipments);
        } else {
            mainEquipments[part].forEach((mainEq) => {
                if (!usedEquipments.has(mainEq.uuid)) {
                    const newUsedEquipments = new Set(usedEquipments);
                    newUsedEquipments.add(mainEq.uuid);
                    const newMainEq = {
                        ...currentCombination.main,
                        [part]: mainEq
                    }
                    if(subEquipments[part].length === 0){
                        combine(index + 1, { main: newMainEq, sub: currentCombination.sub }, newUsedEquipments);
                    } else {
                        subEquipments[part].forEach((subEq) => {
                            if (subEq.uuid !== mainEq.uuid && !newUsedEquipments.has(subEq.uuid)) {
                                const newUsedEquipmentsWithSub = new Set(newUsedEquipments);
                                newUsedEquipmentsWithSub.add(subEq.uuid);
                                const newSubEq = {
                                    ...currentCombination.sub,
                                    [part]: subEq
                                }
                                combine(index + 1, { main: newMainEq, sub: newSubEq }, newUsedEquipmentsWithSub);
                            }
                        });
                    }
                }
            });
        }
    }
    combine(0, {main: ZeroStatus.zeroEquipped(), sub: ZeroStatus.zeroEquipped()}, new Set());
    return combinations;
}

export function calculateStats(combination: {main: Equipped, sub: Equipped}, characterStatus: CharacterStatus, avatarStatus: AvatarStatus): TotalStatus{
    // 1. 基本ステータスの合計とセット効果の適用
    const mainEq = combination.main;
    const subEq = combination.sub;

    // 1.1 メイン装備
    // 1.1.1 メイン装備のステータスを加算
    const mainStatus = calcEquippedStatus.calcRowMainStatus(mainEq);
    // 1.1.2 特殊コア
    const coreStatus = coreEffectUtils.calcCoreEffect(mainEq);
    // 1.2 サブ装備
    // 1.2.1 サブ装備のステータスを加算
    const subStatus = calcEquippedStatus.calcRowSubStatus(subEq);
    // 1.3 セット効果の適用
    const comboStatus = comboEffectUtils.calcComboEffectFromEquipped(EquipmentDTO.convertEquippedToEquipmentInstances(mainEq));

    // 1.4 装備増加量
    // 装備効果
    const equippedEffects = equippedEffectUtils.getEquippedEffect(
        EquipmentDTO.convertEquippedToEquipmentInstances(mainEq)
    );
    const equippedStatus = equippedEffectUtils.calcEquippedEffect(
        equippedEffects,
        mainStatus,
        subStatus,
        comboStatus,
        characterStatus,
        avatarStatus,
        coreStatus
    );
    // 最終的なステータスを計算
    const totalStatus = calcTotalStatus.addMultipleTotalStatus(
        EquipmentDTO.convertCharacterStatusToTotalStatus(characterStatus),
        EquipmentDTO.convertAvatarStatusToTotalStatus(avatarStatus),
        mainStatus,
        subStatus,
        equippedStatus,
        comboStatus
    );
    return calcViewStatus.applyExtendedStatus(totalStatus);
}
