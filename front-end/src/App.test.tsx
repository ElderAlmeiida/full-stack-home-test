import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
    it('deve renderizar o componente', () => {
        render(<App />);
        expect(screen.getByText('CSV Uploader')).toBeInTheDocument();
    });

    it('deve exibir um erro se nenhum arquivo for selecionado', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Upload'));
        expect(screen.getByText('Por favor, selecione um arquivo primeiro.')).toBeInTheDocument();
    });

    it('deve fazer uma requisição POST ao enviar um arquivo', async () => {
        render(<App />);
        const file = new File(['name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'], 'test.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByLabelText(/arquivo/i), { target: { files: [file] } });

        mockedAxios.post.mockResolvedValueOnce({ data: { message: 'O arquivo foi enviado com sucesso.' } });
        fireEvent.click(screen.getByText('Upload'));
        expect(await screen.findByText('O arquivo foi enviado com sucesso.')).toBeInTheDocument();
    });
});
