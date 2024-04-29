import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentSearchModal from './EquipmentSearchModal';
import { Equipment} from '../../types/global';

const MyRoomScreen: React.FC = () => {
  const [equipmentList, setEquipments] = useState<Equipment[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
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
      <button className="button" onClick={openModal}>Search Equipment</button>
      <EquipmentSearchModal isOpen={modalIsOpen} onRequestClose={closeModal} category='武器' equipmentList={equipmentList} />
      <Link to="/">
        <button className="button">Back to Menu</button>
      </Link>
    </div>
  );
};

export default MyRoomScreen;
