import { useState } from "react";
import { Status, Equipments,Equipped,Equipment } from "../../types/global";
import { createInitialStatus,isMainEquipments } from './statsUtils';

const useStats = () => {
    /**
     * ステータス関連
     */
    // キャラクター
    const [characterStats, setCharacterStats] = useState<Status>(createInitialStatus());
    // メイン装備
    const [mainStats, setMainStats] = useState<Status>(createInitialStatus());
    // サブ装備
    const [subStats, setSubStats] = useState<Status>(createInitialStatus());

    // ステータスを更新するメソッド
    const updateStats = (field: keyof Status, value: number): void => {
        setCharacterStats(prev => ({ ...prev, [field]: prev[field] + value }));
    };


    const isStatusKey = (key: any): key is keyof Status => {
        return key in characterStats;
    };

    // 装備によるステータス変更を反映するメソッド
    const updateStatsWithEquipment = (equipments: Equipments): void => {
        let modifiedStats: Status = createInitialStatus(); // 初期ステータスでリセット

        Object.values(equipments).forEach((equippedItem: Equipped | null) => {
            if (equippedItem) {
                const { equipment, isMainEquipment } = equippedItem;
                const factor = isMainEquipment ? 1 : 0.5; // メイン装備かサブ装備かで係数を変える

                // ステータスを合算する
                Object.entries(equipment.status).forEach(([key, value]) => {
                    if (isStatusKey(key)) {
                        modifiedStats[key as keyof Status] += Math.ceil(value * factor);
                    }
                });
            }
        });
        if(isMainEquipments(equipments)){
            // 合算した値でステータスを更新する
            setMainStats(modifiedStats);
        }else{
            // 合算した値でステータスを更新する
            setSubStats(modifiedStats);
        }
    };

    return {
        characterStats,
        updateStats,
        updateStatsWithEquipment
    };
}
