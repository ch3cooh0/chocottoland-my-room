import { useEffect, useState } from 'react'
import './App.css'
import { Equipment, EquipmentInstance, EquipmentSimple } from '../types/types';
import WarehouseComponent from './components/WarehouseComponent';
import { EquipmentDTO } from '../electron/modules/dto';

function App() {
  const [equipmentMaster, setEquipmentMaster] = useState<Equipment[]>([]);
  const [equipmentInstances, setEquipmentInstances] = useState<EquipmentInstance[]>([]);
  const loadEquipmentMaster = async () => {
    const equipments = await window.ipcRenderer.invoke('loadEquipmentFromCSV', './data/equipments.csv');
    setEquipmentMaster(equipments);
  }
  const loadWarehouse = async (loadPath: string) => {
    const loadedEquipments: EquipmentSimple[] = await window.ipcRenderer.invoke('loadEquipmentSimpleFromJSON', loadPath);
    const convertedEquipments = EquipmentDTO.convertEquipmentSimplesToEquipmentInstances(loadedEquipments, equipmentMaster);
    setEquipmentInstances(convertedEquipments);
    console.log(convertedEquipments);
  };
  const writeWarehouse = async (savePath: string) => {
    const savedEquipments = EquipmentDTO.convertEquipmentInstancesToEquipmentSimples(equipmentInstances);
    await window.ipcRenderer.invoke('writeEquipmentSimpleToJSON', savePath, savedEquipments);
  };
  useEffect(() => {
    loadEquipmentMaster();
  }, []);
  return (
    <>
      <h1>Chocottoland Optimizer</h1>
      <WarehouseComponent equipmentMaster={equipmentMaster} equipmentInstances={equipmentInstances} loadWarehouse={loadWarehouse} writeWarehouse={writeWarehouse} />
    </>
  )
}

export default App
