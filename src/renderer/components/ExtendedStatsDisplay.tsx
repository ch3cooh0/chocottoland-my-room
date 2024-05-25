import React, { useState } from 'react';

import HPSPStats from './HPSPStats';
import EXStats from './EXStats';

import { ExtendedStatus } from '../../types/global';

interface ExtendedStatsDisplayProps {
    extendedStatus: ExtendedStatus;
}

const ExtendedStatsDisplay = ({ extendedStatus }: ExtendedStatsDisplayProps) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2px' }}>
            <HPSPStats label="HP" value={extendedStatus.HP} />
            <HPSPStats label="SP" value={extendedStatus.SP} />
            <EXStats label="EXP" value={extendedStatus.EXP} />
            <EXStats label="HPR" value={extendedStatus.HPR} />
            <EXStats label="ATK" value={extendedStatus.ATK} />
            <EXStats label="MAT" value={extendedStatus.MAT} />
            <EXStats label="MOV" value={extendedStatus.MOV} />
            <EXStats label="SPR" value={extendedStatus.SPR} />
            <EXStats label="DEF" value={extendedStatus.DEF} />
            <EXStats label="MDF" value={extendedStatus.MDF} />
            <EXStats label="DRN" value={extendedStatus.DRN} />
            <EXStats label="PET" value={extendedStatus.PET} />
        </div>
    );
};

export default ExtendedStatsDisplay;

