import React from 'react';

interface SetEffectViewComponentProps {
    comboTexts: string[];
}

const SetEffectViewComponent: React.FC<SetEffectViewComponentProps> = ({ comboTexts = []}) => {
    return (
        <div className="set-effect-view">
            <h2 className="set-effect-title">セット効果一覧</h2>
            <ul className="set-effect-list">
                {comboTexts.length === 0 ? (
                    <li className="set-effect-item">なし</li>
                ) : (
                    comboTexts.map((text, index) => (
                        <li key={index} className="set-effect-item">{text}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SetEffectViewComponent;
