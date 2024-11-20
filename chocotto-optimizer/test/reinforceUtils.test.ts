import { describe, it, expect } from 'vitest';
import { reinforceUtils } from '../electron/modules/statusCalculation';
import { ZeroStatus } from '../electron/modules/utiles';
import { Reinforce, Category, TotalStatus } from '../types/types';

describe('reinforceUtils', () => {
  describe('calcReinforceEffect', () => {
    it('should return correct value for weapon category', () => {
      const reinforce: Reinforce = { lv: 5, type: '物理' };
      const category: Category = '武器';
      const result = reinforceUtils.calcReinforceEffect(reinforce, category);
      expect(result).toBe(25);
    });

    it('should return correct value for shield category', () => {
      const reinforce: Reinforce = { lv: 5, type: '物理' };
      const category: Category = '盾';
      const result = reinforceUtils.calcReinforceEffect(reinforce, category);
      expect(result).toBe(15);
    });

    it('should return correct value for other category', () => {
      const reinforce: Reinforce = { lv: 5, type: '物理' };
      const category: Category = '背';
      const result = reinforceUtils.calcReinforceEffect(reinforce, category);
      expect(result).toBe(7);
    });
  });

  describe('calcReinforceStatus', () => {
    it('should return correct TotalStatus for physical weapon', () => {
      const reinforce: Reinforce = { lv: 5, type: '物理' };
      const category: Category = '武器';
      const result = reinforceUtils.calcReinforceStatus(reinforce, category);
      const expected: TotalStatus = {
        ...ZeroStatus.zeroTotalStatus(),
        atk: 25,
      };
      expect(result).toEqual(expected);
    });

    it('should return correct TotalStatus for magical shield', () => {
      const reinforce: Reinforce = { lv: 5, type: '魔法' };
      const category: Category = '盾';
      const result = reinforceUtils.calcReinforceStatus(reinforce, category);
      const expected: TotalStatus = {
        ...ZeroStatus.zeroTotalStatus(),
        mdf: 15,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('calcReinforceTotalStatus', () => {
    it('should return correct TotalStatus for equipped items', () => {
      const equipped = {
        武器: {...ZeroStatus.noneEquipmentInstance('武器', ''), reinforce: { lv: 5, type: '物理' }},
        盾: {...ZeroStatus.noneEquipmentInstance('盾', ''), reinforce: { lv: 5, type: '魔法' }},
      };
      const result = reinforceUtils.calcReinforceTotalStatus(equipped);
      const expected: TotalStatus = {
        ...ZeroStatus.zeroTotalStatus(),
        atk: 25,
        mdf: 15,
      };
      expect(result).toEqual(expected);
    });
  });
});
