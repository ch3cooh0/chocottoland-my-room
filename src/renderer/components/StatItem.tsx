import React from 'react';
import './StatItem.css';

interface StatItemProps {
    label: string;
    value: number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
    return (
        <div className="stat-item">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
        </div>
    );
};

export default StatItem;