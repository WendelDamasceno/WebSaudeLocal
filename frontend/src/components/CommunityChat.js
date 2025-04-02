import React, { useState, useEffect } from 'react';
import '../styles/CommunityChat.css';

const CommunityChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [topic, setTopic] = useState('geral');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            text: newMessage,
            author: 'Usuário',
            timestamp: new Date().toISOString(),
            topic: topic
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    return (
        <div className="community-chat">
            <div className="chat-topics">
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option value="geral">Geral</option>
                    <option value="hospitais">Hospitais</option>
                    <option value="clinicas">Clínicas</option>
                    <option value="medicamentos">Medicamentos</option>
                </select>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className="message">
                        <div className="message-header">
                            <span className="author">{message.author}</span>
                            <span className="timestamp">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="message-text">{message.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default CommunityChat;