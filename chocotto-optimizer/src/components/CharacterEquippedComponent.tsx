import React, { useState } from "react";
import { EquipmentInstance } from "../../types/types";
import SelectEquipmentComponent from "./SelectEquipmentComponent"; // SelectEquipmentComponentをインポート

type Category = "武器" | "頭" | "服" | "首" | "手" | "盾" | "背" | "靴";

interface CharacterEquippedComponentProps {
  equipmentInstances: EquipmentInstance[];
  characterMainEquipment: { [key in Category]?: EquipmentInstance };
  characterSubEquipment: { [key in Category]?: EquipmentInstance };
  setCharacterMainEquipment: (equipment: {
    [key in Category]?: EquipmentInstance;
  }) => void;
  setCharacterSubEquipment: (equipment: {
    [key in Category]?: EquipmentInstance;
  }) => void;
  loadMannequin: (filePath: string) => void;
  saveMannequin: (filePath: string) => void;
}

const CharacterEquippedComponent: React.FC<CharacterEquippedComponentProps> = ({
  equipmentInstances,
  characterMainEquipment,
  characterSubEquipment,
  setCharacterMainEquipment,
  setCharacterSubEquipment,
  loadMannequin,
  saveMannequin,
}) => {
  const [mannequinSavePath, setMannequinSavePath] = useState<string>("");
  const handleMannequinLoad = async () =>{
    const filePaths = await window.ipcRenderer.invoke(
      "show-open-dialog",
      "mannequin.json"
    );
    if (filePaths.length > 0) {
      const filePath = filePaths[0];
      loadMannequin(filePath);
      setMannequinSavePath(filePath);
    }
  }
  const handleMannequinSave = async () => {
    const filePath = await window.ipcRenderer.invoke(
      "show-save-dialog",
      mannequinSavePath,
      "mannequin.json"
    );
    if (filePath) {
      setMannequinSavePath(filePath);
      saveMannequin(filePath);
    }
  }
  return (
    <div>
      <h2>キャラクター装備</h2>
      <button onClick={handleMannequinLoad}>マネキン読込</button>
      <button onClick={handleMannequinSave}>マネキン保存</button>
      <div className="character-equipped-component">
        <div className="character-equipped-component-main">
          <h3>メイン装備</h3>
          <CharacterEquippedComponentItem
            category="武器"
            viewCategory="武"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.武器?.uuid}
          />
          <CharacterEquippedComponentItem
            category="頭"
            viewCategory="頭"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.頭?.uuid}
          />
          <CharacterEquippedComponentItem
            category="服"
            viewCategory="服"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.服?.uuid}
          />
          <CharacterEquippedComponentItem
            category="首"
            viewCategory="首"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.首?.uuid}
          />
          <CharacterEquippedComponentItem
            category="手"
            viewCategory="手"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.手?.uuid}
          />
          <CharacterEquippedComponentItem
            category="盾"
            viewCategory="盾"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.盾?.uuid}
          />
          <CharacterEquippedComponentItem
            category="背"
            viewCategory="背"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.背?.uuid}
          />
          <CharacterEquippedComponentItem
            category="靴"
            viewCategory="靴"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            equippedInstanceUUId={characterSubEquipment.靴?.uuid}
          />
        </div>
        <div className="character-equipped-component-sub">
          <h3>サブ装備</h3>
          <CharacterEquippedComponentItem
            category="武器"
            viewCategory="武"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.武器?.uuid}
          />
          <CharacterEquippedComponentItem
            category="頭"
            viewCategory="頭"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.頭?.uuid}
          />
          <CharacterEquippedComponentItem
            category="服"
            viewCategory="服"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.服?.uuid}
          />
          <CharacterEquippedComponentItem
            category="首"
            viewCategory="首"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.首?.uuid}
          />
          <CharacterEquippedComponentItem
            category="手"
            viewCategory="手"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.手?.uuid}
          />
          <CharacterEquippedComponentItem
            category="盾"
            viewCategory="盾"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.盾?.uuid}
          />
          <CharacterEquippedComponentItem
            category="背"
            viewCategory="背"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.背?.uuid}
          />
          <CharacterEquippedComponentItem
            category="靴"
            viewCategory="靴"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterSubEquipment}
            setCharacterEquipment={setCharacterSubEquipment}
            equippedInstanceUUId={characterMainEquipment.靴?.uuid}
          />
        </div>
      </div>
    </div>
  );
};

interface CharacterEquippedComponentItemProps {
  category: Category;
  viewCategory: string;
  equipmentInstances: EquipmentInstance[];
  characterEquipment: { [key in Category]?: EquipmentInstance };
  equippedInstanceUUId: string | undefined;
  setCharacterEquipment: (equipment: {
    [key in Category]?: EquipmentInstance;
  }) => void;
}

const CharacterEquippedComponentItem: React.FC<
  CharacterEquippedComponentItemProps
> = ({
  category,
  viewCategory,
  equipmentInstances,
  characterEquipment,
  equippedInstanceUUId,
  setCharacterEquipment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSelectEquipment = (equipmentInstance: EquipmentInstance) => {
    setCharacterEquipment({
      ...characterEquipment,
      [category]: equipmentInstance,
    });
  };
  const handleDeleteEquipment = (category: Category) => {
    setCharacterEquipment({
      ...characterEquipment,
      [category]: null,
    });
  };
  return (
    <>
      <div className="character-equipped-component-item">
        <label>{viewCategory}</label>
        <div
          className="character-equipped-component-item-select"
          onClick={handleOpenModal} // クリックでモーダルを開く
        >
          {characterEquipment[category]
            ? characterEquipment[category]?.name
            : "未装備"}
        </div>
        <button onClick={() => handleDeleteEquipment(category)}>
          <span role="img" aria-label="delete">
            🗑️
          </span>
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseModal}>閉じる</button>
            <SelectEquipmentComponent
              equipmentInstances={equipmentInstances}
              fixCategory={category}
              setCharacterEquipment={handleSelectEquipment}
              handleCloseSearchModal={handleCloseModal}
              equippedInstanceUUId={equippedInstanceUUId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterEquippedComponent;
