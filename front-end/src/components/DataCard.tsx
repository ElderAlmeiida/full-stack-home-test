import React from 'react';

interface DataCardProps {
    data: { [key: string]: string };
}

const DataCard: React.FC<DataCardProps> = ({ data }) => {
    return (
        <div className="card">
            {Object.entries(data).map(([key, value]) => (
                <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
            ))}
        </div>
    );
};

export default DataCard;

