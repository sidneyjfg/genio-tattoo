// backend/models/Prize.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Prize = sequelize.define('Prize', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    probability: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});

module.exports = Prize;
