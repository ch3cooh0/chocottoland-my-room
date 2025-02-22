import path from "path";

export function getAppDataPath(app: Electron.App) {
    if (process.env.VITE_DEV_SERVER_URL) {

      return path.join(process.cwd(), 'data')
    }
    if(app.isPackaged){
        console.log(app.getPath('exe'))
        const exePath = process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(process.execPath);
        console.log(exePath)
        return path.join(exePath, 'data')

    }
    return path.join(process.cwd(), 'data')
  }