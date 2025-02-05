import path from "path";

export function getAppDataPath(app: Electron.App) {
    if (process.env.VITE_DEV_SERVER_URL) {

      return path.join(process.cwd(), 'data')
    }
    if(app.isPackaged){
        return path.join(process.resourcesPath, 'data')
    }
    return path.join(process.cwd(), 'data')
  }