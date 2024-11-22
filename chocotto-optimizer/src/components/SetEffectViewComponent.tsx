import React from 'react';
import { ViewComboEffectInfo } from '../../types/types';

interface SetEffectViewComponentProps {
    viewComboEffectInfos: ViewComboEffectInfo[];
}

const SetEffectViewComponent: React.FC<SetEffectViewComponentProps> = ({ viewComboEffectInfos = []}) => {
    const handleItemClick = (info: ViewComboEffectInfo) => {
        const statusDetails = `装備名: ${info.equipmentNames.join(", ")}\nステータス詳細:` +
            (info.comboStatus.pow !== 0 ? `\nPOW: ${info.comboStatus.pow}` : '') +
            (info.comboStatus.int !== 0 ? `\nINT: ${info.comboStatus.int}` : '') +
            (info.comboStatus.spd !== 0 ? `\nSPD: ${info.comboStatus.spd}` : '') +
            (info.comboStatus.vit !== 0 ? `\nVIT: ${info.comboStatus.vit}` : '') +
            (info.comboStatus.luk !== 0 ? `\nLUK: ${info.comboStatus.luk}` : '') +
            (info.comboStatus.atk !== 0 ? `\nATK: ${info.comboStatus.atk}` : '') +
            (info.comboStatus.def !== 0 ? `\nDEF: ${info.comboStatus.def}` : '') +
            (info.comboStatus.mat !== 0 ? `\nMAT: ${info.comboStatus.mat}` : '') +
            (info.comboStatus.mdf !== 0 ? `\nMDF: ${info.comboStatus.mdf}` : '') +
            (info.comboStatus.hp !== 0 ? `\nHP: ${info.comboStatus.hp}` : '') +
            (info.comboStatus.sp !== 0 ? `\nSP: ${info.comboStatus.sp}` : '') +
            (info.comboStatus.hpr !== 0 ? `\nHPR: ${info.comboStatus.hpr}` : '') +
            (info.comboStatus.spr !== 0 ? `\nSPR: ${info.comboStatus.spr}` : '') +
            (info.comboStatus.drn !== 0 ? `\nDRN: ${info.comboStatus.drn}` : '') +
            (info.comboStatus.mov !== 0 ? `\nMOV: ${info.comboStatus.mov}` : '') +
            (info.comboStatus.pet !== 0 ? `\nPET: ${info.comboStatus.pet}` : '') +
            (info.comboStatus.exp !== 0 ? `\nEXP: ${info.comboStatus.exp}` : '');
        alert(statusDetails);
    };

    return (
        <div className="set-effect-view">
            <h2 className="set-effect-title">セット効果一覧</h2>
            <ul className="set-effect-list">
                {viewComboEffectInfos.length === 0 ? (
                    <li className="set-effect-item">なし</li>
                ) : (
                    viewComboEffectInfos.map((info, index) => (
                        <li key={index} className="set-effect-item" onClick={() => handleItemClick(info)}>
                            {info.comboText}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SetEffectViewComponent;
