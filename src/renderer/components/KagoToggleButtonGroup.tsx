import React from 'react';
import './KagoToggleButtonGroup.css';

interface KagoToggleButtonGroupProps {
    kagoType: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛'|null;
    handleToggleChange: (type: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛') => void;
}

const KagoToggleButtonGroup: React.FC<KagoToggleButtonGroupProps> = ({ kagoType, handleToggleChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>加護</h3>
            {['大天使の加護', '妖精王の祝福物理', '妖精王の祝福魔法', '明王の鼓舞陽', '明王の守護陰', '祝福の蒼盾', '邪神の呪詛'].map((type, index) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ width: '10em',marginTop:'5px',marginBottom:'5px'}}>{type}</p>
                    <div className="toggle-switch">
                        <input
                            type="checkbox"
                            id={`toggle-${type}`}
                            checked={kagoType === type}
                            onChange={() => handleToggleChange(type as '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛')}
                        />
                        <label htmlFor={`toggle-${type}`} className="toggle-label">
                            <span className="toggle-inner" />
                            <span className="toggle-switch" />
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default KagoToggleButtonGroup;
