import path from 'path';
import fs from 'fs';
import {Equipment} from '../types/global'
import { IpcMainEvent } from 'electron';

// 装備データのパスを定義します
const dataFolder = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'data')
  : path.join(__dirname, '..','..','resources', 'data');

const equipmentDataPath = path.join(dataFolder, 'equipment.json');

// 装備データを読み込む関数
export function loadEquipmentData(event: IpcMainEvent) {
  fs.readFile(equipmentDataPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('装備データの読み込みに失敗しました:', err);
      event.reply('equipment-data-loaded', { error: err.message });
      return;
    }
    try {
      const equipmentData = JSON.parse(data) as Equipment[]; // データをパース
      event.reply('equipment-data-loaded', { data: equipmentData }); // 成功した場合はパースしたデータを送信
    } catch (parseErr) {
      console.error('JSON解析エラー:', parseErr);
      event.reply('equipment-data-loaded', { error: parseErr.message });
    }
  });
}