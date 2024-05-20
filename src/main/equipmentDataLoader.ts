import path from 'path';
import fs from 'fs';
import { Equipment, Status } from '../types/global';
import { IpcMainEvent } from 'electron';

// 装備データのパスを定義します
const dataFolder = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'data')
  : path.join(__dirname, '..', '..', 'resources', 'data');

const equipmentDataPath = path.join(dataFolder, 'equipment.json');

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
