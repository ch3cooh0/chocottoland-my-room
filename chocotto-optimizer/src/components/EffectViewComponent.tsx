import React from 'react';
import { ViewEffectInfo } from '../../types/types';

interface EffectViewComponentProps {
    viewEffectInfos: ViewEffectInfo[];
}

const EffectViewComponent: React.FC<EffectViewComponentProps> = ({ viewEffectInfos = [] }) => {
    return (
        <div className="effect-view">
            <h2 className="effect-title">装備効果一覧</h2>
            <ul className="effect-list">
                {viewEffectInfos.length === 0 ? (
                    <li className="effect-item">なし</li>
                ) : (
                    viewEffectInfos.map((info, index) => (
                        <li key={index} className="effect-item">{info.equipmentName} {info.effectText}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default EffectViewComponent;
