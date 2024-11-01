// src/App.js
import React from 'react';
import Home from './pages/Home';
import './App.css'
import SnowEffect from './components/SnowEffect.js';


function App() {
    return (
        <div className="app-container">
            <SnowEffect /> {/* Adiciona o efeito de neve */}
            <Home />
        </div>
    );
}

export default App;
