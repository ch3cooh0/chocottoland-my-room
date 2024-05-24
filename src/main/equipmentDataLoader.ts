import path from 'path';
import fs from 'fs';
import { Equipment, Status, ComboEquipment, ComboStatus } from '../types/global';
import { IpcMainEvent } from 'electron';

// 装備データのパスを定義します
const dataFolder = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'data')
  : path.join(__dirname, '..', '..', 'resources', 'data');

const equipmentDataPath = path.join(dataFolder, 'equipment.json');
const comboEquipmentDataPath = path.join(dataFolder, 'combo_equipment.json');
const comboStatusDataPath = path.join(dataFolder, 'combo_status.json');

// JSONから読み込んだデータをEquipment型に変換する関数
function transformToEquipment(data: any): Equipment {
  const { id, name, category, text, ...statusProps } = data;
  const status: Status = {
    pow: statusProps.pow,
    int: statusProps.int,
    vit: statusProps.vit,
    spd: statusProps.spd,
    luk: statusProps.luk,
    HP: statusProps.HP,
    SP: statusProps.SP,
    ATK: statusProps.ATK,
    DEF: statusProps.DEF,
    MAT: statusProps.MAT,
    MDF: statusProps.MDF,
    HPR: statusProps.HPR,
    SPR: statusProps.SPR,
    EXP: statusProps.EXP,
    PET: statusProps.PET,
    MOV: statusProps.MOV,
    DRN: statusProps.DRN
  };

  return {
    id,
    name,
    category,
    status,
    text
  };
}

function transformToComboStatus(data: any): ComboStatus {
  const { combo_id, text, group_id, ...statusProps } = data;
  const status: Status = {
    pow: statusProps.pow,
    int: statusProps.int,
    vit: statusProps.vit,
    spd: statusProps.spd,
    luk: statusProps.luk,
    HP: statusProps.HP,
    SP: statusProps.SP,
    ATK: statusProps.ATK,
    DEF: statusProps.DEF,
    MAT: statusProps.MAT,
    MDF: statusProps.MDF,
    HPR: statusProps.HPR,
    SPR: statusProps.SPR,
    EXP: statusProps.EXP,
    PET: statusProps.PET,
    MOV: statusProps.MOV,
    DRN: statusProps.DRN
  };

  return {
    combo_id,
    status,
    group_id,
    text
  };
}

function transformToComboEquipment(data: any): ComboEquipment {
  const { combo_id, part, equipment_id, count, need } = data;
  return { combo_id, part, equipment_id, count, need };
}

// 装備データを読み込む関数
export function loadEquipmentData(event: IpcMainEvent) {
  fs.readFile(equipmentDataPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('装備データの読み込みに失敗しました:', err);
      event.reply('equipment-data-loaded', { error: err.message });
      return;
    }
    try {
      const rawEquipments = JSON.parse(data);
      const equipmentData = rawEquipments.map(transformToEquipment); // 各要素をEquipment型に変換
      event.reply('equipment-data-loaded', { data: equipmentData }); // 成功した場合は変換したデータを送信
    } catch (parseErr) {
      console.error('JSON解析エラー:', parseErr);
      event.reply('equipment-data-loaded', { error: parseErr.message });
    }
  });
}

// コンボデータを読み込む関数
export function loadComboData(event: IpcMainEvent) {
  fs.readFile(comboStatusDataPath, 'utf-8', (comboErr, comboData) => {
    if (comboErr) {
      console.error('コンボステータスデータの読み込みに失敗しました:', comboErr);
      event.reply('combo-data-loaded', { error: comboErr.message });
      return;
    }
    try {
      const rawComboStatus = JSON.parse(comboData);
      const comboStatusData = rawComboStatus.map(transformToComboStatus); // 各要素をComboStatus型に変換

      // combo_equipmentデータの読み込み
      fs.readFile(comboEquipmentDataPath, 'utf-8', (comboEquipErr, comboEquipData) => {
        if (comboEquipErr) {
          console.error('コンボ装備データの読み込みに失敗しました:', comboEquipErr);
          event.reply('combo-data-loaded', { error: comboEquipErr.message });
          return;
        }
        try {
          const rawComboEquipment = JSON.parse(comboEquipData);
          const comboEquipmentData = rawComboEquipment.map(transformToComboEquipment); // 各要素をComboEquipment型に変換

          // 全てのデータをまとめて送信
          event.reply('combo-data-loaded', { 
            comboStatus: comboStatusData, 
            comboEquipment: comboEquipmentData 
          });
        } catch (comboEquipParseErr) {
          console.error('コンボ装備データのJSON解析エラー:', comboEquipParseErr);
          event.reply('combo-data-loaded', { error: comboEquipParseErr.message });
        }
      });
    } catch (comboParseErr) {
      console.error('コンボステータスデータのJSON解析エラー:', comboParseErr);
      event.reply('combo-data-loaded', { error: comboParseErr.message });
    }
  });
}
