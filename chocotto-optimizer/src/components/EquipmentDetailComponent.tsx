import React, { useState } from "react";
import { Core, CoreNo, EquipmentInstance, Reinforce, ReinforceType, StatusKey } from "../../types/types";
import NumberInput from "./common/NumberInput";
import SelectComponent from "./common/SelectComponent";

interface EquipmentDetailComponentProps {
  equipmentInstance: EquipmentInstance | null;
  handleCloseDetailModal: () => void;
  handleApplyCore: (equipmentInstance: EquipmentInstance) => void;
}

const EquipmentDetailComponent: React.FC<EquipmentDetailComponentProps> = ({
  equipmentInstance,
  handleCloseDetailModal,
  handleApplyCore,
}) => {
  const [reinforce, setReinforce] = useState<Reinforce>(equipmentInstance?.reinforce || {type: "None", lv: 0});
  const [core, setCore] = useState<Core>(() => equipmentInstance?.core || {1:{},2:{},3:{}} as Core);

  const handleCoreChangeKey = (no: CoreNo, key: StatusKey | "") => {
    if (key === "") {
      setCore((prevCore) => ({ ...prevCore, [no]: {} }));
    } else {
      setCore((prevCore) => ({ ...prevCore, [no]: { [key]: 0 } }));
    }
  };
  const handleCoreChangeValue = (no: CoreNo, value: number) => {
    const key = Object.keys(core[no])[0];
    setCore((prevCore) => ({ ...prevCore, [no]: { [key]: value } }));
  };

  const handleApplyCoreButtonClick = () => {
    handleApplyCore({...equipmentInstance, core: core, reinforce: reinforce} as EquipmentInstance);
  };

  const statusOptions = [
    { value: "pow", label: "pow" },
    { value: "int", label: "int" },
    { value: "vit", label: "vit" },
    { value: "spd", label: "spd" },
    { value: "luk", label: "luk" },
    { value: "hp", label: "hp" },
    { value: "sp", label: "sp" },
    { value: "atk", label: "atk" },
    { value: "def", label: "def" },
    { value: "mat", label: "mat" },
    { value: "mdf", label: "mdf" },
    { value: "hpr", label: "hpr" },
    { value: "spr", label: "spr" },
    { value: "exp", label: "exp" },
    { value: "pet", label: "pet" },
    { value: "mov", label: "mov" },
    { value: "drn", label: "drn" },
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleCloseDetailModal}>閉じる</button>
        <button onClick={handleApplyCoreButtonClick}>反映</button>
        <h2>{equipmentInstance?.name}の詳細</h2>
        <div>
          <label>
            強化:
            <select value={reinforce.type} onChange={(e) => setReinforce({...reinforce, type: e.target.value as ReinforceType})}>
              <option value="物理">物理</option>
              <option value="魔法">魔法</option>
              <option value="None">なし</option>
            </select>
          </label>
          <label>
            錬成レベル:
            <NumberInput value={reinforce.lv} 
              setValue={(value) => setReinforce({...reinforce, lv: value})} 
              minValue={0}
              maxValue={20}
            />
          </label>
        </div>
        <div>
          <h3>特殊コア強化</h3>
          {[1,2,3].map((no) => {
            if (Object.keys(core[no as unknown as CoreNo]).length === 0) {
              return (
                <div key={`empty-${no}`} className="core-enhancement">
                    <SelectComponent
                      options={statusOptions}
                      width="5em"
                      height="2.4em"
                      value={Object.keys(core[no as unknown as CoreNo])[0] || ""}
                      onChange={(value) => handleCoreChangeKey(no as unknown as CoreNo, value as StatusKey)}
                    />
                    <NumberInput
                      value={core[no as unknown as CoreNo][Object.keys(core[no as unknown as CoreNo])[0] as StatusKey] || 0}
                      setValue={(value) => handleCoreChangeValue(no as unknown as CoreNo, value)}
                    />
                </div>
              );
            } else {
              return (
                <div key={`filled-${no}`} className="core-enhancement">
                  <SelectComponent
                    options={statusOptions}
                    width="5em"
                    height="2.4em"
                    value={Object.keys(core[no as unknown as CoreNo])[0] || ""}
                    onChange={(value) => handleCoreChangeKey(no as unknown as CoreNo, value as StatusKey)}
                    />
                  <NumberInput
                    value={core[no as unknown as CoreNo][Object.keys(core[no as unknown as CoreNo])[0] as StatusKey] || 0}
                    setValue={(value) => handleCoreChangeValue(no as unknown as CoreNo, value)}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="equipment-status">
          <div className="equipment-status-item">
            <p className="equipment-status-key">pow</p>
            <p className="equipment-status-value">{equipmentInstance?.pow}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">int</p>
            <p className="equipment-status-value">{equipmentInstance?.int}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">spd</p>
            <p className="equipment-status-value">{equipmentInstance?.spd}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">vit</p>
            <p className="equipment-status-value">{equipmentInstance?.vit}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">luk</p>
            <p className="equipment-status-value">{equipmentInstance?.luk}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">hp</p>
            <p className="equipment-status-value">{equipmentInstance?.hp}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">sp</p>
            <p className="equipment-status-value">{equipmentInstance?.sp}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">atk</p>
            <p className="equipment-status-value">{equipmentInstance?.atk}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">def</p>
            <p className="equipment-status-value">{equipmentInstance?.def}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">mat</p>
            <p className="equipment-status-value">{equipmentInstance?.mat}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">mdf</p>
            <p className="equipment-status-value">{equipmentInstance?.mdf}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">hpr</p>
            <p className="equipment-status-value">{equipmentInstance?.hpr}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">spr</p>
            <p className="equipment-status-value">{equipmentInstance?.spr}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">exp</p>
            <p className="equipment-status-value">{equipmentInstance?.exp}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">pet</p>
            <p className="equipment-status-value">{equipmentInstance?.pet}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">mov</p>
            <p className="equipment-status-value">{equipmentInstance?.mov}</p>
          </div>
          <div className="equipment-status-item">
            <p className="equipment-status-key">drn</p>
            <p className="equipment-status-value">{equipmentInstance?.drn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailComponent;
