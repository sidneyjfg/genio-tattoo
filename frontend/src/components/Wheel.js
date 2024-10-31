// src/components/Wheel.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Wheel.css';

function Wheel({ username }) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState(null);
    const [prizes, setPrizes] = useState([]);
    const [rotation, setRotation] = useState(0); // Ângulo de rotação

    // Busca prêmios do banco ao carregar o componente
    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await api.get('/api/prizes');
                setPrizes(response.data);
                toast.success("Premios carregados com sucesso!")
            } catch (err) {
                console.error("Erro ao buscar prêmios:", err);
                toast.warn("Erro ao carregar prêmios. Tente novamente mais tarde.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
            toast.error("Erro ao salvar no histórico de prêmios. Tente novamente.", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .finally(() => setIsSpinning(false));
    };

    return (
        <div className="wheel-container">
            <ToastContainer />
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
        </div>
    );
}

export default Wheel;
