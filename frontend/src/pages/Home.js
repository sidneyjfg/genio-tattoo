// src/pages/Home.js
import React from 'react';
import Wheel from '../components/Wheel';
import PrizeHistory from '../components/PrizeHistory';

function Home({ username }) {
    return (
        <div className='container'>
            <div style={{ textAlign: 'center', padding: '2em' }}>
                <h1>Gire a Roleta e Ganhe Prêmios!</h1>
                <Wheel username={username} />
                <PrizeHistory />
            </div>
        </div>
    );
}

export default Home;
