// backend/routes/history.js
const express = require('express');
const router = express.Router();
const PrizeHistory = require('../models/PrizeHistory');

// Rota para adicionar prêmio ao histórico
router.post('/add', async (req, res) => {
    const { username, prize } = req.body;
    try {
        const newEntry = await PrizeHistory.create({ username, prize });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar ao histórico' });
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
