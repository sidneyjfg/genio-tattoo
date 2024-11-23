import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Wheel.css';

function Wheel({ username, onPrizeWon }) {
    const [prizes, setPrizes] = useState([]);
    const [currentPrize, setCurrentPrize] = useState('');
    const [isRolling, setIsRolling] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState('');
    const [animate, setAnimate] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showShareButtons, setShowShareButtons] = useState(false);

    // Carrega os prêmios do banco de dados quando o componente é montado
    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await api.get('/api/prizes');
                setPrizes(response.data.map(prize => prize.name)); // Ajusta conforme a estrutura de dados do backend
            } catch (error) {
                console.error('Erro ao carregar prêmios:', error);
                setErrorMessage('Erro ao carregar os prêmios. Tente novamente mais tarde.');
            }
        };
        fetchPrizes();
    }, []);

    // Verifica se o usuário já jogou
    // Verifica se o usuário já jogou
    useEffect(() => {
        const checkIfPlayed = async () => {
            try {
                const response = await api.get(`/api/history/check/${username}`);
                setHasPlayed(response.data.hasPlayed);

                // Se o jogador já jogou, define o prêmio como o prêmio retornado
                if (response.data.hasPlayed) {
                    setSelectedPrize(response.data.prize);
                    setCurrentPrize(`${username} - Seu prêmio é: ${response.data.prize}`);
                    setShowShareButtons(true); // Exibe os botões de compartilhamento
                }
            } catch (error) {
                console.error('Erro ao verificar se o usuário já jogou:', error);
                setErrorMessage('Erro ao verificar o histórico do usuário.');
            }
        };

        if (username) {
            checkIfPlayed();
        }
    }, [username]);


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
                    setShowShareButtons(true); // Exibe os botões de compartilhamento

                    // Grava o prêmio no histórico
                    api.post('/api/history/add', {
                        username: username || 'Usuário Anônimo',
                        prize: selectedPrize
                    })
                        .then(() => {
                            onPrizeWon();
                            setHasPlayed(true); // Atualiza o estado para desativar o botão
                        })
                        .catch(err => {
                            console.error('Erro ao salvar no histórico:', err);
                            setErrorMessage('Erro ao salvar o prêmio no histórico.');
                        });
                }
            }, rotationDuration);

            return () => clearInterval(animationInterval);
        }
    }, [isRolling, prizes, selectedPrize, username, onPrizeWon]);


    // Seleciona o prêmio final antes de iniciar a rotação
    const iniciarRoleta = () => {
        if (hasPlayed) {
            setErrorMessage('Você já jogou e não pode jogar novamente.');
            return;
        }

        if (prizes.length === 0) {
            setErrorMessage('Nenhum prêmio disponível no momento.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * prizes.length);
        setSelectedPrize(prizes[randomIndex]);
        setIsRolling(true);
        setAnimate(true); // Inicia a animação
        setErrorMessage(''); // Limpa mensagens de erro anteriores
        setShowShareButtons(false); // Oculta botões ao girar novamente
    };

    // Compartilhar no Instagram
    const shareOnInstagram = () => {
        const instagramUrl = `https://www.instagram.com/?text=Ganhei o prêmio: ${selectedPrize}!`;
        window.open(instagramUrl, '_blank');
    };

    // Compartilhar no WhatsApp
    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=Ganhei o prêmio: ${selectedPrize}!`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="wheel-container">
            <div className="prize-display">
                <div className={`prize-text ${animate ? 'animate' : ''}`}>
                    {currentPrize || `${username} - Seu prêmio é: ${selectedPrize}`}
                </div>
            </div>
            <button
                onClick={iniciarRoleta}
                disabled={isRolling || hasPlayed || prizes.length === 0}
            >
                {isRolling ? 'Girando...' : hasPlayed ? 'Já jogado' : 'Girar a Roleta'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Botões de compartilhamento */}
            {showShareButtons && (
                <div className="share-buttons">
                    <button onClick={shareOnInstagram} className="instagram-button">
                        Compartilhar no Instagram
                    </button>
                    <button onClick={shareOnWhatsApp} className="whatsapp-button">
                        Compartilhar no WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
}

export default Wheel;
