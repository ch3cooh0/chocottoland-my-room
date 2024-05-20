// statsUtils.ts
import { Status,Equipments,Equipped} from '../../types/global';

export const initialStatus: Status = {
    pow: 0,
    int: 0,
    vit: 0,
    spd: 0,
    luk: 0,
    HP: 0,
    SP: 0,
    ATK: 0,
    DEF: 0,
    MAT: 0,
    MDF: 0,
    HPR: 0,
    SPR: 0,
    EXP: 0,
    PET: 0,
    MOV: 0,
    DRN: 0,
};

export const createInitialStatus = (): Status => ({ ...initialStatus });

export const isMainEquipments = (equipments: Equipments): boolean => {
    return Object.values(equipments).some((equippedItem: Equipped | null) => {
        return equippedItem ? equippedItem.isMainEquipment : false;
    });
};
