import path from 'path';
import fs from 'fs';
import {EquipmentData} from '../types/global'

// 装備データのパスを定義します
const dataFolder = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'data')
  : path.join(__dirname, '..', 'data');

const equipmentDataPath = path.join(dataFolder, 'equipment.json');

// 装備データを読み込む関数
export function loadEquipmentData(): EquipmentData {
  try {
    const data = fs.readFileSync(equipmentDataPath, 'utf-8');
    return JSON.parse(data) as EquipmentData;
  } catch (err) {
    console.error('装備データの読み込みに失敗しました:', err);
    return {};
  }
}