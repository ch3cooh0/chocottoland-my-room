import React from 'react';
import { Equipment } from "../../types/global";
import './EquipmentCard.css';

interface Props {
    equipment: Equipment;
}

const EquipmentCard: React.FC<Props> = ({ equipment }) => {
    //console.log(equipment)
    return (
        <div className="equipment-card">
            <h4>{equipment.name}</h4>
            <p>{equipment.text}</p>
            <div className="status-grid">
                {equipment.status && Object.entries(equipment.status).map(([key, value]) => (
                    <div key={key} className="status-item">
                        <strong>{key.toUpperCase()}: </strong>{value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentCard;
