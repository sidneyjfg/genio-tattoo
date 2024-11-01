// src/components/SnowEffect.js
import { useEffect } from 'react';
import '../styles/Snow.css';

const SnowEffect = () => {
    useEffect(() => {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        document.body.appendChild(snowContainer);

        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerText = '❄';
            snowflake.style.setProperty('--random-position', Math.random()); // Posição aleatória horizontal
            snowflake.style.fontSize = `${Math.random() * 1.2 + 0.8}em`;
            snowContainer.appendChild(snowflake);

            // Define a duração da animação e remove o floco após o fim da animação
            const animationDuration = snowflake.style.animationDuration || '10s';
            setTimeout(() => {
                snowflake.remove();
            }, parseFloat(animationDuration) * 99999999);
        };

        // Cria flocos de neve em intervalos regulares
        const snowInterval = setInterval(createSnowflake, 300);

        // Limpa o intervalo e remove o contêiner ao desmontar o componente
        return () => {
            clearInterval(snowInterval);
            snowContainer.remove();
        };
    }, []);

    return null;
};

export default SnowEffect;
