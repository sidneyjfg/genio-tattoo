// backend/models/PrizeHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PrizeHistory = sequelize.define('PrizeHistory', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prize: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wonAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
});

module.exports = PrizeHistory;
