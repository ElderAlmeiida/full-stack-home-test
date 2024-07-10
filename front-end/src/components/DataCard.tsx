import React from 'react';

interface DataCardProps {
    data: { [key: string]: string };
}

const DataCard: React.FC<DataCardProps> = ({ data }) => {
    return (
        <div className="data-card">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="data-card-item">
                    <strong>{key}:</strong> {value}
                </div>
            ))}
        </div>
    );
};

export default DataCard;
