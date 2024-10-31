// src/components/PrizeHistory.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/PrizeHistory.css';

function PrizeHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/api/history');
                setHistory(response.data);
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        };

        fetchHistory();

        // Atualiza o histórico a cada 5 segundos
        const interval = setInterval(fetchHistory, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="history-container">
            <h2>Histórico de Prêmios</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        <span>{item.username}</span> ganhou <strong>{item.prize}</strong> em {new Date(item.wonAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PrizeHistory;
