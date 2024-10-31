// src/components/Wheel.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Wheel.css';

function Wheel({ username }) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState(null);
    const [error, setError] = useState(null);
    const [prizes, setPrizes] = useState([]);
    const [rotation, setRotation] = useState(0); // Ângulo de rotação

    // Busca prêmios do banco ao carregar o componente
    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await api.get('/api/prizes');
                setPrizes(response.data);
            } catch (err) {
                console.error("Erro ao buscar prêmios:", err);
                setError("Erro ao carregar prêmios.");
            }
        };
        fetchPrizes();
    }, []);

    // Função para selecionar um prêmio considerando as probabilidades
    const getRandomPrize = () => {
        const totalWeight = prizes.reduce((sum, prize) => sum + prize.probability, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < prizes.length; i++) {
            if (random < prizes[i].probability) return prizes[i];
            random -= prizes[i].probability;
        }
    };

    const spinWheel = () => {
        if (isSpinning || prizes.length === 0) return;
        setIsSpinning(true);
        setError(null);

        const wonPrize = getRandomPrize();
        setPrize(wonPrize.name);

        // Calcula a rotação final para que a roleta pare no prêmio sorteado
        const prizeIndex = prizes.findIndex((p) => p.name === wonPrize.name);
        const degreesPerPrize = 360 / prizes.length;
        const rotationOffset = degreesPerPrize / 2; // Ajuste para centralizar o prêmio
        const finalRotation = 360 * 5 + prizeIndex * degreesPerPrize + rotationOffset; // 5 voltas completas + posição do prêmio

        setRotation(finalRotation);

        api.post('/api/history/add', {
            username: username || 'Usuário Anônimo',
            prize: wonPrize.name
        })
        .catch(err => {
            console.error("Erro ao salvar no histórico:", err);
            setError("Erro ao salvar no histórico de prêmios.");
        })
        .finally(() => setIsSpinning(false));
    };

    return (
        <div className="wheel-container">
            <div className={`wheel ${isSpinning ? 'spinning' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
                {prizes.map((prize, index) => (
                    <div key={index} className="wheel-segment">
                        {prize.name}
                    </div>
                ))}
            </div>
            <button onClick={spinWheel} disabled={isSpinning || prizes.length === 0}>
                {isSpinning ? 'Girando...' : 'Girar a Roleta'}
            </button>
            {prize && <p>Você ganhou: {prize}!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Wheel;
