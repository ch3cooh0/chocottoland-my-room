import React from 'react';
import './StatItem.css';

interface StatValueProps {
    value: number;
}

const StatValue: React.FC<StatValueProps> = ({ value }) => {
    return (
        <div className="stat-value">{value}</div>
    );
};

export default StatValue;