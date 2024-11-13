
/**
 * アプリケーション内で使用される型を定義します。
 */
/**
 * 装備のカテゴリ(部位)を表す型
 */
export type Category = "武器" | "頭" | "服" | "首" | "手" | "盾" | "背" | "足";
/**
 * 装備のステータスキーを表す型
 */
export type StatusKey = "pow" | "int" | "vit" | "spd" | "luk" | "hp" | "sp" | "atk" | "def" | "mat" | "mdf" | "hpr" | "spr" | "exp" | "pet" | "mov" | "drn";

/**
 * 装備のデータを表す型（マスタデータ)
 */
export interface Equipment {
    // 装備ID
    id: string;
    // 装備名
    name: string;
    // 装備のカテゴリ(部位)
    category: Category;
    lv: number;
    pow: number;
    int: number;
    vit: number;
    spd: number;
    luk: number;
    hp: number;
    sp: number;
    atk: number;
    def: number;
    mat: number;
    mdf: number;
    hpr: number;
    spr: number;
    exp: number;
    pet: number;
    mov: number;
    drn: number;
    // 装備アイコンID(画像を表示する場合に使用する。画像ファイル名拡張子除く)
    iconid: string;
}

/**
 * 装備のインスタンスを表す型(装備の組み合わせ探索用)
 */
export interface EquipmentInstance extends Equipment {
    // 装備のUUID装備を一意に識別するためのID（同じ装備を複数所持する場合があるため）
    uuid: string;
    // 強化レベル
    reinforceLevel: number;
    // 特殊コア
    core: Partial<{ [key in StatusKey]: number }>;
}

/**
 * 装備の簡易データを表す型(ファイル保存用)
 */
export interface EquipmentSimple {
    id: string;
    name: string;
    // 強化レベル
    reinforceLevel: number;
    // 特殊コア
    core: Partial<{ [key in StatusKey]: number }>;
}
