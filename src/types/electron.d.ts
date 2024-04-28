// Electron の Process 型拡張
declare namespace NodeJS {
    interface Process {
      resourcesPath: string;
    }
  }
  