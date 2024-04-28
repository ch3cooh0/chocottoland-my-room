import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import {loadEquipmentData} from './equipmentDataLoader';

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        title: "冒険者のお部屋"
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

    // 開発ツールを自動的に開く
    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    // メインウィンドウの作成
    createWindow();

    // プラットフォームが MacOS の場合は特別な処理が必要です
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

ipcMain.on('load-equipment-data', (event) => {
    loadEquipmentData(event)
  });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
