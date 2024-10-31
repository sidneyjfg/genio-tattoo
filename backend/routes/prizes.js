// backend/routes/prizes.js
const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');

// Rota para listar todos os prêmios
router.get('/', async (req, res) => {
    try {
        const prizes = await Prize.findAll();
        res.json(prizes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar prêmios' });
    }
});

module.exports = router;
