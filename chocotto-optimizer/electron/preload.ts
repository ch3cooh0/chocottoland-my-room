import { ipcRenderer, contextBridge } from "electron";
import {
  AvatarStatus,
  Category,
  CharacterStatus,
  Equipment,
  EquipmentInstance,
  EquipmentSimple,
  Equipped,
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
  // ...
  loadEquipmentFromCSV: (path: string) =>
    ipcRenderer.invoke("loadEquipmentFromCSV", path),
  loadEquipmentSimpleFromJSON: (path: string) =>
    ipcRenderer.invoke("loadEquipmentSimpleFromJSON", path),
  writeEquipmentSimpleToJSON: (path: string, equipments: EquipmentSimple[]) =>
    ipcRenderer.invoke("writeEquipmentSimpleToJSON", path, equipments),
  showSaveDialog: (defaultFileName: string, ext: UserFileExtension) =>
    ipcRenderer.invoke("show-save-dialog", defaultFileName, ext),
  showOpenDialog: (ext: UserFileExtension) => ipcRenderer.invoke("show-open-dialog", ext),
  convertEquipmentSimplesToEquipmentInstances: (
    equipmentSimples: EquipmentSimple[]
  ) =>
    ipcRenderer.invoke(
      "convertEquipmentSimplesToEquipmentInstances",
      equipmentSimples
    ),
  convertEquipmentInstanceToEquipmentSimple: (
    equipmentInstance: EquipmentInstance
  ) =>
    ipcRenderer.invoke(
      "convertEquipmentInstanceToEquipmentSimple",
      equipmentInstance
    ),
  convertEquipmentToEquipmentInstance: (equipment: Equipment) =>
    ipcRenderer.invoke("convertEquipmentToEquipmentInstance", equipment),
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
});
