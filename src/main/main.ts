import { app, BrowserWindow, Menu, MenuItem, ipcMain } from 'electron';
import path from 'path';
import { loadEquipmentData } from './equipmentDataLoader';

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

    // メニューバーの設定
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { type: 'separator' },
                { label: 'Exit', click: () => app.quit() }
            ]
        },
        {
            label: 'View',
            submenu: [
                { label: 'Reload', role: 'reload' },
                { label: 'Toggle Developer Tools', role: 'toggleDevTools' }
            ]
        }
    ]);

    mainWindow.setMenu(menu);

    // 開発ツールを自動的に開く
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
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
