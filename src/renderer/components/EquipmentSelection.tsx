import React from 'react';
import { Equipment } from '../../types/global';

interface EquipmentSelectionProps {
    equipments: { [key: string]: Equipment | null };
    openModal: (category: string, type: 'main' | 'sub') => void;
    clearEquipment: (category: string) => void;
    onSelect: (equipment: Equipment) => void;
    type: 'main' | 'sub';
}

const EquipmentSelection: React.FC<EquipmentSelectionProps> = ({
    equipments,
    openModal,
    clearEquipment,
    type
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {Object.keys(equipments).map((category) => (
                <div key={category} style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                    <input
                        type="text"
                        className="text-box"
                        value={equipments[category]?.name ?? category}
                        onClick={() => openModal(category, type)}
                        readOnly
                        style={{ 
                            height: '100%', 
                            verticalAlign: 'middle', 
                            margin: 0, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            fontSize: `calc(10px + 0.5vw)` // 文字サイズを動的に変更
                        }}
                    />
                    <button 
                        onClick={() => clearEquipment(category)} 
                        style={{ width: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <span role="img" aria-label="trash">🗑️</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EquipmentSelection;