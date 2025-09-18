// src/components/sections/TrustedBySection.js
import React from 'react';

const TrustedBySection = () => {
  return (
    <section className="trusted-by">
      <div className="trusted-content">
        <p className="trusted-text">Trusted by Financial Professionals Worldwide</p>
        <div className="trust-indicators">
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <span>100% Secure</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">👥</span>
            <span>2K+ Users</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⭐</span>
            <span>4.9/5 Rating</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">📱</span>
            <span>Mobile Friendly</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">♾️</span>
            <span>Free Forever</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trusted-by {
          padding: 60px 20px;
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
        }

        .trusted-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .trusted-text {
          color: var(--gray-600);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 30px;
        }

        .trust-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-600);
          font-size: 0.9rem;
        }

        .trust-icon {
          color: var(--success);
          font-size: 1.2rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .trust-indicators {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;