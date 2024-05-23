import { useEffect, useState } from 'react';
import { Equipment, Status, CharaStatus, BaseStatus ,ExtendedStatus} from '../../types/global';
import MyRoomView from './MyRoomView';



const MyRoomScreen: React.FC = () => {
  const [equipmentList, setEquipments] = useState<Equipment[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMainEquipments, setSelectedMainEquipments] = useState<{ [key: string]: Equipment | null }>({
    武器: null,
    盾: null,
    頭: null,
    背: null,
    靴: null,
    手: null,
    首: null,
    服: null,
  });
  const [selectedSubEquipments, setSelectedSubEquipments] = useState<{ [key: string]: Equipment | null }>({
    武器: null,
    盾: null,
    頭: null,
    背: null,
    靴: null,
    手: null,
    首: null,
    服: null,
  });
  const [selectMainOrSub, setSelectMainOrSub] = useState<'main' | 'sub'>('main');

  // キャラクターのステータス
  const [characterStatus, setCharacterStatus] = useState<CharaStatus>({ LV: 99, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0 });
  // アバターのステータス
  const [avatarStatus, setAvatarStatus] = useState<Status>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });
  // 耳マロ・クリマロのステータス
  const [helmStatus, setHelmStatus] = useState<Status>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });
  // 奇石のステータス
  const [stoneStatus, setStoneStatus] = useState<Status>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });
  // ベルトのステータス
  const [beltStatus, setBeltStatus] = useState<Status>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });
  // 表示ステータス(キャラクター欄)
  const [baseStatus, setBaseStatus] = useState<BaseStatus>({ pow: 0, int: 0, spd: 0, vit: 0, luk: 0 });
  // 表示ステータス(装備欄)
  const [displayStatus, setDisplayStatus] = useState<BaseStatus>({ pow: 0, int: 0, spd: 0, vit: 0, luk: 0 });
  // 表示ステータス（基礎以外）
  const [extendedStatus, setExtendedStatus] = useState<ExtendedStatus>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });
  // リキッド増加ステータス
  const [dopingStatus, setDopingStatus] = useState<ExtendedStatus>({ ATK: 0, DEF: 0, MAT: 0, MDF: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 });

  // ドーピング関係

  // チョコビタ
  const [chocoBitaFlag, setChocoBitaFlag] = useState<{ [key: string]: boolean }>({ all: false, pow: false, int: false, spd: false, vit: false, luk: false });
  // チョコビタの倍率(将来的に設定ファイルから読み込めるようにしたい)
  const [chocoBitaMultiplier, setChocoBitaMultiplier] = useState<{ [key: string]: number }>({ all: 0.1, pow: 0.2, int: 0.2, spd: 0.2, vit: 0.2, luk: 0.2 });
  // 加護の種類
  const [kagoType , setKagoType] = useState<'大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛'|null>(null);
  const handleToggleChange = (type: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛') => {
    setKagoType(kagoType === type ? null : type);
  };
  // ドーピング有効フラグ
  const [dopingFlag , setDopingFlag] = useState<{ [key: string]: boolean }>({
    ATK: false,
    DEF: false,
    MAT: false,
    MDF: false
  });


  const calcBaseStatus = () => {
    const baseStatus: BaseStatus = { pow: 0, int: 0, spd: 0, vit: 0, luk: 0 };
    characterStatus.pow = characterStatus.pow;
    characterStatus.int = characterStatus.int;
    characterStatus.spd = characterStatus.spd;
    characterStatus.vit = characterStatus.vit;
    characterStatus.luk = characterStatus.luk;

    // チョコビタがあればステータスを増加
    if (chocoBitaFlag.all) {
      baseStatus.pow += Math.ceil(characterStatus.pow * chocoBitaMultiplier.all);
      baseStatus.int += Math.ceil(characterStatus.int * chocoBitaMultiplier.all);
      baseStatus.spd += Math.ceil(characterStatus.spd * chocoBitaMultiplier.all);
      baseStatus.vit += Math.ceil(characterStatus.vit * chocoBitaMultiplier.all);
      baseStatus.luk += Math.ceil(characterStatus.luk * chocoBitaMultiplier.all);
    }
    if (chocoBitaFlag.pow) {
      baseStatus.pow += Math.ceil(baseStatus.pow * chocoBitaMultiplier.pow);
    }
    if (chocoBitaFlag.int) {
      baseStatus.int += Math.ceil(baseStatus.int * chocoBitaMultiplier.int);
    }
    if (chocoBitaFlag.spd) {
      baseStatus.spd += Math.ceil(baseStatus.spd * chocoBitaMultiplier.spd);
    }
    if (chocoBitaFlag.vit) {
      baseStatus.vit += Math.ceil(baseStatus.vit * chocoBitaMultiplier.vit);
    }
    if (chocoBitaFlag.luk) {
      baseStatus.luk += Math.ceil(baseStatus.luk * chocoBitaMultiplier.luk);
    }
    // クリまろ
    baseStatus.pow += helmStatus.pow;
    baseStatus.int += helmStatus.int;
    baseStatus.spd += helmStatus.spd;
    baseStatus.vit += helmStatus.vit;
    baseStatus.luk += helmStatus.luk;

    // 加護は互いに重複しない
    switch(kagoType){
      case '大天使の加護':
        baseStatus.pow += Math.ceil(baseStatus.pow * 0.2);
        baseStatus.int += Math.ceil(baseStatus.int * 0.2);
        baseStatus.spd += Math.ceil(baseStatus.spd * 0.2);
        baseStatus.vit += Math.ceil(baseStatus.vit * 0.2);
        baseStatus.luk += Math.ceil(baseStatus.luk * 0.2);
        break;
      case '妖精王の祝福物理':
        baseStatus.pow += Math.ceil(baseStatus.pow * 0.3);
        break;
      case '妖精王の祝福魔法':
        baseStatus.int += Math.ceil(baseStatus.int * 0.3);
        break;
      case '明王の鼓舞陽':
        baseStatus.spd += Math.ceil(baseStatus.spd * 0.3);
        break;
      case '明王の守護陰':
        baseStatus.spd += Math.ceil(baseStatus.spd * 0.3);
        break;
      case '祝福の蒼盾':
        baseStatus.vit += Math.ceil(baseStatus.vit * 0.3);
        break;
      case '邪神の呪詛':
        baseStatus.luk += Math.ceil(baseStatus.luk * 0.3);
        break;
    }
    return baseStatus;
  };

  const calcDisplayStatus = (totalEquipmentStats: Status) => {
    const displayStatus: BaseStatus = { pow: 0, int: 0, spd: 0, vit: 0, luk: 0 };
    displayStatus.pow = avatarStatus.pow  + helmStatus.pow + stoneStatus.pow + beltStatus.pow + totalEquipmentStats.pow;
    displayStatus.int = avatarStatus.int  + helmStatus.int + stoneStatus.int + beltStatus.int + totalEquipmentStats.int;
    displayStatus.spd = avatarStatus.spd  + helmStatus.spd + stoneStatus.spd + beltStatus.spd + totalEquipmentStats.spd;
    displayStatus.vit = avatarStatus.vit  + helmStatus.vit + stoneStatus.vit + beltStatus.vit + totalEquipmentStats.vit;
    displayStatus.luk = avatarStatus.luk  + helmStatus.luk + stoneStatus.luk + beltStatus.luk + totalEquipmentStats.luk;
    return displayStatus;
  };

  const calcExtraStatus = (totalEquipmentStats: Status) => {
    const extraStatus: ExtendedStatus = { ATK: 0, DEF: 0, MAT: 0, MDF: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 };
    extraStatus.ATK = avatarStatus.ATK  + helmStatus.ATK + stoneStatus.ATK + beltStatus.ATK + totalEquipmentStats.ATK;
    extraStatus.DEF = avatarStatus.DEF  + helmStatus.DEF + stoneStatus.DEF + beltStatus.DEF + totalEquipmentStats.DEF;
    extraStatus.MAT = avatarStatus.MAT  + helmStatus.MAT + stoneStatus.MAT + beltStatus.MAT + totalEquipmentStats.MAT;
    extraStatus.MDF = avatarStatus.MDF  + helmStatus.MDF + stoneStatus.MDF + beltStatus.MDF + totalEquipmentStats.MDF;
    extraStatus.HP = avatarStatus.HP  + helmStatus.HP + stoneStatus.HP + beltStatus.HP + totalEquipmentStats.HP;
    extraStatus.SP = avatarStatus.SP  + helmStatus.SP + stoneStatus.SP + beltStatus.SP + totalEquipmentStats.SP;
    extraStatus.MOV = avatarStatus.MOV  + helmStatus.MOV + stoneStatus.MOV + beltStatus.MOV + totalEquipmentStats.MOV;
    extraStatus.HPR = avatarStatus.HPR  + helmStatus.HPR + stoneStatus.HPR + beltStatus.HPR + totalEquipmentStats.HPR;
    extraStatus.SPR = avatarStatus.SPR  + helmStatus.SPR + stoneStatus.SPR + beltStatus.SPR + totalEquipmentStats.SPR;
    extraStatus.DRN = avatarStatus.DRN  + helmStatus.DRN + stoneStatus.DRN + beltStatus.DRN + totalEquipmentStats.DRN;
    extraStatus.PET = avatarStatus.PET  + helmStatus.PET + stoneStatus.PET + beltStatus.PET + totalEquipmentStats.PET;
    extraStatus.EXP = avatarStatus.EXP  + helmStatus.EXP + stoneStatus.EXP + beltStatus.EXP + totalEquipmentStats.EXP;

    const pow = characterStatus.pow + avatarStatus.pow  + helmStatus.pow + stoneStatus.pow + beltStatus.pow + totalEquipmentStats.pow;
    const int = characterStatus.int + avatarStatus.int  + helmStatus.int + stoneStatus.int + beltStatus.int + totalEquipmentStats.int;
    const spd = characterStatus.spd + avatarStatus.spd  + helmStatus.spd + stoneStatus.spd + beltStatus.spd + totalEquipmentStats.spd;
    const vit = characterStatus.vit + avatarStatus.vit  + helmStatus.vit + stoneStatus.vit + beltStatus.vit + totalEquipmentStats.vit;
    const luk = characterStatus.luk + avatarStatus.luk  + helmStatus.luk + stoneStatus.luk + beltStatus.luk + totalEquipmentStats.luk;

    switch (kagoType){
      case '大天使の加護':
        extraStatus.ATK = Math.ceil(extraStatus.ATK * 1.2) + Math.ceil(pow * 1.2) * 3;
        extraStatus.DEF = Math.ceil(extraStatus.DEF * 1.2) + Math.ceil(vit * 1.2) * 2;
        extraStatus.MAT = Math.ceil(extraStatus.MAT * 1.2) + Math.ceil(int * 1.2) * 2;
        extraStatus.MDF = Math.ceil(extraStatus.MDF * 1.2) + Math.ceil(int * 1.2) * 15;
        extraStatus.HP = Math.ceil(extraStatus.HP * 5);
        extraStatus.SP = Math.ceil(extraStatus.SP * 5);
        extraStatus.HPR += 100; 
        extraStatus.SPR += 100;
        break;
      case '妖精王の祝福物理':
        extraStatus.ATK = Math.ceil(extraStatus.ATK * 1.3) + Math.ceil(pow * 1.3) * 3;
        break;
      case '妖精王の祝福魔法':
        extraStatus.MAT = Math.ceil(extraStatus.MAT * 1.3) + Math.ceil(int * 1.3) * 2;
        break;
      case '明王の鼓舞陽':
        extraStatus.HP = Math.ceil(extraStatus.HP * 3);
        extraStatus.SP = Math.ceil(extraStatus.SP * 3);
        extraStatus.HPR += 50;
        extraStatus.SPR += 50;
        break;
      case '明王の守護陰':
        extraStatus.HP = Math.ceil(extraStatus.HP * 3);
        extraStatus.SP = Math.ceil(extraStatus.SP * 3);
        extraStatus.HPR += 50;
        extraStatus.SPR += 50;
        break;
      case '祝福の蒼盾':
        extraStatus.DEF = Math.ceil(extraStatus.DEF) + Math.ceil(vit * 1.3) * 2;
        break;
      case '邪神の呪詛':
        break;
    }
    // ドーピング結果反映
    extraStatus.ATK += dopingStatus.ATK;
    extraStatus.DEF += dopingStatus.DEF;
    extraStatus.MAT += dopingStatus.MAT;
    extraStatus.MDF += dopingStatus.MDF;
    extraStatus.HP += dopingStatus.HP;
    extraStatus.SP += dopingStatus.SP;
    extraStatus.MOV += dopingStatus.MOV;
    extraStatus.HPR += dopingStatus.HPR;
    extraStatus.SPR += dopingStatus.SPR;
    extraStatus.DRN += dopingStatus.DRN;
    extraStatus.PET += dopingStatus.PET;
    extraStatus.EXP += dopingStatus.EXP;
    return extraStatus;
  };

  // ドーピングによる増加量計算のための関連ステータスを計算する。
  const calcRelatedStatusForDoping = (totalEquipmentStats: Status) => {
    const relatedStatus: ExtendedStatus = { ATK: 0, DEF: 0, MAT: 0, MDF: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 };
    relatedStatus.ATK = avatarStatus.ATK  + helmStatus.ATK + stoneStatus.ATK + beltStatus.ATK + totalEquipmentStats.ATK;
    relatedStatus.DEF = avatarStatus.DEF  + helmStatus.DEF + stoneStatus.DEF + beltStatus.DEF + totalEquipmentStats.DEF;
    relatedStatus.MAT = avatarStatus.MAT  + helmStatus.MAT + stoneStatus.MAT + beltStatus.MAT + totalEquipmentStats.MAT;
    relatedStatus.MDF = avatarStatus.MDF  + helmStatus.MDF + stoneStatus.MDF + beltStatus.MDF + totalEquipmentStats.MDF;
    relatedStatus.HP = avatarStatus.HP  + helmStatus.HP + stoneStatus.HP + beltStatus.HP + totalEquipmentStats.HP;
    relatedStatus.SP = avatarStatus.SP  + helmStatus.SP + stoneStatus.SP + beltStatus.SP + totalEquipmentStats.SP;
    relatedStatus.MOV = avatarStatus.MOV  + helmStatus.MOV + stoneStatus.MOV + beltStatus.MOV + totalEquipmentStats.MOV;
    relatedStatus.HPR = avatarStatus.HPR  + helmStatus.HPR + stoneStatus.HPR + beltStatus.HPR + totalEquipmentStats.HPR;
    relatedStatus.SPR = avatarStatus.SPR  + helmStatus.SPR + stoneStatus.SPR + beltStatus.SPR + totalEquipmentStats.SPR;
    relatedStatus.DRN = avatarStatus.DRN  + helmStatus.DRN + stoneStatus.DRN + beltStatus.DRN + totalEquipmentStats.DRN;
    relatedStatus.PET = avatarStatus.PET  + helmStatus.PET + stoneStatus.PET + beltStatus.PET + totalEquipmentStats.PET;
    relatedStatus.EXP = avatarStatus.EXP  + helmStatus.EXP + stoneStatus.EXP + beltStatus.EXP + totalEquipmentStats.EXP;
    return relatedStatus;
  }

  const calculateTotalEquipmentStats = () => {
    const totalEquipmentStats: Status = { pow: 0, int: 0, vit: 0, spd: 0, luk: 0, HP: 0, SP: 0, ATK: 0, DEF: 0, MAT: 0, MDF: 0, HPR: 0, SPR: 0, EXP: 0, PET: 0, MOV: 0, DRN: 0 };
    Object.values(selectedMainEquipments).forEach((equipment) => {
      if (equipment) {
        totalEquipmentStats.pow += equipment.status.pow || 0;
        totalEquipmentStats.int += equipment.status.int || 0;
        totalEquipmentStats.vit += equipment.status.vit || 0;
        totalEquipmentStats.spd += equipment.status.spd || 0;
        totalEquipmentStats.luk += equipment.status.luk || 0;
        totalEquipmentStats.HP += equipment.status.HP || 0;
        totalEquipmentStats.SP += equipment.status.SP || 0;
        totalEquipmentStats.ATK += equipment.status.ATK || 0;
        totalEquipmentStats.DEF += equipment.status.DEF || 0;
        totalEquipmentStats.MAT += equipment.status.MAT || 0;
        totalEquipmentStats.MDF += equipment.status.MDF || 0;
        totalEquipmentStats.HPR += equipment.status.HPR || 0;
        totalEquipmentStats.SPR += equipment.status.SPR || 0;
        totalEquipmentStats.EXP += equipment.status.EXP || 0;
        totalEquipmentStats.PET += equipment.status.PET || 0;
        totalEquipmentStats.MOV += equipment.status.MOV || 0;
        totalEquipmentStats.DRN += equipment.status.DRN || 0;
      }
    });
    Object.values(selectedSubEquipments).forEach((equipment) => {
      if (equipment) {
        totalEquipmentStats.pow += Math.ceil(equipment.status.pow / 2) || 0;
        totalEquipmentStats.int += Math.ceil(equipment.status.int / 2) || 0;
        totalEquipmentStats.vit += Math.ceil(equipment.status.vit / 2) || 0;
        totalEquipmentStats.spd += Math.ceil(equipment.status.spd / 2) || 0;
        totalEquipmentStats.luk += Math.ceil(equipment.status.luk / 2) || 0;
        totalEquipmentStats.HP += Math.ceil(equipment.status.HP / 2) || 0;
        totalEquipmentStats.SP += Math.ceil(equipment.status.SP / 2) || 0;
        totalEquipmentStats.ATK += Math.ceil(equipment.status.ATK / 2) || 0;
        totalEquipmentStats.DEF += Math.ceil(equipment.status.DEF / 2) || 0;
        totalEquipmentStats.MAT += Math.ceil(equipment.status.MAT / 2) || 0;
        totalEquipmentStats.MDF += Math.ceil(equipment.status.MDF / 2) || 0;
      }
    });
    // TODO:セット効果とアニバ装備等のステータスボーナスを計算する。
    
    return totalEquipmentStats;
  };

  const calcDopingStatus = () => {
    const dopingStatus: Status = { ATK: 0, DEF: 0, MAT: 0, MDF: 0, pow: 0, int: 0, spd: 0, vit: 0, luk: 0, HP: 0, SP: 0, MOV: 0, HPR: 0, SPR: 0, DRN: 0, PET: 0, EXP: 0 };
    const baseStatus: BaseStatus = calcBaseStatus();
    const totalEquipmentStats = calculateTotalEquipmentStats();
    const relatedStatus = calcRelatedStatusForDoping(totalEquipmentStats);
    if (dopingFlag.ATK) {
      const p = (baseStatus.pow + totalEquipmentStats.pow + characterStatus.LV) / 100;
      dopingStatus.ATK = Math.ceil( ((baseStatus.pow + totalEquipmentStats.pow) * 2 + relatedStatus.ATK) * p);
    }
    if (dopingFlag.DEF) {
      const p = (baseStatus.vit + totalEquipmentStats.vit + characterStatus.LV) / 100;
      dopingStatus.DEF = Math.ceil( ((baseStatus.vit + totalEquipmentStats.vit) * 2 + relatedStatus.DEF) * p);
    }
    if (dopingFlag.MAT) {
      const p = (baseStatus.int + totalEquipmentStats.int + characterStatus.LV) / 100;
      dopingStatus.MAT = Math.ceil( ((baseStatus.int + totalEquipmentStats.int) * 2 + relatedStatus.MAT) * p);
    }
    if (dopingFlag.MDF) {
      const pi = (baseStatus.int + totalEquipmentStats.int + characterStatus.LV) / 100;
      const pv = (baseStatus.vit + totalEquipmentStats.vit + characterStatus.LV) / 100;
      const MDFI =  ((baseStatus.int + totalEquipmentStats.int) * 2 + relatedStatus.MDF) * pi;
      const MDFV =  ((baseStatus.vit + totalEquipmentStats.vit) * 2 + relatedStatus.MDF) * pv;
      dopingStatus.MDF = Math.ceil(Math.max(MDFI, MDFV));
    }
    setDopingStatus(dopingStatus);
  };

  const openModal = (category: string, type: 'main' | 'sub') => {
    setSelectedCategory(category);
    setSelectMainOrSub(type);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  // 装備関連処理
  const handleMainEquipmentSelect = (equipment: Equipment) => {
    if (selectedCategory) {
      setSelectedMainEquipments((prev) => ({
        ...prev,
        [selectedCategory]: equipment,
      }));
      closeModal();
    }
  };

  const clearSelectedMainEquipment = (category: string) => {
    setSelectedMainEquipments((prev) => ({
      ...prev,
      [category]: null,
    }));
  };
  const handleSubEquipmentSelect = (equipment: Equipment) => {
    if (selectedCategory) {
      setSelectedSubEquipments((prev) => ({
        ...prev,
        [selectedCategory]: equipment,
      }));
      closeModal();
    }
  };

  const clearSelectedSubEquipment = (category: string) => {
    setSelectedSubEquipments((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  //////////////////////////////////////////////////
  useEffect(() => {
    window.electronAPI.loadEquipmentData();
    window.electronAPI.onDataLoaded((event, { data, error }) => {
      if (error) {
        console.error('Failed to load data:', error);
      } else {
        setEquipments(data);
      }
    });
  }, []);
  useEffect(() => {
    const totalEquipmentStats=calculateTotalEquipmentStats();
  
    // 仮処理
    const baseStatus: BaseStatus = calcBaseStatus();
    const extraStatus: ExtendedStatus = calcExtraStatus(totalEquipmentStats);
    const displayStatus: BaseStatus = calcDisplayStatus(totalEquipmentStats);
    setBaseStatus(baseStatus);
    setExtendedStatus(extraStatus);
    setDisplayStatus(displayStatus);
  }, [selectedMainEquipments, selectedSubEquipments, characterStatus, avatarStatus, helmStatus, stoneStatus, beltStatus]);

  


  return (
    <MyRoomView
      selectedMainEquipments={selectedMainEquipments}
      selectedSubEquipments={selectedSubEquipments}
      openModal={openModal}
      clearSelectedMainEquipment={clearSelectedMainEquipment}
      clearSelectedSubEquipment={clearSelectedSubEquipment}
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      selectedCategory={selectedCategory}
      equipmentList={equipmentList}
      handleMainEquipmentSelect={handleMainEquipmentSelect}
      handleSubEquipmentSelect={handleSubEquipmentSelect}
      selectMainOrSub={selectMainOrSub}
      kagoType={kagoType}
      handleToggleChange={handleToggleChange}
      baseStatus={baseStatus}
      displayStatus={displayStatus}
    />
  );
};



export default MyRoomScreen;
