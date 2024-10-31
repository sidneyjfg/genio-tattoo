// src/pages/UsernamePrompt.js
import React, { useState } from 'react';

function UsernamePrompt({ setUsername }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            localStorage.setItem("username", input);
            setUsername(input);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2em' }}>
            <h1>Digite seu nome para começar</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome de usuário"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                    style={{ padding: '0.5em', fontSize: '1em' }}
                />
                <button type="submit" style={{ marginLeft: '1em', padding: '0.5em 1em', fontSize: '1em' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default UsernamePrompt;
