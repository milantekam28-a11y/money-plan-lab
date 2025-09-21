// src/components/sections/FeaturesSection.js - Professional Upgrade
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Works perfectly on all devices - mobile, tablet, and desktop for calculating on the go',
      highlight: 'Cross-Platform'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'All calculations happen in your browser - your financial data never leaves your device',
      highlight: 'Zero Data Collection'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get immediate calculations and see real-time updates as you adjust your numbers',
      highlight: 'Real-Time Updates'
    },
    {
      icon: '🏆',
      title: 'Proven Formulas',
      description: 'Built on mathematically sound financial principles used by professionals worldwide',
      highlight: 'Industry Standard'
    },
    {
      icon: '📊',
      title: 'Visual Analytics',
      description: 'Interactive charts and graphs help you visualize your financial progress and goals',
      highlight: 'Data Visualization'
    },
    {
      icon: '❤️',
      title: 'Completely Free',
      description: 'No hidden fees, no sign-ups required - access all calculators immediately and forever',
      highlight: 'Forever Free'
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <div className="section-header">
          <div className="header-badge">
            <span className="badge-icon">✨</span>
            <span>Why Choose Us</span>
          </div>
          <h2 className="section-title">Why Choose Money Plan Lab?</h2>
          <p className="section-subtitle">Built with proven financial principles and designed for real results</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-highlight">
                  {feature.highlight}
                </div>
              </div>
              
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              
              <div className="feature-footer">
                <div className="feature-line"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <div className="cta-background">
            <div className="cta-element element-1"></div>
            <div className="cta-element element-2"></div>
          </div>
          <div className="cta-content">
            <h3>Ready to Experience the Difference?</h3>
            <p>Join over 500,000 users who trust our calculators for their financial planning</p>
            <div className="cta-stats">
              <div className="cta-stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          border: 2px solid #e2e8f0;
          color: #667eea;
        }

        .badge-icon {
          font-size: 1.1rem;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .feature-card {
          background: white;
          border-radius: 24px;
          padding: 40px 30px;
          border: 2px solid #f1f5f9;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: #667eea;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .feature-highlight {
          background: #f0f9ff;
          color: #0369a1;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid #bae6fd;
        }

        .feature-content {
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .feature-description {
          color: #64748b;
          line-height: 1.6;
          font-size: 1rem;
        }

        .feature-footer {
          display: flex;
          justify-content: center;
        }

        .feature-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 2px;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-line {
          opacity: 1;
          width: 80px;
        }

        .features-cta {
          background: white;
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .cta-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea20, #764ba220);
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          right: 15%;
          animation-delay: 3s;
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-content h3 {
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .cta-content p {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .cta-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .features-section {
            padding: 80px 20px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .feature-header {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            text-align: center;
          }

          .features-cta {
            padding: 40px 20px;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }

          .cta-stats {
            gap: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;