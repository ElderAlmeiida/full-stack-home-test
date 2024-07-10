"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:4000', // Permitir requisições do frontend na porta 4000
    methods: 'GET,POST', // Métodos permitidos
    allowedHeaders: 'Content-Type', // Cabeçalhos permitidos
}));
// Rotas
app.use('/api/files', fileRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Middleware de tratamento de erros
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Servidor Backend rodando na porta ${port}`);
});
