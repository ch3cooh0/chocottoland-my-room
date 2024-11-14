import { useState } from 'react'
import './App.css'
import { AvatarStatus, CharacterStatus, EquipmentInstance, EquipmentSimple } from '../types/types';
import WarehouseComponent from './components/WarehouseComponent';
import StatusViewComponent from './components/StatusViewComponent';
import { EquipmentDTO } from '../electron/modules/dto';

function App() {
  /**
   * 倉庫関連
   */
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
  /**
   * キャラクターステータス画面
   */
  // キャラクターステータス
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>({
    lv: 99,
    hp: 0,
    sp: 0,
    pow: 0,
    int: 0,
    vit: 0,
    spd: 0,
    luk: 0,
  });
  // アバターステータス
  const [avatarStatus, setAvatarStatus] = useState<AvatarStatus>({
    hp: 0,
    sp: 0,
    atk: 0,
    def: 0,
    mat: 0,
    mdf: 0,
    hpr: 0,
    spr: 0,
    exp: 0,
    pet: 0,
    mov: 0,
    drn: 0,
    pow: 0,
    int: 0,
    vit: 0,
    spd: 0,
    luk: 0,
  }); 
  return (
    <>
      <h1>Chocottoland Optimizer</h1>
      <WarehouseComponent equipmentInstances={equipmentInstances} loadWarehouse={loadWarehouse} writeWarehouse={writeWarehouse} setEquipmentInstances={setEquipmentInstances} />
      <StatusViewComponent characterStatus={characterStatus} avatarStatus={avatarStatus} setCharacterStatus={setCharacterStatus} setAvatarStatus={setAvatarStatus} />
    </>
  )
}

export default App
