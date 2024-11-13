import React, { useState } from 'react';
import { Category, Equipment, EquipmentInstance } from '../../types/types';

const categories: Category[] = ["武器", "頭", "服", "首", "手", "盾", "背", "足"];

interface WarehouseComponentProps {
  equipmentMaster: Equipment[];
  equipmentInstances: EquipmentInstance[];
  loadWarehouse: (loadPath: string) => void;
  writeWarehouse: (savePath: string) => void;
}

const WarehouseComponent: React.FC<WarehouseComponentProps> = ({ equipmentMaster, equipmentInstances, loadWarehouse, writeWarehouse }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("武器");
  const [savePath, setSavePath] = useState<string>('');

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleFileSelect = async () => {
    const filePaths = await window.ipcRenderer.invoke('show-open-dialog');
    if (filePaths.length > 0) {
      const filePath = filePaths[0];
      loadWarehouse(filePath);
      setSavePath(filePath);
    }
  };

  const handleSaveButtonClick = async () => {
    const filePath = await window.ipcRenderer.invoke('show-save-dialog',savePath);
    if (filePath) {
      setSavePath(filePath);
      writeWarehouse(filePath);
    } else {
      alert(filePath);
    }
  };
  const handleEmptySlotClick = () => {
    console.log("空き");
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
            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="warehouse-cards">
        {equipmentInstances
          .filter((equipment) => equipmentMaster.some(master => master.id === equipment.id && master.category === selectedCategory))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((equipment) => (
            <div key={equipment.id} className="warehouse-card">
              <p>{equipment.name}</p>
              <button onClick={() => handleDeleteButtonClick(equipment)}>削除</button>
            </div>
          ))}
        <div className="warehouse-card">
          <p>空き</p>
          <button onClick={handleEmptySlotClick}>追加</button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseComponent