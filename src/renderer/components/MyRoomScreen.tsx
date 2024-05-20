import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentSearchModal from './EquipmentSearchModal';
import { Equipment } from '../../types/global';

const MyRoomScreen: React.FC = () => {
  const [equipmentList, setEquipments] = useState<Equipment[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEquipments, setSelectedEquipments] = useState<{ [key: string]: Equipment | null }>({
    武器: null,
    盾: null,
    頭: null,
    背: null,
    靴: null,
    手: null,
    首: null,
    服: null,
  });
  const openModal = (category: string) => {
    setSelectedCategory(category);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  const handleEquipmentSelect = (equipment: Equipment) => {
    if (selectedCategory) {
      setSelectedEquipments((prev) => ({
        ...prev,
        [selectedCategory]: equipment,
      }));
      closeModal();
    }
  };

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

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>My Room</h1>
      {Object.keys(selectedEquipments).map((category) => (
        <div key={category}>
          <input
            type="text"
            className="text-box"
            value={
              selectedEquipments[category]?.name ?? category
            }
            onClick={() => openModal(category)}
            readOnly
          />
        </div>
      ))}
      <EquipmentSearchModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        category={selectedCategory}
        equipmentList={equipmentList}
        onSelect={handleEquipmentSelect}
      />
      <Link to="/">
        <button className="button">Back to Menu</button>
      </Link>
    </div>
  );
};

export default MyRoomScreen;