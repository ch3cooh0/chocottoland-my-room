import React, { useState } from "react";
import { Category, EquipmentInstance } from "../../types/types";
import SearchEquipmentComponent from "./SearchEquipmentComponent";

const categories: Category[] = [
  "武器",
  "頭",
  "服",
  "首",
  "手",
  "盾",
  "背",
  "足",
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
  // モーダル管理
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleFileSelect = async () => {
    const filePaths = await window.ipcRenderer.invoke("show-open-dialog");
    if (filePaths.length > 0) {
      const filePath = filePaths[0];
      loadWarehouse(filePath);
      setSavePath(filePath);
    }
  };

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
  const handleDeleteButtonClick = (equipment: EquipmentInstance) => {
    console.log("削除", equipment);
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
              <p>{equipment.name}</p>
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
    </div>
  );
};

export default WarehouseComponent;
