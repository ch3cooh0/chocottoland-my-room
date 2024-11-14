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
}

const CharacterEquippedComponent: React.FC<CharacterEquippedComponentProps> = ({
  equipmentInstances,
  characterMainEquipment,
  characterSubEquipment,
  setCharacterMainEquipment,
  setCharacterSubEquipment,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<{
    [key in Category]?: EquipmentInstance;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // モーダルの状態を管理

  const handleSelectEquipment = (
    category: Category,
    equipment: EquipmentInstance
  ) => {
    setSelectedEquipment((prevState) => ({
      ...prevState,
      [category]: equipment,
    }));
    setCharacterMainEquipment({
      ...selectedEquipment,
      [category]: equipment,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>キャラクター装備</h2>
      <div className="character-equipped-component">
        <div className="character-equipped-component-main">
          <h3>メイン装備</h3>
          <CharacterEquippedComponentItem
            category="武器"
            viewCategory="武"
            equipmentInstances={equipmentInstances}
            characterEquipment={characterMainEquipment}
            setCharacterEquipment={setCharacterMainEquipment}
            handleOpenModal={handleOpenModal} // モーダルを開く関数を渡す
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
            handleOpenModal={handleOpenModal} // モーダルを開く関数を渡す
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseModal}>閉じる</button>
            <SelectEquipmentComponent
              equipmentInstances={equipmentInstances}
              fixCategory="武器" // 例として固定カテゴリを渡す
              setCharacterEquipment={setCharacterMainEquipment}
              handleCloseSearchModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface CharacterEquippedComponentItemProps {
  category: Category;
  viewCategory: string;
  equipmentInstances: EquipmentInstance[];
  characterEquipment: { [key in Category]?: EquipmentInstance };
  setCharacterEquipment: (equipment: {
    [key in Category]?: EquipmentInstance;
  }) => void;
  handleOpenModal: () => void; // モーダルを開く関数を受け取る
}

const CharacterEquippedComponentItem: React.FC<
  CharacterEquippedComponentItemProps
> = ({
  category,
  viewCategory,
  equipmentInstances,
  characterEquipment,
  setCharacterEquipment,
  handleOpenModal,
}) => {
  const handleSelectEquipment = (equipmentInstances: EquipmentInstance[]) => {
    setCharacterEquipment({
      ...characterEquipment,
      [category]: null,
    });
  };
  const handleDeleteEquipment = (category: Category) => {
    setCharacterEquipment({
      ...characterEquipment,
      [category]: null,
    });
  };
  return (
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
  );
};

export default CharacterEquippedComponent;
