// src/components/sections/FeaturesSection.js
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Money Plan Lab?</h2>
          <p className="section-subtitle">Built with proven financial principles and designed for real results</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span>📱</span>
            </div>
            <h3 className="feature-title">Mobile Responsive</h3>
            <p className="feature-description">Works perfectly on all devices - mobile, tablet, and desktop for calculating on the go</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>🔒</span>
            </div>
            <h3 className="feature-title">Privacy First</h3>
            <p className="feature-description">All calculations happen in your browser - your financial data never leaves your device</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>⚡</span>
            </div>
            <h3 className="feature-title">Instant Results</h3>
            <p className="feature-description">Get immediate calculations and see real-time updates as you adjust your numbers</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>🏆</span>
            </div>
            <h3 className="feature-title">Proven Formulas</h3>
            <p className="feature-description">Built on mathematically sound financial principles used by professionals worldwide</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>📊</span>
            </div>
            <h3 className="feature-title">Visual Analytics</h3>
            <p className="feature-description">Interactive charts and graphs help you visualize your financial progress and goals</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>❤️</span>
            </div>
            <h3 className="feature-title">Completely Free</h3>
            <p className="feature-description">No hidden fees, no sign-ups required - access all calculators immediately and forever</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .features {
          padding: 100px 20px;
          background: var(--gray-50);
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--gray-600);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: white;
          padding: 45px 35px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--gray-200);
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 20px 20px 0 0;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          position: relative;
          font-size: 2rem;
          color: white;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .feature-description {
          color: var(--gray-600);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;