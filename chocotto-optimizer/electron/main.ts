import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { loadEquipmentFromCSV, loadEquipmentSimpleFromJSON } from './modules/loader'
import { writeEquipmentSimpleToJSON } from './modules/writer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('loadEquipmentFromCSV', async (event, path) => {
  try {
    const data = await loadEquipmentFromCSV(path)
    return data
  } catch (error) {
    console.info(event)
    console.error('Error loading CSV:', error)
    throw error
  }
})
ipcMain.handle('loadEquipmentSimpleFromJSON', async (event, path) => {
  try {
    const data = await loadEquipmentSimpleFromJSON(path)
    return data
  } catch (error) {
    console.info(event)
    console.error('Error loading JSON:', error)
    throw error
  }
})
ipcMain.handle('writeEquipmentSimpleToJSON', async (event, path, data) => {
  try {
    await writeEquipmentSimpleToJSON(path, data)
  } catch (error) {
    console.info(event)
    console.error('Error writing JSON:', error)
    throw error
  }
})

ipcMain.handle('show-save-dialog', async (event, defaultFileName) => {
  if (!win) {
    console.info(event)
    throw new Error('BrowserWindow is not available');
  }
  const result = await dialog.showSaveDialog(win, {
    title: '保存するファイルを指定',
    buttonLabel: '保存',
    defaultPath: defaultFileName,
    filters: [{ name: 'Text Files', extensions: ['json'] }, { name: 'All Files', extensions: ['*'] }],
  });
  return result.filePath;
});

ipcMain.handle('show-open-dialog', async (event) => {
  if (!win) {
    console.info(event)
    throw new Error('BrowserWindow is not available');
  }
  const result = await dialog.showOpenDialog(win, {
    title: 'ファイルを開く',
    buttonLabel: '開く',
    properties: ['openFile'],
    filters: [{ name: 'Text Files', extensions: ['json'] }],
  });
  return result.filePaths;
});

app.whenReady().then(createWindow)
