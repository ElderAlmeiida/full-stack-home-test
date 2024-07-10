import React, { useState } from 'react';
import axios from 'axios';
import DataCard from './components/DataCard';
import './styles.css';

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [message, setMessage] = useState('');

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
            const response = await axios.post('http://localhost:3000/api/files', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users', {
                params: { q: searchQuery },
            });
            setData(response.data.data);
        } catch (error) {
            setMessage('Error fetching data');
        }
    };

    return (
        <div className="App">
            <h1>CSV File Upload and Search</h1>
            <div className="top-bar">
                <div className="file-upload">
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            {message && <p>{message}</p>}
            <div className="data-container">
                {data.map((item, index) => (
                    <DataCard key={index} data={item} />
                ))}
            </div>
        </div>
    );
};

export default App;

