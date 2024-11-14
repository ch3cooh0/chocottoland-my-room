import { TotalStatus, AvatarStatus, CharacterStatus } from "../../types/types";

export const ZeroStatus = {
    zeroTotalStatus: (): TotalStatus => {
      return {
        pow: 0,
        int: 0,
        vit: 0,
        spd: 0,
        luk: 0,
        hp: 0,
        sp: 0,
        atk: 0,
        def: 0,
        mat: 0,
        mdf: 0,
        hpr: 0,
        spr: 0,
        exp: 0,
        pet: 0,
        mov: 0,
        drn: 0,
      };
    },
    zeroCharacterStatus: (): CharacterStatus => {
      return {
        lv: 0,
        hp: 0,
        sp: 0,
        pow: 0,
        int: 0,
        vit: 0,
        spd: 0,
        luk: 0,
      };
    },
    zeroAvatarStatus: (): AvatarStatus => {
      return {
        pow: 0,
        int: 0,
        vit: 0,
        spd: 0,
        luk: 0,
        hp: 0,
        sp: 0,
        atk: 0,
        def: 0,
        mat: 0,
        mdf: 0,
        hpr: 0,
        spr: 0,
        exp: 0,
        pet: 0,
        mov: 0,
        drn: 0,
      };
    },
  };