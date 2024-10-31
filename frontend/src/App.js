// src/App.js
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import UsernamePrompt from './pages/UsernamePrompt';
import './styles/index.css'

function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            {username ? (
                <Home username={username} />
            ) : (
                <UsernamePrompt setUsername={setUsername} />
            )}
        </>
    );
}

export default App;
