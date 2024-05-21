import { useEffect, useState } from 'react';
import { Equipment, Status } from '../../types/global';
import MyRoomView from './MyRoomView';



const MyRoomScreen: React.FC = () => {
  const [equipmentList, setEquipments] = useState<Equipment[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMainEquipments, setSelectedMainEquipments] = useState<{ [key: string]: Equipment | null }>({
    武器: null,
    盾: null,
    頭: null,
    背: null,
    靴: null,
    手: null,
    首: null,
    服: null,
  });
  const [selectedSubEquipments, setSelectedSubEquipments] = useState<{ [key: string]: Equipment | null }>({
    武器: null,
    盾: null,
    頭: null,
    背: null,
    靴: null,
    手: null,
    首: null,
    服: null,
  });
  const [selectMainOrSub, setSelectMainOrSub] = useState<'main' | 'sub'>('main');

  const openModal = (category: string, type: 'main' | 'sub') => {
    setSelectedCategory(category);
    setSelectMainOrSub(type);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  // 装備関連処理
  const handleMainEquipmentSelect = (equipment: Equipment) => {
    if (selectedCategory) {
      setSelectedMainEquipments((prev) => ({
        ...prev,
        [selectedCategory]: equipment,
      }));
      closeModal();
    }
  };

  const clearSelectedMainEquipment = (category: string) => {
    setSelectedMainEquipments((prev) => ({
      ...prev,
      [category]: null,
    }));
  };
  const handleSubEquipmentSelect = (equipment: Equipment) => {
    if (selectedCategory) {
      setSelectedSubEquipments((prev) => ({
        ...prev,
        [selectedCategory]: equipment,
      }));
      closeModal();
    }
  };

  const clearSelectedSubEquipment = (category: string) => {
    setSelectedSubEquipments((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  //////////////////////////////////////////////////
  useEffect(() => {
    window.electronAPI.loadEquipmentData();
    window.electronAPI.onDataLoaded((event, { data, error }) => {
      if (error) {
        console.error('Failed to load data:', error);
      } else {
        setEquipments(data);
      }
    });
  }, []);
  const calculateTotalEquipmentStats = () => {
    const totalEquipmentStats: Status = { pow: 0, int: 0, vit: 0, spd: 0, luk: 0, HP: 0, SP: 0, ATK: 0, DEF: 0, MAT: 0, MDF: 0, HPR: 0, SPR: 0, EXP: 0, PET: 0, MOV: 0, DRN: 0 };
    Object.values(selectedMainEquipments).forEach((equipment) => {
      if (equipment) {
        totalEquipmentStats.pow += equipment.status.pow || 0;
        totalEquipmentStats.int += equipment.status.int || 0;
        totalEquipmentStats.vit += equipment.status.vit || 0;
        totalEquipmentStats.spd += equipment.status.spd || 0;
        totalEquipmentStats.luk += equipment.status.luk || 0;
        totalEquipmentStats.HP += equipment.status.HP || 0;
        totalEquipmentStats.SP += equipment.status.SP || 0;
        totalEquipmentStats.ATK += equipment.status.ATK || 0;
        totalEquipmentStats.DEF += equipment.status.DEF || 0;
        totalEquipmentStats.MAT += equipment.status.MAT || 0;
        totalEquipmentStats.MDF += equipment.status.MDF || 0;
        totalEquipmentStats.HPR += equipment.status.HPR || 0;
        totalEquipmentStats.SPR += equipment.status.SPR || 0;
        totalEquipmentStats.EXP += equipment.status.EXP || 0;
        totalEquipmentStats.PET += equipment.status.PET || 0;
        totalEquipmentStats.MOV += equipment.status.MOV || 0;
        totalEquipmentStats.DRN += equipment.status.DRN || 0;
      }
    });
    Object.values(selectedSubEquipments).forEach((equipment) => {
      if (equipment) {
        totalEquipmentStats.pow += Math.ceil(equipment.status.pow / 2) || 0;
        totalEquipmentStats.int += Math.ceil(equipment.status.int / 2) || 0;
        totalEquipmentStats.vit += Math.ceil(equipment.status.vit / 2) || 0;
        totalEquipmentStats.spd += Math.ceil(equipment.status.spd / 2) || 0;
        totalEquipmentStats.luk += Math.ceil(equipment.status.luk / 2) || 0;
        totalEquipmentStats.HP += Math.ceil(equipment.status.HP / 2) || 0;
        totalEquipmentStats.SP += Math.ceil(equipment.status.SP / 2) || 0;
        totalEquipmentStats.ATK += Math.ceil(equipment.status.ATK / 2) || 0;
        totalEquipmentStats.DEF += Math.ceil(equipment.status.DEF / 2) || 0;
        totalEquipmentStats.MAT += Math.ceil(equipment.status.MAT / 2) || 0;
        totalEquipmentStats.MDF += Math.ceil(equipment.status.MDF / 2) || 0;
      }
    });
    return totalEquipmentStats;
  };
  const totalEquipmentStats = calculateTotalEquipmentStats();
  return (
    <MyRoomView
      selectedMainEquipments={selectedMainEquipments}
      selectedSubEquipments={selectedSubEquipments}
      openModal={openModal}
      clearSelectedMainEquipment={clearSelectedMainEquipment}
      clearSelectedSubEquipment={clearSelectedSubEquipment}
      totalEquipmentStats={totalEquipmentStats}
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      selectedCategory={selectedCategory}
      equipmentList={equipmentList}
      handleMainEquipmentSelect={handleMainEquipmentSelect}
      handleSubEquipmentSelect={handleSubEquipmentSelect}
      selectMainOrSub={selectMainOrSub}
    />
  );
};



export default MyRoomScreen;
