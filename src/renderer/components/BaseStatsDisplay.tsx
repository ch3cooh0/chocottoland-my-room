import React from 'react';
import { BaseStatus } from '../../types/global';
import StatLabel from './StatLabel';
import StatValue from './StatValue';

interface TotalStatsDisplayProps {
    baseStatus: BaseStatus;
    displayStatus: BaseStatus;
}

const BaseStatsDisplay: React.FC<TotalStatsDisplayProps> = ({ baseStatus, displayStatus }) => {
    return (
        <div>
            <h2>ステータス</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
                <StatLabel label="" />
                <StatLabel label="キャラ" />
                <StatLabel label="装備" />
                <StatLabel label="POW" />
                <StatValue value={baseStatus.pow} />
                <StatValue value={displayStatus.pow} />
                <StatLabel label="INT" />
                <StatValue value={baseStatus.int} />
                <StatValue value={displayStatus.int} />
                <StatLabel label="SPD" />
                <StatValue value={baseStatus.spd} />
                <StatValue value={displayStatus.spd} />
                <StatLabel label="VIT" />
                <StatValue value={baseStatus.vit} />
                <StatValue value={displayStatus.vit} />
                <StatLabel label="LUK" />
                <StatValue value={baseStatus.luk} />
                <StatValue value={displayStatus.luk} />
            </div>
        </div>
    );
};

export default BaseStatsDisplay;

