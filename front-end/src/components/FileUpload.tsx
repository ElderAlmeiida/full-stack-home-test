import React, { ChangeEvent } from 'react';

interface FileUploadProps {
    onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="file-upload">
            <input type="file" accept=".csv" onChange={handleChange} />
        </div>
    );
};

export default FileUpload;
