// backend/routes/history.js
const express = require('express');
const router = express.Router();
const PrizeHistory = require('../models/PrizeHistory');

// Endpoint para adicionar ao histórico
router.post('/add', async (req, res) => {
    const { username } = req.body;

    try {
        // Verifica se o usuário já jogou
        const existingEntry = await PrizeHistory.findOne({ where: { username } });

        if (existingEntry) {
            return res.status(400).json({ message: "Você já jogou e não pode jogar novamente." });
        }

        // Adiciona o histórico caso seja permitido
        const newEntry = await PrizeHistory.create(req.body);
        return res.status(200).json(newEntry);
    } catch (error) {
        console.error("Erro ao verificar/adicionar histórico:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Endpoint para verificar se o usuário já jogou
// Endpoint para verificar se o usuário já jogou e qual prêmio ganhou
router.get('/check/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Busca a entrada no histórico pelo username
        const existingEntry = await PrizeHistory.findOne({ where: { username } });

        if (existingEntry) {
            return res.status(200).json({
                hasPlayed: true,
                prize: existingEntry.prize // Retorna o prêmio ganho
            });
        }

        // Caso não tenha jogado, retorna hasPlayed como false
        return res.status(200).json({ hasPlayed: false, prize: null });
    } catch (error) {
        console.error("Erro ao verificar histórico:", error);
        return res.status(500).json({ message: "Erro ao verificar o histórico do usuário." });
    }
});


// Rota para obter o histórico completo de prêmios
router.get('/', async (req, res) => {
    try {
        const history = await PrizeHistory.findAll({
            order: [['wonAt', 'DESC']],
            limit: 20, // Limita o histórico a 20 itens mais recentes
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o histórico de prêmios' });
    }
});

module.exports = router;
