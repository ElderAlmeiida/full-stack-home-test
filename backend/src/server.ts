import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: 'https://full-stack-home-test-front-end.onrender.com', // Permitir requisições do frontend na porta 4000
    methods: 'GET,POST', // Métodos permitidos
    allowedHeaders: 'Content-Type', // Cabeçalhos permitidos
}));

// Rotas
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor Backend rodando na porta ${port}`);
});
