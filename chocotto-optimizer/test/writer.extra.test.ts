import fs from 'fs';
import { describe, it, expect, afterEach } from 'vitest';
import { writeCharacterStatusToJSON, writeAvatarStatusToJSON, writeMannequinToJSON } from '../electron/modules/writer';
import { CharacterStatus, AvatarStatus, Mannequin } from '../types/types';

const charPath = './test/data/writeCharacterStatusToJSON.json';
const avatarPath = './test/data/writeAvatarStatusToJSON.json';
const mannequinPath = './test/data/writeMannequinToJSON.json';

afterEach(() => {
  [charPath, avatarPath, mannequinPath].forEach((p) => {
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
  });
});

describe('writer additional functions', () => {
  it('writeCharacterStatusToJSON', () => {
    const status: CharacterStatus = { lv: 10, hp: 100, sp: 50, pow: 1, int: 2, vit: 3, spd: 4, luk: 5 };
    writeCharacterStatusToJSON(charPath, status);
    const parsed = JSON.parse(fs.readFileSync(charPath, 'utf8'));
    expect(parsed).toEqual(status);
  });

  it('writeAvatarStatusToJSON', () => {
    const status: AvatarStatus = { pow: 1, int: 2, vit: 3, spd: 4, luk: 5, hp: 100, sp: 50, atk: 10, def: 11, mat: 12, mdf: 13, hpr: 14, spr: 15, exp: 16, pet: 17, mov: 18, drn: 19 };
    writeAvatarStatusToJSON(avatarPath, status);
    const parsed = JSON.parse(fs.readFileSync(avatarPath, 'utf8'));
    expect(parsed).toEqual(status);
  });

  it('writeMannequinToJSON', () => {
    const mannequin: Mannequin = { main: {}, sub: {} };
    writeMannequinToJSON(mannequinPath, mannequin);
    const parsed = JSON.parse(fs.readFileSync(mannequinPath, 'utf8'));
    expect(parsed).toEqual(mannequin);
  });
});
