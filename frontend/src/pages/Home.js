// src/pages/Home.js
import React from 'react';
import Wheel from '../components/Wheel';
import PrizeHistory from '../components/PrizeHistory';

function Home() {
    return (
        <div className="container">
            <h1>Gire a Roleta e Ganhe Prêmios!</h1>
            <Wheel />
            <PrizeHistory />
        </div>
    );
}

export default Home;
