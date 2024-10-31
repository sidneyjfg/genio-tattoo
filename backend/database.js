// backend/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao MySQL foi bem-sucedida.');
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
})();

module.exports = sequelize;
