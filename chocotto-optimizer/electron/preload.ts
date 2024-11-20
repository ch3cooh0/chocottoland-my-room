import { ipcRenderer, contextBridge } from "electron";
import {
  AvatarStatus,
  Category,
  CharacterStatus,
  Equipment,
  EquipmentInstance,
  EquipmentSimple,
  Equipped,
  Mannequin,
  StatusKey,
  UserFileExtension,
} from "../types/types";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // 装備マスターCSV読込
  loadEquipmentFromCSV: (path: string) =>
    ipcRenderer.invoke("loadEquipmentFromCSV", path),
  // 倉庫データ
  loadEquipmentSimpleFromJSON: (path: string) =>
    ipcRenderer.invoke("loadEquipmentSimpleFromJSON", path),
  // 倉庫データ保存
  writeEquipmentSimpleToJSON: (path: string, equipments: EquipmentSimple[]) =>
    ipcRenderer.invoke("writeEquipmentSimpleToJSON", path, equipments),
  // マネキンデータ読込
  loadMannequinFromJSON: (path: string) =>
    ipcRenderer.invoke("loadMannequinFromJSON", path),
  // マネキンデータ保存
  writeMannequinToJSON: (path: string, mannequin: Mannequin) =>
    ipcRenderer.invoke("writeMannequinToJSON", path, mannequin),
  // ファイル保存ダイアログ
  showSaveDialog: (defaultFileName: string, ext: UserFileExtension) =>
    ipcRenderer.invoke("show-save-dialog", defaultFileName, ext),
  // ファイル読込ダイアログ
  showOpenDialog: (ext: UserFileExtension) => ipcRenderer.invoke("show-open-dialog", ext),
  // 装備データ変換
  convertEquipmentSimplesToEquipmentInstances: (
    equipmentSimples: EquipmentSimple[]
  ) =>
    ipcRenderer.invoke(
      "convertEquipmentSimplesToEquipmentInstances",
      equipmentSimples
    ),
  // 装備インスタンスデータ変換
  convertEquipmentInstanceToEquipmentSimple: (
    equipmentInstance: EquipmentInstance
  ) =>
    ipcRenderer.invoke(
      "convertEquipmentInstanceToEquipmentSimple",
      equipmentInstance
    ),
  // 装備データ変換
  convertEquipmentToEquipmentInstance: (equipment: Equipment) =>
    ipcRenderer.invoke("convertEquipmentToEquipmentInstance", equipment),
  // 装備検索
  searchEquipment: (
    fixCategory: Category,
    searchName: string,
    sortKey: StatusKey,
    sortOrder: "asc" | "desc"
  ) =>
    ipcRenderer.invoke(
      "searchEquipment",
      fixCategory,
      searchName,
      sortKey,
      sortOrder
    ),
  // 計算後のステータス
  calcTotalStatus: (
    characterMainEquipment: Equipped,
    characterSubEquipment: Equipped,
    characterStatus: CharacterStatus,
    avatarStatus: AvatarStatus
  ) =>
    ipcRenderer.invoke(
      "calcTotalStatus",
      characterMainEquipment,
      characterSubEquipment,
      characterStatus,
      avatarStatus
    ),
  // 探索結果生成
  generateSingleCombinations: (equipmentList: EquipmentInstance[], characterStatus: CharacterStatus, avatarStatus: AvatarStatus, key: StatusKey, N: number) =>
    ipcRenderer.invoke("generateSingleCombinations", equipmentList, characterStatus, avatarStatus, key, N),
});
