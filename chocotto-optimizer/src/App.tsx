import { useEffect, useState } from 'react'
import './App.css'
import { Equipment } from '../types/types';

function App() {
  const [equipmentMaster, setEquipmentMaster] = useState<Equipment[]>([]);
  const loadEquipmentMaster = async () => {
    const equipments = await window.ipcRenderer.invoke('loadEquipmentFromCSV', './data/equipments.csv');
    setEquipmentMaster(equipments);
  }
  useEffect(() => {
    loadEquipmentMaster();
  }, []);
  return (
    <>
      <h1>Chocottoland Optimizer</h1>
      <div>
        {equipmentMaster.map((equipment) => (
          <div key={equipment.id}>{equipment.name}</div>
        ))}
      </div>
    </>
  )
}

export default App
