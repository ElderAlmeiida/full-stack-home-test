import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo primeiro.');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData();  // Atualiza a lista de usuários após o upload do arquivo
    } catch (err) {
      setError('Falha no upload do arquivo.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        params: { q: query }
      });
      setData(response.data.data);
    } catch {
      setError('Erro ao buscar dados.');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h1>CSV Uploader</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div className="card-container">
        {data.map((row, index) => (
          <div key={index} className="card">
            <p><strong>Nome:</strong> {row.name}</p>
            <p><strong>Cidade:</strong> {row.city}</p>
            <p><strong>País:</strong> {row.country}</p>
            <p><strong>Esporte favorito:</strong> {row.favorite_sport}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
