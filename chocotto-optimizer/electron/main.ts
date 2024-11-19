import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  loadAvatarStatusFromJSON,
  loadCharacterStatusFromJSON,
  loadEquipmentFromCSV,
  loadEquipmentSimpleFromJSON,
} from "./modules/loader";
import {
  writeAvatarStatusToJSON,
  writeCharacterStatusToJSON,
  writeEquipmentSimpleToJSON,
} from "./modules/writer";
import { EquipmentDTO } from "./modules/dto";
import {
  StatusKey,
  Equipped,
  CharacterStatus,
  AvatarStatus,
  UserFileExtension,
} from "../types/types";
import {
  calcEquippedStatus,
  calcTotalStatus,
  comboEffectUtils,
  coreEffectUtils,
  equippedEffectUtils,
  loadCache,
  calcViewStatus,
} from "./modules/statusCalculation";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "choco_cornet_icon_64x64.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * ハンドル定義
 */

/**
 * 装備マスター読込
 */
ipcMain.handle("loadEquipmentFromCSV", async (event, path) => {
  try {
    const data = await loadEquipmentFromCSV(path);
    return data;
  } catch (error) {
    console.info(event);
    console.error("Error loading CSV:", error);
    throw error;
  }
});

/**
 * 倉庫データ読込
 */
ipcMain.handle("loadEquipmentSimpleFromJSON", async (event, path) => {
  try {
    const data = await loadEquipmentSimpleFromJSON(path);
    return data;
  } catch (error) {
    console.info(event);
    console.error("Error loading JSON:", error);
    throw error;
  }
});

/**
 * 倉庫データ保存
 */
ipcMain.handle("writeEquipmentSimpleToJSON", async (event, path, data) => {
  try {
    await writeEquipmentSimpleToJSON(path, data);
  } catch (error) {
    console.info(event);
    console.error("Error writing JSON:", error);
    throw error;
  }
});

/**
 * キャラクターステータス読込
 */
ipcMain.handle("loadCharacterStatusFromJSON", async (event, path) => {
  return loadCharacterStatusFromJSON(path);
});

/**
 * キャラクターステータス保存
 */
ipcMain.handle("writeCharacterStatusToJSON", async (event, path, data) => {
  return writeCharacterStatusToJSON(path, data);
});

/**
 * アバターステータス読込
 */
ipcMain.handle("loadAvatarStatusFromJSON", async (event, path) => {
  return loadAvatarStatusFromJSON(path);
});

/**
 * アバターステータス保存
 */
ipcMain.handle("writeAvatarStatusToJSON", async (event, path, data) => {
  return writeAvatarStatusToJSON(path, data);
});

/**
 * ファイル保存ダイアログ
 */
ipcMain.handle("show-save-dialog", async (event, defaultFileName, ext: UserFileExtension) => {
  if (!win) {
    throw new Error("BrowserWindow is not available");
  }
  const result = await dialog.showSaveDialog(win, {
    title: "保存するファイルを指定",
    buttonLabel: "保存",
    defaultPath: defaultFileName,
    filters: [
      { name: "Text Files", extensions: [ext] },
    ],
  });
  return result.filePath;
});

/**
 * ファイル読込ダイアログ
 */
ipcMain.handle("show-open-dialog", async (event,ext: UserFileExtension) => {
  if (!win) {
    throw new Error("BrowserWindow is not available");
  }
  const result = await dialog.showOpenDialog(win, {
    title: "ファイルを開く",
    buttonLabel: "開く",
    properties: ["openFile"],
    filters: [{ name: "Text Files", extensions: [ext] }],
  });
  return result.filePaths;
});

/**
 * 倉庫保存データ→装備インスタンス変換
 */
ipcMain.handle(
  "convertEquipmentSimplesToEquipmentInstances",
  async (event, equipmentSimples) => {
    const equipmentMaster = await loadEquipmentFromCSV("./data/equipments.csv");
    const equipmentInstances =
      EquipmentDTO.convertEquipmentSimplesToEquipmentInstances(
        equipmentSimples,
        equipmentMaster
      );
    return equipmentInstances;
  }
);

/**
 * 装備インスタンス→倉庫保存データ変換
 */
ipcMain.handle(
  "convertEquipmentInstanceToEquipmentSimple",
  async (event, equipmentInstance) => {
    return EquipmentDTO.convertEquipmentInstanceToEquipmentSimple(
      equipmentInstance
    );
  }
);

/**
 * 装備→装備インスタンス変換
 */
ipcMain.handle(
  "convertEquipmentToEquipmentInstance",
  async (event, equipment) => {
    return EquipmentDTO.convertEquipmentToEquipmentInstance(equipment);
  }
);

/**
 * 装備マスターから装備検索
 */
ipcMain.handle(
  "searchEquipment",
  async (event, fixCategory, searchName, sortKey, sortOrder) => {
    const equipmentMaster = await loadEquipmentFromCSV("./data/equipments.csv");
    const searchedEquipments = equipmentMaster
      .filter((equipment) => {
        return (
          equipment.category === fixCategory &&
          (searchName === "" || equipment.name.includes(searchName))
        );
      })
      .sort((a, b) => {
        if (sortKey === "") return 0;
        return a[sortKey as StatusKey] > b[sortKey as StatusKey] ? 1 : -1;
      });
    if (sortOrder === "desc") {
      searchedEquipments.reverse();
    }
    return searchedEquipments;
  }
);

/**
 * ステータス計算
 */
ipcMain.handle(
  "calcTotalStatus",
  async (
    event,
    characterMainEquipment: Equipped,
    characterSubEquipment: Equipped,
    characterStatus: CharacterStatus,
    avatarStatus: AvatarStatus
  ) => {
    loadCache();
    // メイン装備の純粋な合計値
    const rowMainStatus = calcEquippedStatus.calcRowMainStatus(
      characterMainEquipment
    );
    // 特殊コアの合計値
    const coreStatus = coreEffectUtils.calcCoreEffect(characterMainEquipment);

    // サブ装備の純粋な合計値
    const rowSubStatus = calcEquippedStatus.calcRowSubStatus(
      characterSubEquipment
    );
    // コンボ情報
    const comboInfos = comboEffectUtils.getComboInfo(
      EquipmentDTO.convertEquippedToEquipmentInstances(characterMainEquipment)
    );
    console.log('comboInfos', comboInfos);
    // 装備効果
    const equippedEffects = equippedEffectUtils.getEquippedEffect(
      EquipmentDTO.convertEquippedToEquipmentInstances(characterMainEquipment)
    );

    // コンボ増加量
    const comboStatus = comboEffectUtils.calcComboEffect(comboInfos);

    // 装備増加量
    const equippedStatus = equippedEffectUtils.calcEquippedEffect(
      equippedEffects,
      rowMainStatus,
      rowSubStatus,
      comboStatus,
      characterStatus,
      avatarStatus,
      coreStatus
    );

    // 合計値
    const totalStatus = calcTotalStatus.addMultipleTotalStatus(
      // キャラクターステータス
      EquipmentDTO.convertCharacterStatusToTotalStatus(characterStatus),
      // アバターステータス
      EquipmentDTO.convertAvatarStatusToTotalStatus(avatarStatus),
      // 装備
      rowMainStatus,
      rowSubStatus,
      // 装備効果
      equippedStatus,
      // セット効果
      comboStatus
    );
    return calcViewStatus.applyExtendedStatus(totalStatus);
  }
);

app.whenReady().then(createWindow);
