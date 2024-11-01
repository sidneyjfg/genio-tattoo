// src/pages/Home.js
import React, { useState, useRef } from 'react';
import Wheel from '../components/Wheel';
import PrizeHistory from '../components/PrizeHistory';
import UsernamePrompt from './UsernamePrompt';
import InstructionCard from '../components/InstructionCard';
import '../styles/Home.css';

const Home = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const prizeHistoryRef = useRef(null);

    // Função para atualizar o histórico após um prêmio ser ganho
    const handlePrizeWon = () => {
        if (prizeHistoryRef.current) {
            prizeHistoryRef.current.fetchHistory();
        }
    };

    return (
        <div className="home-container">
            {username ? (
                <div className="content-container">
                    <Wheel username={username} onPrizeWon={handlePrizeWon} />
                    <InstructionCard />
                </div>
            ) : (
                <UsernamePrompt setUsername={setUsername} />
            )}
            {username && <PrizeHistory ref={prizeHistoryRef} />}
        </div>
    );
};

export default Home;
