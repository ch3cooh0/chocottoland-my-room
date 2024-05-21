import React from 'react';
import { Status } from '../../types/global';
import StatItem from './StatItem';

interface TotalStatsDisplayProps {
    totalStats: Status;
}

const TotalStatsDisplay: React.FC<TotalStatsDisplayProps> = ({ totalStats }) => {
    return (
        <div>
            <h2>装備中の装備ステータス合計</h2>
            <StatItem label="pow" value={totalStats.pow} />
            <StatItem label="int" value={totalStats.int} />
            <StatItem label="vit" value={totalStats.vit} />
            <StatItem label="spd" value={totalStats.spd} />
            <StatItem label="luk" value={totalStats.luk} />
            {/* <StatItem label="HP" value={totalStats.HP} />
            <StatItem label="SP" value={totalStats.SP} />
            <StatItem label="ATK" value={totalStats.ATK} />
            <StatItem label="DEF" value={totalStats.DEF} />
            <StatItem label="MAT" value={totalStats.MAT} />
            <StatItem label="MDF" value={totalStats.MDF} />
            <StatItem label="HPR" value={totalStats.HPR} />
            <StatItem label="SPR" value={totalStats.SPR} />
            <StatItem label="EXP" value={totalStats.EXP} />
            <StatItem label="PET" value={totalStats.PET} />
            <StatItem label="MOV" value={totalStats.MOV} />
            <StatItem label="DRN" value={totalStats.DRN} /> */}
        </div>
    );
};

export default TotalStatsDisplay;