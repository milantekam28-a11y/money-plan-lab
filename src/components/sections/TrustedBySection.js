// src/components/sections/TrustedBySection.js - Professional Upgrade
import React from 'react';

const TrustedBySection = () => {
  return (
    <section className="trusted-section">
      <div className="trusted-container">
        <p className="trusted-title">Trusted by Financial Professionals Worldwide</p>
        <div className="trust-grid">
          <div className="trust-item">
            <div className="trust-icon-container">
              <span className="trust-icon">🛡️</span>
            </div>
            <div className="trust-content">
              <span className="trust-text">Bank-Level Security</span>
              <span className="trust-desc">Your data stays private</span>
            </div>
          </div>
          
          <div className="trust-item">
            <div className="trust-icon-container">
              <span className="trust-icon">👥</span>
            </div>
            <div className="trust-content">
              <span className="trust-text">500K+ Active Users</span>
              <span className="trust-desc">Growing community</span>
            </div>
          </div>
          
          <div className="trust-item">
            <div className="trust-icon-container">
              <span className="trust-icon">⭐</span>
            </div>
            <div className="trust-content">
              <span className="trust-text">4.9/5 User Rating</span>
              <span className="trust-desc">Highly recommended</span>
            </div>
          </div>
          
          <div className="trust-item">
            <div className="trust-icon-container">
              <span className="trust-icon">🏆</span>
            </div>
            <div className="trust-content">
              <span className="trust-text">Industry Recognized</span>
              <span className="trust-desc">Award-winning tools</span>
            </div>
          </div>
          
          <div className="trust-item">
            <div className="trust-icon-container">
              <span className="trust-icon">♾️</span>
            </div>
            <div className="trust-content">
              <span className="trust-text">Free Forever</span>
              <span className="trust-desc">No hidden costs</span>
            </div>
          </div>
        </div>
        
        <div className="trust-logos">
          <div className="logo-text">As featured in:</div>
          <div className="logos-container">
            <div className="logo-item">📰 Financial Times</div>
            <div className="logo-item">📊 Bloomberg</div>
            <div className="logo-item">💼 Forbes</div>
            <div className="logo-item">🏦 Wall Street Journal</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trusted-section {
          padding: 80px 20px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
        }

        .trusted-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .trusted-title {
          color: #64748b;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 50px;
        }

        .trust-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 30px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          background: #f8fafc;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .trust-item:hover {
          transform: translateY(-3px);
          border-color: #667eea;
          background: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .trust-icon-container {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-icon {
          font-size: 1.5rem;
          color: white;
        }

        .trust-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .trust-text {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .trust-desc {
          font-size: 0.8rem;
          color: #64748b;
        }

        .trust-logos {
          border-top: 1px solid #e2e8f0;
          padding-top: 40px;
        }

        .logo-text {
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .logos-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .logo-item {
          color: #64748b;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .logo-item:hover {
          color: #667eea;
          border-color: #667eea;
          background: white;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .trust-grid {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .trust-item {
            max-width: 300px;
            width: 100%;
          }

          .logos-container {
            flex-direction: column;
            gap: 15px;
          }

          .logo-item {
            width: 200px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;