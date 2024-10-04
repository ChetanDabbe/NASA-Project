// Chatbot.jsx
import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      setMessages([...messages, { text: input, user: true }]);
      setInput('');

      try {
        setLoading(true); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput: input }),
        });

        const data = await response.json();
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, user: false },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error getting response from server', user: false },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3>Chat with Us</h3>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="chatbot-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Loading...</div>}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
