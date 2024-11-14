import React, { useState } from "react";
import {
  Category,
  Core,
  EquipmentInstance,
  StatusKey,
} from "../../types/types";
import SearchEquipmentComponent from "./SearchEquipmentComponent";
import EquipmentDetailComponent from "./EquipmentDetailComponent";
const categories: Category[] = [
  "武器",
  "頭",
  "服",
  "首",
  "手",
  "盾",
  "背",
  "靴",
];

interface WarehouseComponentProps {
  equipmentInstances: EquipmentInstance[];
  loadWarehouse: (loadPath: string) => void;
  writeWarehouse: (savePath: string) => void;
  setEquipmentInstances: (equipmentInstances: EquipmentInstance[]) => void;
}

const WarehouseComponent: React.FC<WarehouseComponentProps> = ({
  equipmentInstances,
  loadWarehouse,
  writeWarehouse,
  setEquipmentInstances,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("武器");
  const [savePath, setSavePath] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentInstance | null>(null);
  // モーダル管理
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleOpenDetailModal = (equipment: EquipmentInstance) => {
    setSelectedEquipment(equipment);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleApplyCore = (equipmentInstance: EquipmentInstance) => {
    setEquipmentInstances(
      equipmentInstances.map((equipment) =>
        equipment.id === equipmentInstance.id
          ? {
              ...equipment,
              core: equipmentInstance.core,
              reinforceLevel: equipmentInstance.reinforceLevel,
            }
          : equipment
      )
    );
    setIsDetailModalOpen(false);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  /**
   * ファイル読込
   */
  const handleFileSelect = async () => {
    const filePaths = await window.ipcRenderer.invoke("show-open-dialog");
    if (filePaths.length > 0) {
      const filePath = filePaths[0];
      loadWarehouse(filePath);
      setSavePath(filePath);
    }
  };

  /**
   * ファイル保存
   */
  const handleSaveButtonClick = async () => {
    const filePath = await window.ipcRenderer.invoke(
      "show-save-dialog",
      savePath
    );
    if (filePath) {
      setSavePath(filePath);
      writeWarehouse(filePath);
    } else {
      alert(filePath);
    }
  };

  /**
   * 装備削除
   */
  const handleDeleteButtonClick = (equipment: EquipmentInstance) => {
    setEquipmentInstances(
      equipmentInstances.filter((instance) => instance.id !== equipment.id)
    );
  };

  const createCoreEnhancement = (core: Core): string => {
    const firstCoreStatusKey = Object.keys(core[1])[0];
    const firstCoreValue = core[1][firstCoreStatusKey as unknown as StatusKey];
    const secondCoreStatusKey = Object.keys(core[2])[0];
    const secondCoreValue =
      core[2][secondCoreStatusKey as unknown as StatusKey];
    const thirdCoreStatusKey = Object.keys(core[3])[0];
    const thirdCoreValue = core[3][thirdCoreStatusKey as unknown as StatusKey];
    return `${
      firstCoreStatusKey ? `${firstCoreStatusKey}:${firstCoreValue}` : ""
    } ${
      secondCoreStatusKey ? `${secondCoreStatusKey}:${secondCoreValue}` : ""
    } ${thirdCoreStatusKey ? `${thirdCoreStatusKey}:${thirdCoreValue}` : ""}`;
  };

  return (
    <div className="warehouse">
      <h2>倉庫</h2>
      <div>
        <button onClick={handleFileSelect}>読込</button>
        <button onClick={handleSaveButtonClick}>保存</button>
      </div>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`category-button ${
              selectedCategory === category ? "selected" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="warehouse-cards">
        {equipmentInstances
          .filter((equipment) => equipment.category === selectedCategory)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((equipment) => (
            <div key={equipment.id} className="warehouse-card">
              <p>
                {equipment.name}:錬成 {equipment.reinforceLevel} 特殊コア{" "}
                {createCoreEnhancement(equipment.core)}
              </p>
              <button onClick={() => handleOpenDetailModal(equipment)}>
                詳細
              </button>
              <button onClick={() => handleDeleteButtonClick(equipment)}>
                削除
              </button>
            </div>
          ))}
        <div className="warehouse-card">
          <p>空き</p>
          <button onClick={handleOpenSearchModal}>追加</button>
        </div>
      </div>
      {isSearchModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseSearchModal}>閉じる</button>
            <SearchEquipmentComponent
              equipmentInstances={equipmentInstances}
              setEquipmentInstances={setEquipmentInstances}
              fixCategory={selectedCategory}
              handleCloseSearchModal={handleCloseSearchModal}
            />
          </div>
        </div>
      )}
      {isDetailModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <EquipmentDetailComponent
              equipmentInstance={selectedEquipment}
              handleCloseDetailModal={handleCloseDetailModal}
              handleApplyCore={handleApplyCore}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseComponent;
