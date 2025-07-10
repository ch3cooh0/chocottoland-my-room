import path from 'path';
import { describe, it, expect, afterEach } from 'vitest';
import { getAppDataPath } from '../electron/modules/pathUtils';
import type { App } from 'electron';

type DummyApp = Pick<App, 'isPackaged' | 'getPath'>;

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('getAppDataPath', () => {
  it('returns dev path when VITE_DEV_SERVER_URL is set', () => {
    process.env.VITE_DEV_SERVER_URL = 'true';
    const app: DummyApp = { isPackaged: false, getPath: () => '' };
    const result = getAppDataPath(app as unknown as App);
    expect(result).toBe(path.join(process.cwd(), 'data'));
  });

  it('returns portable path when packaged and PORTABLE_EXECUTABLE_DIR is set', () => {
    delete process.env.VITE_DEV_SERVER_URL;
    process.env.PORTABLE_EXECUTABLE_DIR = '/portable';
    const app: DummyApp = { isPackaged: true, getPath: () => '' };
    const result = getAppDataPath(app as unknown as App);
    expect(result).toBe(path.join('/portable', 'data'));
  });

  it('returns execPath dir when packaged without portable dir', () => {
    delete process.env.VITE_DEV_SERVER_URL;
    delete process.env.PORTABLE_EXECUTABLE_DIR;
    const app: DummyApp = { isPackaged: true, getPath: () => process.execPath };
    const expected = path.join(path.dirname(process.execPath), 'data');
    const result = getAppDataPath(app as unknown as App);
    expect(result).toBe(expected);
  });

  it('returns default path when not packaged', () => {
    delete process.env.VITE_DEV_SERVER_URL;
    const app: DummyApp = { isPackaged: false, getPath: () => '' };
    const result = getAppDataPath(app as unknown as App);
    expect(result).toBe(path.join(process.cwd(), 'data'));
  });
});
