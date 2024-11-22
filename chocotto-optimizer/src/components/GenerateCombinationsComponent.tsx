import React, { useState } from "react";
import { EquipmentInstance, CharacterStatus, AvatarStatus, Equipped } from "../../types/types";
// import { CombinationResult } from "../../electron/modules/exploration";
import { toast } from 'react-hot-toast';

interface GenerateCombinationsComponentProps {
    equipmentInstances: EquipmentInstance[];
    characterStatus: CharacterStatus;
    avatarStatus: AvatarStatus;
    setCharacterMainEquipment: (equipment: Equipped) => void;
    setCharacterSubEquipment: (equipment: Equipped) => void;
}

const GenerateCombinationsComponent: React.FC<GenerateCombinationsComponentProps> = ({ equipmentInstances, characterStatus, avatarStatus, setCharacterMainEquipment, setCharacterSubEquipment }) => {
    const [selectedStat, setSelectedStat] = useState<string>("pow");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    // const [combinations, setCombinations] = useState<CombinationResult[]>([]);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await window.ipcRenderer.invoke("generateSingleCombinations", equipmentInstances, characterStatus, avatarStatus, selectedStat, 1);
            if (result.length > 0) {
                const filteredMainEquipment = Object.fromEntries(
                    Object.entries(result[0].combination.main).filter(([, eq]) => (eq as EquipmentInstance).id !== "")
                );
                const filteredSubEquipment = Object.fromEntries(
                    Object.entries(result[0].combination.sub).filter(([, eq]) => (eq as EquipmentInstance).id !== "")
                );
                setCharacterMainEquipment(filteredMainEquipment);
                setCharacterSubEquipment(filteredSubEquipment);
            } else {
                toast.error("組み合わせの生成に失敗しました");
            }
            
            setCombinations(result);
        } catch (error) {
            toast.error("組み合わせの生成中にエラーが発生しました");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <h2>装備組み合わせ生成</h2>
            <div>
                <label htmlFor="stat-select">ステータスを選択:</label>
                <select id="stat-select" value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)} disabled={isGenerating}>
                    <option value="pow">POW</option>
                    <option value="int">INT</option>
                    <option value="vit">VIT</option>
                    <option value="spd">SPD</option>
                    <option value="luk">LUK</option>
                    <option value="hp">HP</option>
                    <option value="sp">SP</option>
                    <option value="atk">ATK</option>
                    <option value="def">DEF</option>
                    <option value="mat">MAT</option>
                    <option value="mdf">MDF</option>
                    <option value="hpr">HPR</option>
                    <option value="spr">SPR</option>
                    <option value="exp">EXP</option>
                    <option value="pet">PET</option>
                    <option value="mov">MOV</option>
                    <option value="drn">DRN</option>
                </select>
            </div>
            <button onClick={handleGenerate} disabled={isGenerating}>生成</button>
            {isGenerating && <p>生成中...</p>}
            {/* <div>
                <h3>生成された組み合わせ</h3>
                <ul>
                    {combinations.map((combination, index) => (
                        <li key={index}>
                            メイン: {Object.values(combination.combination.main).map(eq => eq.name).join(", ")}
                            サブ: {Object.values(combination.combination.sub).map(eq => eq.name).join(", ")}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default GenerateCombinationsComponent;
