// ステータス
export interface Status {
    pow: number; // 力
    int: number; // 知恵
    vit: number; // 体力
    spd: number; // スピード
    luk: number; // 運
    HP: number;  // ヒットポイント
    SP: number;  // スキルポイント
    ATK: number; // 物理攻撃力
    DEF: number; // 物理防御力
    MAT: number; // 魔法攻撃力
    MDF: number; // 魔法防御力
    HPR: number; // HP再生率
    SPR: number; // SP再生率
    EXP: number; // 経験値
    PET: number; // 捕獲率
    MOV: number; // 移動速度
    DRN: number; // 吸収
}

// 装備アイテム
export interface Equipment {
    id: string;       // 装備ID
    name: string;     // 装備名
    category: string; // カテゴリー
    status: Status;   // ステータス情報
    text: string;     // 装備に関する追加テキスト
}

// 装備済みの装備　メイン装備であるかを持つ
export interface Equipped {
    equipment: Equipment;
    isMainEquipment: boolean;
}

// 装備データの型を定義します
export interface Equipments {
    weapon: Equipped | null;
    shield: Equipped | null;
    head: Equipped | null;
    back: Equipped | null;
    shoes: Equipped | null;
    hands: Equipped | null;
    neck: Equipped | null;
    clothes: Equipped | null;
}

// グローバルなWindowインターフェースを拡張
export interface Window {
    electronAPI: {
      loadEquipmentData: () => void;
      onDataLoaded: (callback: (event: any, data: { data: Equipment[], error?: string }) => void) => void;
      // その他のカスタムAPIメソッドも追加可能...
    };
  }