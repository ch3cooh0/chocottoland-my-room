import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  loadEquipmentData: (filePath: string) => ipcRenderer.send('load-equipment-data', filePath),
  onDataLoaded: (callback: (event: Electron.IpcRendererEvent, args: any) => void) => ipcRenderer.on('equipment-data-loaded', callback)
});
