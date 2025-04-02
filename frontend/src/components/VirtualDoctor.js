import React, { useState } from 'react';
import { FaVideo, FaPhone, FaComments, FaPaperPlane } from 'react-icons/fa';
import '../styles/VirtualDoctor.css';

const VirtualDoctor = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [consultation, setConsultation] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setChatMessages([...chatMessages, newMessage]);
    setCurrentMessage('');
  };

  const startConsultation = (type) => {
    setConsultation(type);
  };

  return (
    <div className="virtual-doctor-container">
      {!consultation ? (
        <>
          <h2>Atendimento Virtual</h2>
          
          <div className="consultation-options">
            <div className="option-card" onClick={() => startConsultation('video')}>
              <FaVideo className="option-icon" />
              <h3>Videochamada</h3>
              <p>Consulta por vídeo com um médico</p>
            </div>

            <div className="option-card" onClick={() => startConsultation('audio')}>
              <FaPhone className="option-icon" />
              <h3>Ligação</h3>
              <p>Consulta por áudio com um médico</p>
            </div>

            <div className="option-card" onClick={() => startConsultation('chat')}>
              <FaComments className="option-icon" />
              <h3>Chat</h3>
              <p>Conversa por texto com um médico</p>
            </div>
          </div>
        </>
      ) : (
        <div className="consultation-chat">
          <div className="chat-messages">
            {chatMessages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <p>{message.text}</p>
                <span className="timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="message-input">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VirtualDoctor;
