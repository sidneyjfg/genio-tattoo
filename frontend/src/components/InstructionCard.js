// src/components/InstructionCard.js
import React from 'react';
import '../styles/InstructionCard.css';

const InstructionCard = () => {
    return (
        <div className="instruction-container">
            <div className="instruction-card">
                <h2>Como Participar</h2>
                <ol>
                    <li>Preencha seu nome no campo indicado.</li>
                    <li>Clique na <span className="highlight">lâmpada</span> para ver seu resultado.</li>
                    <li>Compartilhe o resultado com o tatuador pelo WhatsApp ou Instagram.</li>
                    <li>Resgate seu prêmio apresentando a mensagem compartilhada ao tatuador.</li>
                    <li>
                        Para validar o prêmio é necessário estar seguindo 
                        <a 
                            href="https://instagram.com/kevi_ink" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            @kevi_ink
                        </a>.
                    </li>
                </ol>
            </div>
            <div className="button-container">
                <button className="button">PRÊMIOS</button>
                <button className="button">REGRAS</button>
            </div>
        </div>
    );
};

export default InstructionCard;
