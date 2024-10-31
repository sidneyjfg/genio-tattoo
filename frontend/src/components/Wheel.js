// src/components/Wheel.js
import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Wheel.css';

function Wheel() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState(null);

    const prizes = ['Cupom', 'Desconto', 'Brinde', 'Pontos', 'Surpresa'];

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const prizeIndex = Math.floor(Math.random() * prizes.length);
        setTimeout(() => {
            const wonPrize = prizes[prizeIndex];
            setPrize(wonPrize);

            // Registra o prêmio no histórico (exemplo com usuário anônimo)
            api.post('/api/history/add', {
                username: 'Usuário Anônimo', // Aqui, pode ser substituído por um username real
                prize: wonPrize
            });

            setIsSpinning(false);
        }, 3000);
    };

    return (
        <div className="wheel-container">
            <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
                {prizes.map((prize, index) => (
                    <div key={index} className="wheel-segment">
                        {prize}
                    </div>
                ))}
            </div>
            <button onClick={spinWheel} disabled={isSpinning}>
                {isSpinning ? 'Girando...' : 'Girar a Roleta'}
            </button>
            {prize && <p>Você ganhou: {prize}!</p>}
        </div>
    );
}

export default Wheel;
