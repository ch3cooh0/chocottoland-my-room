import { EquipmentSimple, EquipmentInstance, Equipment, Equipped, ComboStatus, TotalStatus, CharacterStatus, AvatarStatus } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { ZeroStatus } from './utiles';

export const EquipmentDTO={
    /**
     * 装備の簡易データ(倉庫保存用)を装備のインスタンスデータに変換する
     * @param equipmentSimple 
     * @param equipmentMaster 
     * @returns 
     */
    convertEquipmentSimpleToEquipmentInstance: (equipmentSimple: EquipmentSimple, equipmentMaster: Equipment[]): EquipmentInstance => {
        const masterEquipment = equipmentMaster.find(master => master.id === equipmentSimple.id);

        if (!masterEquipment) {
            throw new Error(`Equipment with id ${equipmentSimple.id} not found in master list.`);
        }
        return {
            ...equipmentSimple,
            uuid: uuidv4(),
            category: masterEquipment.category,
            lv: masterEquipment.lv || 0,
            pow: masterEquipment.pow || 0,
            int: masterEquipment.int || 0,
            vit: masterEquipment.vit || 0,
            spd: masterEquipment.spd || 0,
            luk: masterEquipment.luk || 0,
            hp: masterEquipment.hp || 0,
            sp: masterEquipment.sp || 0,
            atk: masterEquipment.atk || 0,
            def: masterEquipment.def || 0,
            mat: masterEquipment.mat || 0,
            mdf: masterEquipment.mdf || 0,
            hpr: masterEquipment.hpr || 0,
            spr: masterEquipment.spr || 0,
            exp: masterEquipment.exp || 0,
            pet: masterEquipment.pet || 0,
            mov: masterEquipment.mov || 0,
            drn: masterEquipment.drn || 0,
            iconid: masterEquipment.iconid || ""
        };
    },
    /**
     * 装備の簡易データ(倉庫保存用)の配列を装備のインスタンスデータの配列に変換する
     * @param equipmentSimples 
     * @param equipmentMaster 
     * @returns 
     */
    convertEquipmentSimplesToEquipmentInstances: (equipmentSimples: EquipmentSimple[], equipmentMaster: Equipment[]): EquipmentInstance[] => {
        return equipmentSimples.map(equipmentSimple => EquipmentDTO.convertEquipmentSimpleToEquipmentInstance(equipmentSimple, equipmentMaster));
    },
    /**
     * 装備のインスタンスデータを装備の簡易データ(倉庫保存用)に変換する
     * @param equipmentInstance 
     * @returns 
     */
    convertEquipmentInstanceToEquipmentSimple: (equipmentInstance: EquipmentInstance): EquipmentSimple => {
        return {
            id: equipmentInstance.id,
            name: equipmentInstance.name,
            reinforceLevel: equipmentInstance.reinforceLevel,
            core: equipmentInstance.core
        };
    },
    /**
     * 装備のインスタンスデータを装備の簡易データ(倉庫保存用)の配列に変換する
     * @param equipmentInstances 
     * @returns 
     */
    convertEquipmentInstancesToEquipmentSimples: (equipmentInstances: EquipmentInstance[]): EquipmentSimple[] => {
        return equipmentInstances.map(equipmentInstance => EquipmentDTO.convertEquipmentInstanceToEquipmentSimple(equipmentInstance));
    },
    convertEquipmentToEquipmentInstance: (equipment: Equipment): EquipmentInstance => {
        return {
            ...equipment,
            uuid: uuidv4(),
            reinforceLevel: 0,
            core: {
                1: {},
                2: {},
                3: {}
            }
        };
    },
    convertEquippedToEquipmentInstances: (equipped: Equipped): EquipmentInstance[] => {
        return Object.values(equipped).map(equipment => equipment);
    },
    convertComboStatusToTotalStatus: (comboStatus: ComboStatus): TotalStatus => {
        return {
            ...ZeroStatus.zeroTotalStatus(),
            ...{
                pow: comboStatus.pow,
                int: comboStatus.int,
                vit: comboStatus.vit,
                spd: comboStatus.spd,
                luk: comboStatus.luk,
                hp: comboStatus.hp,
                sp: comboStatus.sp,
                atk: comboStatus.atk,
                def: comboStatus.def,
                mat: comboStatus.mat,
                mdf: comboStatus.mdf,
                hpr: comboStatus.hpr,
                spr: comboStatus.spr,
                exp: comboStatus.exp,
                pet: comboStatus.pet,
                mov: comboStatus.mov,
                drn: comboStatus.drn,
            }
        };
    },
    convertCharacterStatusToTotalStatus: (characterStatus: CharacterStatus): TotalStatus => {
        return {
            ...ZeroStatus.zeroTotalStatus(),
            ...characterStatus
        };
    },
    convertAvatarStatusToTotalStatus: (avatarStatus: AvatarStatus): TotalStatus => {
        return {
            ...ZeroStatus.zeroTotalStatus(),
            ...avatarStatus
        };
    }
}
