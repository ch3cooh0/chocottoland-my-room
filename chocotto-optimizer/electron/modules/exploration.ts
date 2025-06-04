
import { Equipped, EquipmentInstance, Category, TotalStatus, AvatarStatus, CharacterStatus, StatusKey, EquippedEffect } from "../../types/types";
import { EquipmentDTO } from "./dto";
import { calcEquippedStatus, calcTotalStatus, calcViewStatus, comboEffectUtils, coreEffectUtils, equippedEffectUtils, reinforceUtils } from "./statusCalculation";
import { ZeroStatus } from "./utiles";

export interface CombinationResult{
    combination: { main: Equipped; sub: Equipped };
    totalStats: TotalStatus;
}


// 比較関数を定義
function compareByKeyDesc(key: StatusKey) {
    return (a: CombinationResult, b: CombinationResult) => {
        const aTotal = a.totalStats[key] || 0;
        const bTotal = b.totalStats[key] || 0;
        return bTotal - aTotal;
    };
}

export const generateTargetEquipmentList = {
    /**
     * 装備のステータスを計算(コア上昇量を除く)
     * @param equipment 装備
     * @param key ステータスキー
     * @returns 装備のステータス(コア上昇量を除く)
     */
    calcKeyStatus: (equipment: EquipmentInstance, key: StatusKey): number => {
        const reinforceStatus = reinforceUtils.calcReinforceStatus(equipment.reinforce, equipment.category);
        switch(key){
            case "atk":
                return equipment.atk + equipment.pow * 3 + reinforceStatus.atk;
            case "def":
                return equipment.def + equipment.vit * 2 + reinforceStatus.def;
            case "mat":
                return equipment.mat + equipment.int * 2 + reinforceStatus.mat;
            case "mdf":
                return equipment.mdf + equipment.luk * 15 + reinforceStatus.mdf;
            default:
                return equipment[key] || 0;
        }
    },
    /**
     * 装備のステータスを計算(コア上昇量を含む)
     * @param equipment 装備
     * @param key ステータスキー
     * @returns 装備のステータス(コア上昇量を含む)
     */
    calcKeyStatusWithCore: (equipment: EquipmentInstance, key: StatusKey): number => {
        let total = generateTargetEquipmentList.calcKeyStatus(equipment, key);
        if (equipment.core) {
            for (const slot of Object.values(equipment.core)) {
                if (slot && slot[key]) {
                    total += slot[key];
                }
            }
        }
        return total;
    },
    /**
     * 指定された部位の装備を、指定されたステータスキーの降順でソートして返す
     * @param equipmentList 装備リスト
     * @param category 部位
     * @param key ステータスキー
     * @param mode "main" | "sub"
     * @returns 指定された部位の装備を、指定されたステータスキーの降順でソートした装備リスト
     */
    filterEquipmentListByCategoryOrderedDesc(
        equipmentList: EquipmentInstance[], 
        category: Category, 
        key: StatusKey,
        mode: "main" | "sub"
    ): EquipmentInstance[] {
        if(mode === "main"){
            return equipmentList
                .filter((eq) => eq.category === category)
                .sort((a, b) =>
                    generateTargetEquipmentList.calcKeyStatusWithCore(b, key) -
                    generateTargetEquipmentList.calcKeyStatusWithCore(a, key)
                );
        } else {
            return equipmentList
                .filter((eq) => eq.category === category)
                .sort((a, b) =>
                    generateTargetEquipmentList.calcKeyStatus(b, key) -
                    generateTargetEquipmentList.calcKeyStatus(a, key)
                );
        }
    },

    /**
     * 指定されたステータスキーの装備効果を返す.(ATK,DEF,MAT,MDFはpow,intが増加する効果も含む)
     * @param targetStatus ステータスキー
     * @returns 指定されたステータスキーの装備効果
     */
    searchEquippedEffectByTargetStatus: (targetStatus: StatusKey): EquippedEffect[] => {
        switch(targetStatus){
            case "atk":
                return equippedEffectUtils.searchEquippedEffectsWhereTargetStatuses(["atk", "pow"]);
            case "def":
                return equippedEffectUtils.searchEquippedEffectsWhereTargetStatuses(["def", "vit"]);
            case "mat":
                return equippedEffectUtils.searchEquippedEffectsWhereTargetStatuses(["mat", "int"]);
            case "mdf":
                return equippedEffectUtils.searchEquippedEffectsWhereTargetStatuses(["mdf", "int"]);
            default:
                return equippedEffectUtils.searchEquippedEffectsWhereTargetStatus(targetStatus);
        }
    },
    /**
     * 指定されたステータスキーの装備効果を持つ装備を返す(ATK,DEF,MAT,MDFはpow,intが増加する効果も含む)
     * @param equipmentList 装備リスト
     * @param targetStatus ステータスキー
     * @returns 指定されたステータスキーの装備効果を持つ装備
     */
    filterHaveEffectEquipmentByTargetStatus: (equipmentList: EquipmentInstance[], targetStatus: StatusKey): EquipmentInstance[] => {
        const effects = generateTargetEquipmentList.searchEquippedEffectByTargetStatus(targetStatus);
        return equipmentList.filter((eq) => effects.some((effect) => effect.equipment_id === eq.id));
    },

    /**
     * 指定されたステータスキーのセット効果を持つ装備を返す(ATK,DEF,MAT,MDFはpow,intが増加する効果も含む)
     * @param equipmentList 装備リスト
     * @param targetStatus ステータスキー
     * @returns 指定されたステータスキーのセット効果を持つ装備
     */
    filterHaveComboEffectEquipmentByTargetStatus: (equipmentList: EquipmentInstance[], targetStatus: StatusKey): EquipmentInstance[] => {
        return equipmentList.filter((eq) => 
            comboEffectUtils.searchComboEquipmentWhereEquipmentId(eq.id).map(
                (combo) => comboEffectUtils.searchComboStatus(combo.combo_id)).some(
                    (status) => {
                        switch(targetStatus){
                            case "atk":
                                return status && (status.atk !== 0 || status.pow !== 0);
                            case "def":
                                return status && (status.def !== 0 || status.vit !== 0);
                            case "mat":
                                return status && (status.mat !== 0 || status.int !== 0);
                            case "mdf":
                                return status && (status.mdf !== 0 || status.int !== 0);
                            default:
                                return status && status[targetStatus] !== 0;
                        }
                    }
                ));
    },

    /**
     * 指定されたステータスキーの装備効果/セット効果を持つ装備を返す
     * @param equipmentList 装備リスト
     * @param key ステータスキー
     * @returns 指定されたステータスキーの装備効果/セット効果を持つ装備
     */
    searchEffectEquippments: (equipmentList: EquipmentInstance[], key: StatusKey): EquipmentInstance[] => {
        // 装備効果を持つ装備のみに絞り込み
        const effEquipments = generateTargetEquipmentList.filterHaveEffectEquipmentByTargetStatus(equipmentList, key);
        // セット効果を持つ装備のみに絞り込み
        const comboEquipments = equipmentList.filter((eq) => 
            comboEffectUtils.searchComboEquipmentWhereEquipmentId(eq.id).map(
                (combo) => comboEffectUtils.searchComboStatus(combo.combo_id)).some((status) => status && status[key] !== 0));

        // 装備効果とセット効果を持つ装備を結合
        const effectEquipments = [...effEquipments, ...comboEquipments];
        // uuidをキーにして重複を排除
        const uniqueEffectEquipments = Array.from(new Map(effectEquipments.map(item => [item.uuid, item])).values());
        return uniqueEffectEquipments;
    },
    /**
     * 指定された部位の装備を、指定されたステータスキーの降順でソートして、上位N件に絞る。その後、装備効果やセット効果を保持する装備を追加して返す。
     * なお、装備重複はない
     * @param equipmentList 装備リスト
     * @param part 部位
     * @param key ステータスキー
     * @param N 上位N件
     * @returns 指定された部位の装備を、指定されたステータスキーの降順でソートした上位N件+装備効果やセット効果を保持する装備
     */
    mainEquipmentList: (equipmentList: EquipmentInstance[], part: Category, key: StatusKey, N: number): EquipmentInstance[] => {
        const filteredList = generateTargetEquipmentList.filterEquipmentListByCategoryOrderedDesc(equipmentList, part, key, "main");
        const effectEquipments = generateTargetEquipmentList.searchEffectEquippments(filteredList, key);
        const combinedEquipments = [...filteredList.slice(0, N), ...effectEquipments];
        // uuidが重複している要素を取り除く
        const uniqueCombinedEquipments = Array.from(new Map(combinedEquipments.map(item => [item.uuid, item])).values());
        return uniqueCombinedEquipments;
    },
    /**
     * 指定された部位の装備を、指定されたステータスキーの降順でソートして、上位N件に絞る。
     * なお、装備重複はない
     * @param equipmentList 装備リスト
     * @param part 部位
     * @param key ステータスキー
     * @param N 上位N件
     * @returns 指定された部位の装備を、指定されたステータスキーの降順でソートした上位N件
     */
    subEquipmentList: (equipmentList: EquipmentInstance[], part: Category, key: StatusKey, N: number): EquipmentInstance[] => {
        const filteredList = generateTargetEquipmentList.filterEquipmentListByCategoryOrderedDesc(equipmentList, part, key, "sub");
        return filteredList.slice(0, N);
    }
}


/**
 * 装備の組み合わせを生成する
 * @param equipmentList 装備リスト
 * @param characterStatus キャラクターステータス
 * @param avatarStatus アバターステータス
 * @param key ステータスキー
 * @param N 上位N件
 * @returns 装備の組み合わせ
 */
export function generateSingleCombinations(equipmentList: EquipmentInstance[], characterStatus: CharacterStatus, avatarStatus: AvatarStatus, key: StatusKey, N: number): CombinationResult[] {
    const parts: Category[] = ["武器", "頭", "服", "首", "手", "盾", "背", "靴"];
    const mainEquipments: { [key in Category]: EquipmentInstance[] } = {
        "武器": [], "頭": [], "服": [], "首": [], "手": [], "盾": [], "背": [], "靴": []
    };
    const subEquipments: { [key in Category]: EquipmentInstance[] } = {
        "武器": [], "頭": [], "服": [], "首": [], "手": [], "盾": [], "背": [], "靴": []
    };
    parts.forEach((part) => {
        // 装備候補数を制限
        mainEquipments[part] = generateTargetEquipmentList.mainEquipmentList(equipmentList, part, key, N);
        subEquipments[part] = generateTargetEquipmentList.subEquipmentList(equipmentList, part, key, N);
    });
    // console.log(mainEquipments["手"]);
    // console.log(subEquipments["武器"]);
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
        if (mainEquipments[part].length === 0 && subEquipments[part].length === 0) {
            // mainEquipments[part]とsubEquipments[part]が両方空の場合、indexを進める
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
                        let subUsed = true;
                        subEquipments[part].forEach((subEq) => {
                            if (subEq.uuid !== mainEq.uuid && !newUsedEquipments.has(subEq.uuid)) {
                                subUsed = false;
                                const newUsedEquipmentsWithSub = new Set(newUsedEquipments);
                                newUsedEquipmentsWithSub.add(subEq.uuid);
                                const newSubEq = {
                                    ...currentCombination.sub,
                                    [part]: subEq
                                }
                                combine(index + 1, { main: newMainEq, sub: newSubEq }, newUsedEquipmentsWithSub);
                            }
                        });
                        if(subUsed){
                            combine(index + 1, { main: newMainEq, sub: currentCombination.sub }, newUsedEquipments);
                        }
                    }
                }
            });

            // サブ装備のみを考慮する場合
            if (mainEquipments[part].length === 0) {
                subEquipments[part].forEach((subEq) => {
                    if (!usedEquipments.has(subEq.uuid)) {
                        const newUsedEquipments = new Set(usedEquipments);
                        newUsedEquipments.add(subEq.uuid);
                        const newSubEq = {
                            ...currentCombination.sub,
                            [part]: subEq
                        }
                        combine(index + 1, { main: currentCombination.main, sub: newSubEq }, newUsedEquipments);
                    }
                });
            }
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
    const mainReinforcedStatus = calcEquippedStatus.calcMainEquippedReinforcedStatus(mainEq);
    // 1.1.2 特殊コア
    const coreStatus = coreEffectUtils.calcCoreEffect(mainEq);
    // 1.2 サブ装備
    // 1.2.1 サブ装備のステータスを加算
    const subReinforcedStatus = calcEquippedStatus.calcSubEquippedReinforcedStatus(subEq);
    // 1.3 セット効果の適用
    const comboStatus = comboEffectUtils.calcComboEffectFromEquipped(EquipmentDTO.convertEquippedToEquipmentInstances(mainEq));

    // 1.4 装備増加量
    // 装備効果
    const equippedEffects = equippedEffectUtils.getEquippedEffect(
        EquipmentDTO.convertEquippedToEquipmentInstances(mainEq)
    );
    const equippedStatus = equippedEffectUtils.calcEquippedEffect(
        equippedEffects,
        mainReinforcedStatus,
        subReinforcedStatus,
        comboStatus,
        characterStatus,
        avatarStatus,
        coreStatus
    );

    // 最終的なステータスを計算
    const totalStatus = calcTotalStatus.addMultipleTotalStatus(
        EquipmentDTO.convertCharacterStatusToTotalStatus(characterStatus),
        EquipmentDTO.convertAvatarStatusToTotalStatus(avatarStatus),
        mainReinforcedStatus,
        subReinforcedStatus,
        equippedStatus,
        comboStatus,
        coreStatus
    );
    return calcViewStatus.applyExtendedStatus(totalStatus);
}
