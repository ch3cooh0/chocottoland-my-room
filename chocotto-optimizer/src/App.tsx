import { useState } from 'react'
import './App.css'
import { EquipmentInstance, EquipmentSimple } from '../types/types';
import WarehouseComponent from './components/WarehouseComponent';
import { EquipmentDTO } from '../electron/modules/dto';

function App() {
  // 倉庫
  const [equipmentInstances, setEquipmentInstances] = useState<EquipmentInstance[]>([]);
  // 倉庫読込
  const loadWarehouse = async (loadPath: string) => {
    const loadedEquipments: EquipmentSimple[] = await window.ipcRenderer.invoke('loadEquipmentSimpleFromJSON', loadPath);
    const convertedEquipments = await window.ipcRenderer.invoke('convertEquipmentSimplesToEquipmentInstances', loadedEquipments);
    setEquipmentInstances(convertedEquipments);
  };
  // 倉庫保存
  const writeWarehouse = async (savePath: string) => {
    const savedEquipments = EquipmentDTO.convertEquipmentInstancesToEquipmentSimples(equipmentInstances);
    await window.ipcRenderer.invoke('writeEquipmentSimpleToJSON', savePath, savedEquipments);
  };
  return (
    <>
      <h1>Chocottoland Optimizer</h1>
      <WarehouseComponent equipmentInstances={equipmentInstances} loadWarehouse={loadWarehouse} writeWarehouse={writeWarehouse} setEquipmentInstances={setEquipmentInstances} />
    </>
  )
}

export default App
