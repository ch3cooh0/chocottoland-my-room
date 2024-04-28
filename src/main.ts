const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false  // Reactを使用する場合は、これが必要な場合があります。
        },
        title: "冒険者のお部屋"
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // 開発ツールを自動的に開く
    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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
