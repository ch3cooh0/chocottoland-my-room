import { ipcRenderer, contextBridge } from 'electron'
import { EquipmentSimple } from '../types/types'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
  loadEquipmentFromCSV: (path: string) => ipcRenderer.invoke('loadEquipmentFromCSV', path),
  loadEquipmentSimpleFromJSON: (path: string) => ipcRenderer.invoke('loadEquipmentSimpleFromJSON', path),
  writeEquipmentSimpleToJSON: (path: string, equipments: EquipmentSimple[]) => ipcRenderer.invoke('writeEquipmentSimpleToJSON', path, equipments),
  showSaveDialog: (defaultFileName: string) => ipcRenderer.invoke('show-save-dialog', defaultFileName),
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
})