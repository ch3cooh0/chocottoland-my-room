import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentSearchModal from './EquipmentSearchModal';
import EquipmentSelection from './EquipmentSelection';
import BaseStatsDisplay from './BaseStatsDisplay';
import KagoToggleButtonGroup from './KagoToggleButtonGroup';
import HPSPStats from './HPSPStats';
import EXStats from './EXStats';
import { Equipment, BaseStatus, ComboStatus, ComboEquipment } from '../../types/global';

interface MyRoomViewProps {
    selectedMainEquipments: { [key: string]: Equipment | null };
    selectedSubEquipments: { [key: string]: Equipment | null };
    openModal: (category: string, type: 'main' | 'sub') => void;
    clearSelectedMainEquipment: (category: string) => void;
    clearSelectedSubEquipment: (category: string) => void;
    modalIsOpen: boolean;
    closeModal: () => void;
    selectedCategory: string | null;
    equipmentList: Equipment[];
    comboStatusList: ComboStatus[];
    comboEquipmentList: ComboEquipment[];
    handleMainEquipmentSelect: (equipment: Equipment) => void;
    handleSubEquipmentSelect: (equipment: Equipment) => void;
    selectMainOrSub: 'main' | 'sub';
    kagoType: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛' | null;
    handleToggleChange: (type: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛') => void;
    baseStatus: BaseStatus;
    displayStatus: BaseStatus;
}

const MyRoomView: React.FC<MyRoomViewProps> = ({
    selectedMainEquipments,
    selectedSubEquipments,
    openModal,
    clearSelectedMainEquipment,
    clearSelectedSubEquipment,
    modalIsOpen,
    closeModal,
    selectedCategory,
    equipmentList,
    comboStatusList,
    comboEquipmentList,
    handleMainEquipmentSelect,
    handleSubEquipmentSelect,
    selectMainOrSub,
    kagoType,
    handleToggleChange,
    baseStatus,
    displayStatus,
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '400px' }}>
            <h1>My Room</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
                <EquipmentSelection
                    equipments={selectedMainEquipments}
                    openModal={openModal}
                    clearEquipment={clearSelectedMainEquipment}
                    onSelect={handleMainEquipmentSelect}
                    type="main"
                />
                <EquipmentSelection
                    equipments={selectedSubEquipments}
                    openModal={openModal}
                    clearEquipment={clearSelectedSubEquipment}
                    onSelect={handleSubEquipmentSelect}
                    type="sub"
                />
            </div>
            <BaseStatsDisplay baseStatus={baseStatus} displayStatus={displayStatus} />
            <HPSPStats label="HP" value={100} />
            <HPSPStats label="SP" value={100} />
            <EXStats label="EXP" value={100} />
            <KagoToggleButtonGroup
                kagoType={kagoType}
                handleToggleChange={handleToggleChange}
            />
            <EquipmentSearchModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                category={selectedCategory}
                equipmentList={equipmentList}
                onSelect={selectMainOrSub === 'main' ? handleMainEquipmentSelect : handleSubEquipmentSelect}
            />
            <Link to="/">
                <button className="button">Back to Menu</button>
            </Link>
        </div>
    );
};

export default MyRoomView;