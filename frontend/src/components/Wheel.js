import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Wheel.css';

function Wheel({ username, onPrizeWon }) {
    const [prizes, setPrizes] = useState([]);
    const [currentPrize, setCurrentPrize] = useState('');
    const [isRolling, setIsRolling] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState('');
    const [animate, setAnimate] = useState(false);

    // Carrega os prêmios do banco de dados quando o componente é montado
    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await api.get('/api/prizes');
                setPrizes(response.data.map(prize => prize.name)); // Ajusta conforme a estrutura de dados do seu backend
            } catch (error) {
                console.error("Erro ao carregar prêmios:", error);
            }
        };
        fetchPrizes();
    }, []);

    // Lógica de rotação
    useEffect(() => {
        if (isRolling && prizes.length > 0) {
            let index = 0;
            let tempoDecorrido = 0;
            let rotationDuration = 200; // Velocidade inicial mais lenta

            const animationInterval = setInterval(() => {
                setAnimate(false); // Remove a animação temporariamente
                setTimeout(() => setAnimate(true), 10); // Reaplica a animação

                setCurrentPrize(prizes[index]);
                index = (index + 1) % prizes.length;
                tempoDecorrido += rotationDuration;

                // Gradualmente desacelera a rotação nos últimos 2 segundos
                if (tempoDecorrido >= 3000) {
                    rotationDuration += 30; // Aumenta o intervalo para desaceleração progressiva
                }

                // Para a rotação e exibe o prêmio ganho
                if (tempoDecorrido >= 5000) {
                    clearInterval(animationInterval);
                    setCurrentPrize(`Seu prêmio é: ${selectedPrize}`);
                    setIsRolling(false);

                    // Grava o prêmio no histórico
                    api.post('/api/history/add', {
                        username: username || 'Usuário Anônimo',
                        prize: selectedPrize
                    })
                    .then(() => {
                        onPrizeWon();
                    })
                    .catch(err => {
                        console.error("Erro ao salvar no histórico:", err);
                    });
                }
            }, rotationDuration);

            return () => clearInterval(animationInterval);
        }
    }, [isRolling, prizes, selectedPrize, username, onPrizeWon]);

    // Seleciona o prêmio final antes de iniciar a rotação
    const iniciarRoleta = () => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setSelectedPrize(prizes[randomIndex]);
        setIsRolling(true);
        setAnimate(true); // Inicia a animação
    };

    return (
        <div className="wheel-container">
            <div className="prize-display">
                <div className={`prize-text ${animate ? 'animate' : ''}`}>
                    {currentPrize || `Seu prêmio é: ${selectedPrize}`}
                </div>
            </div>
            <button onClick={iniciarRoleta} disabled={isRolling || prizes.length === 0}>
                {isRolling ? 'Girando...' : 'Girar a Roleta'}
            </button>
        </div>
    );
}

export default Wheel;
