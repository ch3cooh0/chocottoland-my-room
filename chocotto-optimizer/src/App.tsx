import { useState, useEffect } from "react";
import "./App.css";
import {
  AvatarStatus,
  CharacterStatus,
  EquipmentInstance,
  EquipmentSimple,
  Equipped,
  TotalStatus,
} from "../types/types";
import { ZeroStatus } from "../electron/modules/utiles";
import WarehouseComponent from "./components/WarehouseComponent";
import StatusViewComponent from "./components/StatusViewComponent";
import { EquipmentDTO } from "../electron/modules/dto";
import CharacterEquippedComponent from "./components/CharacterEquippedComponent";
import StatusComponent from "./components/StatusComponent";

function App() {
  /**
   * 倉庫関連
   */
  // 倉庫
  const [equipmentInstances, setEquipmentInstances] = useState<
    EquipmentInstance[]
  >([]);
  // 倉庫読込
  const loadWarehouse = async (loadPath: string) => {
    const loadedEquipments: EquipmentSimple[] = await window.ipcRenderer.invoke(
      "loadEquipmentSimpleFromJSON",
      loadPath
    );
    const convertedEquipments = await window.ipcRenderer.invoke(
      "convertEquipmentSimplesToEquipmentInstances",
      loadedEquipments
    );
    setEquipmentInstances(convertedEquipments);
  };
  // 倉庫保存
  const writeWarehouse = async (savePath: string) => {
    const savedEquipments =
      EquipmentDTO.convertEquipmentInstancesToEquipmentSimples(
        equipmentInstances
      );
    await window.ipcRenderer.invoke(
      "writeEquipmentSimpleToJSON",
      savePath,
      savedEquipments
    );
  };
  /**
   * キャラクターステータス画面
   */
  // キャラクターステータス
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(ZeroStatus.zeroCharacterStatus());
  // アバターステータス
  const [avatarStatus, setAvatarStatus] = useState<AvatarStatus>(ZeroStatus.zeroAvatarStatus());
  /**
   * キャラクター装備
   */
  const [characterMainEquipment, setCharacterMainEquipment] = useState<Equipped>({});
  const [characterSubEquipment, setCharacterSubEquipment] = useState<Equipped>({});
  /**
   * 計算後のステータス
   */
  const [totalStatus, setTotalStatus] = useState<TotalStatus>(ZeroStatus.zeroTotalStatus());

  useEffect(() => {
    const calcTotalStatus = async () => {
      const totalStatus = await window.ipcRenderer.invoke('calcTotalStatus', characterMainEquipment, characterSubEquipment, characterStatus, avatarStatus);
      setTotalStatus(totalStatus);
    };
    calcTotalStatus();
  }, [characterMainEquipment, characterSubEquipment, characterStatus, avatarStatus]);
  /**
   * メイン画面
   */
  return (
    <>
      <h1>Chocottoland Optimizer</h1>
      <WarehouseComponent
        equipmentInstances={equipmentInstances}
        loadWarehouse={loadWarehouse}
        writeWarehouse={writeWarehouse}
        setEquipmentInstances={setEquipmentInstances}
      />
      <StatusViewComponent
        characterStatus={characterStatus}
        avatarStatus={avatarStatus}
        setCharacterStatus={setCharacterStatus}
        setAvatarStatus={setAvatarStatus}
      />
      <CharacterEquippedComponent
        equipmentInstances={equipmentInstances}
        characterMainEquipment={characterMainEquipment}
        characterSubEquipment={characterSubEquipment}
        setCharacterMainEquipment={setCharacterMainEquipment}
        setCharacterSubEquipment={setCharacterSubEquipment}
      />
      <StatusComponent totalStatus={totalStatus} />
    </>
  );
}

export default App;
