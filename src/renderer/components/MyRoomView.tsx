import React from 'react';
import { Link } from 'react-router-dom';
import EquipmentSearchModal from './EquipmentSearchModal';
import EquipmentSelection from './EquipmentSelection';
import TotalStatsDisplay from './TotalStatsDisplay';
import { Equipment, Status } from '../../types/global';

interface MyRoomViewProps {
    selectedMainEquipments: { [key: string]: Equipment | null };
    selectedSubEquipments: { [key: string]: Equipment | null };
    openModal: (category: string, type: 'main' | 'sub') => void;
    clearSelectedMainEquipment: (category: string) => void;
    clearSelectedSubEquipment: (category: string) => void;
    totalEquipmentStats: Status;
    modalIsOpen: boolean;
    closeModal: () => void;
    selectedCategory: string | null;
    equipmentList: Equipment[];
    handleMainEquipmentSelect: (equipment: Equipment) => void;
    handleSubEquipmentSelect: (equipment: Equipment) => void;
    selectMainOrSub: 'main' | 'sub';
}

const MyRoomView: React.FC<MyRoomViewProps> = ({
    selectedMainEquipments,
    selectedSubEquipments,
    openModal,
    clearSelectedMainEquipment,
    clearSelectedSubEquipment,
    totalEquipmentStats,
    modalIsOpen,
    closeModal,
    selectedCategory,
    equipmentList,
    handleMainEquipmentSelect,
    handleSubEquipmentSelect,
    selectMainOrSub,
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '10px' }}>
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
            <TotalStatsDisplay totalStats={totalEquipmentStats} />
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