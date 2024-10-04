import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Chatbot from './Chatbot'; // Correctly import Chatbot

function Landing() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="Landing">
      <section className="hero">
        <div className="hero-content">
          <h1>Sustaining Agriculture with Smarter Water Management</h1>
          <p style={{ color: 'black', fontWeight: 'bold' }}>
            Leveraging data and technology to combat water-related issues in agriculture.
          </p>
          <button className="cta-btn" onClick={() => navigate('/read-more')}>
            Explore
          </button>
        </div>
      </section>

      <section className="cta">
        <h2>Join Us in Making a Difference</h2>
        <div className="cta-buttons">
          <button className="cta-btn" onClick={() => navigate('/contact-us')}>
            Contact Us
          </button>
          <button className="cta-btn" onClick={() => navigate('/read-more')}>
            Read More
          </button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us for Water Management in Agriculture?</h2>
        <div className="card-container">
          <div className="card">
            <h3>Data-Driven Insights</h3>
            <p>
              We use cutting-edge data analysis and satellite imagery to provide actionable insights for water management in agriculture.
            </p>
          </div>
          <div className="card">
            <h3>Real-Time Monitoring</h3>
            <p>
              Our system allows for real-time monitoring of water usage, helping farmers optimize irrigation and reduce waste.
            </p>
          </div>
          <div className="card">
            <h3>Climate Resilience</h3>
            <p>
              We help farmers adapt to climate change by providing solutions for water conservation and crop management in diverse environments.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p style={{color:'white'}}>© 2024 Agriculture Water Management | All Rights Reserved</p>
      </footer>

      {/* Chatbot Button */}
      <button className="chat-btn" onClick={toggleChatbot}>
        {showChatbot ? 'Close Chat' : 'Chat with AI'}
      </button>

      {/* Chatbot Component */}
      {showChatbot && <Chatbot onClose={toggleChatbot} />} {/* Pass the toggle function */}
    </div>
  );
}

export default Landing;
