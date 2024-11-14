import React, { useState } from "react";
import { Core, CoreNo, EquipmentInstance, StatusKey } from "../../types/types";

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
  const [reinforceLevel, setReinforceLevel] = useState<number>(equipmentInstance?.reinforceLevel || 0);
  const [core, setCore] = useState<Core>(() => equipmentInstance?.core || {1:{},2:{},3:{}} as Core);

  const handleReinforceLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReinforceLevel(Number(event.target.value));
  };

  const handleCoreChangeKey = (no: CoreNo, key: StatusKey | "") => {
    if (key === "") {
      setCore((prevCore) => ({ ...prevCore, [no]: {} }));
    } else {
      setCore((prevCore) => ({ ...prevCore, [no]: { ...prevCore[no], [key]: 0 } }));
    }
  };
  const handleCoreChangeValue = (no: CoreNo, value: number) => {
    const key = Object.keys(core[no])[0];
    setCore((prevCore) => ({ ...prevCore, [no]: { ...prevCore[no], [key]: value } }));
  };

  const handleApplyCoreButtonClick = () => {
    handleApplyCore({...equipmentInstance, core: core, reinforceLevel: reinforceLevel} as EquipmentInstance);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleCloseDetailModal}>閉じる</button>
        <button onClick={handleApplyCoreButtonClick}>反映</button>
        <h2>{equipmentInstance?.name}の詳細</h2>
        <div>
          <label>
            錬成レベル:
            <input
              type="number"
              value={reinforceLevel}
              onChange={handleReinforceLevelChange}
              min="0"
              max="20"
            />
          </label>
        </div>
        <div>
          <h3>特殊コア強化</h3>
          {[1,2,3].map((no) => {
            if (Object.keys(core[no as unknown as CoreNo]).length === 0) {
              return (
                <div key={`empty-${no}`} className="core-enhancement">
                  <label>
                    {Object.keys(core[no as unknown as CoreNo])}
                    <select onChange={(e) => handleCoreChangeKey(no as unknown as CoreNo, e.target.value as StatusKey)}>
                      <option value=""></option>
                      <>
                        <option value="pow">pow</option>
                        <option value="int">int</option>
                        <option value="vit">vit</option>
                        <option value="spd">spd</option>
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
                      </>
                    </select>
                    <input
                      type="number"
                      value={0}
                      onChange={(e) => handleCoreChangeValue(no as unknown as CoreNo, Number(e.target.value))}
                    />
                  </label>
                </div>
              );
            } else {
              return (
                <div key={`filled-${no}`} className="core-enhancement">
                  <label>
                    <select 
                      value={Object.keys(core[no as unknown as CoreNo])[0]} 
                      onChange={(e) => handleCoreChangeKey(no as unknown as CoreNo, e.target.value as StatusKey)}>
                      <option value=""></option>
                      <>
                        <option value="pow">pow</option>
                        <option value="int">int</option>
                        <option value="vit">vit</option>
                        <option value="spd">spd</option>
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
                      </>
                    </select>
                  </label>
                  <input 
                    type="number" 
                    value={core[no as unknown as CoreNo][Object.keys(core[no as unknown as CoreNo])[0] as StatusKey]} 
                    onChange={(e) => handleCoreChangeValue(no as unknown as CoreNo, Number(e.target.value))} 
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
