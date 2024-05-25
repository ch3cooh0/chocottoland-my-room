import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentSearchModal from './EquipmentSearchModal';
import EquipmentSelection from './EquipmentSelection';
import BaseStatsDisplay from './BaseStatsDisplay';
import KagoToggleButtonGroup from './KagoToggleButtonGroup';
import ExtendedStatsDisplay from './ExtendedStatsDisplay';

import { Equipment, BaseStatus, ExtendedStatus, CharaStatus } from '../../types/global';

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
    handleMainEquipmentSelect: (equipment: Equipment) => void;
    handleSubEquipmentSelect: (equipment: Equipment) => void;
    selectMainOrSub: 'main' | 'sub';
    kagoType: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛' | null;
    handleToggleChange: (type: '大天使の加護'|'妖精王の祝福物理'|'妖精王の祝福魔法'|'明王の鼓舞陽'|'明王の守護陰'|'祝福の蒼盾'|'邪神の呪詛') => void;
    baseStatus: BaseStatus;
    displayStatus: BaseStatus;
    extendedStatus: ExtendedStatus;
    calcDopingStatus: () => void;
    handleToggleChangeDoping: (type: 'ATK'|'DEF'|'MAT'|'MDF') => void;
    characterStatus: CharaStatus;
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
    handleMainEquipmentSelect,
    handleSubEquipmentSelect,
    selectMainOrSub,
    kagoType,
    handleToggleChange,
    baseStatus,
    displayStatus,
    extendedStatus,
    calcDopingStatus,
    handleToggleChangeDoping,
    characterStatus,
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '620px' }}>
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
            <BaseStatsDisplay baseStatus={baseStatus} displayStatus={displayStatus} characterStatus={characterStatus} />
            <ExtendedStatsDisplay extendedStatus={extendedStatus} />
            <KagoToggleButtonGroup
                kagoType={kagoType}
                handleToggleChange={handleToggleChange}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <label>
                    <input type="checkbox" onChange={() => handleToggleChangeDoping('ATK')} />
                    アターク
                </label>
                <label>
                    <input type="checkbox" onChange={() => handleToggleChangeDoping('DEF')} />
                    マモール
                </label>
                <label>
                    <input type="checkbox" onChange={() => handleToggleChangeDoping('MAT')} />
                    マホアタ
                </label>
                <label>
                    <input type="checkbox" onChange={() => handleToggleChangeDoping('MDF')} />
                    マホマモ
                </label>
            </div>
            <button onClick={calcDopingStatus} className="button">計算</button>
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