import { Equipment } from './global';
// Electron の Process 型拡張
declare namespace NodeJS {
  interface Process {
    resourcesPath: string;
  }
}

declare global {
  interface Window {
    electronAPI: {
      loadEquipmentData: () => void;
      onDataLoaded: (callback: (event: any, data: { data: Equipment[], error?: string }) => void) => void;
      // その他のカスタムAPIメソッドも追加可能...
    };
  }
}

export { }; // これはモジュール拡張であることをTypeScriptに示すために必要です