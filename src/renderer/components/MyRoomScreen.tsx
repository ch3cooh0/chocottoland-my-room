import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Equipment} from '../../types/global';

const MyRoomScreen = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
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
      <h1>This is Another Screen</h1>
      <Link to="/">
        <button>Back to Menu</button>
      </Link>
      <h1>Equipment List</h1>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>{equipment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyRoomScreen;
