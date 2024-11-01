// src/components/PrizeHistory.js
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import api from '../services/api';
import '../styles/PrizeHistory.css';

const PrizeHistory = forwardRef((props, ref) => {
    const [history, setHistory] = useState([]);

    // Função para buscar o histórico de prêmios
    const fetchHistory = async () => {
        try {
            const response = await api.get('/api/history');
            setHistory(response.data);
        } catch (error) {
            console.error("Erro ao carregar o histórico de prêmios:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // Expor fetchHistory para uso externo (no App.js, quando a roleta para)
    useImperativeHandle(ref, () => ({
        fetchHistory
    }));

    // Função para formatar a data de maneira legível
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "Data inválida";
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="history-container">
            <h2>Histórico de Prêmios</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <span className="username">{entry.username}</span> ganhou <strong>{entry.prize}</strong> em {formatDate(entry.wonAt)}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default PrizeHistory;
