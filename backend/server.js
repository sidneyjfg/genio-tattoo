// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const Prize = require('./models/Prize');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API da Roleta de Prêmios com MySQL funcionando');
});

// backend/server.js
const prizeRoutes = require('./routes/prizes');
app.use('/api/prizes', prizeRoutes);

// backend/server.js
const historyRoutes = require('./routes/history');
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.sync({ alter: true }); // Sincroniza os modelos com o banco de dados
        console.log("Modelos sincronizados com o banco de dados MySQL");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
})();
