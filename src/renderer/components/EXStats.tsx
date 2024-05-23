import React from 'react';

interface EXStatsProps {
    label: string;
    value: number;
}

const EXStats: React.FC<EXStatsProps> = ({ label, value }) => {
    const barStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 8px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#4a4a4a',
    };

    const labelStyle = {
        backgroundColor: '#b0a890',
        color: '#ffffff',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 'bold',
    };

    const valueStyle = {
        backgroundColor: '#e0d8c0',
        border: '1px solid #b0a890',
        width: '6em',
        textAlign: 'center' as 'center',
    };

    return (
        <div style={barStyle}>
            <div style={labelStyle}>{label}</div>
            <div style={valueStyle}>{value}</div>
        </div>
    );
};

export default EXStats;