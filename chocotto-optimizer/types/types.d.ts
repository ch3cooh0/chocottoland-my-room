
/**
 * アプリケーション内で使用される型を定義します。
 */
export type UserFileExtension = "wherehouse.json" | "character.json" | "avatar.json" | "mannequin.json";
/**
 * 装備のカテゴリ(部位)を表す型
 */
export type Category = "武器" | "頭" | "服" | "首" | "手" | "盾" | "背" | "靴";
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
 * 装備の特殊コアの強化レベルを表す型
 */
export type CoreNo = 1 | 2 | 3;

/**
 * 装備の特殊コアを表す型
 */
export type Core = {
    [key in CoreNo]: Partial<{ [key in StatusKey]: number }>;
}

export type ReinforceType = "物理" | "魔法" | "None";

export type Reinforce = {
    type: ReinforceType;
    lv: number;
}

/**
 * 装備のインスタンスを表す型(装備の組み合わせ探索用)
 */
export interface EquipmentInstance extends Equipment {
    // 装備のUUID装備を一意に識別するためのID（同じ装備を複数所持する場合があるため）
    uuid: string;
    // 強化
    reinforce: Reinforce;
    // 特殊コア
    core: Core;
}

/**
 * 装備の簡易データを表す型(ファイル保存用)
 */
export interface EquipmentSimple {
    id: string;
    name: string;
    // 強化
    reinforce: Reinforce;
    // 特殊コア
    core: Core;
}

/**
 * キャラクター装備情報
 */
export interface Equipped {
    [key in Category]?: EquipmentInstance
}

/**
 * 基本ステータスを表す型
 */
export interface KisoStatus{
    pow: number;
    int: number;
    vit: number;
    spd: number;
    luk: number;
}

/**
 * キャラクターステータスを表す型
 */
export interface CharacterStatus extends KisoStatus {
    lv: number;
    hp: number;
    sp: number;
}

/**
 * アバターのステータスを表す型
 */
export interface AvatarStatus extends KisoStatus {
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
}

/**
 * 計算後のステータスを表す型
 */
export interface TotalStatus extends KisoStatus {
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
}

/**
 * 装備の効果を表す型
 */
export interface EquippedEffect {
    ability_id: string;
    ability_type: string;
    equipment_id: string;
    source_status: string;
    target_status: string;
    effect: string;
    text: string;
}

/**
 * コンボ装備のデータを表す型
 */
export interface ComboEquipment {
    combo_id: string;
    part: string;
    equipment_id: string;
    count: string;
    need: string;
}

/**
 * コンボ装備のステータスを表す型
 */
export interface ComboStatus {
    combo_id: string;
    pow: number;
    int: number;
    spd: number;
    vit: number;
    luk: number;
    atk: number;
    def: number;
    mat: number;
    mdf: number;
    hp: number;
    sp: number;
    hpr: number;
    spr: number;
    drn: number;
    mov: number;
    pet: number;
    exp: number;
    group_id: string;
    text: string;
}

export interface ComboInfo {
    comboEquipment: ComboEquipment[];
    comboStatus: ComboStatus;
}

/**
 * マネキンのデータを表す型
 */
export interface Mannequin {
    main: {
        [key in Category]?: EquipmentSimple
    }
    sub: {
        [key in Category]?: EquipmentSimple
    }
}