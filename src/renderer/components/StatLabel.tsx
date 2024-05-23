import React from 'react';
import './StatItem.css';

interface StatLabelProps {
    label: string;
}

const StatLabel: React.FC<StatLabelProps> = ({ label }) => {
    return (
        <div className="stat-label">{label}</div>
    );
};

export default StatLabel;