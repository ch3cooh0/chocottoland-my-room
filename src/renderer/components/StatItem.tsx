import React from 'react';
import './StatItem.css';
import StatLabel from './StatLabel';
import StatValue from './StatValue';

interface StatItemProps {
    label: string;
    value: number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
    return (
        <div className="stat-item">
            <StatLabel label={label} />
            <StatValue value={value} />
        </div>
    );
};

export default StatItem;