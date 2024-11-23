const { Sequelize } = require('sequelize');

// Inicializa o Sequelize com as variáveis de ambiente
const sequelize = new Sequelize(
    process.env.DB_NAME,        // Nome do banco de dados
    process.env.DB_USER,        // Usuário do banco de dados
    process.env.DB_PASS,        // Senha do banco de dados
    {
        host: process.env.DB_HOST, // Host do banco
        dialect: process.env.DB_DIALECT, // Dialeto (MySQL, Postgres, etc.)
        port: process.env.DB_PORT || 3306, // Porta do banco (3306 por padrão para MySQL)
    }
);

// Testa a conexão com o banco
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao MySQL foi bem-sucedida.');
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
})();

module.exports = sequelize;
