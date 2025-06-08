import { beforeAll, vi } from 'vitest'

beforeAll(() => {
  Object.defineProperty(window, 'ipcRenderer', {
    writable: true,
    value: {
      on: vi.fn(),
      off: vi.fn(),
      send: vi.fn(),
      invoke: vi.fn(),
    },
  })
})
