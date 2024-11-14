import React, { useState, useEffect, useCallback } from "react";
import { EquipmentInstance, Category, Equipment } from "../../types/types";

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

interface SearchEquipmentComponentProps {
  equipmentInstances: EquipmentInstance[];
  setEquipmentInstances: (equipmentInstances: EquipmentInstance[]) => void;
  fixCategory: Category;
  handleCloseSearchModal: () => void;
}

const SearchEquipmentComponent: React.FC<SearchEquipmentComponentProps> = ({
  equipmentInstances,
  setEquipmentInstances,
  fixCategory,
  handleCloseSearchModal,
}) => {
  const [searchName, setSearchName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">(
    fixCategory
  );
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredAndSortedEquipments, setFilteredAndSortedEquipments] =
    useState<Equipment[]>([]);

  const handleSearchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value as Category);
  };

  const handleSortKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value);
  };

  const handleSelectEquipment = async (equipment: Equipment) => {
    const equipmentInstance = await window.ipcRenderer.invoke(
      "convertEquipmentToEquipmentInstance",
      equipment
    );
    setEquipmentInstances([...equipmentInstances, equipmentInstance]);
    handleCloseSearchModal();
  };

  const searchEquipment = useCallback(async () => {
    const equipments = await window.ipcRenderer.invoke(
      "searchEquipment",
      selectedCategory,
      searchName,
      sortKey,
      sortOrder
    );
    setFilteredAndSortedEquipments(equipments);
  }, [selectedCategory, searchName, sortKey, sortOrder]);

  useEffect(() => {
    searchEquipment();
  }, [selectedCategory, searchName, sortKey, sortOrder, searchEquipment]);

  return (
    <div className="search-equipment">
      <div className="search-area">
        <input
          type="text"
          placeholder="装備名で検索"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">全ての部位</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={sortKey} onChange={handleSortKeyChange}>
          <option value="">ソートなし</option>
          <option value="pow">pow</option>
          <option value="int">int</option>
          <option value="spd">spd</option>
          <option value="vit">vit</option>
          <option value="luk">luk</option>
          <option value="hp">hp</option>
          <option value="sp">sp</option>
          <option value="atk">atk</option>
          <option value="def">def</option>
          <option value="mat">mat</option>
          <option value="mdf">mdf</option>
          <option value="hpr">hpr</option>
          <option value="spr">spr</option>
          <option value="exp">exp</option>
          <option value="pet">pet</option>
          <option value="mov">mov</option>
          <option value="drn">drn</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "昇順" : "降順"}
        </button>
      </div>
      <div
        className="result-area"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {filteredAndSortedEquipments.map((equipment) => (
          <div
            key={equipment.id}
            className="equipment-card"
            onClick={() => handleSelectEquipment(equipment)}
          >
            <p className="equipment-name">{equipment.name}</p>
            <div className="equipment-status">
              <div className="equipment-status-item">
                <p className="equipment-status-key">pow</p>
                <p className="equipment-status-value">{equipment.pow}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">int</p>
                <p className="equipment-status-value">{equipment.int}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">spd</p>
                <p className="equipment-status-value">{equipment.spd}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">vit</p>
                <p className="equipment-status-value">{equipment.vit}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">luk</p>
                <p className="equipment-status-value">{equipment.luk}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">hp</p>
                <p className="equipment-status-value">{equipment.hp}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">sp</p>
                <p className="equipment-status-value">{equipment.sp}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">atk</p>
                <p className="equipment-status-value">{equipment.atk}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">def</p>
                <p className="equipment-status-value">{equipment.def}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">mat</p>
                <p className="equipment-status-value">{equipment.mat}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">mdf</p>
                <p className="equipment-status-value">{equipment.mdf}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">hpr</p>
                <p className="equipment-status-value">{equipment.hpr}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">spr</p>
                <p className="equipment-status-value">{equipment.spr}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">exp</p>
                <p className="equipment-status-value">{equipment.exp}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">pet</p>
                <p className="equipment-status-value">{equipment.pet}</p>
              </div>
              <div className="equipment-status-item">
                <p className="equipment-status-key">mov</p>
                <p className="equipment-status-value">{equipment.mov}</p>
              </div>
              {/* <div className="equipment-status-item">
                <p className="equipment-status-key">drn</p>
                <p className="equipment-status-value">{equipment.drn}</p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEquipmentComponent;
