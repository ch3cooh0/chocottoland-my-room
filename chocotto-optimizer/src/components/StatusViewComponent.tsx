import React, { useState } from 'react';
import { CharacterStatus, AvatarStatus } from '../../types/types';


interface StatusViewComponentProps {
    characterStatus: CharacterStatus;
    avatarStatus: AvatarStatus;
    setCharacterStatus: React.Dispatch<React.SetStateAction<CharacterStatus>>;
    setAvatarStatus: React.Dispatch<React.SetStateAction<AvatarStatus>>;
}   

const StatusViewComponent: React.FC<StatusViewComponentProps> = ({ characterStatus, avatarStatus, setCharacterStatus, setAvatarStatus }) => {
  const [characterStatusSavePath, setCharacterStatusSavePath] = useState<string>("");
  const [avatarStatusSavePath, setAvatarStatusSavePath] = useState<string>("");
  const handleCharacterStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacterStatus(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleAvatarStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAvatarStatus(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleFileSelect = async (loadFunction: (loadPath: string) => void,setPathFunction: React.Dispatch<React.SetStateAction<string>>) => {
    const filePaths = await window.ipcRenderer.invoke("show-open-dialog");
    if (filePaths.length > 0) {
      const filePath = filePaths[0];
      loadFunction(filePath);
      setPathFunction(filePath);
    }
  }

  const handleFileSave = async (saveFunction: (savePath: string) => void,setPathFunction: React.Dispatch<React.SetStateAction<string>>,savePath: string) => {
    const filePath = await window.ipcRenderer.invoke("show-save-dialog", savePath);
    if (filePath) {
      setPathFunction(filePath);
      saveFunction(filePath);
    }
  }

  const handleCharacterStatusLoadButtonClick = () => {
    const loadFunction = async (loadPath: string) => {
      const loadedCharacterStatus = await window.ipcRenderer.invoke("loadCharacterStatusFromJSON", loadPath);
      setCharacterStatus(loadedCharacterStatus);
    }
    handleFileSelect(loadFunction,setCharacterStatusSavePath);
  }

  const handleCharacterStatusSaveButtonClick = () => {
    const saveFunction = async (savePath: string) => {
      await window.ipcRenderer.invoke("writeCharacterStatusToJSON", savePath, characterStatus);
    }
    handleFileSave(saveFunction,setCharacterStatusSavePath,characterStatusSavePath);
  }

  const handleAvatarStatusLoadButtonClick = () => {
    const loadFunction = async (loadPath: string) => {
      const loadedAvatarStatus = await window.ipcRenderer.invoke("loadAvatarStatusFromJSON", loadPath);
      setAvatarStatus(loadedAvatarStatus);
    }
    handleFileSelect(loadFunction,setAvatarStatusSavePath);
  }

  const handleAvatarStatusSaveButtonClick = () => {
    const saveFunction = async (savePath: string) => {
      await window.ipcRenderer.invoke("writeAvatarStatusToJSON", savePath, avatarStatus);
    }
    handleFileSave(saveFunction,setAvatarStatusSavePath,avatarStatusSavePath);
  }

  return (
    <div className="status-view">
      
      <div className="status-section">
        <h2 className="status-title">キャラクターステータス</h2>
        <div className="status-button-container">
          <button onClick={handleCharacterStatusLoadButtonClick}>読込</button>
          <button onClick={handleCharacterStatusSaveButtonClick}>保存</button>
        </div>
        <StatusItemComponent label="LV" name="lv" value={characterStatus.lv} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="pow" name="pow" value={characterStatus.pow} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="int" name="int" value={characterStatus.int} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="vit" name="vit" value={characterStatus.vit} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="spd" name="spd" value={characterStatus.spd} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="luk" name="luk" value={characterStatus.luk} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="HP" name="hp" value={characterStatus.hp} onChange={handleCharacterStatusChange} />
        <StatusItemComponent label="SP" name="sp" value={characterStatus.sp} onChange={handleCharacterStatusChange} />
      </div>
      
      <div className="status-section">
        <h2 className="status-title">アバターステータス</h2>
        <div className="status-button-container">
          <button onClick={handleAvatarStatusLoadButtonClick}>読込</button>
          <button onClick={handleAvatarStatusSaveButtonClick}>保存</button>
        </div>
        <StatusItemComponent label="pow" name="pow" value={avatarStatus.pow} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="int" name="int" value={avatarStatus.int} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="vit" name="vit" value={avatarStatus.vit} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="spd" name="spd" value={avatarStatus.spd} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="luk" name="luk" value={avatarStatus.luk} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="HP" name="hp" value={avatarStatus.hp} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="SP" name="sp" value={avatarStatus.sp} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="ATK" name="atk" value={avatarStatus.atk} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="DEF" name="def" value={avatarStatus.def} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="MAT" name="mat" value={avatarStatus.mat} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="MDF" name="mdf" value={avatarStatus.mdf} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="HPR" name="hpr" value={avatarStatus.hpr} onChange={handleAvatarStatusChange} />
        <StatusItemComponent label="SPR" name="spr" value={avatarStatus.spr} onChange={handleAvatarStatusChange} />
      </div>
    </div>
  );
};

interface StatusItemComponentProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StatusItemComponent: React.FC<StatusItemComponentProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="status-item">
      <label className="status-label">{label}</label>
      <input className="status-input" type="number" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default StatusViewComponent;
