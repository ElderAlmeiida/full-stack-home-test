import React, { useState } from 'react';
import axios from 'axios';
import DataCard from './components/DataCard';
import './styles.css';

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://full-stack-home-test.onrender.com/api/files', formData);
            setMessage(response.data.message);
            setMessageType('success');
            await handleSearch(); // Call handleSearch after successful upload
        } catch (error) {
            setMessage('Error uploading file');
            setMessageType('error');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://full-stack-home-test.onrender.com/api/users', {
                params: { q: searchQuery },
            });
            setData(response.data.data);
        } catch (error) {
            setMessage('Error fetching data');
            setMessageType('error');
        }
    };

    return (
        <div className="App">
            <img src="/logocsv.png" alt="Logo" className="logo" />
            <h1>CSV File Upload and Search</h1>
            <div className="top-bar">
                <div className="file-upload">
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <button onClick={handleUpload} data-testid="upload-button">Upload</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        data-testid="search-input"
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            {message && (
                <div className={`notification ${messageType}`} data-testid="notification">
                    {message}
                </div>
            )}
            <div className="data-container">
                {data.map((item, index) => (
                    <DataCard key={index} data={item} data-testid="info-card" />
                ))}
            </div>
        </div>
    );
};

export default App;

